import "dotenv/config";
import { listItems, updateItem } from "../lib/api/webflow.js";
import { WEBFLOW_COLLECTIONS, FIELD_MAPPING } from "../config/constants.js";
import { logWithTimestamp } from "../lib/utils.js";

/**
 * Archive articles older than 90 days based on last-updated date
 * Articles are unpublished and marked as archived
 * @param {number} daysThreshold - Number of days after which to archive (default: 90)
 * @returns {Promise<object>} - Archive summary
 */
export async function runArchive(daysThreshold = 90) {
  logWithTimestamp(
    `Starting archive process for articles older than ${daysThreshold} days...`,
  );

  const summary = {
    archived: [],
    skipped: [],
    errors: [],
    errorDetails: [],
    totalChecked: 0,
  };

  try {
    // Calculate cutoff date (90 days ago from now)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysThreshold);
    logWithTimestamp(
      `Cutoff date: ${cutoffDate.toISOString()} (${daysThreshold} days ago)`,
    );

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
          const updatedDate = item.fieldData[FIELD_MAPPING.updatedDate]; // For age check (testing)
          const isArchived = item.isArchived || false;
          const isDraft = item.isDraft || false;

          // Skip if already archived
          if (isArchived) {
            logWithTimestamp(`⊘ Already archived: ${postId}`);
            summary.skipped.push({
              postId,
              reason: "already_archived",
            });
            continue;
          }

          // Skip if missing updatedDate
          if (!updatedDate) {
            logWithTimestamp(`⊘ Skipping (no updatedDate): ${postId}`, "warn");
            summary.skipped.push({
              postId,
              reason: "missing_date",
            });
            continue;
          }

          // Check if article is older than threshold using updatedDate
          // TODO: After testing, switch to using lastPublished for both sorting and checking
          const articleDate = new Date(updatedDate);
          const isOld = articleDate < cutoffDate;

          if (isOld) {
            // Found an item old enough to archive
            const daysOld = Math.floor(
              (Date.now() - articleDate.getTime()) / (1000 * 60 * 60 * 24),
            );
            logWithTimestamp(
              `✓ Archiving article ${postId} (${daysOld} days old, last updated: ${articleDate.toISOString()})`,
            );

            // Mark as archived (Webflow will automatically unpublish archived items)
            await updateItem(WEBFLOW_COLLECTIONS.NEWS, item.id, {
              fieldData: item.fieldData, // Keep all existing data
              isArchived: true,
              isDraft: false,
            });
            logWithTimestamp(`  → Archived: ${postId}`);

            summary.archived.push({
              postId,
              itemId: item.id,
              lastUpdated: articleDate.toISOString(),
              daysOld,
            });

            // Since items are sorted newest first, everything older is already archived
            // Stop processing after archiving this item
            logWithTimestamp(
              `  → Stopping - all older items already archived from previous runs.`,
            );
            shouldStopProcessing = true;
            break; // Exit the for loop
          } else {
            // Item is recent, continue checking
            const daysOld = Math.floor(
              (Date.now() - articleDate.getTime()) / (1000 * 60 * 60 * 24),
            );
            logWithTimestamp(
              `⊘ Skipping (too recent): ${postId} (${daysOld} days old)`,
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
            `✗ Error archiving article ${postId}: ${error.message}`,
            "error",
          );
        }
      }

      // Check if we should stop processing
      if (shouldStopProcessing) {
        const remainingItems =
          response.pagination?.total - offset - response.items.length || 0;
        logWithTimestamp(
          `Stopping archive process. Remaining ${remainingItems} items are already archived.`,
        );
        hasMore = false;
        break;
      }

      // Check if there are more items to fetch
      if (response.pagination && offset + limit < response.pagination.total) {
        offset += limit;
        logWithTimestamp(`Fetching next batch (offset: ${offset})...`);
      } else {
        hasMore = false;
      }
    }

    // Final summary
    logWithTimestamp(
      `Archive complete - Checked: ${summary.totalChecked}, Archived: ${summary.archived.length}, Skipped: ${summary.skipped.length}, Errors: ${summary.errors.length}`,
    );
  } catch (error) {
    logWithTimestamp(`Catastrophic archive failure: ${error.message}`, "error");
    summary.errorDetails.push({ generalError: error.message });
    throw error;
  }

  return summary;
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

  logWithTimestamp(`=== Archive CLI Mode ===`);
  logWithTimestamp(`Days threshold: ${daysThreshold}`);

  runArchive(daysThreshold)
    .then((summary) => {
      logWithTimestamp(`\n=== Archive Summary ===`);
      logWithTimestamp(`Total checked: ${summary.totalChecked}`);
      logWithTimestamp(`Archived: ${summary.archived.length}`);
      logWithTimestamp(`Skipped: ${summary.skipped.length}`);
      logWithTimestamp(`Errors: ${summary.errors.length}`);

      if (summary.archived.length > 0) {
        logWithTimestamp(`\nArchived items:`);
        summary.archived.forEach((item) => {
          logWithTimestamp(`  - ${item.postId} (${item.daysOld} days old)`);
        });
      }

      if (summary.errors.length > 0) {
        logWithTimestamp(`\nErrors:`, "error");
        summary.errorDetails.forEach((err) => {
          logWithTimestamp(`  - ${err.postId}: ${err.error}`, "error");
        });
      }

      process.exit(summary.errors.length > 0 ? 1 : 0);
    })
    .catch((error) => {
      logWithTimestamp(`Fatal error: ${error.message}`, "error");
      process.exit(1);
    });
}
