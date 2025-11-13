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
 * @param {number} options.delayMs - Delay between articles in milliseconds (default: 500)
 * @param {number} options.batchSize - Number of articles to process before logging summary (default: 50)
 * @returns {Promise<object>} - Sync summary
 */
export async function runMigration(options = {}) {
  const { delayMs = 500, batchSize = 50 } = options;

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Starting migration (migrate/export.json)...`);
  console.log(`Delay between articles: ${delayMs}ms`);
  console.log(`${"=".repeat(60)}\n`);

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

    // 1. Load migration articles from export.json
    const engineArticles = await loadMigrationArticles();

    if (!engineArticles || !Array.isArray(engineArticles)) {
      throw new Error("Failed to load migration articles - expected array");
    }

    const totalArticles = engineArticles.length;
    console.log(`📦 Loaded ${totalArticles} articles to migrate\n`);

    // 2. Process each article
    for (let i = 0; i < engineArticles.length; i++) {
      const article = engineArticles[i];
      const articleNum = i + 1;
      processedCount++;

      try {
        // 2a. Validate article data
        validateArticle(article);

        // 2b. Ensure category exists (creates if needed)
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
                `⚠ [${articleNum}/${totalArticles}] Slug conflict for "${article.title}", auto-resolving...`,
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
                `✓ [${articleNum}/${totalArticles}] CREATED (with hash): "${article.title}" (ID: ${article.postId})`,
              );
            } else {
              throw createError; // Re-throw if it's not a slug conflict
            }
          }
        } else if (needsUpdate(existingItem, article)) {
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
        } else {
          // No update needed
          summary.skipped.push(article.postId);
          console.log(
            `○ [${articleNum}/${totalArticles}] SKIPPED: "${article.title}" (ID: ${article.postId}) - no changes`,
          );
        }

        // Log batch summary
        if (processedCount % batchSize === 0) {
          const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
          const rate = (processedCount / elapsedSec).toFixed(2);
          console.log(
            `\n📊 Progress: ${processedCount}/${totalArticles} | Rate: ${rate} articles/sec | Elapsed: ${elapsedSec}s\n`,
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
    logWithTimestamp(`✗ Migration failed: ${error.message}`, "error");
    summary.errorDetails.push({ generalError: error.message });
    throw error;
  }

  // 3. Final summary
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const avgRate = (processedCount / totalTime).toFixed(2);

  console.log(`\n${"=".repeat(60)}`);
  console.log(`MIGRATION COMPLETE`);
  console.log(`${"=".repeat(60)}`);
  console.log(`Total processed: ${processedCount}`);
  console.log(`Created: ${summary.created.length}`);
  console.log(`Updated: ${summary.updated.length}`);
  console.log(`Skipped: ${summary.skipped.length}`);
  console.log(`Errors: ${summary.errors.length}`);
  console.log(`Total time: ${totalTime}s`);
  console.log(`Average rate: ${avgRate} articles/sec`);
  console.log(`${"=".repeat(60)}\n`);

  if (summary.errors.length > 0) {
    console.log(`\n⚠ Failed articles (${summary.errors.length}):`);
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
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  // Parse CLI arguments
  const args = process.argv.slice(2);
  const options = {};

  // Parse --delay=500 and --batch-size=50
  args.forEach((arg) => {
    if (arg.startsWith("--delay=")) {
      options.delayMs = parseInt(arg.split("=")[1]);
    } else if (arg.startsWith("--batch-size=")) {
      options.batchSize = parseInt(arg.split("=")[1]);
    }
  });

  runMigration(options)
    .then((summary) => {
      process.exit(summary.errors.length > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error(`✗ Fatal error: ${error.message}`);
      process.exit(1);
    });
}
