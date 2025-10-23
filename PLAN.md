# MVP Simplification & Implementation Plan

## Current Status
- Codebase analyzed and documented
- Architecture identified as overcomplicated for MVP
- Need to simplify to 2 core functions: automatic sync (15 min) + manual sync (on-demand)

---

## Phase 1: Data Mapping Analysis ✅ COMPLETED

### Step 1.1: Document Engine API Endpoints & Responses ✅
**Status**: ✅ Complete

**Confirmed Endpoint:**
- `/GetRecentPostsV2?recent={count}` - Returns 14 fields including `updatedDate`
- `/GetPostById?postId={id}` - For debugging only (optional)

**Engine Fields (14 total):**
- postId, title, slug, content, desc, timestamp, updatedDate
- cat, color, tags, isFeatured, isRecurring
- featuredImageSmall, featuredImageBig

### Step 1.2: Document Webflow CMS Structure ✅
**Status**: ✅ Complete

**Current Webflow Fields:**
- Title, Slug, PostID, Category, Published, Last Updated, Last Synced
- Sync Status, Excerpt, Content, Featured
- Featured (Big), Featured (Small)

**Total:** 13 fields mapped, 3 new fields needed

### Step 1.3: Create 1-to-1 Field Mapping ✅
**Status**: ✅ Complete

**Complete Mapping:**
| Engine Field | → | Webflow Field | Status |
|--------------|---|---------------|--------|
| postId | → | PostID | ✅ Existing |
| title | → | Title | ✅ Existing |
| slug | → | Slug | ✅ Existing |
| content | → | Content | ✅ Existing |
| desc | → | Excerpt | ✅ Existing |
| timestamp | → | Published | ✅ Existing |
| updatedDate | → | Last Updated | ✅ Existing |
| cat | → | Category | ✅ Existing |
| tags | → | Tags | ✅ Added (Multi-reference) |
| color | → | Category Color | ✅ Added (Plain Text) |
| isFeatured | → | Featured | ✅ Existing |
| isRecurring | → | Recurring | ✅ Added (Switch) |
| featuredImageBig | → | Featured (Big) | ✅ Existing |
| featuredImageSmall | → | Featured (Small) | ✅ Existing |

**3 New Fields (Now Added):**
1. ✅ **Tags** (Multi-reference) - Separate from Category, references News Tag collection
2. ✅ **Category Color** (Plain Text) - Hex code, for data completeness
3. ✅ **Recurring** (Switch) - Boolean, for data completeness

---

## Phase 2: Webflow CMS Setup ✅ COMPLETED

### Step 2.0: Add 3 New Fields to Webflow CMS
**Status**: ✅ Complete

**Instructions:**
1. Open Webflow Designer
2. Go to CMS → News Collection → Settings → Fields
3. Add these 3 new fields:

#### Field 1: Tags
- **Field Name**: `Tags`
- **Field Type**: Multi-reference OR Plain Text
  - If Multi-reference: Comma-separated slugs
  - If Plain Text: Store as comma-separated string
- **Required**: No
- **Purpose**: Store article tags (separate from Category)

#### Field 2: Category Color
- **Field Name**: `Category Color`
- **Field Type**: Plain Text
- **Required**: No
- **Purpose**: Store hex color codes (e.g., "#FF5733")
- **Note**: Deprecated in new design, but stored for data completeness

#### Field 3: Recurring
- **Field Name**: `Recurring`
- **Field Type**: Switch (Boolean)
- **Required**: No
- **Default**: False
- **Purpose**: Mark recurring posts

**Verification:**
- [x] All 3 fields created in Webflow
- [x] Field names match exactly (case-sensitive)
- [x] Field types are correct

**Confirmed Fields:**
- Tags (Multi-reference/Plain Text)
- Recurring (Switch/Boolean)
- Category Color (Plain Text)

---

## Phase 3: Codebase Refactoring ✅ COMPLETED

**Summary:** All files successfully refactored, reorganized, and tested. The codebase now uses a clean architecture with separated concerns, multi-reference field support, and smart sync logic.

### Updated File Structure

```
lib/
├── api/
│   ├── engine.js          // Engine API client (renamed from lib/engine-api.js)
│   └── webflow.js         // Webflow API client (renamed from lib/webflow-api.js)
├── reference.js           // 🆕 NEW: Handle categories & tags (multi-reference)
└── transformer.js         // 🆕 NEW: Data transformation logic

api/
├── sync.js                // Main sync endpoint (orchestrates everything)
└── monitor.js             // Health check

config/
└── constants.js           // Field mappings, collection IDs, endpoints
```

### Step 3.1: Architecture Decisions ✅
**Status**: ✅ Complete

**Multi-Reference Strategy:**
- ✅ **Category**: Multi-reference field in News collection → references "News Category" collection (auto-create category items if missing)
- ✅ **Tags**: Multi-reference field in News collection → references "News Tag" collection (auto-create tag items if missing)
- ✅ Both reference fields point to existing Webflow collections with auto-creation logic for items
- ✅ Caching implemented to minimize API calls

**Final Field Types:**
| Field | Webflow Type | Strategy |
|-------|--------------|----------|
| Category | Multi-Reference → News Category collection | Auto-create category items if they don't exist |
| Tags | Multi-Reference → News Tag collection | Auto-create tag items if they don't exist |
| PostID | Plain Text | Store as string for reliable lookups |
| Excerpt | Multi-line Text | No character limit |
| Category Color | Plain Text | Hex code storage |
| Recurring | Switch | Boolean flag |
| Featured | Switch | Boolean flag |
| Published | Date/Time | Original publish date |
| Last Updated | Date/Time | Last modified date (for smart sync) |

### Step 3.2: New Files to Create
**Status**: ✅ Complete

**Create `lib/reference.js`:**
- [x] ReferenceManager class
- [x] `ensureCategoryExists(name, color)` - Check/create category
- [x] `ensureTagsExist(tagArray)` - Batch check/create tags
- [x] In-memory caching for lookups
- [x] Name normalization logic

**Create `lib/transformer.js`:**
- [x] `transformEngineToWebflow(article, references)` - Main transform
- [x] Handle null/missing values
- [x] Date formatting
- [x] Type conversions (number → string)

### Step 3.3: Files to Rename/Update
**Status**: ✅ Complete

**Rename:**
- [x] `lib/engine-api.js` → `lib/api/engine.js`
- [x] `lib/webflow-api.js` → `lib/api/webflow.js`

**Update `lib/api/engine.js`:**
- [x] Change endpoint to `/GetRecentPostsV2`
- [x] Remove unused functions (getPostBySlug, getPostsByCategory, getAllCategories, searchPosts)
- [x] Keep `getRecentPosts()` and `getPostById()`

**Update `lib/api/webflow.js`:**
- [x] Add `findItemByPostId(postId)` helper
- [x] Add `listItems(collectionId, options)` helper
- [x] Add `createItem(collectionId, data)` helper
- [x] Add `updateItem(collectionId, itemId, data)` helper
- [x] Add `publishItems(collectionId, itemIds)` helper
- [x] Add `createWebflowClient()` for ReferenceManager

**Update `api/sync.js`:**
- [x] Import from new file paths (`lib/api/engine.js`, `lib/api/webflow.js`)
- [x] Import `ReferenceManager` from `lib/reference.js`
- [x] Import `transformEngineToWebflow` from `lib/transformer.js`
- [x] Add reference resolution logic
- [x] Implement smart sync using `updatedDate` comparison
- [x] Add optional `recent` parameter (default: 20)

**Update `api/monitor.js`:**
- [x] Update imports to use new file paths
- [x] Use `listItems()` instead of old `getWebflowItems()`
- [x] Use `WEBFLOW_COLLECTIONS.NEWS` constant

**Update `config/constants.js`:**
- [x] Add `WEBFLOW_COLLECTIONS` object with collection IDs
- [x] Update `FIELD_MAPPING` with all 14 fields
- [x] Update `ENGINE_API.ENDPOINTS.RECENT_POSTS` to use `/GetRecentPostsV2`
- [x] Add `REFERENCE_FIELDS` for category and tag field names
- [x] Add `SYNC_CONFIG.DEFAULT_RECENT_COUNT`

### Step 3.4: Files to Delete
**Status**: ✅ Complete

- [x] `api/webhooks.js` - Redundant with sync endpoint
- [x] `api/manual.js` - Overcomplicated for MVP
- [x] `lib/engine-api.js` - Moved to `lib/api/engine.js`
- [x] `lib/webflow-api.js` - Moved to `lib/api/webflow.js`

---

## Phase 4: Testing & Verification (CURRENT PHASE)

### Step 4.1: Local Testing
**Status**: ⏳ Ready to begin

**Test automatic sync (default 20 posts):**
```bash
npm run dev
curl http://localhost:3000/api/sync
```

**Test manual sync (custom count):**
```bash
curl -X POST http://localhost:3000/api/sync \
  -H "Content-Type: application/json" \
  -d '{"recent": 5}'
```

**Test health check:**
```bash
curl http://localhost:3000/api/monitor
```

**Verification checklist:**
- [ ] Automatic sync works (20 posts)
- [ ] Manual sync works with custom count
- [ ] Articles appear in Webflow CMS
- [ ] All fields mapped correctly
- [ ] Articles are published
- [ ] No errors in logs
- [ ] Health check passes

### Step 4.2: Webflow Verification
**Status**: ⏸️ Waiting for Step 4.1

- [ ] Open Webflow CMS
- [ ] Verify all synced articles present
- [ ] Check field data is correct
- [ ] Verify images loaded properly
- [ ] Check dates formatted correctly
- [ ] Verify published status
- [ ] Test on staging site

### Step 4.3: Production Deployment
**Status**: ⏸️ Waiting for Step 4.1 & 4.2

- [ ] Deploy to Vercel: `vercel --prod`
- [ ] Add environment variables in Vercel
- [ ] Verify cron job is scheduled
- [ ] Test production sync endpoint
- [ ] Monitor first automatic sync
- [ ] Verify in live Webflow site

---

## Phase 5: Documentation Updates

### Step 5.1: Update README.md
**Status**: ⏸️ Waiting for Phase 4

**Simplify documentation to reflect:**
- [ ] Only 2 endpoints: sync + monitor
- [ ] Remove references to webhooks and manual operations
- [ ] Update field mapping table
- [ ] Simplify architecture diagrams
- [ ] Update testing instructions
- [ ] Add simplified quick start guide

### Step 4.2: Create Simple Usage Guide
**Status**: ⏸️ Waiting for Phase 3

Create a simple 1-page guide:
- [ ] How to trigger manual sync
- [ ] How to check sync status
- [ ] Common troubleshooting steps
- [ ] Where to find logs

---

## Manual Sync Usage (Final Implementation)

### Automatic Sync (Cron)
```
Runs every 15 minutes automatically
Syncs 20 most recent posts
No action needed
```

### Manual Sync Options

**Option 1: Default sync (20 posts)**
```bash
curl https://your-domain.vercel.app/api/sync
```

**Option 2: Custom count (e.g., 50 posts)**
```bash
curl -X POST https://your-domain.vercel.app/api/sync \
  -H "Content-Type: application/json" \
  -d '{"recent": 50}'
```

**Option 3: Debug specific article**
```bash
# This would require keeping a minimal debug endpoint
# Decision pending based on Phase 1 requirements
```

---

## Success Criteria

### MVP is complete when:
- [ ] Automatic sync runs every 15 minutes without errors
- [ ] Manual sync works from terminal with custom post counts
- [ ] All Engine API fields map 1-to-1 with Webflow CMS
- [ ] Articles sync correctly with all data intact
- [ ] Images, dates, and formatting preserved
- [ ] Health monitoring works
- [ ] System is deployed to production
- [ ] Documentation is simplified and accurate

---

## Open Questions

1. **Engine API Endpoints**: Which specific endpoints and what's the response structure?
2. **Webflow CMS Structure**: What fields exist, what types, any constraints?
3. **Field Mapping**: Are there any complex transformations needed?
4. **Debug Endpoint**: Do we need ability to sync a specific article by ID for testing?
5. **Error Handling**: How should we handle partial failures (some articles succeed, some fail)?

---

## Next Action

**👉 USER ACTION REQUIRED:**

Please provide the following information:

1. **Engine API Endpoint(s) we're using:**
   - Endpoint URL(s)
   - Sample JSON response with actual data
   - Any required parameters

2. **Webflow CMS Collection Structure:**
   - List all field names
   - Field types (Text, Rich Text, Date, Image, etc.)
   - Current field mapping (if any)
   - Screenshots or export if available

Once this information is provided, we can:
- Create the perfect 1-to-1 field mapping
- Identify any Webflow CMS changes needed
- Begin Phase 2 refactoring

---

**Last Updated**: 2025-10-23  
**Current Phase**: Phase 4 - Testing & Verification  
**Status**: Phase 3 Complete - Ready for local testing and deployment

---

## Environment Variables Required

Before testing, ensure these environment variables are set in your `.env` file:

```bash
# Webflow Configuration
WEBFLOW_API_TOKEN=your_webflow_api_token
WEBFLOW_SITE_ID=your_site_id
WEBFLOW_NEWS_COLLECTION_ID=your_news_collection_id
WEBFLOW_NEWS_CATEGORY_COLLECTION_ID=your_category_collection_id
WEBFLOW_NEWS_TAG_COLLECTION_ID=your_tag_collection_id

# Environment
NODE_ENV=staging  # or production
```
