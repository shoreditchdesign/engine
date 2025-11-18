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
 * Delay execution for specified milliseconds
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Categorize errors to determine if they should be retried
 * @param {Error} error - The error to categorize
 * @returns {object} - { isRetryable: boolean, isImageError: boolean, category: string }
 */
export function categorizeError(error) {
  const errorMessage = error.message || "";
  const errorString = error.toString();

  // Image import errors - special handling (retry without images)
  if (
    errorMessage.includes("Remote file failed to import") ||
    errorMessage.includes("Unsupported file type")
  ) {
    return {
      isRetryable: true,
      isImageError: true,
      category: "IMAGE_IMPORT_ERROR",
    };
  }

  // Rate limit errors - always retry with backoff
  if (
    errorMessage.includes("429") ||
    errorMessage.includes("RATE_LIMIT") ||
    errorMessage.includes("Too Many Requests")
  ) {
    return { isRetryable: true, isImageError: false, category: "RATE_LIMIT" };
  }

  // Service unavailable / server errors - retry
  if (
    errorMessage.includes("503") ||
    errorMessage.includes("502") ||
    errorMessage.includes("504") ||
    errorMessage.includes("500")
  ) {
    return {
      isRetryable: true,
      isImageError: false,
      category: "SERVER_ERROR",
    };
  }

  // Network errors - retry
  if (
    errorMessage.includes("ECONNRESET") ||
    errorMessage.includes("ETIMEDOUT") ||
    errorMessage.includes("ENOTFOUND") ||
    errorMessage.includes("EAI_AGAIN") ||
    errorMessage.includes("Network request failed") ||
    errorString.includes("FetchError")
  ) {
    return {
      isRetryable: true,
      isImageError: false,
      category: "NETWORK_ERROR",
    };
  }

  // Authentication errors - don't retry (needs manual fix)
  if (errorMessage.includes("401") || errorMessage.includes("403")) {
    return { isRetryable: false, isImageError: false, category: "AUTH_ERROR" };
  }

  // Bad request / validation errors - don't retry (data issue)
  if (
    errorMessage.includes("400") ||
    errorMessage.includes("422") ||
    errorMessage.includes("Validation failed")
  ) {
    return {
      isRetryable: false,
      isImageError: false,
      category: "VALIDATION_ERROR",
    };
  }

  // Not found errors - don't retry
  if (errorMessage.includes("404")) {
    return {
      isRetryable: false,
      isImageError: false,
      category: "NOT_FOUND_ERROR",
    };
  }

  // Default: treat unknown errors as retryable (conservative approach)
  return { isRetryable: true, isImageError: false, category: "UNKNOWN_ERROR" };
}

/**
 * Retry logic for failed API calls with capped exponential backoff and smart error categorization.
 * Only retries transient errors (rate limits, network issues, server errors).
 * Permanent errors (400, 401, 404) fail immediately.
 * @param {() => Promise<any>} fn The async function to retry.
 * @param {number} maxRetries The maximum number of retries.
 * @returns {Promise<any>}
 */
export async function retryWithBackoff(
  fn,
  maxRetries = SYNC_CONFIG.MAX_RETRIES,
) {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (error) {
      const errorInfo = categorizeError(error);

      // Don't retry permanent errors
      if (!errorInfo.isRetryable) {
        logWithTimestamp(
          `Non-retryable error (${errorInfo.category}): ${error.message}`,
          "error",
        );
        throw error;
      }

      // Check if max retries reached
      if (attempt === maxRetries - 1) {
        logWithTimestamp(
          `Attempt ${attempt + 1} failed. Max retries (${maxRetries}) reached for ${errorInfo.category}.`,
          "error",
        );
        throw error;
      }

      // Use capped exponential backoff from constants
      const delay = SYNC_CONFIG.RETRY_DELAYS[attempt] || 5000;

      logWithTimestamp(
        `Attempt ${attempt + 1}/${maxRetries} failed (${errorInfo.category}). Retrying in ${delay}ms...`,
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
