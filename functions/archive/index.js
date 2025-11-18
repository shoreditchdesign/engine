require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const {
  listItems,
  updateItem,
  preloadAllItems,
} = require("../../lib/api/webflow.js");
const {
  WEBFLOW_COLLECTIONS,
  FIELD_MAPPING,
} = require("../../config/constants.js");
const { categorizeError } = require("../../lib/utils.js");

// Type IDs for News Category collection
const CATEGORY_TYPE_IDS = {
  NEWS: "7a4f21ce5613ba9be3a698eb86854dbc",
  UPDATES: "12d3edad4c6c25a56749f664671e73e7",
};

/**
 * Archive articles older than 60 days based on published date
 * ONLY archives articles with category type "Updates"
 * Articles are unpublished and marked as archived
 * @param {object} context - Azure Function context for logging
 * @param {number} daysThreshold - Number of days after which to archive (default: 60)
 * @returns {Promise<object>} - Archive summary
 */
async function runArchive(context, daysThreshold = 60) {
  context.log(`\nStarting archive (${daysThreshold}+ days, Updates only)...\n`);

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
    context.log("Preloading categories...");
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

    context.log(`Preloaded ${categoryCache.size} categories`);

    // 2. Preload all articles from Webflow
    const allArticlesMap = await preloadAllItems();
    const allArticles = Array.from(allArticlesMap.values());

    context.log(`Preloaded ${allArticles.length} articles`);

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

    context.log(`Found ${articlesToArchive.length} articles to archive\n`);

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

        context.log(
          `✓ [${articleNum}/${articlesToArchive.length}] ARCHIVED: "${title}" (ID: ${postId}) - ${daysOld} days old`,
        );

        // Log individual article archived event to Application Insights
        if (context.log) {
          context.log({
            eventName: "ArticleArchived",
            properties: {
              postId: postId,
              title: title,
              category: category.name,
              publishedDate: articleDate.toISOString(),
              daysOld: daysOld,
              daysThreshold: daysThreshold,
            },
          });
        }
      } catch (archiveError) {
        const errorInfo = categorizeError(archiveError);

        summary.errors.push(postId);
        summary.errorDetails.push({
          postId,
          itemId: item.id,
          error: archiveError.message,
          errorCategory: errorInfo.category,
        });

        context.log(
          `✗ [${articleNum}/${articlesToArchive.length}] ERROR: "${title}" (ID: ${postId}) - ${archiveError.message}`,
        );
      }

      // Log batch summary every 50 articles
      if (processedCount % 50 === 0) {
        const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
        const rate = (processedCount / elapsedSec).toFixed(2);
        context.log(
          `\nProgress: ${processedCount}/${articlesToArchive.length} | Rate: ${rate} articles/sec | Elapsed: ${elapsedSec}s\n`,
        );
      }
    }

    // Write archived articles to log file
    if (summary.archived.length > 0) {
      await writeArchiveLog(context, summary.archived, daysThreshold);
    }

    // Final summary
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    const avgRate =
      processedCount > 0 ? (processedCount / totalTime).toFixed(2) : "0.00";
    const logFileName =
      summary.archived.length > 0
        ? `archived-${new Date().toISOString().split("T")[0]}.log`
        : null;

    // Log metrics to Application Insights
    if (context.log && context.log.metric) {
      context.log.metric("ArchiveTotalChecked", summary.totalChecked);
      context.log.metric("ArchiveArchivedCount", summary.archived.length);
      context.log.metric("ArchiveSkippedCount", summary.skipped.length);
      context.log.metric("ArchiveErrorCount", summary.errors.length);
      context.log.metric("ArchiveDurationSeconds", parseFloat(totalTime));
      context.log.metric("ArchiveDaysThreshold", daysThreshold);
    }

    context.log(`\nARCHIVE COMPLETE`);
    context.log(
      `Checked: ${summary.totalChecked.toString().padEnd(4)} | Archived: ${summary.archived.length.toString().padEnd(4)} | Skipped: ${summary.skipped.length.toString().padEnd(4)} | Warnings: ${summary.warnings.length.toString().padEnd(4)} | Errors: ${summary.errors.length.toString().padEnd(4)} | Time: ${totalTime.padEnd(6)}s | Rate: ${avgRate.padEnd(5)}/s${logFileName ? ` | Log: /logs/${logFileName}` : ""}`,
    );
    context.log();

    // Log warnings if any
    if (summary.warnings.length > 0) {
      context.log(`Warnings (${summary.warnings.length}):`);
      summary.warnings.forEach((warn, idx) => {
        context.log(`  ${idx + 1}. ${warn.postId || warn.message}`);
      });
    }

    // Log errors if any
    if (summary.errors.length > 0) {
      context.log(`Failed articles (${summary.errors.length}):`);
      summary.errorDetails.forEach((err, idx) => {
        context.log(`  ${idx + 1}. ${err.postId}: ${err.error}`);
      });
    }
  } catch (error) {
    context.log.error(`Archive failed: ${error.message}`);
    summary.errorDetails.push({ generalError: error.message });
    throw error;
  }

  return summary;
}

/**
 * Write archived articles to a log file
 * @param {object} context - Azure Function context
 * @param {Array} archivedArticles - Array of archived article objects
 * @param {number} daysThreshold - Days threshold used for archiving
 */
async function writeArchiveLog(context, archivedArticles, daysThreshold) {
  const logDir = path.join(__dirname, "..", "..", "logs");
  const today = new Date().toISOString().split("T")[0];
  const logFilePath = path.join(logDir, `archived-${today}.log`);

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
    // Ensure /logs directory exists
    await fs.mkdir(logDir, { recursive: true });
    await fs.writeFile(logFilePath, JSON.stringify(logData, null, 2), "utf-8");
  } catch (error) {
    context.log.warn(`Failed to write archive log: ${error.message}`);
  }
}

/**
 * Azure Function handler
 * Supports both timer trigger (automated daily) and HTTP trigger (manual)
 */
module.exports = async function (context, req) {
  // Determine trigger type
  const isTimerTrigger = context.bindings.myTimer !== undefined;
  const triggerType = isTimerTrigger ? "Timer" : "HTTP";

  context.log(`Archive function triggered by ${triggerType}`);

  try {
    // Allow custom days threshold from request body or query (for manual HTTP archives)
    // Timer triggers will use default 60 days
    const daysThreshold = isTimerTrigger
      ? 60
      : req.body?.daysThreshold ||
        (req.query.daysThreshold ? parseInt(req.query.daysThreshold) : null) ||
        60;

    // Validate days threshold
    if (
      typeof daysThreshold !== "number" ||
      daysThreshold < 1 ||
      daysThreshold > 365
    ) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: {
          success: false,
          error: "Invalid daysThreshold. Must be a number between 1 and 365.",
        },
      };
      return;
    }

    // Run archive
    const summary = await runArchive(context, daysThreshold);

    // Set HTTP response (for HTTP triggers)
    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: {
        success: true,
        ...summary,
        timestamp: new Date().toISOString(),
        daysThreshold,
        triggerType,
      },
    };
  } catch (error) {
    context.log.error(`Archive handler failed: ${error.message}`);
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
        triggerType,
      },
    };
  }
};
