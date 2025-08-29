import "dotenv/config";
import { getRecentPosts } from "../lib/engine-api.js";
import {
  getWebflowItemByEngineId,
  createWebflowItem,
  updateWebflowItem,
  transformEngineDataToWebflow,
  publishWebflowItems,
} from "../lib/webflow-api.js";
import { logWithTimestamp, validateEngineData } from "../lib/utils.js";

// This function contains the core sync logic to be reused by the webhook.
export async function runSync() {
  const collectionId = process.env.WEBFLOW_COLLECTION_ID;
  logWithTimestamp("Starting scheduled sync...");

  const summary = {
    created: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
    errorDetails: [],
  };

  try {
    // 1. Fetch recent articles from Engine API
    const engineData = await getRecentPosts(20);
    const articles = [
      ...engineData.featured,
      ...Object.values(engineData.recentNews).flat(),
    ];
    logWithTimestamp(`Fetched ${articles.length} recent articles from Engine.`);

    // 3. Process each Engine article
    for (const engineArticle of articles) {
      try {
        validateEngineData(engineArticle);

        const existingItem = await getWebflowItemByEngineId(
          collectionId,
          engineArticle.postId,
        );
        const webflowData = transformEngineDataToWebflow(engineArticle);

        if (existingItem) {
          // 4a. Update existing item
          logWithTimestamp(
            `Updating item for Engine post ID: ${engineArticle.postId}`,
          );
          const updatedItem = await updateWebflowItem(
            collectionId,
            existingItem.id,
            webflowData,
          );
          await publishWebflowItems(collectionId, [updatedItem.id]);
          summary.updated++;
        } else {
          // 4b. Create new item
          logWithTimestamp(
            `Creating new item for Engine post ID: ${engineArticle.postId}`,
          );
          const createdItem = await createWebflowItem(
            collectionId,
            webflowData,
          );
          await publishWebflowItems(collectionId, [createdItem.id]);
          summary.created++;
        }
      } catch (error) {
        summary.errors++;
        summary.errorDetails.push({
          postId: engineArticle.postId,
          error: error.message,
        });
        logWithTimestamp(
          `Error processing post ID ${engineArticle.postId}: ${error.message}`,
          "error",
        );
      }
    }
  } catch (error) {
    logWithTimestamp(`Catastrophic sync failure: ${error.message}`, "error");
    // In a real-world scenario, an email alert would be sent here.
    summary.errors++;
    summary.errorDetails.push({ generalError: error.message });
    throw new Error(`Sync failed: ${error.message}`);
  }

  logWithTimestamp(
    `Sync finished. Created: ${summary.created}, Updated: ${summary.updated}, Errors: ${summary.errors}`,
  );
  return summary;
}

export default async function handler(req, res) {
  try {
    const summary = await runSync();
    return res.status(200).json({
      success: true,
      ...summary,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Log error and potentially send an email alert
    logWithTimestamp(`Sync handler failed: ${error.message}`, "error");
    return res.status(500).json({ success: false, error: error.message });
  }
}
