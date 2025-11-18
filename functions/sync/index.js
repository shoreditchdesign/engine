import "dotenv/config";
import { getRecentPosts, getPostById } from "../../lib/api/engine.js";
import {
  findItemByPostId,
  preloadAllItems,
  createItem,
  updateItem,
  publishItems,
  createWebflowClient,
} from "../../lib/api/webflow.js";
import ReferenceManager from "../../lib/reference.js";
import {
  transformEngineToWebflow,
  needsUpdate,
  validateArticle,
} from "../../lib/transformer.js";
import { WEBFLOW_COLLECTIONS, SYNC_CONFIG } from "../../config/constants.js";
import { logWithTimestamp, categorizeError } from "../../lib/utils.js";

/**
 * Core sync logic - reusable by cron and manual triggers
 * @param {object} context - Azure Function context for logging
 * @param {number} recentCount - Number of recent posts to sync (default: 200)
 * @returns {Promise<object>} - Sync summary
 */
async function runSync(
  context,
  recentCount = SYNC_CONFIG.DEFAULT_RECENT_COUNT,
) {
  context.log(`\nStarting sync (${recentCount} recent posts)...\n`);

  const summary = {
    created: [],
    updated: [],
    skipped: [],
    errors: [],
    errorDetails: [],
    warnings: [],
  };

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
    context.log(`Loaded ${totalArticles} articles to sync\n`);

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
          context.log(
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

        // 3f. Ensure tags exist (batch operation)
        const tagIds = await refManager.ensureTagsExist(
          completeArticle.tags || [],
        );

        // 3g. Transform Engine data to Webflow format
        const webflowData = transformEngineToWebflow(completeArticle, {
          categoryId,
          tagIds,
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

            context.log(
              `✓ [${articleNum}/${totalArticles}] CREATED: "${completeArticle.title}" (ID: ${completeArticle.postId})`,
            );

            // Log individual create event to Application Insights
            if (context.log) {
              context.log({
                eventName: "ArticleCreated",
                properties: {
                  postId: completeArticle.postId,
                  title: completeArticle.title,
                  slug: completeArticle.slug,
                  category: completeArticle.cat,
                  tags: completeArticle.tags || [],
                  isFeatured: completeArticle.isFeatured || false,
                  isRecurring: completeArticle.isRecurring || false,
                },
              });
            }
          } catch (createError) {
            const errorInfo = categorizeError(createError);

            // Handle slug conflict errors
            if (
              createError.message.includes("slug") &&
              createError.message.includes(
                "Unique value is already in database",
              )
            ) {
              context.log.warn(
                `Slug conflict for article ${completeArticle.postId}, auto-resolving...`,
              );

              const webflowDataWithHash = transformEngineToWebflow(
                completeArticle,
                { categoryId, tagIds },
                true, // useHashedSlug = true
              );

              const createdItem = await createItem(WEBFLOW_COLLECTIONS.NEWS, {
                ...webflowDataWithHash,
                isArchived: false,
                isDraft: false,
              });

              await publishItems(WEBFLOW_COLLECTIONS.NEWS, [createdItem.id]);
              summary.created.push(completeArticle.postId);

              context.log(
                `[${articleNum}/${totalArticles}] CREATED (hashed slug): "${completeArticle.title}" (ID: ${completeArticle.postId})`,
              );

              // Log individual create event to Application Insights
              if (context.log) {
                context.log({
                  eventName: "ArticleCreated",
                  properties: {
                    postId: completeArticle.postId,
                    title: completeArticle.title,
                    slug: webflowDataWithHash.fieldData.slug,
                    category: completeArticle.cat,
                    tags: completeArticle.tags || [],
                    isFeatured: completeArticle.isFeatured || false,
                    isRecurring: completeArticle.isRecurring || false,
                    slugConflict: true,
                  },
                });
              }
            }
            // Handle image import errors - retry without images
            else if (errorInfo.isImageError) {
              context.log.warn(
                `Image import failed for article ${completeArticle.postId}, retrying without images...`,
              );

              const webflowDataWithoutImages = transformEngineToWebflow(
                completeArticle,
                { categoryId, tagIds },
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
              summary.warnings.push({
                postId: completeArticle.postId,
                title: completeArticle.title,
                warning: "Article created without images due to import error",
              });

              context.log(
                `[${articleNum}/${totalArticles}] CREATED (no images): "${completeArticle.title}" (ID: ${completeArticle.postId})`,
              );

              // Log individual create event to Application Insights
              if (context.log) {
                context.log({
                  eventName: "ArticleCreated",
                  properties: {
                    postId: completeArticle.postId,
                    title: completeArticle.title,
                    slug: completeArticle.slug,
                    category: completeArticle.cat,
                    tags: completeArticle.tags || [],
                    isFeatured: completeArticle.isFeatured || false,
                    isRecurring: completeArticle.isRecurring || false,
                    imageImportFailed: true,
                  },
                });
              }
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

            context.log(
              `↻ [${articleNum}/${totalArticles}] UPDATED: "${completeArticle.title}" (ID: ${completeArticle.postId})`,
            );

            // Log individual update event to Application Insights
            if (context.log) {
              context.log({
                eventName: "ArticleUpdated",
                properties: {
                  postId: completeArticle.postId,
                  title: completeArticle.title,
                  slug: completeArticle.slug,
                  category: completeArticle.cat,
                  tags: completeArticle.tags || [],
                  isFeatured: completeArticle.isFeatured || false,
                  isRecurring: completeArticle.isRecurring || false,
                },
              });
            }
          } catch (updateError) {
            const errorInfo = categorizeError(updateError);

            // Handle image import errors on updates - retry without images
            if (errorInfo.isImageError) {
              context.log.warn(
                `Image import failed for article ${completeArticle.postId}, retrying update without images...`,
              );

              const updateDataWithoutImages = transformEngineToWebflow(
                completeArticle,
                { categoryId, tagIds },
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

              context.log(
                `[${articleNum}/${totalArticles}] UPDATED (no images): "${completeArticle.title}" (ID: ${completeArticle.postId})`,
              );

              // Log individual update event to Application Insights
              if (context.log) {
                context.log({
                  eventName: "ArticleUpdated",
                  properties: {
                    postId: completeArticle.postId,
                    title: completeArticle.title,
                    slug: completeArticle.slug,
                    category: completeArticle.cat,
                    tags: completeArticle.tags || [],
                    isFeatured: completeArticle.isFeatured || false,
                    isRecurring: completeArticle.isRecurring || false,
                    imageImportFailed: true,
                  },
                });
              }
            } else {
              throw updateError; // Re-throw if it's not an image error
            }
          }
        }
      } catch (error) {
        summary.errors.push(article.postId);
        summary.errorDetails.push({
          postId: article.postId,
          title: article.title,
          error: error.message,
        });
        context.log.error(
          `✗ [${articleNum}/${totalArticles}] ERROR: "${article.title}" (ID: ${article.postId}) - ${error.message}`,
        );
      }

      // Log batch summary every 50 articles
      if (processedCount % 50 === 0) {
        const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
        const rate = (processedCount / elapsedSec).toFixed(2);
        context.log(
          `\nProgress: ${processedCount}/${totalArticles} | Rate: ${rate} articles/sec | Elapsed: ${elapsedSec}s\n`,
        );
      }
    }
  } catch (error) {
    context.log.error(`Sync failed: ${error.message}`);
    summary.errorDetails.push({ generalError: error.message });
    throw error;
  }

  // 4. Final summary
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const avgRate =
    processedCount > 0 ? (processedCount / totalTime).toFixed(2) : "0.00";

  // Log metrics to Application Insights
  if (context.log && context.log.metric) {
    context.log.metric("SyncTotalArticles", totalArticles);
    context.log.metric("SyncCreatedCount", summary.created.length);
    context.log.metric("SyncUpdatedCount", summary.updated.length);
    context.log.metric("SyncSkippedCount", summary.skipped.length);
    context.log.metric("SyncWarningCount", summary.warnings.length);
    context.log.metric("SyncErrorCount", summary.errors.length);
    context.log.metric("SyncDurationSeconds", parseFloat(totalTime));
    context.log.metric("SyncArticlesPerSecond", parseFloat(avgRate));
  }

  context.log(`\nSYNC COMPLETE`);
  context.log(
    `Total: ${totalArticles.toString().padEnd(4)} | Created: ${summary.created.length.toString().padEnd(4)} | Updated: ${summary.updated.length.toString().padEnd(4)} | Skipped: ${summary.skipped.length.toString().padEnd(4)} | Warnings: ${summary.warnings.length.toString().padEnd(4)} | Errors: ${summary.errors.length.toString().padEnd(4)} | Time: ${totalTime.padEnd(6)}s | Rate: ${avgRate.padEnd(5)}/s`,
  );
  context.log();

  // Log warnings if any
  if (summary.warnings.length > 0) {
    context.log(`Warnings (${summary.warnings.length}):`);
    summary.warnings.forEach((warn, idx) => {
      context.log(`  ${idx + 1}. ${warn.postId}: ${warn.warning}`);
    });
    context.log();
  }

  // Log errors if any
  if (summary.errors.length > 0) {
    context.log(`Failed articles (${summary.errors.length}):`);
    summary.errorDetails.forEach((err, idx) => {
      context.log(`  ${idx + 1}. ${err.postId}: ${err.error}`);
    });
    context.log();
  }

  return summary;
}

/**
 * Azure Function handler
 * Supports both timer trigger (automated) and HTTP trigger (manual)
 */
export default async function (context, req) {
  // Determine trigger type
  const isTimerTrigger = context.bindings.myTimer !== undefined;
  const triggerType = isTimerTrigger ? "Timer" : "HTTP";

  context.log(`Sync function triggered by ${triggerType}`);

  try {
    // Allow custom recent count from request body or query (for manual HTTP syncs)
    // Timer triggers will use default count
    const recentCount = isTimerTrigger
      ? SYNC_CONFIG.DEFAULT_RECENT_COUNT
      : req.body?.recent ||
        (req.query.recent ? parseInt(req.query.recent) : null) ||
        SYNC_CONFIG.DEFAULT_RECENT_COUNT;

    // Validate recent count
    if (
      typeof recentCount !== "number" ||
      recentCount < 1 ||
      recentCount > 1000
    ) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: {
          success: false,
          error: "Invalid recent count. Must be a number between 1 and 1000.",
        },
      };
      return;
    }

    // Run sync
    const summary = await runSync(context, recentCount);

    // Set HTTP response (for HTTP triggers)
    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: {
        success: true,
        ...summary,
        timestamp: new Date().toISOString(),
        recentCount,
        triggerType,
      },
    };
  } catch (error) {
    context.log.error(`Sync handler failed: ${error.message}`);
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
}
