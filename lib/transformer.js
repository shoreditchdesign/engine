import { FIELD_MAPPING } from "../config/constants.js";
import crypto from "crypto";

/**
 * Generate a 4-character hash from a string
 * @param {string} str - Input string
 * @returns {string} - 4-character hash
 */
function generateHash(str) {
  return crypto.createHash("md5").update(str).digest("hex").substring(0, 4);
}

/**
 * Sanitize HTML content for Webflow Rich Text field
 * Webflow has strict requirements for Rich Text fields
 * @param {string} html - Raw HTML content
 * @returns {string} - Sanitized HTML
 */
function sanitizeHtmlContent(html) {
  if (!html || typeof html !== "string") {
    return "";
  }

  let sanitized = html;

  // Remove null bytes and control characters
  sanitized = sanitized.replace(/\0/g, "");
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // Fix common HTML issues
  // Remove or fix malformed tags
  sanitized = sanitized.replace(/<([^>]+)$/g, ""); // Remove incomplete opening tags
  sanitized = sanitized.replace(/^([^<]+)>/g, ""); // Remove incomplete closing tags

  // Ensure proper paragraph wrapping if content doesn't have block-level tags
  if (!sanitized.match(/<(p|div|h[1-6]|ul|ol|blockquote)/i)) {
    sanitized = `<p>${sanitized}</p>`;
  }

  // Remove empty tags
  sanitized = sanitized.replace(/<(\w+)[^>]*>\s*<\/\1>/g, "");

  // Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
}

/**
 * Generate a unique slug by appending a hash if needed
 * @param {string} originalSlug - Original slug from Engine API
 * @param {string} postId - Post ID for uniqueness
 * @param {boolean} appendHash - Whether to append hash (for conflict resolution)
 * @returns {string} - Slug (with hash if appendHash is true)
 */
export function generateUniqueSlug(originalSlug, postId, appendHash = false) {
  if (!appendHash) {
    return originalSlug;
  }

  const hash = generateHash(postId + Date.now().toString());
  return `${originalSlug}-${hash}`;
}

/**
 * Transform Engine API article data to Webflow CMS format
 * @param {object} engineArticle - Article data from Engine API
 * @param {object} references - Resolved reference IDs
 * @param {string} references.categoryId - Category item ID
 * @param {boolean} useHashedSlug - Whether to append hash to slug (for conflict resolution)
 * @param {boolean} excludeSlug - Whether to exclude slug field (for updates to avoid conflicts)
 * @param {boolean} excludeImages - Whether to exclude image fields (for image import error fallback)
 * @returns {object} - Webflow-formatted item data
 */
export function transformEngineToWebflow(
  engineArticle,
  references,
  useHashedSlug = false,
  excludeSlug = false,
  excludeImages = false,
) {
  const { categoryId } = references;

  // Build field data object with all fields
  const rawFieldData = {
    // Core content fields
    postId: String(engineArticle.postId || ""),
    title: engineArticle.title || "",
    content: sanitizeHtmlContent(engineArticle.content || ""),
    desc: engineArticle.desc ? engineArticle.desc : null,

    // Date fields (ensure proper ISO 8601 format)
    timestamp: engineArticle.timestamp
      ? new Date(engineArticle.timestamp).toISOString()
      : new Date().toISOString(),
    updatedDate: engineArticle.updatedDate
      ? new Date(engineArticle.updatedDate).toISOString()
      : null,

    // Reference fields (IDs)
    cat: categoryId,

    // Metadata fields
    color: engineArticle.color || "",
    isFeatured: Boolean(engineArticle.isFeatured),
    isRecurring: Boolean(engineArticle.isRecurring),

    // Sync metadata
    lastSynced: new Date().toISOString(),
    syncStatus: "Synced",
  };

  // Only include images if not excluded (excludeImages is used for image import error fallback)
  if (!excludeImages) {
    rawFieldData.featuredImageBig = engineArticle.featuredImageBig || "";
    rawFieldData.featuredImageSmall = engineArticle.featuredImageSmall || "";
  }

  // Only include slug if not excluded (excludeSlug is used for updates)
  if (!excludeSlug) {
    rawFieldData.slug = generateUniqueSlug(
      engineArticle.slug || "",
      engineArticle.postId,
      useHashedSlug,
    );
  }

  // Transform to Webflow field names and filter out null/undefined values for optional fields
  const fieldData = {};

  Object.keys(rawFieldData).forEach((engineField) => {
    const value = rawFieldData[engineField];
    const fieldConfig = FIELD_MAPPING[engineField];

    if (!fieldConfig) return; // Skip if no mapping exists

    const webflowFieldName = fieldConfig.webflowField;
    const isRequired = fieldConfig.required;

    // Include field if:
    // 1. It's required (even if null/undefined, validation will catch it later)
    // 2. It's optional AND has a non-null/non-undefined value
    if (isRequired || (value !== null && value !== undefined)) {
      fieldData[webflowFieldName] = value;
    }
  });

  return {
    fieldData,
  };
}

/**
 * Check if an article needs to be updated
 * Compares Engine's updatedDate with Webflow's last-updated field
 * @param {object} existingWebflowItem - Existing item from Webflow
 * @param {object} engineArticle - Fresh article from Engine API
 * @returns {boolean} - True if update is needed
 */
export function needsUpdate(existingWebflowItem, engineArticle) {
  if (!existingWebflowItem || !existingWebflowItem.fieldData) {
    return true; // No existing item, needs creation
  }

  const webflowUpdatedDate =
    existingWebflowItem.fieldData[FIELD_MAPPING.updatedDate.webflowField];
  const engineUpdatedDate = engineArticle.updatedDate;

  if (!webflowUpdatedDate || !engineUpdatedDate) {
    return true; // Missing dates, safer to update
  }

  try {
    const webflowDate = new Date(webflowUpdatedDate);
    const engineDate = new Date(engineUpdatedDate);

    // Update if Engine's version is newer
    return engineDate > webflowDate;
  } catch (error) {
    return true; // On error, safer to update
  }
}

/**
 * Sanitize and validate article data before transformation
 * @param {object} article - Raw article from Engine API
 * @returns {object} - Validated article
 */
export function validateArticle(article) {
  if (!article) {
    throw new Error("Article is null or undefined");
  }

  if (!article.postId) {
    throw new Error("Article missing required field: postId");
  }

  if (!article.title) {
    throw new Error(`Article ${article.postId} missing required field: title`);
  }

  if (!article.slug) {
    throw new Error(`Article ${article.postId} missing required field: slug`);
  }

  return article;
}
