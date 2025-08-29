// Engine API Configuration
export const ENGINE_API = {
  STAGING: "https://uat-brochure.engine.online/api/EngineNews",
  PRODUCTION: "https://feeds.engine.online/api/EngineNews",
  ENDPOINTS: {
    RECENT_POSTS: "/GetRecentPosts",
    POST_BY_ID: "/GetPostById",
    POST_BY_SLUG: "/posts",
    POSTS_BY_CATEGORY: "/GetPostsByCategory",
    ALL_CATEGORIES: "/GetAllCategories",
    SEARCH_POSTS: "/SearchPosts",
  },
};

// Webflow CMS Field Mapping (Engine API fields → Webflow fields)
export const FIELD_MAPPING = {
  postId: "engine-post-id",
  title: "title",
  slug: "slug",
  content: "content",
  desc: "excerpt",
  timestamp: "publish-date",
  cat: "category",
  color: "category-color",
  tags: "tags",
  isFeatured: "is-featured",
  featuredImageBig: "featured-image",
  featuredImageSmall: "thumbnail",
};

// Sync Configuration
export const SYNC_CONFIG = {
  BATCH_SIZE: 10,
  MAX_RETRIES: 3,
  TIMEOUT: 30000,
};
