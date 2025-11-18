import "dotenv/config";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { listItems, updateItem, preloadAllItems } from "../lib/api/webflow.js";
import { WEBFLOW_COLLECTIONS, FIELD_MAPPING } from "../config/constants.js";
import { logWithTimestamp, categorizeError, delay } from "../lib/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Type IDs for News Category collection
const CATEGORY_TYPE_IDS = {
  NEWS: "7a4f21ce5613ba9be3a698eb86854dbc",
  UPDATES: "12d3edad4c6c25a56749f664671e73e7",
};

/**
 * Archive articles older than 60 days based on last-updated date
 * ONLY archives articles with category type "Updates"
 * Articles are unpublished and marked as archived
 * @param {number} daysThreshold - Number of days after which to archive (default: 60)
 * @returns {Promise<object>} - Archive summary
 */
export async function runArchive(daysThreshold = 60) {
  console.log(`\nStarting archive (${daysThreshold}+ days, Updates only)...\n`);

  const summary = {
    archived: [],
    skipped: [],
    errors: [],
    errorDetails: [],
    warnings: [],
    totalChecked: 0,
  };

  let processedCount = 0;
  let startTime = Date.now();

  try {
    // Calculate cutoff date (e.g., 60 days ago from now)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysThreshold);

    // 1. Preload all categories once for O(1) lookups
    logWithTimestamp("Preloading categories...", "info");
    const categoryCache = new Map(); // { categoryId: { name, type } }
    let categoryOffset = 0;
    const categoryLimit = 100;

    while (true) {
      const categoryResponse = await listItems(
        WEBFLOW_COLLECTIONS.NEWS_CATEGORY,
        {
          offset: categoryOffset,
          limit: categoryLimit,
        },
      );

      if (
        !categoryResponse ||
        !categoryResponse.items ||
        categoryResponse.items.length === 0
      ) {
        break;
      }

      categoryResponse.items.forEach((cat) => {
        categoryCache.set(cat.id, {
          name: cat.fieldData.name,
          type: cat.fieldData.type,
        });
      });

      if (
        !categoryResponse.pagination ||
        categoryOffset + categoryLimit >= categoryResponse.pagination.total
      ) {
        break;
      }

      categoryOffset += categoryLimit;
    }

    logWithTimestamp(`Preloaded ${categoryCache.size} categories`, "info");

    // 2. Preload all articles from Webflow
    const allArticlesMap = await preloadAllItems();
    const allArticles = Array.from(allArticlesMap.values());

    logWithTimestamp(`Preloaded ${allArticles.length} articles`, "info");

    // 3. Filter articles in memory that need archiving
    const articlesToArchive = allArticles.filter((item) => {
      const postId = item.fieldData?.[FIELD_MAPPING.postId.webflowField];
      const publishedDate =
        item.fieldData?.[FIELD_MAPPING.timestamp.webflowField];
      const categoryId = item.fieldData?.[FIELD_MAPPING.cat.webflowField];
      const isArchived = item.isArchived || false;

      // Skip if already archived
      if (isArchived) {
        summary.skipped.push({ postId, reason: "already_archived" });
        return false;
      }

      // Skip if missing published date
      if (!publishedDate) {
        summary.skipped.push({ postId, reason: "missing_date" });
        return false;
      }

      // Skip if no category
      if (!categoryId) {
        summary.skipped.push({ postId, reason: "no_category" });
        return false;
      }

      // Get category from cache
      const category = categoryCache.get(categoryId);
      if (!category) {
        summary.skipped.push({ postId, reason: "category_not_found" });
        return false;
      }

      // Skip if not "Updates" type
      if (category.type !== CATEGORY_TYPE_IDS.UPDATES) {
        summary.skipped.push({
          postId,
          reason: "not_updates_type",
          categoryName: category.name,
        });
        return false;
      }

      // Check if old enough to archive based on published date
      const articleDate = new Date(publishedDate);
      const isOld = articleDate < cutoffDate;

      if (!isOld) {
        const daysOld = Math.floor(
          (Date.now() - articleDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        summary.skipped.push({ postId, reason: "too_recent", daysOld });
        return false;
      }

      return true; // Include in articles to archive
    });

    summary.totalChecked = allArticles.length;

    logWithTimestamp(
      `Found ${articlesToArchive.length} articles to archive`,
      "info",
    );
    console.log();

    // 4. Sort by published date (oldest first)
    articlesToArchive.sort((a, b) => {
      const dateA = new Date(a.fieldData[FIELD_MAPPING.timestamp.webflowField]);
      const dateB = new Date(b.fieldData[FIELD_MAPPING.timestamp.webflowField]);
      return dateA - dateB;
    });

    // 5. Archive each article
    for (let i = 0; i < articlesToArchive.length; i++) {
      const item = articlesToArchive[i];
      const articleNum = i + 1;
      processedCount++;

      const postId = item.fieldData[FIELD_MAPPING.postId.webflowField];
      const title =
        item.fieldData[FIELD_MAPPING.title.webflowField] || "Unknown";
      const publishedDate =
        item.fieldData[FIELD_MAPPING.timestamp.webflowField];
      const categoryId = item.fieldData[FIELD_MAPPING.cat.webflowField];
      const category = categoryCache.get(categoryId);

      const articleDate = new Date(publishedDate);
      const daysOld = Math.floor(
        (Date.now() - articleDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      try {
        await updateItem(WEBFLOW_COLLECTIONS.NEWS, item.id, {
          fieldData: item.fieldData,
          isArchived: true,
          isDraft: false,
        });

        summary.archived.push({
          postId,
          itemId: item.id,
          title: title,
          category: category.name,
          lastUpdated: articleDate.toISOString(),
          daysOld,
        });

        console.log(
          `✓ [${articleNum}/${articlesToArchive.length}] ARCHIVED: "${title}" (ID: ${postId}) - ${daysOld} days old`,
        );

        // Delay to prevent rate limiting
        await delay(1000);
      } catch (archiveError) {
        const errorInfo = categorizeError(archiveError);

        summary.errors.push(postId);
        summary.errorDetails.push({
          postId,
          itemId: item.id,
          error: archiveError.message,
          errorCategory: errorInfo.category,
        });

        console.log(
          `✗ [${articleNum}/${articlesToArchive.length}] ERROR: "${title}" (ID: ${postId}) - ${archiveError.message}`,
        );
      }

      // Log batch summary every 50 articles
      if (processedCount % 50 === 0) {
        const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
        const rate = (processedCount / elapsedSec).toFixed(2);
        console.log(
          `\nProgress: ${processedCount}/${articlesToArchive.length} | Rate: ${rate} articles/sec | Elapsed: ${elapsedSec}s\n`,
        );
      }
    }

    // Write archived articles to log file
    if (summary.archived.length > 0) {
      await writeArchiveLog(summary.archived, daysThreshold);
    }

    // Final summary
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    const avgRate =
      processedCount > 0 ? (processedCount / totalTime).toFixed(2) : "0.00";
    const logFileName =
      summary.archived.length > 0
        ? `archived-${new Date().toISOString().split("T")[0]}.log`
        : null;

    console.log(`\nARCHIVE COMPLETE`);
    console.log(
      `Checked: ${summary.totalChecked.toString().padEnd(4)} | Archived: ${summary.archived.length.toString().padEnd(4)} | Skipped: ${summary.skipped.length.toString().padEnd(4)} | Warnings: ${summary.warnings.length.toString().padEnd(4)} | Errors: ${summary.errors.length.toString().padEnd(4)} | Time: ${totalTime.padEnd(6)}s | Rate: ${avgRate.padEnd(5)}/s${logFileName ? ` | Log: /logs/${logFileName}` : ""}`,
    );
    console.log();

    // Log warnings if any
    if (summary.warnings.length > 0) {
      console.log(`Warnings (${summary.warnings.length}):`);
      summary.warnings.forEach((warn, idx) => {
        console.log(`  ${idx + 1}. ${warn.postId || warn.message}`);
      });
      console.log();
    }

    // Log errors if any
    if (summary.errors.length > 0) {
      console.log(`Failed articles (${summary.errors.length}):`);
      summary.errorDetails.forEach((err, idx) => {
        console.log(`  ${idx + 1}. ${err.postId}: ${err.error}`);
      });
      console.log();
    }
  } catch (error) {
    logWithTimestamp(`Archive failed: ${error.message}`, "error");
    summary.errorDetails.push({ generalError: error.message });
    throw error;
  }

  return summary;
}

/**
 * Write archived articles to a log file
 * @param {Array} archivedArticles - Array of archived article objects
 * @param {number} daysThreshold - Days threshold used for archiving
 */
async function writeArchiveLog(archivedArticles, daysThreshold) {
  const logDir = join(__dirname, "..", "logs");
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const logFilePath = join(logDir, `archived-${today}.log`);

  const logData = {
    timestamp: new Date().toISOString(),
    daysThreshold,
    archivedCount: archivedArticles.length,
    archived: archivedArticles.map((article) => ({
      postId: article.postId,
      title: article.title,
      category: article.category,
      lastUpdated: article.lastUpdated,
      daysOld: article.daysOld,
    })),
  };

  try {
    // Ensure /local directory exists
    await fs.mkdir(logDir, { recursive: true });

    // Write log file
    await fs.writeFile(logFilePath, JSON.stringify(logData, null, 2), "utf-8");
  } catch (error) {
    logWithTimestamp(`Failed to write archive log: ${error.message}`, "warn");
  }
}

/**
 * Vercel serverless function handler
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
export default async function handler(req, res) {
  try {
    // Allow custom days threshold from request body (for manual archives)
    const daysThreshold = req.body?.daysThreshold || 90;

    // Validate days threshold
    if (
      typeof daysThreshold !== "number" ||
      daysThreshold < 1 ||
      daysThreshold > 365
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid daysThreshold. Must be a number between 1 and 365.",
      });
    }

    // Run archive
    const summary = await runArchive(daysThreshold);

    return res.status(200).json({
      success: true,
      ...summary,
      timestamp: new Date().toISOString(),
      daysThreshold,
    });
  } catch (error) {
    logWithTimestamp(`Archive handler failed: ${error.message}`, "error");
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * CLI execution handler
 * Run with: npm run archive [days]
 * Example: npm run archive 60
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  const daysThreshold = parseInt(process.argv[2]) || 90;

  runArchive(daysThreshold)
    .then((summary) => {
      process.exit(summary.errors.length > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error(`Fatal error: ${error.message}`);
      process.exit(1);
    });
}
