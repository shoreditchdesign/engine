import "dotenv/config";
import {
  getAllCategories,
  getPostsByCategory,
  getPostById,
} from "../lib/engine-api.js";
import {
  getWebflowItemByEngineId,
  createWebflowItem,
  updateWebflowItem,
  transformEngineDataToWebflow,
  publishWebflowItems,
} from "../lib/webflow-api.js";
import { logWithTimestamp, validateEngineData } from "../lib/utils.js";

async function syncArticle(article) {
  const collectionId = process.env.WEBFLOW_COLLECTION_ID;
  validateEngineData(article);

  const webflowData = transformEngineDataToWebflow(article);
  const existingItem = await getWebflowItemByEngineId(
    collectionId,
    article.postId,
  );

  if (existingItem) {
    logWithTimestamp(`Updating item for Engine post ID: ${article.postId}`);
    const updatedItem = await updateWebflowItem(
      collectionId,
      existingItem.id,
      webflowData,
    );
    await publishWebflowItems(collectionId, [updatedItem.id]);
    return { status: "updated", postId: article.postId };
  } else {
    logWithTimestamp(`Creating new item for Engine post ID: ${article.postId}`);
    const createdItem = await createWebflowItem(collectionId, webflowData);
    await publishWebflowItems(collectionId, [createdItem.id]);
    return { status: "created", postId: article.postId };
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  const { action, postId } = req.body;

  try {
    switch (action) {
      case "full-sync":
        // Note: This can be a very long-running process and may time out
        // on serverless functions depending on the plan (e.g., Vercel Hobby).
        logWithTimestamp("Starting full sync...");
        const categories = await getAllCategories();
        let allPosts = [];
        for (const category of categories) {
          let page = 1;
          while (true) {
            const data = await getPostsByCategory(category.catId, 100, page);
            const posts = [
              ...(data.featured || []),
              ...(data.generalNews || []),
            ];
            if (posts.length === 0) break;
            allPosts.push(...posts);
            if (data.totalRecords <= allPosts.length) break;
            page++;
          }
        }

        const results = await Promise.all(
          allPosts.map((p) =>
            syncArticle(p).catch((e) => ({
              status: "error",
              postId: p.postId,
              error: e.message,
            })),
          ),
        );
        return res.status(200).json({ success: true, action, results });

      case "sync-article":
        if (!postId) {
          return res
            .status(400)
            .json({
              success: false,
              error: "postId is required for sync-article",
            });
        }
        logWithTimestamp(`Starting manual sync for article: ${postId}`);
        const article = await getPostById(postId);
        const result = await syncArticle(article);
        return res.status(200).json({ success: true, action, result });

      case "clear-errors":
        // Placeholder: Logic to find items with a 'failed' sync status
        // in Webflow and reset them would be implemented here.
        logWithTimestamp("Clearing errors (not implemented).");
        return res
          .status(501)
          .json({ success: false, error: "Action not implemented" });

      case "report":
        // Placeholder: Logic to generate a detailed sync report by
        // fetching all items and aggregating their sync status would go here.
        logWithTimestamp("Generating report (not implemented).");
        return res
          .status(501)
          .json({ success: false, error: "Action not implemented" });

      default:
        return res
          .status(400)
          .json({ success: false, error: "Invalid action specified" });
    }
  } catch (error) {
    logWithTimestamp(
      `Manual action '${action}' failed: ${error.message}`,
      "error",
    );
    return res
      .status(500)
      .json({ success: false, action, error: error.message });
  }
}
