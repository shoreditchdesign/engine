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
 * Load test articles from local test.json file
 * @returns {Promise<Array>} Array of test articles
 */
async function loadTestArticles() {
  const localDir = join(__dirname, "..", "local");
  const testFilePath = join(localDir, "test.json");
  logWithTimestamp(`Loading test articles from: ${testFilePath}`);

  try {
    const content = await fs.readFile(testFilePath, "utf-8");
    const articles = JSON.parse(content);

    if (!Array.isArray(articles)) {
      throw new Error("test.json must contain an array of articles");
    }

    logWithTimestamp(`Loaded ${articles.length} test articles`);
    articles.forEach((article) => {
      logWithTimestamp(`  ✓ Article: ${article.postId} - "${article.title}"`);
    });

    return articles;
  } catch (error) {
    logWithTimestamp(`Error loading test articles: ${error.message}`, "error");
    throw error;
  }
}

/**
 * Test sync logic - uses local JSON files instead of Engine API
 * @returns {Promise<object>} - Sync summary
 */
export async function runTestSync() {
  logWithTimestamp(`Starting TEST sync using local JSON files...`);

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

    // 1. Load test articles from local JSON files
    const engineArticles = await loadTestArticles();

    if (!engineArticles || !Array.isArray(engineArticles)) {
      throw new Error("Failed to load test articles - expected array");
    }

    logWithTimestamp(`Loaded ${engineArticles.length} test articles`);

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

          try {
            const createdItem = await createItem(WEBFLOW_COLLECTIONS.NEWS, {
              ...webflowData,
              isArchived: false,
              isDraft: false, // Auto-publish
            });

            // Publish immediately
            await publishItems(WEBFLOW_COLLECTIONS.NEWS, [createdItem.id]);
            summary.created.push(article.postId);
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
              logWithTimestamp(
                `  ✓ Created with modified slug: ${webflowDataWithHash.fieldData.slug}`,
              );
            } else {
              throw createError; // Re-throw if it's not a slug conflict
            }
          }
        } else if (needsUpdate(existingItem, article)) {
          // Update existing article
          logWithTimestamp(`✓ Updating article: ${article.postId}`);

          // Generate update data WITHOUT slug to avoid Webflow conflicts
          const updateData = transformEngineToWebflow(
            article,
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
    logWithTimestamp(
      `Catastrophic test sync failure: ${error.message}`,
      "error",
    );
    summary.errorDetails.push({ generalError: error.message });
    throw error;
  }

  // 4. Final summary
  logWithTimestamp(
    `Test sync complete - Created: ${summary.created.length}, Updated: ${summary.updated.length}, Skipped: ${summary.skipped.length}, Errors: ${summary.errors.length}`,
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
    // Run test sync
    const summary = await runTestSync();

    return res.status(200).json({
      success: true,
      ...summary,
      timestamp: new Date().toISOString(),
      mode: "test",
    });
  } catch (error) {
    logWithTimestamp(`Test sync handler failed: ${error.message}`, "error");
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      mode: "test",
    });
  }
}

/**
 * CLI execution handler
 * Run with: npm test
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  logWithTimestamp(`=== Test Sync CLI Mode ===`);
  logWithTimestamp(`Using local test.json from /local directory`);

  runTestSync()
    .then((summary) => {
      logWithTimestamp(`\n=== Test Sync Summary ===`);
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
