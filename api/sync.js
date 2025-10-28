import "dotenv/config";
import { getRecentPosts, getPostById } from "../lib/api/engine.js";
import {
  findItemByPostId,
  createItem,
  updateItem,
  publishItems,
  createWebflowClient,
} from "../lib/api/webflow.js";
import ReferenceManager from "../lib/reference.js";
import {
  transformEngineToWebflow,
  needsUpdate,
  validateArticle,
} from "../lib/transformer.js";
import { WEBFLOW_COLLECTIONS, SYNC_CONFIG } from "../config/constants.js";
import { logWithTimestamp } from "../lib/utils.js";

/**
 * Core sync logic - reusable by cron and manual triggers
 * @param {number} recentCount - Number of recent posts to sync (default: 20)
 * @returns {Promise<object>} - Sync summary
 */
export async function runSync(recentCount = SYNC_CONFIG.DEFAULT_RECENT_COUNT) {
  console.log(`Starting sync (${recentCount} posts)...`);

  const summary = {
    created: [],
    updated: [],
    skipped: [],
    errors: [],
    errorDetails: [],
  };

  try {
    // Initialize reference manager
    const webflowClient = createWebflowClient();
    const refManager = new ReferenceManager(webflowClient);

    // 1. Fetch recent articles from Engine API v2
    const engineArticles = await getRecentPosts(recentCount);

    if (!engineArticles || !Array.isArray(engineArticles)) {
      throw new Error(
        "Invalid response from Engine API - expected array of articles",
      );
    }

    // 2. Process each article
    for (const article of engineArticles) {
      try {
        // 2a. Validate article data
        validateArticle(article);

        // 2b. Fetch full article content (includes the body/content field)
        const fullArticle = await getPostById(article.postId);

        // Merge full article data with the list data (full article has content field)
        const completeArticle = { ...article, ...fullArticle };

        // 2c. Ensure category exists (creates if needed)
        const categoryId = await refManager.ensureCategoryExists(
          completeArticle.cat,
          completeArticle.color,
        );

        // 2d. Ensure tags exist (batch operation)
        const tagIds = await refManager.ensureTagsExist(
          completeArticle.tags || [],
        );

        // 2e. Check if article exists in Webflow
        const existingItem = await findItemByPostId(completeArticle.postId);

        // 2f. Transform Engine data to Webflow format
        const webflowData = transformEngineToWebflow(completeArticle, {
          categoryId,
          tagIds,
        });

        // 2g. Create or update
        if (!existingItem) {
          // Create new article
          try {
            const createdItem = await createItem(WEBFLOW_COLLECTIONS.NEWS, {
              ...webflowData,
              isArchived: false,
              isDraft: false, // Auto-publish
            });

            // Publish immediately
            await publishItems(WEBFLOW_COLLECTIONS.NEWS, [createdItem.id]);
            summary.created.push(completeArticle.postId);
          } catch (createError) {
            // Check if it's a slug conflict error
            if (
              createError.message.includes("slug") &&
              createError.message.includes(
                "Unique value is already in database",
              )
            ) {
              // Retry with hashed slug
              logWithTimestamp(
                `⚠ Slug conflict for article ${completeArticle.postId}, auto-resolving...`,
                "warn",
              );

              const webflowDataWithHash = transformEngineToWebflow(
                completeArticle,
                {
                  categoryId,
                  tagIds,
                },
                true,
              ); // Pass true to append hash to slug

              const createdItem = await createItem(WEBFLOW_COLLECTIONS.NEWS, {
                ...webflowDataWithHash,
                isArchived: false,
                isDraft: false,
              });

              await publishItems(WEBFLOW_COLLECTIONS.NEWS, [createdItem.id]);
              summary.created.push(completeArticle.postId);
            } else {
              throw createError; // Re-throw if it's not a slug conflict
            }
          }
        } else if (needsUpdate(existingItem, completeArticle)) {
          // Update existing article

          // Generate update data WITHOUT slug to avoid Webflow conflicts
          const updateData = transformEngineToWebflow(
            completeArticle,
            { categoryId, tagIds },
            false, // useHashedSlug = false
            true, // excludeSlug = true (don't send slug on updates)
          );

          const updatedItem = await updateItem(
            WEBFLOW_COLLECTIONS.NEWS,
            existingItem.id,
            updateData,
          );

          // Publish update
          await publishItems(WEBFLOW_COLLECTIONS.NEWS, [updatedItem.id]);
          summary.updated.push(completeArticle.postId);
        } else {
          // No update needed
          summary.skipped.push(completeArticle.postId);
        }
      } catch (error) {
        summary.errors.push(article.postId);
        summary.errorDetails.push({
          postId: article.postId,
          title: article.title,
          error: error.message,
        });
        logWithTimestamp(
          `✗ Error syncing article ${article.postId}: ${error.message}`,
          "error",
        );
      }
    }
  } catch (error) {
    logWithTimestamp(`✗ Sync failed: ${error.message}`, "error");
    summary.errorDetails.push({ generalError: error.message });
    throw error;
  }

  // 4. Final summary
  if (summary.errors.length === 0) {
    console.log(
      `✓ Sync complete: Created ${summary.created.length} | Updated ${summary.updated.length} | Skipped ${summary.skipped.length} | Errors 0`,
    );
  } else {
    console.log(
      `✓ Sync complete: Created ${summary.created.length} | Updated ${summary.updated.length} | Skipped ${summary.skipped.length} | Errors ${summary.errors.length}`,
    );
    console.log(`\nFailed articles:`);
    summary.errorDetails.forEach((err) => {
      console.log(`  - ${err.postId}: ${err.error}`);
    });
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
    // Allow custom recent count from request body (for manual syncs)
    const recentCount = req.body?.recent || SYNC_CONFIG.DEFAULT_RECENT_COUNT;

    // Validate recent count
    if (
      typeof recentCount !== "number" ||
      recentCount < 1 ||
      recentCount > 100
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid recent count. Must be a number between 1 and 100.",
      });
    }

    // Run sync
    const summary = await runSync(recentCount);

    return res.status(200).json({
      success: true,
      ...summary,
      timestamp: new Date().toISOString(),
      recentCount,
    });
  } catch (error) {
    logWithTimestamp(`Sync handler failed: ${error.message}`, "error");
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * CLI execution handler
 * Run with: npm run sync [count]
 * Example: npm run sync 50
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  const recentCount =
    parseInt(process.argv[2]) || SYNC_CONFIG.DEFAULT_RECENT_COUNT;

  runSync(recentCount)
    .then((summary) => {
      process.exit(summary.errors.length > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error(`✗ Fatal error: ${error.message}`);
      process.exit(1);
    });
}
