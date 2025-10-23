import { FIELD_MAPPING } from '../config/constants.js';

/**
 * Transform Engine API article data to Webflow CMS format
 * @param {object} engineArticle - Article data from Engine API
 * @param {object} references - Resolved reference IDs
 * @param {string} references.categoryId - Category item ID
 * @param {string[]} references.tagIds - Array of tag item IDs
 * @returns {object} - Webflow-formatted item data
 */
export function transformEngineToWebflow(engineArticle, references) {
  const { categoryId, tagIds } = references;

  return {
    fieldData: {
      // Core content fields
      [FIELD_MAPPING.postId]: String(engineArticle.postId || ''),
      [FIELD_MAPPING.title]: engineArticle.title || '',
      [FIELD_MAPPING.slug]: engineArticle.slug || '',
      [FIELD_MAPPING.content]: engineArticle.content || '',
      [FIELD_MAPPING.desc]: engineArticle.desc || '',

      // Date fields
      [FIELD_MAPPING.timestamp]: engineArticle.timestamp || new Date().toISOString(),
      [FIELD_MAPPING.updatedDate]: engineArticle.updatedDate || new Date().toISOString(),

      // Reference fields (IDs)
      [FIELD_MAPPING.cat]: categoryId,
      [FIELD_MAPPING.tags]: tagIds || [],

      // Metadata fields
      [FIELD_MAPPING.color]: engineArticle.color || '',
      [FIELD_MAPPING.isFeatured]: Boolean(engineArticle.isFeatured),
      [FIELD_MAPPING.isRecurring]: Boolean(engineArticle.isRecurring),

      // Image fields
      [FIELD_MAPPING.featuredImageBig]: engineArticle.featuredImageBig || '',
      [FIELD_MAPPING.featuredImageSmall]: engineArticle.featuredImageSmall || '',

      // Sync metadata
      [FIELD_MAPPING.lastSynced]: new Date().toISOString(),
      [FIELD_MAPPING.syncStatus]: 'Synced'
    }
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

  const webflowUpdatedDate = existingWebflowItem.fieldData[FIELD_MAPPING.updatedDate];
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
    console.error('Error comparing dates:', error);
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
    throw new Error('Article is null or undefined');
  }

  if (!article.postId) {
    throw new Error('Article missing required field: postId');
  }

  if (!article.title) {
    throw new Error(`Article ${article.postId} missing required field: title`);
  }

  if (!article.slug) {
    throw new Error(`Article ${article.postId} missing required field: slug`);
  }

  return article;
}
