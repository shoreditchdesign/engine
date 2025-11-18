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

  try {
    const content = await fs.readFile(testFilePath, "utf-8");
    const articles = JSON.parse(content);

    if (!Array.isArray(articles)) {
      throw new Error("test.json must contain an array of articles");
    }

    return articles;
  } catch (error) {
    throw error;
  }
}

/**
 * Test sync logic - uses local JSON files instead of Engine API
 * @returns {Promise<object>} - Sync summary
 */
export async function runTestSync() {
  console.log(`Starting test sync (local JSON)...`);

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

    // 2. Process each article
    for (const article of engineArticles) {
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
                `Slug conflict for article ${article.postId}, auto-resolving...`,
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
            } else {
              throw createError; // Re-throw if it's not a slug conflict
            }
          }
        } else if (needsUpdate(existingItem, article)) {
          // Update existing article

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
          `Error syncing article ${article.postId}: ${error.message}`,
          "error",
        );
      }
    }
  } catch (error) {
    logWithTimestamp(`Test sync failed: ${error.message}`, "error");
    summary.errorDetails.push({ generalError: error.message });
    throw error;
  }

  // 4. Final summary
  if (summary.errors.length === 0) {
    console.log(
      `Test complete: Created ${summary.created.length} | Updated ${summary.updated.length} | Skipped ${summary.skipped.length} | Errors 0`,
    );
  } else {
    console.log(
      `Test complete: Created ${summary.created.length} | Updated ${summary.updated.length} | Skipped ${summary.skipped.length} | Errors ${summary.errors.length}`,
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
  runTestSync()
    .then((summary) => {
      process.exit(summary.errors.length > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error(`Fatal error: ${error.message}`);
      process.exit(1);
    });
}
