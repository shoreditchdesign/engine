import "dotenv/config";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { listItems, updateItem } from "../lib/api/webflow.js";
import { WEBFLOW_COLLECTIONS, FIELD_MAPPING } from "../config/constants.js";
import { logWithTimestamp } from "../lib/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Type IDs for News Category collection
const CATEGORY_TYPE_IDS = {
  NEWS: "7a4f21ce5613ba9be3a698eb86854dbc",
  UPDATES: "12d3edad4c6c25a56749f664671e73e7",
};

/**
 * Archive articles older than 90 days based on last-updated date
 * ONLY archives articles with category type "Updates"
 * Articles are unpublished and marked as archived
 * @param {number} daysThreshold - Number of days after which to archive (default: 90)
 * @returns {Promise<object>} - Archive summary
 */
export async function runArchive(daysThreshold = 90) {
  console.log(`Starting archive (${daysThreshold}+ days, Updates only)...`);

  const summary = {
    archived: [],
    skipped: [],
    errors: [],
    errorDetails: [],
    totalChecked: 0,
  };

  // Cache for category lookups (to avoid repeated API calls)
  const categoryCache = new Map(); // { categoryId: { name, type } }

  try {
    // Calculate cutoff date (90 days ago from now)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysThreshold);

    // Fetch articles from Webflow sorted by lastPublished DESCENDING (newest first)
    // Check recent items to see if they need archiving
    // Stop as soon as we hit an item old enough to archive (everything older is already archived)
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
      const response = await listItems(WEBFLOW_COLLECTIONS.NEWS, {
        offset,
        limit,
        filter: {
          sortBy: "lastPublished",
          sortOrder: "desc", // Newest first
        },
      });

      if (!response || !response.items || response.items.length === 0) {
        hasMore = false;
        break;
      }

      summary.totalChecked += response.items.length;

      // Process each article (sorted newest first by lastPublished)
      let shouldStopProcessing = false;

      for (const item of response.items) {
        try {
          const postId = item.fieldData[FIELD_MAPPING.postId];
          const lastPublished = item.lastPublished; // For sorting
          const updatedDate = item.fieldData[FIELD_MAPPING.updatedDate]; // For age check
          const categoryId = item.fieldData[FIELD_MAPPING.cat]; // Category reference ID
          const isArchived = item.isArchived || false;
          const isDraft = item.isDraft || false;

          // Skip if already archived
          if (isArchived) {
            summary.skipped.push({
              postId,
              reason: "already_archived",
            });
            continue;
          }

          // Skip if missing updatedDate
          if (!updatedDate) {
            summary.skipped.push({
              postId,
              reason: "missing_date",
            });
            continue;
          }

          // Skip if no category
          if (!categoryId) {
            summary.skipped.push({
              postId,
              reason: "no_category",
            });
            continue;
          }

          // Fetch category to check type (with caching)
          let category;
          if (categoryCache.has(categoryId)) {
            category = categoryCache.get(categoryId);
          } else {
            // Fetch all categories and find the one we need (inefficient but simple)
            // TODO: Optimize by fetching category by ID directly if Webflow API supports it
            let foundCategory = null;
            let categoryOffset = 0;
            const categoryLimit = 100;

            while (!foundCategory) {
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
                break; // No more categories to check
              }

              // Find the specific category by ID
              foundCategory = categoryResponse.items.find(
                (c) => c.id === categoryId,
              );

              if (foundCategory) {
                break;
              }

              // Check if there are more categories to fetch
              if (
                !categoryResponse.pagination ||
                categoryOffset + categoryLimit >= categoryResponse.pagination.total
              ) {
                break;
              }

              categoryOffset += categoryLimit;
            }

            if (!foundCategory) {
              summary.skipped.push({
                postId,
                reason: "category_not_found",
              });
              continue;
            }

            category = {
              name: foundCategory.fieldData.name,
              type: foundCategory.fieldData.type,
            };
            categoryCache.set(categoryId, category);
          }

          // Check if category type is "Updates"
          if (category.type !== CATEGORY_TYPE_IDS.UPDATES) {
            summary.skipped.push({
              postId,
              reason: "not_updates_type",
              categoryName: category.name,
            });
            continue;
          }

          // Check if article is older than threshold using updatedDate
          // TODO: After testing, switch to using lastPublished for both sorting and checking
          const articleDate = new Date(updatedDate);
          const isOld = articleDate < cutoffDate;

          if (isOld) {
            // Found an item old enough to archive (and it's "Updates" type)
            const daysOld = Math.floor(
              (Date.now() - articleDate.getTime()) / (1000 * 60 * 60 * 24),
            );

            // Mark as archived (Webflow will automatically unpublish archived items)
            await updateItem(WEBFLOW_COLLECTIONS.NEWS, item.id, {
              fieldData: item.fieldData, // Keep all existing data
              isArchived: true,
              isDraft: false,
            });

            summary.archived.push({
              postId,
              itemId: item.id,
              title: item.fieldData[FIELD_MAPPING.title] || "Unknown",
              category: category.name,
              lastUpdated: articleDate.toISOString(),
              daysOld,
            });

            // Since items are sorted newest first, everything older is already archived
            // Stop processing after archiving this item
            shouldStopProcessing = true;
            break; // Exit the for loop
          } else {
            // Item is recent, continue checking
            const daysOld = Math.floor(
              (Date.now() - articleDate.getTime()) / (1000 * 60 * 60 * 24),
            );
            summary.skipped.push({
              postId,
              reason: "too_recent",
              daysOld,
            });
          }
        } catch (error) {
          const postId = item.fieldData?.[FIELD_MAPPING.postId] || "unknown";
          summary.errors.push(postId);
          summary.errorDetails.push({
            postId,
            itemId: item.id,
            error: error.message,
          });
          logWithTimestamp(
            `✗ Error archiving ${postId}: ${error.message}`,
            "error",
          );
        }
      }

      // Check if we should stop processing
      if (shouldStopProcessing) {
        hasMore = false;
        break;
      }

      // Check if there are more items to fetch
      if (response.pagination && offset + limit < response.pagination.total) {
        offset += limit;
      } else {
        hasMore = false;
      }
    }

    // Write archived articles to log file
    if (summary.archived.length > 0) {
      await writeArchiveLog(summary.archived, daysThreshold);
    }

    // Final summary
    const logFileName = summary.archived.length > 0
      ? `archived-${new Date().toISOString().split('T')[0]}.log`
      : null;

    if (summary.errors.length === 0) {
      if (summary.archived.length > 0) {
        console.log(`✓ Archived ${summary.archived.length} articles → /local/${logFileName}`);
      } else {
        console.log(`✓ Archive complete: No articles to archive`);
      }
    } else {
      console.log(`✓ Archive complete: Archived ${summary.archived.length} | Errors ${summary.errors.length}`);
      console.log(`\nFailed articles:`);
      summary.errorDetails.forEach((err) => {
        console.log(`  - ${err.postId}: ${err.error}`);
      });
    }
  } catch (error) {
    logWithTimestamp(`✗ Archive failed: ${error.message}`, "error");
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
  const logDir = join(__dirname, "..", "local");
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const logFilePath = join(logDir, `archived-${today}.log`);

  const logData = {
    timestamp: new Date().toISOString(),
    daysThreshold,
    archivedCount: archivedArticles.length,
    archived: archivedArticles.map(article => ({
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
    logWithTimestamp(`⚠ Failed to write archive log: ${error.message}`, "warn");
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
      console.error(`✗ Fatal error: ${error.message}`);
      process.exit(1);
    });
}
