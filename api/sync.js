import "dotenv/config";
import { getRecentPosts, getPostById } from "../lib/api/engine.js";
import {
  findItemByPostId,
  preloadAllItems,
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
import { logWithTimestamp, categorizeError, delay } from "../lib/utils.js";

/**
 * Core sync logic - reusable by cron and manual triggers
 * @param {number} recentCount - Number of recent posts to sync (default: 20)
 * @returns {Promise<object>} - Sync summary
 */
export async function runSync(recentCount = SYNC_CONFIG.DEFAULT_RECENT_COUNT) {
  console.log(`\nStarting sync (${recentCount} recent posts)...\n`);

  const summary = {
    created: [],
    updated: [],
    skipped: [],
    errors: [],
    errorDetails: [],
    warnings: [],
  };

  // Track Webflow item IDs for batch republish failsafe
  const createdItemIds = [];

  let processedCount = 0;
  let startTime = Date.now();

  try {
    // Initialize reference manager
    const webflowClient = createWebflowClient();
    const refManager = new ReferenceManager(webflowClient);

    // 1. Preload all existing Webflow items for O(1) lookups (reduces ~18K API calls to ~90)
    const webflowItemsMap = await preloadAllItems();

    // 2. Fetch recent articles from Engine API v2
    const engineArticles = await getRecentPosts(recentCount);

    if (!engineArticles || !Array.isArray(engineArticles)) {
      throw new Error(
        "Invalid response from Engine API - expected array of articles",
      );
    }

    const totalArticles = engineArticles.length;
    console.log(`Loaded ${totalArticles} articles to sync\n`);

    // 3. Process each article
    for (let i = 0; i < engineArticles.length; i++) {
      const article = engineArticles[i];
      const articleNum = i + 1;
      processedCount++;

      try {
        // 3a. Validate article data
        validateArticle(article);

        // 3b. Check if article exists in Webflow using preloaded map (O(1) lookup)
        const existingItem = webflowItemsMap.get(String(article.postId));

        // 3c. Check if update is needed (skip early if no changes)
        if (existingItem && !needsUpdate(existingItem, article)) {
          // No update needed - skip without any API calls
          summary.skipped.push(article.postId);

          console.log(
            `○ [${articleNum}/${totalArticles}] SKIPPED: "${article.title}" (ID: ${article.postId}) - no changes`,
          );
          continue; // Move to next article
        }

        // 3d. Article needs creation or update - fetch full content and references
        const fullArticle = await getPostById(article.postId);

        // Merge article data carefully - keep updatedDate from getRecentPosts as getPostById doesn't include it
        const completeArticle = {
          ...article, // Keep all fields from getRecentPosts (includes updatedDate)
          content: fullArticle.content, // Add content field from getPostById
        };

        // 3e. Ensure category exists (creates if needed)
        const categoryId = await refManager.ensureCategoryExists(
          completeArticle.cat,
          completeArticle.color,
        );

        // 3f. Transform Engine data to Webflow format
        const webflowData = transformEngineToWebflow(completeArticle, {
          categoryId,
        });

        // 3h. Create or update
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
            createdItemIds.push(createdItem.id);

            console.log(
              `✓ [${articleNum}/${totalArticles}] CREATED: "${completeArticle.title}" (ID: ${completeArticle.postId})`,
            );

            // Delay to prevent rate limiting
            await delay(1000);
          } catch (createError) {
            const errorInfo = categorizeError(createError);

            // Handle slug conflict errors
            if (
              createError.message.includes("slug") &&
              createError.message.includes(
                "Unique value is already in database",
              )
            ) {
              logWithTimestamp(
                `[${articleNum}/${totalArticles}] Slug conflict for "${completeArticle.title}", auto-resolving...`,
                "warn",
              );

              const webflowDataWithHash = transformEngineToWebflow(
                completeArticle,
                { categoryId },
                true, // useHashedSlug = true
              );

              const createdItem = await createItem(WEBFLOW_COLLECTIONS.NEWS, {
                ...webflowDataWithHash,
                isArchived: false,
                isDraft: false,
              });

              await publishItems(WEBFLOW_COLLECTIONS.NEWS, [createdItem.id]);
              summary.created.push(completeArticle.postId);
              createdItemIds.push(createdItem.id);

              console.log(
                `[${articleNum}/${totalArticles}] CREATED (with hash): "${completeArticle.title}" (ID: ${completeArticle.postId})`,
              );

              // Delay to prevent rate limiting
              await delay(1000);
            }
            // Handle image import errors - retry without images
            else if (errorInfo.isImageError) {
              logWithTimestamp(
                `[${articleNum}/${totalArticles}] Image import failed for "${completeArticle.title}", retrying without images...`,
                "warn",
              );

              const webflowDataWithoutImages = transformEngineToWebflow(
                completeArticle,
                { categoryId },
                false, // useHashedSlug = false
                false, // excludeSlug = false
                true, // excludeImages = true
              );

              const createdItem = await createItem(WEBFLOW_COLLECTIONS.NEWS, {
                ...webflowDataWithoutImages,
                isArchived: false,
                isDraft: false,
              });

              await publishItems(WEBFLOW_COLLECTIONS.NEWS, [createdItem.id]);
              summary.created.push(completeArticle.postId);
              createdItemIds.push(createdItem.id);
              summary.warnings.push({
                postId: completeArticle.postId,
                title: completeArticle.title,
                warning: "Article created without images due to import error",
              });

              console.log(
                `[${articleNum}/${totalArticles}] CREATED (no images): "${completeArticle.title}" (ID: ${completeArticle.postId})`,
              );

              // Delay to prevent rate limiting
              await delay(1000);
            } else {
              throw createError; // Re-throw if it's not a handled error
            }
          }
        } else if (needsUpdate(existingItem, completeArticle)) {
          // Update existing article
          try {
            // Generate update data WITHOUT slug to avoid Webflow conflicts
            const updateData = transformEngineToWebflow(
              completeArticle,
              { categoryId },
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

            console.log(
              `↻ [${articleNum}/${totalArticles}] UPDATED: "${completeArticle.title}" (ID: ${completeArticle.postId})`,
            );

            // Delay to prevent rate limiting
            await delay(1000);
          } catch (updateError) {
            const errorInfo = categorizeError(updateError);

            // Handle image import errors on updates - retry without images
            if (errorInfo.isImageError) {
              logWithTimestamp(
                `[${articleNum}/${totalArticles}] Image import failed for "${completeArticle.title}", retrying update without images...`,
                "warn",
              );

              const updateDataWithoutImages = transformEngineToWebflow(
                completeArticle,
                { categoryId },
                false, // useHashedSlug = false
                true, // excludeSlug = true
                true, // excludeImages = true
              );

              const updatedItem = await updateItem(
                WEBFLOW_COLLECTIONS.NEWS,
                existingItem.id,
                updateDataWithoutImages,
              );

              await publishItems(WEBFLOW_COLLECTIONS.NEWS, [updatedItem.id]);
              summary.updated.push(completeArticle.postId);
              summary.warnings.push({
                postId: completeArticle.postId,
                title: completeArticle.title,
                warning: "Article updated without images due to import error",
              });

              console.log(
                `[${articleNum}/${totalArticles}] UPDATED (no images): "${completeArticle.title}" (ID: ${completeArticle.postId})`,
              );

              // Delay to prevent rate limiting
              await delay(1000);
            } else {
              throw updateError; // Re-throw if it's not an image error
            }
          }
        }

        // Log batch summary every 50 articles
        if (processedCount % 50 === 0) {
          const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
          const rate = (processedCount / elapsedSec).toFixed(2);
          console.log(
            `\nProgress: ${processedCount}/${totalArticles} | Rate: ${rate} articles/sec | Elapsed: ${elapsedSec}s\n`,
          );
        }
      } catch (error) {
        summary.errors.push(article.postId);
        summary.errorDetails.push({
          postId: article.postId,
          title: article.title,
          error: error.message,
        });

        console.log(
          `✗ [${articleNum}/${totalArticles}] ERROR: "${article.title}" (ID: ${article.postId}) - ${error.message}`,
        );
      }
    }
  } catch (error) {
    logWithTimestamp(`Sync failed: ${error.message}`, "error");
    summary.errorDetails.push({ generalError: error.message });
    throw error;
  }

  // 4. Batch republish failsafe for all created items
  if (createdItemIds.length > 0) {
    try {
      console.log(
        `\nRepublishing ${createdItemIds.length} created items as failsafe...`,
      );
      await publishItems(WEBFLOW_COLLECTIONS.NEWS, createdItemIds);
      console.log(`✓ Batch republish completed\n`);
    } catch (republishError) {
      logWithTimestamp(
        `Warning: Batch republish failed - ${republishError.message}`,
        "warn",
      );
      // Don't throw - this is a failsafe, not critical
    }
  }

  // 5. Final summary
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const avgRate =
    processedCount > 0 ? (processedCount / totalTime).toFixed(2) : "0.00";

  console.log(`\nSYNC COMPLETE`);
  console.log(
    `Total: ${processedCount.toString().padEnd(4)} | Created: ${summary.created.length.toString().padEnd(4)} | Updated: ${summary.updated.length.toString().padEnd(4)} | Skipped: ${summary.skipped.length.toString().padEnd(4)} | Warnings: ${summary.warnings.length.toString().padEnd(4)} | Errors: ${summary.errors.length.toString().padEnd(4)} | Time: ${totalTime.padEnd(6)}s | Rate: ${avgRate.padEnd(5)}/s`,
  );
  console.log();

  // Log warnings if any
  if (summary.warnings.length > 0) {
    console.log(`Warnings (${summary.warnings.length}):`);
    summary.warnings.forEach((warn, idx) => {
      console.log(
        `  ${idx + 1}. ${warn.postId} - ${warn.title}: ${warn.warning}`,
      );
    });
    console.log();
  }

  // Log errors if any
  if (summary.errors.length > 0) {
    console.log(`Failed articles (${summary.errors.length}):`);
    summary.errorDetails.forEach((err, idx) => {
      console.log(`  ${idx + 1}. ${err.postId} - ${err.title}: ${err.error}`);
    });
    console.log();
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
      console.error(`Fatal error: ${error.message}`);
      process.exit(1);
    });
}
