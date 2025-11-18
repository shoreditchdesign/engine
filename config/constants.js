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
// Each field maps to: { webflowField: string, required: boolean }
export const FIELD_MAPPING = {
  // Article fields
  postId: { webflowField: "postid", required: true },
  title: { webflowField: "name", required: true },
  slug: { webflowField: "slug", required: true },
  content: { webflowField: "content", required: false },
  desc: { webflowField: "desc", required: false }, // Optional - some articles don't have standfirst
  timestamp: { webflowField: "published", required: true },
  updatedDate: { webflowField: "last-updated", required: false }, // Optional - not set if never edited
  cat: { webflowField: "category", required: true },
  tags: { webflowField: "tags", required: false },
  color: { webflowField: "category-color", required: false },
  isFeatured: { webflowField: "featured", required: false },
  isRecurring: { webflowField: "recurring", required: false },
  featuredImageBig: { webflowField: "featured-img-big", required: false },
  featuredImageSmall: { webflowField: "featured-img-small", required: false },

  // Sync metadata fields
  lastSynced: { webflowField: "last-synced", required: true },
  syncStatus: { webflowField: "sync-status", required: true },
};

// Helper function to get Webflow field name (backward compatibility)
export function getWebflowFieldName(engineField) {
  const mapping = FIELD_MAPPING[engineField];
  return typeof mapping === "string" ? mapping : mapping?.webflowField;
}

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
  DEFAULT_RECENT_COUNT: 200, // Default number of posts to sync (increased from 20 for better coverage)
  BATCH_SIZE: 10,
  MAX_RETRIES: 10, // Max retry attempts for transient errors
  RETRY_DELAYS: [1000, 2000, 4000, 5000, 5000, 5000, 5000, 5000, 5000, 5000], // Capped exponential backoff (ms)
  TIMEOUT: 30000,
  CACHE_TTL: 900000, // 15 minutes in milliseconds
};
