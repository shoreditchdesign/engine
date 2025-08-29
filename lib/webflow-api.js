import fetch from "node-fetch";
import { SYNC_CONFIG } from "../config/constants.js";
import { logWithTimestamp, retryWithBackoff } from "./utils.js";

const WEBFLOW_API_BASE = "https://api.webflow.com/v2";

/**
 * A core helper function to make requests to the Webflow API.
 * It handles authentication, rate limiting, retries, and error handling.
 * @param {'GET' | 'POST' | 'PATCH' | 'DELETE'} method The HTTP method.
 * @param {string} endpoint The API endpoint to call.
 * @param {object | null} data The data to send in the request body.
 * @returns {Promise<any>} The JSON response from the API.
 */
async function makeWebflowRequest(method, endpoint, data = null) {
  const url = `${WEBFLOW_API_BASE}${endpoint}`;
  const headers = {
    Authorization: `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const request = async () => {
    logWithTimestamp(`Making Webflow API request: ${method} ${url}`);
    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    if (response.status === 429) {
      // Rate limit
      const retryAfter = response.headers.get("Retry-After");
      const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60000; // Default to 60s if header is missing
      logWithTimestamp(
        `Webflow rate limit hit. Retrying after ${delay}ms.`,
        "warn",
      );
      // Throw an error to trigger the retry mechanism in retryWithBackoff
      throw new Error(`Rate limit exceeded. Retrying in ${delay}ms.`);
    }

    if (!response.ok) {
      const errorBody = await response.text();
      logWithTimestamp(
        `Webflow API error: ${response.status} ${response.statusText}. Body: ${errorBody}`,
        "error",
      );
      throw new Error(`Webflow API Error: ${response.status} - ${errorBody}`);
    }

    if (response.status === 204 || method === "DELETE") {
      return null; // No content to parse
    }

    return response.json();
  };

  return retryWithBackoff(request);
}

// --- CRUD Operations for Webflow CMS ---

/**
 * Gets a list of items from a Webflow Collection.
 * GET /sites/{siteId}/collections/{collectionId}/items
 * @returns {Promise<{ items: any[], pagination: any }>}
 */
export async function getWebflowItems(collectionId, offset = 0, limit = 100) {
  const siteId = process.env.WEBFLOW_SITE_ID;
  return makeWebflowRequest(
    "GET",
    `/sites/${siteId}/collections/${collectionId}/items?offset=${offset}&limit=${limit}`,
  );
}

/**
 * Finds a Webflow item by the Engine Post ID stored in a custom field.
 * Note: This is inefficient and may require multiple API calls for large collections.
 * @param {string} collectionId The ID of the collection to search in.
 * @param {string | number} enginePostId The Engine Post ID to find.
 * @returns {Promise<any | null>} The found item or null.
 */
export async function getWebflowItemByEngineId(collectionId, enginePostId) {
  let offset = 0;
  const limit = 100;
  while (true) {
    const { items, pagination } = await getWebflowItems(
      collectionId,
      offset,
      limit,
    );
    if (!items || items.length === 0) {
      return null; // No more items to check
    }

    const foundItem = items.find(
      (item) => item.fieldData["engine-post-id"] === enginePostId,
    );
    if (foundItem) {
      return foundItem;
    }

    if (pagination.offset + pagination.limit >= pagination.total) {
      break; // Reached the end of the collection
    }
    offset += limit;
  }
  return null;
}

/**
 * Creates a new item in a Webflow Collection.
 * POST /sites/{siteId}/collections/{collectionId}/items
 * @param {string} collectionId The ID of the collection.
 * @param {object} itemData The data for the new item.
 * @returns {Promise<any>} The created item.
 */
export async function createWebflowItem(collectionId, itemData) {
  const siteId = process.env.WEBFLOW_SITE_ID;
  return makeWebflowRequest(
    "POST",
    `/sites/${siteId}/collections/${collectionId}/items`,
    itemData,
  );
}

/**
 * Updates an existing item in a Webflow Collection.
 * PATCH /sites/{siteId}/collections/{collectionId}/items/{itemId}
 * @param {string} collectionId The ID of the collection.
 * @param {string} itemId The ID of the item to update.
 * @param {object} itemData The data to update.
 * @returns {Promise<any>} The updated item.
 */
export async function updateWebflowItem(collectionId, itemId, itemData) {
  const siteId = process.env.WEBFLOW_SITE_ID;
  return makeWebflowRequest(
    "PATCH",
    `/sites/${siteId}/collections/${collectionId}/items/${itemId}`,
    itemData,
  );
}

/**
 * Deletes an item from a Webflow Collection.
 * DELETE /sites/{siteId}/collections/{collectionId}/items/{itemId}
 * @param {string} collectionId The ID of the collection.
 * @param {string} itemId The ID of the item to delete.
 * @returns {Promise<null>}
 */
export async function deleteWebflowItem(collectionId, itemId) {
  const siteId = process.env.WEBFLOW_SITE_ID;
  return makeWebflowRequest(
    "DELETE",
    `/sites/${siteId}/collections/${collectionId}/items/${itemId}`,
  );
}

/**
 * Publishes one or more Webflow items.
 * POST /sites/{siteId}/collections/{collectionId}/items/publish
 * @param {string} collectionId The ID of the collection.
 * @param {string[]} itemIds An array of item IDs to publish.
 * @returns {Promise<any>}
 */
export async function publishWebflowItems(collectionId, itemIds) {
  const siteId = process.env.WEBFLOW_SITE_ID;
  const data = { itemIds };
  return makeWebflowRequest(
    "POST",
    `/sites/${siteId}/collections/${collectionId}/items/publish`,
    data,
  );
}

/**
 * Transforms an Engine article into the data structure for a Webflow item.
 * @param {object} engineArticle The article data from the Engine API.
 * @returns {object} The transformed data for Webflow.
 */
export function transformEngineDataToWebflow(engineArticle) {
  return {
    isArchived: false,
    isDraft: false, // Auto-publish per requirements
    fieldData: {
      "engine-post-id": engineArticle.postId,
      title: engineArticle.title,
      slug: engineArticle.slug,
      content: engineArticle.content, // Raw HTML
      excerpt: engineArticle.desc,
      "publish-date": engineArticle.timestamp,
      category: engineArticle.cat,
      "category-color": engineArticle.color,
      tags: engineArticle.tags,
      "is-featured": engineArticle.isFeatured,
      "featured-image": engineArticle.featuredImageBig,
      thumbnail: engineArticle.featuredImageSmall,
      "last-synced": new Date().toISOString(),
      "sync-status": "synced",
    },
  };
}
