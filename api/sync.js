import "dotenv/config";
import { getRecentPosts } from "../lib/api/engine.js";
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

        // 2b. Ensure category exists (creates if needed)
        logWithTimestamp(
          `Processing article: ${article.postId} - "${article.title}"`,
        );
        const categoryId = await refManager.ensureCategoryExists(
          article.cat,
          article.color,
        );

        // 2c. Ensure tags exist (batch operation)
        const tagIds = await refManager.ensureTagsExist(article.tags || []);

        // 2d. Check if article exists in Webflow
        const existingItem = await findItemByPostId(article.postId);

        // 2e. Transform Engine data to Webflow format
        const webflowData = transformEngineToWebflow(article, {
          categoryId,
          tagIds,
        });

        // 2f. Create or update
        if (!existingItem) {
          // Create new article
          logWithTimestamp(`✓ Creating new article: ${article.postId}`);
          const createdItem = await createItem(WEBFLOW_COLLECTIONS.NEWS, {
            ...webflowData,
            isArchived: false,
            isDraft: false, // Auto-publish
          });

          // Publish immediately
          await publishItems(WEBFLOW_COLLECTIONS.NEWS, [createdItem.id]);
          summary.created.push(article.postId);
        } else if (needsUpdate(existingItem, article)) {
          // Update existing article
          logWithTimestamp(`✓ Updating article: ${article.postId}`);
          const updatedItem = await updateItem(
            WEBFLOW_COLLECTIONS.NEWS,
            existingItem.id,
            webflowData,
          );

          // Publish update
          await publishItems(WEBFLOW_COLLECTIONS.NEWS, [updatedItem.id]);
          summary.updated.push(article.postId);
        } else {
          // No update needed
          logWithTimestamp(
            `✓ Skipping article (no changes): ${article.postId}`,
          );
          summary.skipped.push(article.postId);
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
