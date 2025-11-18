import "dotenv/config";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  createItem,
  updateItem,
  publishItems,
  createWebflowClient,
  preloadAllItems,
} from "../../lib/api/webflow.js";
import ReferenceManager from "../../lib/reference.js";
import {
  transformEngineToWebflow,
  needsUpdate,
  validateArticle,
} from "../../lib/transformer.js";
import { WEBFLOW_COLLECTIONS } from "../../config/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load migration articles from migrate/export.json file
 * @returns {Promise<Array>} Array of migration articles
 */
async function loadMigrationArticles() {
  const migrateDir = path.join(__dirname, "..", "..", "migrate");
  const exportFilePath = path.join(migrateDir, "export.json");

  try {
    const content = await fs.readFile(exportFilePath, "utf-8");
    const articles = JSON.parse(content);

    if (!Array.isArray(articles)) {
      throw new Error("export.json must contain an array of articles");
    }

    return articles;
  } catch (error) {
    throw error;
  }
}

/**
 * Add delay between operations to respect API rate limits
 * @param {number} ms - Milliseconds to delay
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Migration sync logic - uses migrate/export.json for large-scale migrations
 * @param {object} context - Azure Function context for logging
 * @param {object} options - Migration options
 * @returns {Promise<object>} - Sync summary
 */
async function runMigration(context, options = {}) {
  const { delayMs = 500, batchSize = 50, createOnly = false } = options;

  context.log(`Starting migration (migrate/export.json)...`);
  context.log(`Delay between articles: ${delayMs}ms`);
  context.log(`Mode: ${createOnly ? "CREATE ONLY" : "CREATE + UPDATE"}`);

  const summary = {
    created: [],
    updated: [],
    skipped: [],
    errors: [],
    errorDetails: [],
  };

  let processedCount = 0;
  let startTime = Date.now();

  try {
    // Initialize reference manager
    const webflowClient = createWebflowClient();
    const refManager = new ReferenceManager(webflowClient);

    // 1. Preload all existing Webflow items into memory
    const existingItemsMap = await preloadAllItems();

    // 2. Load migration articles from export.json
    const engineArticles = await loadMigrationArticles();

    if (!engineArticles || !Array.isArray(engineArticles)) {
      throw new Error("Failed to load migration articles - expected array");
    }

    const totalArticles = engineArticles.length;
    context.log(`Loaded ${totalArticles} articles to migrate`);

    // Process each article
    for (let i = 0; i < engineArticles.length; i++) {
      const article = engineArticles[i];
      const articleNum = i + 1;
      processedCount++;

      try {
        validateArticle(article);

        const categoryId = await refManager.ensureCategoryExists(
          article.cat,
          article.color,
        );

        const tagIds = await refManager.ensureTagsExist(article.tags || []);

        const existingItem =
          existingItemsMap.get(String(article.postId)) || null;

        const webflowData = transformEngineToWebflow(article, {
          categoryId,
          tagIds,
        });

        if (!existingItem) {
          try {
            const createdItem = await createItem(WEBFLOW_COLLECTIONS.NEWS, {
              ...webflowData,
              isArchived: false,
              isDraft: false,
            });

            await publishItems(WEBFLOW_COLLECTIONS.NEWS, [createdItem.id]);
            summary.created.push(article.postId);

            context.log(
              `✓ [${articleNum}/${totalArticles}] CREATED: "${article.title}" (ID: ${article.postId})`,
            );
          } catch (createError) {
            if (
              createError.message.includes("slug") &&
              createError.message.includes(
                "Unique value is already in database",
              )
            ) {
              const webflowDataWithHash = transformEngineToWebflow(
                article,
                { categoryId, tagIds },
                true,
              );

              const createdItem = await createItem(WEBFLOW_COLLECTIONS.NEWS, {
                ...webflowDataWithHash,
                isArchived: false,
                isDraft: false,
              });

              await publishItems(WEBFLOW_COLLECTIONS.NEWS, [createdItem.id]);
              summary.created.push(article.postId);

              context.log(
                `[${articleNum}/${totalArticles}] CREATED (hashed slug): "${article.title}"`,
              );
            } else {
              throw createError;
            }
          }
        } else if (createOnly) {
          summary.skipped.push(article.postId);
          context.log(
            `○ [${articleNum}/${totalArticles}] SKIPPED: "${article.title}" - already exists`,
          );
        } else if (needsUpdate(existingItem, article)) {
          const updateData = transformEngineToWebflow(
            article,
            { categoryId, tagIds },
            false,
            true,
          );

          const updatedItem = await updateItem(
            WEBFLOW_COLLECTIONS.NEWS,
            existingItem.id,
            updateData,
          );

          await publishItems(WEBFLOW_COLLECTIONS.NEWS, [updatedItem.id]);
          summary.updated.push(article.postId);

          context.log(
            `↻ [${articleNum}/${totalArticles}] UPDATED: "${article.title}"`,
          );
        } else {
          summary.skipped.push(article.postId);
          context.log(
            `○ [${articleNum}/${totalArticles}] SKIPPED: "${article.title}" - no changes`,
          );
        }

        if (processedCount % batchSize === 0) {
          const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
          const rate = (processedCount / elapsedSec).toFixed(2);
          context.log(
            `Progress: ${processedCount}/${totalArticles} | Rate: ${rate} articles/sec`,
          );
        }

        if (delayMs > 0 && articleNum < totalArticles) {
          await delay(delayMs);
        }
      } catch (error) {
        summary.errors.push(article.postId);
        summary.errorDetails.push({
          postId: article.postId,
          title: article.title,
          error: error.message,
        });
        context.log.error(
          `✗ [${articleNum}/${totalArticles}] ERROR: "${article.title}" - ${error.message}`,
        );
      }
    }
  } catch (error) {
    context.log.error(`Migration failed: ${error.message}`);
    summary.errorDetails.push({ generalError: error.message });
    throw error;
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const avgRate = (processedCount / totalTime).toFixed(2);

  context.log(`\nMIGRATION COMPLETE`);
  context.log(
    `Total: ${processedCount.toString().padEnd(4)} | Created: ${summary.created.length.toString().padEnd(4)} | Updated: ${summary.updated.length.toString().padEnd(4)} | Skipped: ${summary.skipped.length.toString().padEnd(4)} | Errors: ${summary.errors.length.toString().padEnd(4)} | Time: ${totalTime.padEnd(6)}s | Rate: ${avgRate.padEnd(5)}/s`,
  );
  context.log();

  if (summary.errors.length > 0) {
    context.log(`Failed articles (${summary.errors.length}):`);
    summary.errorDetails.forEach((err, idx) => {
      context.log(`  ${idx + 1}. ${err.postId} - ${err.title}: ${err.error}`);
    });
    context.log();
  }

  return summary;
}

/**
 * Azure Function handler
 */
export default async function (context, req) {
  context.log("Migration function triggered");

  try {
    const delayMs = parseInt(req.query.delay) || 500;
    const batchSize = parseInt(req.query.batchSize) || 50;
    const createOnly = req.query.createOnly === "true";

    const summary = await runMigration(context, {
      delayMs,
      batchSize,
      createOnly,
    });

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: {
        success: true,
        ...summary,
        timestamp: new Date().toISOString(),
        mode: "migration",
      },
    };
  } catch (error) {
    context.log.error(`Migration handler failed: ${error.message}`);
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
        mode: "migration",
      },
    };
  }
}
