import { WEBFLOW_COLLECTIONS, REFERENCE_FIELDS } from '../config/constants.js';

/**
 * ReferenceManager
 * Handles multi-reference field management for Categories and Tags
 * - Checks if reference items exist in their respective collections
 * - Creates new reference items if they don't exist
 * - Caches lookups to minimize API calls
 */
class ReferenceManager {
  constructor(webflowClient) {
    this.client = webflowClient;
    this.categoryCache = new Map(); // { "categoryName": "itemId" }
    this.tagCache = new Map(); // { "tagName": "itemId" }
  }

  /**
   * Ensure a category exists in the News Category collection
   * @param {string} categoryName - Category name from Engine API
   * @param {string} categoryColor - Hex color code (optional)
   * @returns {Promise<string>} - Category item ID
   */
  async ensureCategoryExists(categoryName, categoryColor = '#000000') {
    if (!categoryName) {
      throw new Error('Category name is required');
    }

    // Normalize category name
    const normalizedName = this.normalizeName(categoryName);

    // Check cache first
    if (this.categoryCache.has(normalizedName)) {
      return this.categoryCache.get(normalizedName);
    }

    try {
      // Search for existing category
      const existingCategories = await this.client.collections.items.listItems(
        WEBFLOW_COLLECTIONS.NEWS_CATEGORY,
        {
          filter: {
            [REFERENCE_FIELDS.CATEGORY.name]: normalizedName
          },
          limit: 1
        }
      );

      // If exists, cache and return ID
      if (existingCategories.items && existingCategories.items.length > 0) {
        const categoryId = existingCategories.items[0].id;
        this.categoryCache.set(normalizedName, categoryId);
        return categoryId;
      }

      // Category doesn't exist, create it
      const newCategory = await this.client.collections.items.createItem(
        WEBFLOW_COLLECTIONS.NEWS_CATEGORY,
        {
          fieldData: {
            [REFERENCE_FIELDS.CATEGORY.name]: normalizedName,
            [REFERENCE_FIELDS.CATEGORY.slug]: this.slugify(normalizedName),
            [REFERENCE_FIELDS.CATEGORY.color]: categoryColor || '#000000'
          }
        }
      );

      // Publish the new category
      await this.client.collections.items.publishItem(
        WEBFLOW_COLLECTIONS.NEWS_CATEGORY,
        [newCategory.id]
      );

      // Cache and return
      this.categoryCache.set(normalizedName, newCategory.id);
      return newCategory.id;

    } catch (error) {
      throw new Error(`Failed to ensure category exists: ${error.message}`);
    }
  }

  /**
   * Ensure a single tag exists in the News Tag collection
   * @param {string} tagName - Tag name from Engine API
   * @returns {Promise<string>} - Tag item ID
   */
  async ensureTagExists(tagName) {
    if (!tagName) {
      throw new Error('Tag name is required');
    }

    // Normalize tag name
    const normalizedName = this.normalizeName(tagName);

    // Check cache first
    if (this.tagCache.has(normalizedName)) {
      return this.tagCache.get(normalizedName);
    }

    try {
      // Search for existing tag
      const existingTags = await this.client.collections.items.listItems(
        WEBFLOW_COLLECTIONS.NEWS_TAG,
        {
          filter: {
            [REFERENCE_FIELDS.TAG.name]: normalizedName
          },
          limit: 1
        }
      );

      // If exists, cache and return ID
      if (existingTags.items && existingTags.items.length > 0) {
        const tagId = existingTags.items[0].id;
        this.tagCache.set(normalizedName, tagId);
        return tagId;
      }

      // Tag doesn't exist, create it
      const newTag = await this.client.collections.items.createItem(
        WEBFLOW_COLLECTIONS.NEWS_TAG,
        {
          fieldData: {
            [REFERENCE_FIELDS.TAG.name]: normalizedName,
            [REFERENCE_FIELDS.TAG.slug]: this.slugify(normalizedName)
          }
        }
      );

      // Publish the new tag
      await this.client.collections.items.publishItem(
        WEBFLOW_COLLECTIONS.NEWS_TAG,
        [newTag.id]
      );

      // Cache and return
      this.tagCache.set(normalizedName, newTag.id);
      return newTag.id;

    } catch (error) {
      throw new Error(`Failed to ensure tag exists: ${error.message}`);
    }
  }

  /**
   * Ensure multiple tags exist (batch operation)
   * @param {string[]} tagNames - Array of tag names from Engine API
   * @returns {Promise<string[]>} - Array of tag item IDs
   */
  async ensureTagsExist(tagNames) {
    if (!tagNames || !Array.isArray(tagNames)) {
      return [];
    }

    // Filter out empty/null values
    const validTagNames = tagNames.filter(name => name && name.trim());

    if (validTagNames.length === 0) {
      return [];
    }

    try {
      // Process tags in parallel (faster than sequential)
      const tagIdPromises = validTagNames.map(tagName =>
        this.ensureTagExists(tagName)
      );

      const tagIds = await Promise.all(tagIdPromises);
      return tagIds;

    } catch (error) {
      throw new Error(`Failed to ensure tags exist: ${error.message}`);
    }
  }

  /**
   * Normalize a name (trim whitespace, consistent casing)
   * @param {string} name - Raw name
   * @returns {string} - Normalized name
   */
  normalizeName(name) {
    return name.trim();
  }

  /**
   * Convert a name to a URL-friendly slug
   * @param {string} name - Name to slugify
   * @returns {string} - Slugified name
   */
  slugify(name) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  /**
   * Clear all caches (useful for testing or manual refresh)
   */
  clearCache() {
    this.categoryCache.clear();
    this.tagCache.clear();
  }

  /**
   * Get cache statistics
   * @returns {object} - Cache stats
   */
  getCacheStats() {
    return {
      categories: this.categoryCache.size,
      tags: this.tagCache.size,
      total: this.categoryCache.size + this.tagCache.size
    };
  }
}

export default ReferenceManager;
