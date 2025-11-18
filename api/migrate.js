import "dotenv/config";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {
  findItemByPostId,
  createItem,
  updateItem,
  publishItems,
  createWebflowClient,
  preloadAllItems,
} from "../lib/api/webflow.js";
import ReferenceManager from "../lib/reference.js";
import {
  transformEngineToWebflow,
  needsUpdate,
  validateArticle,
} from "../lib/transformer.js";
import { WEBFLOW_COLLECTIONS } from "../config/constants.js";
import { logWithTimestamp } from "../lib/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load migration articles from migrate/export.json file
 * @returns {Promise<Array>} Array of migration articles
 */
async function loadMigrationArticles() {
  const migrateDir = join(__dirname, "..", "migrate");
  const exportFilePath = join(migrateDir, "export.json");

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
 * Includes real-time CLI progress logging for each article
 * @param {object} options - Migration options
 * @param {number} options.delayMs - Delay between articles in milliseconds (default: 1000)
 * @param {number} options.batchSize - Number of articles to process before logging summary (default: 50)
 * @param {boolean} options.createOnly - If true, skip all existing articles without updating (default: false)
 * @returns {Promise<object>} - Sync summary
 */
export async function runMigration(options = {}) {
  const { delayMs = 1000, batchSize = 50, createOnly = false } = options;

  console.log(`\nStarting migration (migrate/export.json)...`);
  console.log(`Delay between articles: ${delayMs}ms`);
  console.log(
    `Mode: ${createOnly ? "CREATE ONLY (skip existing)" : "CREATE + UPDATE"}`,
  );
  console.log();

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

    // 1. Preload all existing Webflow items into memory (one-time cost)
    const existingItemsMap = await preloadAllItems();

    // 2. Load migration articles from export.json
    const engineArticles = await loadMigrationArticles();

    if (!engineArticles || !Array.isArray(engineArticles)) {
      throw new Error("Failed to load migration articles - expected array");
    }

    const totalArticles = engineArticles.length;
    console.log(`Loaded ${totalArticles} articles to migrate\n`);

    // 2. Process each article
    for (let i = 0; i < engineArticles.length; i++) {
      const article = engineArticles[i];
      const articleNum = i + 1;
      processedCount++;

      try {
        // 2a. Validate article data
        validateArticle(article);

        // 2b. Check if article exists in Webflow (using preloaded map - 0 API calls)
        const existingItem =
          existingItemsMap.get(String(article.postId)) || null;

        // 2c. Check if update is needed (skip early in create-only mode or if no changes)
        if (createOnly && existingItem) {
          // Create-only mode: skip all existing articles
          summary.skipped.push(article.postId);
          console.log(
            `○ [${articleNum}/${totalArticles}] SKIPPED: "${article.title}" (ID: ${article.postId}) - already exists`,
          );
          continue;
        } else if (existingItem && !needsUpdate(existingItem, article)) {
          // No update needed
          summary.skipped.push(article.postId);
          console.log(
            `○ [${articleNum}/${totalArticles}] SKIPPED: "${article.title}" (ID: ${article.postId}) - no changes`,
          );
          continue;
        }

        // 2d. Article needs creation or update - ensure category and tags exist
        const categoryId = await refManager.ensureCategoryExists(
          article.cat,
          article.color,
        );

        // 2e. Ensure tags exist (batch operation)
        const tagIds = await refManager.ensureTagsExist(article.tags || []);

        // 2f. Transform Engine data to Webflow format
        const webflowData = transformEngineToWebflow(article, {
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
            summary.created.push(article.postId);

            // Real-time success message
            console.log(
              `✓ [${articleNum}/${totalArticles}] CREATED: "${article.title}" (ID: ${article.postId})`,
            );
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
                `[${articleNum}/${totalArticles}] Slug conflict for "${article.title}", auto-resolving...`,
                "warn",
              );

              const webflowDataWithHash = transformEngineToWebflow(
                article,
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
              summary.created.push(article.postId);

              console.log(
                `[${articleNum}/${totalArticles}] CREATED (with hash): "${article.title}" (ID: ${article.postId})`,
              );
            } else {
              throw createError; // Re-throw if it's not a slug conflict
            }
          }
        } else {
          // Update existing article
          const updateData = transformEngineToWebflow(
            article,
            { categoryId, tagIds },
            false,
            true, // excludeSlug = true
          );

          const updatedItem = await updateItem(
            WEBFLOW_COLLECTIONS.NEWS,
            existingItem.id,
            updateData,
          );

          // Publish update
          await publishItems(WEBFLOW_COLLECTIONS.NEWS, [updatedItem.id]);
          summary.updated.push(article.postId);

          console.log(
            `↻ [${articleNum}/${totalArticles}] UPDATED: "${article.title}" (ID: ${article.postId})`,
          );
        }

        // Log batch summary
        if (processedCount % batchSize === 0) {
          const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
          const rate = (processedCount / elapsedSec).toFixed(2);
          console.log(
            `\nProgress: ${processedCount}/${totalArticles} | Rate: ${rate} articles/sec | Elapsed: ${elapsedSec}s\n`,
          );
        }

        // Add delay to respect API rate limits
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
        console.log(
          `✗ [${articleNum}/${totalArticles}] ERROR: "${article.title}" (ID: ${article.postId}) - ${error.message}`,
        );
      }
    }
  } catch (error) {
    logWithTimestamp(`Migration failed: ${error.message}`, "error");
    summary.errorDetails.push({ generalError: error.message });
    throw error;
  }

  // 3. Final summary
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const avgRate = (processedCount / totalTime).toFixed(2);

  console.log(`\nMIGRATION COMPLETE`);
  console.log(
    `Total: ${processedCount.toString().padEnd(4)} | Created: ${summary.created.length.toString().padEnd(4)} | Updated: ${summary.updated.length.toString().padEnd(4)} | Skipped: ${summary.skipped.length.toString().padEnd(4)} | Errors: ${summary.errors.length.toString().padEnd(4)} | Time: ${totalTime.padEnd(6)}s | Rate: ${avgRate.padEnd(5)}/s`,
  );
  console.log();

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
    // Get options from query params
    const delayMs = parseInt(req.query.delay) || 500;
    const batchSize = parseInt(req.query.batchSize) || 50;

    // Run migration
    const summary = await runMigration({ delayMs, batchSize });

    return res.status(200).json({
      success: true,
      ...summary,
      timestamp: new Date().toISOString(),
      mode: "migration",
    });
  } catch (error) {
    logWithTimestamp(`Migration handler failed: ${error.message}`, "error");
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      mode: "migration",
    });
  }
}

/**
 * CLI execution handler
 * Run with: npm run migrate
 * Options:
 *   --delay=1000          Delay between articles in ms
 *   --batch-size=50       Number of articles before logging summary
 *   --create-only         Skip all existing articles without updating
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  // Parse CLI arguments
  const args = process.argv.slice(2);
  const options = {};

  // Parse --delay=500, --batch-size=50, --create-only
  args.forEach((arg) => {
    if (arg.startsWith("--delay=")) {
      options.delayMs = parseInt(arg.split("=")[1]);
    } else if (arg.startsWith("--batch-size=")) {
      options.batchSize = parseInt(arg.split("=")[1]);
    } else if (arg === "--create-only") {
      options.createOnly = true;
    }
  });

  runMigration(options)
    .then((summary) => {
      process.exit(summary.errors.length > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error(`Fatal error: ${error.message}`);
      process.exit(1);
    });
}
