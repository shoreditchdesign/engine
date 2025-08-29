import "dotenv/config";
import { getRecentPosts } from "../lib/engine-api.js";
import { getWebflowItems } from "../lib/webflow-api.js";
import { logWithTimestamp } from "../lib/utils.js";

export default async function handler(req, res) {
  const healthStatus = {
    engine_api: "unknown",
    webflow_api: "unknown",
    last_sync: "not implemented", // Requires a persistent store to track last sync time
    timestamp: new Date().toISOString(),
  };

  // 1. Test Engine API connectivity
  try {
    await getRecentPosts(1);
    healthStatus.engine_api = "healthy";
    logWithTimestamp("Engine API health check successful.");
  } catch (error) {
    healthStatus.engine_api = "unhealthy";
    logWithTimestamp(
      `Engine API health check failed: ${error.message}`,
      "error",
    );
  }

  // 2. Test Webflow API connectivity
  try {
    const collectionId = process.env.WEBFLOW_COLLECTION_ID;
    // Fetching 1 item is a good way to test token, site, and collection ID validity.
    await getWebflowItems(collectionId, 0, 1);
    healthStatus.webflow_api = "healthy";
    logWithTimestamp("Webflow API health check successful.");
  } catch (error) {
    healthStatus.webflow_api = "unhealthy";
    logWithTimestamp(
      `Webflow API health check failed: ${error.message}`,
      "error",
    );
  }

  const overallStatus =
    healthStatus.engine_api === "healthy" &&
    healthStatus.webflow_api === "healthy";

  return res.status(overallStatus ? 200 : 503).json(healthStatus);
}
