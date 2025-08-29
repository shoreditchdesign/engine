import fetch from "node-fetch";
import { AbortController } from "abort-controller";
import { ENGINE_API, SYNC_CONFIG } from "../config/constants.js";
import { logWithTimestamp, retryWithBackoff } from "./utils.js";

/**
 * Determines the base URL for the Engine API based on the environment.
 * @returns {string} The base URL.
 */
function getBaseUrl() {
  return process.env.NODE_ENV === "production"
    ? ENGINE_API.PRODUCTION
    : ENGINE_API.STAGING;
}

/**
 * A core helper function to make requests to the Engine API.
 * It handles URL construction, retries, timeouts, and error handling.
 * @param {string} endpoint The API endpoint to call.
 * @param {object} params Query parameters for the request.
 * @returns {Promise<any>} The JSON response from the API.
 */
async function makeEngineRequest(endpoint, params = {}) {
  const baseUrl = getBaseUrl();
  const url = new URL(baseUrl + endpoint);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key]),
  );

  const request = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SYNC_CONFIG.TIMEOUT);

    logWithTimestamp(`Making Engine API request: ${url}`);

    try {
      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`,
        );
      }

      const text = await response.text();
      if (!text) {
        logWithTimestamp(`Engine API response for ${url} was empty.`, "warn");
        return null;
      }

      try {
        const data = JSON.parse(text);
        logWithTimestamp(`Successfully fetched data from ${url}`);
        return data;
      } catch (error) {
        logWithTimestamp(
          `Failed to parse JSON from Engine API. URL: ${url}`,
          "error",
        );
        throw new Error("Invalid JSON response from Engine API.");
      }
    } catch (error) {
      if (error.name === "AbortError") {
        logWithTimestamp(
          `Request to ${url} timed out after ${SYNC_CONFIG.TIMEOUT}ms.`,
          "error",
        );
        throw new Error("Request timed out");
      }
      logWithTimestamp(`Error fetching from ${url}: ${error.message}`, "error");
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return retryWithBackoff(request);
}

// --- Core API Functions ---

/**
 * Fetches recent posts from the Engine API.
 * GET /GetRecentPosts?recent={limit}
 * @param {number} recent The number of recent posts to fetch.
 * @returns {Promise<{ featured: any[], recentNews: any }>}
 */
export async function getRecentPosts(recent = 10) {
  return makeEngineRequest(ENGINE_API.ENDPOINTS.RECENT_POSTS, { recent });
}

/**
 * Fetches a single post by its ID.
 * GET /GetPostById?postId={id}
 * @param {string | number} postId The ID of the post to fetch.
 * @returns {Promise<any>} PostDetailViewModel
 */
export async function getPostById(postId) {
  if (!postId) throw new Error("postId is required for getPostById.");
  return makeEngineRequest(ENGINE_API.ENDPOINTS.POST_BY_ID, { postId });
}

/**
 * Fetches a single post by its slug.
 * GET /posts/{slug}
 * @param {string} slug The slug of the post to fetch.
 * @returns {Promise<any>} PostDetailViewModel
 */
export async function getPostBySlug(slug) {
  if (!slug) throw new Error("slug is required for getPostBySlug.");
  const endpoint = `${ENGINE_API.ENDPOINTS.POST_BY_SLUG}/${slug}`;
  return makeEngineRequest(endpoint);
}

/**
 * Fetches posts by category.
 * GET /GetPostsByCategory?catId={id}&Limit={limit}&Page={page}
 * @param {string | number} catId The category ID.
 * @param {number} limit The number of posts to return.
 * @param {number} page The page number.
 * @returns {Promise<{ featured: any[], generalNews: any[], totalRecords: number, totalPages: number }>}
 */
export async function getPostsByCategory(catId, limit = 100, page = 1) {
  if (!catId) throw new Error("catId is required for getPostsByCategory.");
  return makeEngineRequest(ENGINE_API.ENDPOINTS.POSTS_BY_CATEGORY, {
    catId,
    Limit: limit,
    Page: page,
  });
}

/**
 * Fetches all categories.
 * GET /GetAllCategories
 * @returns {Promise<Array<{ catId: number, catName: string, color: string }>>}
 */
export async function getAllCategories() {
  return makeEngineRequest(ENGINE_API.ENDPOINTS.ALL_CATEGORIES);
}

/**
 * Searches for posts by a search term.
 * GET /SearchPosts?searchTerm={term}&Limit={limit}&Page={page}
 * @param {string} searchTerm The term to search for.
 * @param {number} limit The number of posts to return.
 * @param {number} page The page number.
 * @returns {Promise<{ posts: any[], totalRecords: number, totalPages: number }>}
 */
export async function searchPosts(searchTerm, limit = 100, page = 1) {
  if (!searchTerm) throw new Error("searchTerm is required for searchPosts.");
  return makeEngineRequest(ENGINE_API.ENDPOINTS.SEARCH_POSTS, {
    searchTerm,
    Limit: limit,
    Page: page,
  });
}
