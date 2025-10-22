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
| tags | → | Tags | 🆕 ADD |
| color | → | Category Color | 🆕 ADD |
| isFeatured | → | Featured | ✅ Existing |
| isRecurring | → | Recurring | 🆕 ADD |
| featuredImageBig | → | Featured (Big) | ✅ Existing |
| featuredImageSmall | → | Featured (Small) | ✅ Existing |

**3 New Fields Required:**
1. **Tags** (Multi-reference/Plain Text) - Separate from Category
2. **Category Color** (Plain Text) - Hex code, for data completeness
3. **Recurring** (Switch) - Boolean, for data completeness

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

## Phase 3: Codebase Simplification (CURRENT PHASE)

### Step 3.1: Remove Unnecessary Endpoints
**Status**: ⏳ In progress

**Files to DELETE:**
- [ ] `api/webhooks.js` - Redundant with sync endpoint
- [ ] `api/manual.js` - Overcomplicated for MVP

**Files to KEEP:**
- [ ] `api/sync.js` - Core automatic + manual sync
- [ ] `api/monitor.js` - Health check for debugging

### Step 2.2: Simplify sync.js
**Status**: ⏸️ Waiting for Phase 1

**Changes:**
- [ ] Add optional `recent` parameter to accept custom sync count
- [ ] Default to 20 posts for cron job
- [ ] Allow manual override: `{"recent": 50}` for manual syncs
- [ ] Keep existing `runSync()` logic but make it flexible

**Before:**
```javascript
// Only syncs 20 posts, hardcoded
const engineData = await getRecentPosts(20);
```

**After:**
```javascript
// Accepts custom count, defaults to 20
export default async function handler(req, res) {
  const recentCount = req.body?.recent || 20;
  const summary = await runSync(recentCount);
  return res.status(200).json(summary);
}

export async function runSync(recentCount = 20) {
  const engineData = await getRecentPosts(recentCount);
  // ... rest of sync logic
}
```

### Step 2.3: Clean Up Engine API Client
**Status**: ⏸️ Waiting for Phase 1

**Remove unused functions from `lib/engine-api.js`:**
- [ ] `getPostBySlug()` - Not needed for MVP
- [ ] `getPostsByCategory()` - Not needed for MVP (was only for full-sync)
- [ ] `getAllCategories()` - Not needed for MVP (was only for full-sync)
- [ ] `searchPosts()` - Not needed for MVP

**Keep only:**
- [ ] `getRecentPosts()` - Core sync function
- [ ] `getPostById()` - Useful for debugging specific articles

### Step 2.4: Update Field Mapping
**Status**: ⏸️ Waiting for Phase 1 completion

Based on the 1-to-1 mapping from Phase 1:
- [ ] Update `FIELD_MAPPING` in `config/constants.js`
- [ ] Update `transformEngineDataToWebflow()` in `lib/webflow-api.js`
- [ ] Remove any unused field mappings
- [ ] Ensure all mappings are correct

### Step 2.5: Simplify Constants
**Status**: ⏸️ Waiting for Phase 1

**Update `config/constants.js`:**
- [ ] Remove unused endpoint definitions
- [ ] Keep only `RECENT_POSTS` and `POST_BY_ID`
- [ ] Verify `FIELD_MAPPING` matches actual Webflow structure
- [ ] Keep `SYNC_CONFIG` as-is

---

## Phase 4: Testing & Verification

### Step 4.1: Local Testing
**Status**: ⏸️ Waiting for Phase 3

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

### Step 3.2: Webflow Verification
**Status**: ⏸️ Waiting for Phase 2

- [ ] Open Webflow CMS
- [ ] Verify all synced articles present
- [ ] Check field data is correct
- [ ] Verify images loaded properly
- [ ] Check dates formatted correctly
- [ ] Verify published status
- [ ] Test on staging site

### Step 3.3: Production Deployment
**Status**: ⏸️ Waiting for Phase 3.1 & 3.2

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

**Last Updated**: 2025-10-22  
**Current Phase**: Phase 1 - Data Mapping Analysis  
**Status**: Awaiting user input on API structure and Webflow CMS fields
