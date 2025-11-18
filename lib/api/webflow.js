import fetch from "node-fetch";
import { WEBFLOW_COLLECTIONS, FIELD_MAPPING } from "../../config/constants.js";
import { logWithTimestamp, retryWithBackoff } from "../utils.js";

const WEBFLOW_API_BASE = "https://api.webflow.com/v2";

/**
 * Get Webflow client configuration
 * @returns {object} Webflow client config
 */
function getWebflowConfig() {
  const siteId = process.env.WEBFLOW_SITE_ID;
  const apiToken = process.env.WEBFLOW_API_TOKEN;

  if (!siteId)
    throw new Error("WEBFLOW_SITE_ID environment variable is missing");
  if (!apiToken)
    throw new Error("WEBFLOW_API_TOKEN environment variable is missing");

  return { siteId, apiToken };
}

/**
 * A core helper function to make requests to the Webflow API.
 * It handles authentication, rate limiting, retries, and error handling.
 * @param {'GET' | 'POST' | 'PATCH' | 'DELETE'} method The HTTP method.
 * @param {string} endpoint The API endpoint to call.
 * @param {object | null} data The data to send in the request body.
 * @returns {Promise<any>} The JSON response from the API.
 */
async function makeWebflowRequest(method, endpoint, data = null) {
  const { apiToken } = getWebflowConfig();
  const url = `${WEBFLOW_API_BASE}${endpoint}`;
  const headers = {
    Authorization: `Bearer ${apiToken}`,
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const request = async () => {
    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    if (response.status === 429) {
      // Rate limit - respect Retry-After header or use longer default
      const retryAfter = response.headers.get("Retry-After");
      const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60000; // 60s to clear rolling window
      logWithTimestamp(
        `⚠ Rate limit hit, waiting ${delay / 1000}s...`,
        "warn",
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      throw new Error(`RATE_LIMIT_429`); // Special error code for rate limits
    }

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Webflow API Error: ${response.status} - ${errorBody}`);
    }

    if (response.status === 204 || method === "DELETE") {
      return null; // No content to parse
    }

    return response.json();
  };

  return retryWithBackoff(request);
}

// --- Helper Functions (NEW) ---

/**
 * Preload all items from NEWS collection and build a postId lookup map
 * This eliminates the need for repeated pagination searches
 * @returns {Promise<Map>} - Map of postId -> item
 */
export async function preloadAllItems() {
  const collectionId = WEBFLOW_COLLECTIONS.NEWS;
  const lookupMap = new Map();
  let offset = 0;
  const limit = 100;
  let totalLoaded = 0;

  logWithTimestamp("Preloading existing articles from Webflow...", "info");

  while (true) {
    const response = await makeWebflowRequest(
      "GET",
      `/collections/${collectionId}/items?offset=${offset}&limit=${limit}`,
    );

    if (!response || !response.items || response.items.length === 0) {
      break;
    }

    // Add items to lookup map
    response.items.forEach((item) => {
      if (item.fieldData && item.fieldData[FIELD_MAPPING.postId.webflowField]) {
        const postId = String(
          item.fieldData[FIELD_MAPPING.postId.webflowField],
        );
        lookupMap.set(postId, item);
      }
    });

    totalLoaded += response.items.length;
    logWithTimestamp(`Loaded ${totalLoaded} articles...`, "info");

    // Check if we've loaded all items
    if (!response.pagination || offset + limit >= response.pagination.total) {
      break;
    }

    offset += limit;
  }

  logWithTimestamp(
    `✓ Preload complete: ${lookupMap.size} articles indexed by postId`,
    "info",
  );
  return lookupMap;
}

/**
 * Find an item by PostID field (legacy - use preloadAllItems for batch operations)
 * @param {string} postId - Engine post ID
 * @returns {Promise<object|null>} - Webflow item or null
 */
export async function findItemByPostId(postId) {
  const { siteId } = getWebflowConfig();
  const collectionId = WEBFLOW_COLLECTIONS.NEWS;

  // Search for item with matching postid field
  let offset = 0;
  const limit = 100;

  while (true) {
    const response = await makeWebflowRequest(
      "GET",
      `/collections/${collectionId}/items?offset=${offset}&limit=${limit}`,
    );

    if (!response || !response.items || response.items.length === 0) {
      return null;
    }

    const foundItem = response.items.find((item) => {
      if (item.fieldData && item.fieldData[FIELD_MAPPING.postId.webflowField]) {
        const itemPostId = item.fieldData[FIELD_MAPPING.postId.webflowField];
        return String(itemPostId) === String(postId);
      }
      return false;
    });

    if (foundItem) {
      return foundItem;
    }

    if (!response.pagination || offset + limit >= response.pagination.total) {
      break;
    }

    offset += limit;
  }

  return null;
}

/**
 * List items from a collection with optional filters
 * @param {string} collectionId - Collection ID
 * @param {object} options - Query options (offset, limit, filter)
 * @returns {Promise<object>} - Response with items and pagination
 */
export async function listItems(collectionId, options = {}) {
  const { offset = 0, limit = 100, filter = {} } = options;

  let url = `/collections/${collectionId}/items?offset=${offset}&limit=${limit}`;

  // Add filters if provided
  if (Object.keys(filter).length > 0) {
    Object.keys(filter).forEach((key) => {
      url += `&${key}=${encodeURIComponent(filter[key])}`;
    });
  }

  return makeWebflowRequest("GET", url);
}

/**
 * Create a new item in a collection
 * @param {string} collectionId - Collection ID
 * @param {object} itemData - Item data with fieldData
 * @returns {Promise<object>} - Created item
 */
export async function createItem(collectionId, itemData) {
  return makeWebflowRequest(
    "POST",
    `/collections/${collectionId}/items`,
    itemData,
  );
}

/**
 * Update an existing item
 * @param {string} collectionId - Collection ID
 * @param {string} itemId - Item ID
 * @param {object} itemData - Updated item data with fieldData
 * @returns {Promise<object>} - Updated item
 */
export async function updateItem(collectionId, itemId, itemData) {
  return makeWebflowRequest(
    "PATCH",
    `/collections/${collectionId}/items/${itemId}`,
    itemData,
  );
}

/**
 * Publish one or more items
 * @param {string} collectionId - Collection ID
 * @param {string[]} itemIds - Array of item IDs to publish
 * @returns {Promise<object>} - Publish result
 */
export async function publishItems(collectionId, itemIds) {
  return makeWebflowRequest(
    "POST",
    `/collections/${collectionId}/items/publish`,
    { itemIds },
  );
}

/**
 * Unpublish one or more items
 * @param {string} collectionId - Collection ID
 * @param {string[]} itemIds - Array of item IDs to unpublish
 * @returns {Promise<object>} - Unpublish result
 */
export async function unpublishItems(collectionId, itemIds) {
  return makeWebflowRequest(
    "POST",
    `/collections/${collectionId}/items/unpublish`,
    { itemIds },
  );
}

/**
 * Delete an item
 * @param {string} collectionId - Collection ID
 * @param {string} itemId - Item ID to delete
 * @returns {Promise<null>}
 */
export async function deleteItem(collectionId, itemId) {
  return makeWebflowRequest(
    "DELETE",
    `/collections/${collectionId}/items/${itemId}`,
  );
}

// --- Export Webflow Client Object (for reference manager) ---

/**
 * Creates a Webflow client object for use in ReferenceManager
 * @returns {object} - Webflow client with collections.items methods
 */
export function createWebflowClient() {
  return {
    collections: {
      items: {
        listItems: (collectionId, options) => listItems(collectionId, options),
        createItem: (collectionId, data) => createItem(collectionId, data),
        updateItem: (collectionId, itemId, data) =>
          updateItem(collectionId, itemId, data),
        publishItem: (collectionId, itemIds) =>
          publishItems(collectionId, itemIds),
        deleteItem: (collectionId, itemId) => deleteItem(collectionId, itemId),
      },
    },
  };
}
