// Engine API Configuration
export const ENGINE_API = {
  STAGING: "https://uat-brochure.engine.online/api/EngineNews",
  PRODUCTION: "https://feeds.engine.online/api/EngineNews",
  ENDPOINTS: {
    RECENT_POSTS: "/GetRecentPostsV2", // Updated to V2
    POST_BY_ID: "/GetPostById",
  },
};

// Webflow Collections Configuration
export const WEBFLOW_COLLECTIONS = {
  NEWS: process.env.WEBFLOW_NEWS_COLLECTION_ID,
  NEWS_CATEGORY: process.env.WEBFLOW_NEWS_CATEGORY_COLLECTION_ID,
  NEWS_TAG: process.env.WEBFLOW_NEWS_TAG_COLLECTION_ID,
};

// Webflow CMS Field Mapping (Engine API fields → Webflow CMS field names)
export const FIELD_MAPPING = {
  // Article fields
  postId: "postid",
  title: "name", // Webflow uses 'name' for the title field
  slug: "slug",
  content: "content",
  desc: "desc", // Rich text field for standfirst HTML content
  timestamp: "published",
  updatedDate: "last-updated", // NEW: for smart sync
  cat: "category", // Multi-reference (will be converted to ID)
  tags: "tags", // Multi-reference (will be converted to array of IDs)
  color: "category-color",
  isFeatured: "featured",
  isRecurring: "recurring", // NEW
  featuredImageBig: "featured-img-big", // Image field (updated from Link field)
  featuredImageSmall: "featured-img-small", // Image field (updated from Link field)

  // Sync metadata fields
  lastSynced: "last-synced",
  syncStatus: "sync-status",
};

// Reference Collection Field Names
export const REFERENCE_FIELDS = {
  CATEGORY: {
    name: "name",
    slug: "slug",
    color: "color", // New color field in News Category collection
  },
  TAG: {
    name: "name",
    slug: "slug",
  },
};

// Sync Configuration
export const SYNC_CONFIG = {
  DEFAULT_RECENT_COUNT: 20, // Default number of posts to sync
  BATCH_SIZE: 10,
  MAX_RETRIES: 3,
  TIMEOUT: 30000,
  CACHE_TTL: 900000, // 15 minutes in milliseconds
};
