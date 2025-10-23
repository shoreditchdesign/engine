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
  logWithTimestamp(`Starting sync for ${recentCount} recent posts...`);

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

    logWithTimestamp(
      `Fetched ${engineArticles.length} articles from Engine API`,
    );

    // 2. Process each article
    for (const article of engineArticles) {
      try {
        // 2a. Validate article data
        validateArticle(article);

        logWithTimestamp(
          `Processing article: ${article.postId} - "${article.title}"`,
        );

        // 2b. Fetch full article content (includes the body/content field)
        logWithTimestamp(`  → Fetching full content for ${article.postId}...`);
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
          logWithTimestamp(`✓ Creating new article: ${completeArticle.postId}`);

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
              logWithTimestamp(
                `  ⚠ Slug conflict detected, retrying with hashed slug...`,
                "warn",
              );

              // Retry with hashed slug
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
              logWithTimestamp(
                `  ✓ Created with modified slug: ${webflowDataWithHash.fieldData.slug}`,
              );
            } else {
              throw createError; // Re-throw if it's not a slug conflict
            }
          }
        } else if (needsUpdate(existingItem, completeArticle)) {
          // Update existing article
          logWithTimestamp(`✓ Updating article: ${completeArticle.postId}`);

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
          logWithTimestamp(
            `✓ Skipping article (no changes): ${completeArticle.postId}`,
          );
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
          `✗ Error processing article ${article.postId}: ${error.message}`,
          "error",
        );
      }
    }

    // 3. Log cache statistics
    const cacheStats = refManager.getCacheStats();
    logWithTimestamp(
      `Cache stats: ${cacheStats.categories} categories, ${cacheStats.tags} tags cached`,
    );
  } catch (error) {
    logWithTimestamp(`Catastrophic sync failure: ${error.message}`, "error");
    summary.errorDetails.push({ generalError: error.message });
    throw error;
  }

  // 4. Final summary
  logWithTimestamp(
    `Sync complete - Created: ${summary.created.length}, Updated: ${summary.updated.length}, Skipped: ${summary.skipped.length}, Errors: ${summary.errors.length}`,
  );

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

  logWithTimestamp(`=== Sync CLI Mode ===`);
  logWithTimestamp(`Recent count: ${recentCount}`);

  runSync(recentCount)
    .then((summary) => {
      logWithTimestamp(`\n=== Sync Summary ===`);
      logWithTimestamp(`Created: ${summary.created.length}`);
      logWithTimestamp(`Updated: ${summary.updated.length}`);
      logWithTimestamp(`Skipped: ${summary.skipped.length}`);
      logWithTimestamp(`Errors: ${summary.errors.length}`);

      if (summary.created.length > 0) {
        logWithTimestamp(`\nCreated articles:`);
        summary.created.forEach((postId) => {
          logWithTimestamp(`  - ${postId}`);
        });
      }

      if (summary.updated.length > 0) {
        logWithTimestamp(`\nUpdated articles:`);
        summary.updated.forEach((postId) => {
          logWithTimestamp(`  - ${postId}`);
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
