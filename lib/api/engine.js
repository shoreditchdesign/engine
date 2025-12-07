import fetch from "node-fetch";
import { AbortController } from "abort-controller";
import { ENGINE_API, SYNC_CONFIG } from "../../config/constants.js";
import { logWithTimestamp, retryWithBackoff } from "../utils.js";

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

    try {
      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`,
        );
      }

      const text = await response.text();
      if (!text) {
        return null;
      }

      try {
        const data = JSON.parse(text);
        return data;
      } catch (error) {
        throw new Error("Invalid JSON response from Engine API.");
      }
    } catch (error) {
      if (error.name === "AbortError") {
        logWithTimestamp(
          `⚠ Engine API timeout (${SYNC_CONFIG.TIMEOUT / 1000}s)`,
          "warn",
        );
        throw new Error("Request timed out");
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return retryWithBackoff(request);
}

// --- Core API Functions (MVP - Simplified) ---

/**
 * Fetches recent posts from the Engine API.
 * GET /GetRecentPostsV2?recent={limit}
 * @param {number} recent The number of recent posts to fetch.
 * @returns {Promise<Array>} Array of articles with 14 fields including updatedDate
 */
export async function getRecentPosts(recent = 20) {
  const response = await makeEngineRequest(ENGINE_API.ENDPOINTS.RECENT_POSTS, {
    recent,
  });

  if (!response) {
    return [];
  }

  // Engine API V2 returns: { featured: [...], recentNews: { "1": [...], "2": [...], ... } }
  // We need to flatten this into a single array
  const articles = [];

  // Add featured articles
  if (response.featured && Array.isArray(response.featured)) {
    articles.push(...response.featured);
  }

  // Add articles from recentNews sections
  if (response.recentNews && typeof response.recentNews === "object") {
    Object.keys(response.recentNews).forEach((key) => {
      if (Array.isArray(response.recentNews[key])) {
        articles.push(...response.recentNews[key]);
      }
    });
  }

  // Remove duplicates based on postId (featured articles might appear in recentNews too)
  const uniqueArticles = [];
  const seenPostIds = new Set();

  for (const article of articles) {
    if (article.postId && !seenPostIds.has(article.postId)) {
      seenPostIds.add(article.postId);
      uniqueArticles.push(article);
    }
  }

  // Sort by updatedDate descending (newest first), fallback to timestamp for posts that were never edited
  uniqueArticles.sort((a, b) => {
    const dateA = new Date(a.updatedDate || a.timestamp);
    const dateB = new Date(b.updatedDate || b.timestamp);
    return dateB - dateA; // Descending order (newest first)
  });

  // Return only the requested number of articles
  return uniqueArticles.slice(0, recent);
}

/**
 * Fetches a single post by its ID (for debugging).
 * GET /GetPostById?postId={id}
 * @param {string | number} postId The ID of the post to fetch.
 * @returns {Promise<any>} Post detail object
 */
export async function getPostById(postId) {
  if (!postId) throw new Error("postId is required for getPostById.");
  return makeEngineRequest(ENGINE_API.ENDPOINTS.POST_BY_ID, { postId });
}
