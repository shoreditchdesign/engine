import { FIELD_MAPPING, SYNC_CONFIG } from "../config/constants.js";

/**
 * Console logging with timestamps.
 * @param {string} message The message to log.
 * @param {'info' | 'warn' | 'error'} level The log level.
 */
export function logWithTimestamp(message, level = "info") {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] [${level.toUpperCase()}] ${message}`);
}

/**
 * Retry logic for failed API calls with exponential backoff.
 * Special handling for rate limits (429) with longer waits.
 * @param {() => Promise<any>} fn The async function to retry.
 * @param {number} maxRetries The maximum number of retries.
 * @param {number} initialDelay The initial delay in ms.
 * @returns {Promise<any>}
 */
export async function retryWithBackoff(
  fn,
  maxRetries = SYNC_CONFIG.MAX_RETRIES,
  initialDelay = 2000, // Increased from 1000ms to 2000ms
) {
  let attempt = 1;
  while (attempt <= maxRetries) {
    try {
      return await fn();
    } catch (error) {
      const isRateLimit =
        error.message && error.message.includes("RATE_LIMIT_429");

      if (attempt === maxRetries) {
        logWithTimestamp(
          `Attempt ${attempt} failed. Max retries (${maxRetries}) reached.`,
          "error",
        );
        throw error;
      }

      // For rate limits, use longer delays (already waited in webflow.js)
      // For other errors, use exponential backoff
      const delay = isRateLimit
        ? 5000 // Fixed 5s delay after rate limit wait (on top of the 90s already waited)
        : initialDelay * Math.pow(2, attempt - 1);

      logWithTimestamp(
        `Attempt ${attempt}/${maxRetries} failed${isRateLimit ? " (rate limit)" : ""}. Retrying in ${delay}ms...`,
        "warn",
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt++;
    }
  }
}

/**
 * Validate Engine API response structure.
 * @param {object} data The data object from the Engine API.
 * @returns {boolean}
 */
export function validateEngineData(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid data format: not an object.");
  }
  if (!data.postId) {
    throw new Error('Validation failed: Missing required field "postId".');
  }
  if (!data.title) {
    throw new Error('Validation failed: Missing required field "title".');
  }
  return true;
}

/**
 * Transform Engine API fields to Webflow CMS format using FIELD_MAPPING.
 * @param {object} engineData The data object from the Engine API.
 * @returns {object} The transformed data for Webflow.
 */
export function transformEngineToWebflow(engineData) {
  const webflowData = {};
  for (const engineField in FIELD_MAPPING) {
    if (Object.prototype.hasOwnProperty.call(engineData, engineField)) {
      const webflowField = FIELD_MAPPING[engineField];
      let value = engineData[engineField];

      if (engineField === "timestamp") {
        value = formatDate(value);
      }
      if (engineField === "slug" && value) {
        value = sanitizeSlug(value);
      }

      webflowData[webflowField] = value;
    }
  }
  return webflowData;
}

/**
 * Format date strings for Webflow (ISO 8601).
 * @param {string} dateString The date string to format.
 * @returns {string | null}
 */
export function formatDate(dateString) {
  if (!dateString) return null;
  try {
    return new Date(dateString).toISOString();
  } catch (error) {
    logWithTimestamp(`Could not format invalid date: ${dateString}`, "error");
    return null;
  }
}

/**
 * Clean and validate URL slugs.
 * @param {string} slug The slug to sanitize.
 * @returns {string}
 */
export function sanitizeSlug(slug) {
  if (!slug || typeof slug !== "string") return "";
  return slug
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
