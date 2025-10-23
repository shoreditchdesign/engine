# Engine-Webflow Sync Setup Documentation

**Last Updated**: 2025-10-23  
**Status**: Phase 4 - Ready for Testing

---

## Table of Contents
1. [Overview](#overview)
2. [Environment Configuration](#environment-configuration)
3. [Field Mapping](#field-mapping)
4. [API Health Check](#api-health-check)
5. [Troubleshooting History](#troubleshooting-history)
6. [Key Decisions](#key-decisions)
7. [Next Steps](#next-steps)

---

## Overview

This project syncs news articles from the Engine API to Webflow CMS automatically. The system includes:
- **Automatic sync**: Runs every 15 minutes via cron
- **Manual sync**: On-demand sync via API endpoint
- **Smart sync**: Only updates articles that have changed (using `updatedDate` comparison)
- **Multi-reference support**: Auto-creates categories and tags in Webflow

---

## Environment Configuration

### Current Configuration

**File**: `.env`

```bash
# Node Environment
NODE_ENV=production  # ✅ Changed from staging to production

# Webflow API Configuration
WEBFLOW_API_TOKEN=753c70d17519e35e7101825a20257345000ca715f59e1827ec03cf3b76399542
WEBFLOW_SITE_ID=68b1c2c2623a4419e1af824d

# Webflow Collection IDs
WEBFLOW_NEWS_COLLECTION_ID=68dce8b9b39e7b0b2b040cf5
WEBFLOW_NEWS_CATEGORY_COLLECTION_ID=68dce91bbfdf950f5b1531fe
WEBFLOW_NEWS_TAG_COLLECTION_ID=68f8fb7885da7e9205ca38ab
```

### Environment Notes

- **Staging API**: `https://uat-brochure.engine.online/api/EngineNews` - Returns empty arrays (no data in staging DB)
- **Production API**: `https://feeds.engine.online/api/EngineNews` - Returns live data (currently in use)

---

## Field Mapping

### Engine API → Webflow CMS Complete Mapping

**Total Fields**: 14 core fields + 2 sync metadata fields

| Engine API Field | Webflow CMS Field | Type | Notes |
|-----------------|-------------------|------|-------|
| `postId` | `postid` | Plain Text (as string) | Used for lookups |
| `title` | `title` (name) | Plain Text | Article title |
| `slug` | `slug` | Plain Text | URL slug |
| `content` | `content` | Rich Text | Full article HTML |
| `desc` | `excerpt` | Multi-line Text | Article excerpt/description |
| `timestamp` | `published` | Date/Time | Original publish date |
| `updatedDate` | `last-updated` | Date/Time | Last modified date (for smart sync) |
| `cat` | `category` | Multi-Reference | → News Category collection |
| `tags` | `tags` | Multi-Reference | → News Tag collection (array) |
| `color` | `category-color` | Plain Text | Hex code (e.g., "#27C043") |
| `isFeatured` | `featured` | Switch | Boolean flag |
| `isRecurring` | `recurring` | Switch | Boolean flag |
| `featuredImageBig` | `featured-big` | Link/URL | 1200w image URL |
| `featuredImageSmall` | `featured-small` | Link/URL | 600w image URL |
| — | `last-synced` | Date/Time | Auto-generated sync timestamp |
| — | `sync-status` | Plain Text | Always "Synced" |

### Featured Image Fields - Important Notes

**Decision**: Use Link/URL fields (not Image fields) for featured images

**Rationale**:
- Engine API returns plain URL strings
- Webflow Link fields accept plain URL strings directly
- No need for complex object transformation
- Simpler implementation and more reliable

**Field Names**:
- Originally: `featured-image-source-big` and `featured-image-source-small`
- Changed to: `featured-big` and `featured-small` (simpler names)
- API propagation may take a few minutes after Webflow field name changes

**Image Alt Text**:
- Engine API does NOT provide separate alt text fields for featured images
- Alt text in `content` field is for embedded images only, not featured thumbnails
- **Decision**: Skip alt text for featured images (not available from API)

---

## API Health Check

### Endpoint
```bash
GET http://localhost:3000/api/monitor
```

### Expected Response (Healthy)
```json
{
  "engine_api": "healthy",
  "webflow_api": "healthy",
  "last_sync": "not implemented",
  "timestamp": "2025-10-23T10:11:27.828Z"
}
```

### Health Check Status History

#### Initial Issue: Webflow API Failing
**Problem**: Health check returned:
```json
{
  "engine_api": "healthy",
  "webflow_api": "unhealthy"
}
```

**Root Cause**: Webflow API token missing required scopes

**Error Message**:
```
OAuthForbidden: You are missing the following scopes - 'cms:read'
```

**Resolution**: Updated Webflow API token with required scopes:
- ✅ `cms:read` - Read CMS items
- ✅ `cms:write` - Create and update CMS items
- ✅ `cms:items:read` - Read collection items
- ✅ `cms:items:write` - Write collection items

**Result**: Health check now passes with HTTP 200 status

---

## Troubleshooting History

### Issue 1: Staging API Returns Empty Arrays

**Symptoms**:
```json
{
  "featured": [],
  "recentNews": {"1": [], "2": [], "3": [], "4": [], "5": [], "6": []}
}
```

**Investigation**:
- API responds with HTTP 200 ✅
- Returns valid JSON structure ✅
- Content-encoding: gzip (handled automatically by node-fetch) ✅
- Structure matches production exactly ✅

**Root Cause**: Staging database has no articles

**Evidence**:
- GetPostById endpoint returns nothing
- All arrays empty across all endpoints
- Backend/database issue, not API integration problem

**Solution**: Switched to `NODE_ENV=production` to use production data

---

### Issue 2: Field Name Verification for Featured Images

**Investigation**: Checked actual Webflow CMS field names via API

**API Query**:
```bash
curl https://api.webflow.com/v2/collections/68dce8b9b39e7b0b2b040cf5
```

**Findings**:
- Current API shows: `featured-image-source-big` and `featured-image-source-small`
- Webflow Designer updated to: `featured-big` and `featured-small`
- API changes take time to propagate after publishing

**Resolution**: Reverted mapping to use `featured-big` and `featured-small` (simpler names as intended)

**Mapping Updated in**: `config/constants.js`

---

## Key Decisions

### Decision 1: Environment Selection
- **Chosen**: Production environment (`NODE_ENV=production`)
- **Reason**: Staging database is empty, production has live data
- **Impact**: Can test real sync with actual articles

### Decision 2: Featured Image Implementation
- **Chosen**: Link/URL fields storing plain URL strings
- **Alternative Considered**: Image fields with fileId/url/alt object structure
- **Reason**: Simpler, matches Engine API response format exactly
- **Impact**: No transformation needed, direct pass-through

### Decision 3: Image Alt Text
- **Chosen**: Skip alt text for featured images
- **Reason**: Engine API doesn't provide alt text for featured thumbnails
- **Alternative Considered**: Extract from content HTML or generate from title
- **Impact**: Featured images will not have alt text (acceptable for MVP)

### Decision 4: Field Naming Convention
- **Chosen**: Simple field names (`featured-big`, `featured-small`)
- **Reason**: Cleaner, easier to maintain
- **Previous**: `featured-image-source-big` was too verbose

### Decision 5: Smart Sync Logic
- **Chosen**: Compare `updatedDate` from Engine with `last-updated` in Webflow
- **Reason**: Avoid unnecessary updates, save API calls
- **Impact**: Only articles that changed will be updated

---

## Architecture Overview

### File Structure
```
engine/
├── api/
│   ├── sync.js           # Main sync endpoint (automatic + manual)
│   └── monitor.js        # Health check endpoint
├── lib/
│   ├── api/
│   │   ├── engine.js     # Engine API client
│   │   └── webflow.js    # Webflow API client
│   ├── reference.js      # Multi-reference manager (categories/tags)
│   ├── transformer.js    # Data transformation logic
│   └── utils.js          # Helper functions
├── config/
│   └── constants.js      # Field mappings, collection IDs, endpoints
├── .env                  # Environment variables
├── PLAN.md               # Detailed implementation plan
└── setup.md             # This file
```

### Data Flow

```
Engine API (GetRecentPostsV2)
    ↓
Article Validation (validateArticle)
    ↓
Reference Resolution (ReferenceManager)
    - Auto-create Category if needed
    - Auto-create Tags if needed
    ↓
Data Transformation (transformEngineToWebflow)
    - Map 14 fields
    - Add sync metadata
    ↓
Webflow API Check
    - Find existing by postId
    - Compare updatedDate (needsUpdate)
    ↓
Create or Update in Webflow
    ↓
Publish Items
```

---

## Current Status

### ✅ Completed (Phase 1-3)
- [x] Engine API endpoint analysis
- [x] Webflow CMS structure documentation
- [x] 1-to-1 field mapping (14 fields)
- [x] New Webflow fields added (Tags, Category Color, Recurring)
- [x] Codebase refactored and organized
- [x] Multi-reference support implemented
- [x] Smart sync logic implemented
- [x] Transformer created
- [x] Health check endpoint working
- [x] Environment configured (production mode)
- [x] API token permissions fixed

### ⏳ Current Phase: Testing & Verification (Phase 4)

#### Ready to Test:
1. **Automatic sync** (default 20 posts):
   ```bash
   curl http://localhost:3000/api/sync
   ```

2. **Manual sync** (custom count):
   ```bash
   curl -X POST http://localhost:3000/api/sync \
     -H "Content-Type: application/json" \
     -d '{"recent": 5}'
   ```

3. **Health check**:
   ```bash
   curl http://localhost:3000/api/monitor
   ```

#### Verification Checklist:
- [ ] Automatic sync works (20 posts)
- [ ] Manual sync works with custom count
- [ ] Articles appear in Webflow CMS
- [ ] All 14 fields mapped correctly
- [ ] Images load properly (featured-big and featured-small)
- [ ] Dates formatted correctly
- [ ] Categories auto-created
- [ ] Tags auto-created
- [ ] Smart sync only updates changed articles
- [ ] Articles are published
- [ ] No errors in logs
- [ ] Health check passes

---

## Next Steps

### Immediate (Phase 4.1)
1. **Restart Vercel dev** (to pick up NODE_ENV=production change)
2. **Run health check** to confirm both APIs healthy
3. **Test sync endpoint** with small batch (5 posts)
4. **Verify in Webflow CMS**:
   - Check all fields populated
   - Verify images display correctly
   - Confirm categories and tags created
   - Test smart sync (run again, should skip unchanged)

### Phase 4.2: Webflow Verification
- Open Webflow CMS
- Verify all synced articles present
- Check field data accuracy
- Verify images loaded properly
- Check dates formatted correctly
- Verify published status
- Test on staging site

### Phase 4.3: Production Deployment
- Deploy to Vercel: `vercel --prod`
- Add environment variables in Vercel dashboard
- Verify cron job is scheduled (15 min intervals)
- Test production sync endpoint
- Monitor first automatic sync
- Verify in live Webflow site

---

## API Endpoints Reference

### Engine API

**Base URLs**:
- Staging: `https://uat-brochure.engine.online/api/EngineNews`
- Production: `https://feeds.engine.online/api/EngineNews`

**Endpoints**:
- `GET /GetRecentPostsV2?recent={count}` - Fetch recent articles
- `GET /GetPostById?postId={id}` - Fetch single article (debugging)

**Sample Response** (GetRecentPostsV2):
```json
{
  "featured": [
    {
      "postId": 29406,
      "title": "Global LNG sales to hit 4 million mt in 2025 - report",
      "slug": "global-lng-sales-to-hit-4-million-mt-in-2025-report-72de",
      "content": "<p>Full HTML content...</p>",
      "desc": "Article excerpt...",
      "timestamp": "2025-10-23T07:51:02",
      "updatedDate": "2025-10-23T07:51:02",
      "cat": "Alternative Fuels",
      "color": "#27C043",
      "tags": ["China", "Netherlands", "Singapore", "LNG"],
      "isFeatured": true,
      "isRecurring": false,
      "featuredImageBig": "https://trade.engine.online/blobs/news/...-1200w.jpg",
      "featuredImageSmall": "https://trade.engine.online/blobs/news/...-600w.jpg"
    }
  ],
  "recentNews": {
    "1": [...],
    "2": [...],
    ...
  }
}
```

### Webflow API

**Base URL**: `https://api.webflow.com/v2`

**Authentication**: Bearer token in Authorization header

**Key Endpoints Used**:
- `GET /collections/{collectionId}/items` - List items
- `POST /collections/{collectionId}/items` - Create item
- `PATCH /collections/{collectionId}/items/{itemId}` - Update item
- `POST /collections/{collectionId}/items/publish` - Publish items

**Collection IDs**:
- News: `68dce8b9b39e7b0b2b040cf5`
- News Category: `68dce91bbfdf950f5b1531fe`
- News Tag: `68f8fb7885da7e9205ca38ab`

---

## Testing Commands

### Health Check
```bash
# Basic health check
curl http://localhost:3000/api/monitor

# With headers
curl -i http://localhost:3000/api/monitor
```

### Sync Endpoints
```bash
# Automatic sync (20 posts default)
curl http://localhost:3000/api/sync

# Manual sync (custom count)
curl -X POST http://localhost:3000/api/sync \
  -H "Content-Type: application/json" \
  -d '{"recent": 5}'

# Test with 1 post for debugging
curl -X POST http://localhost:3000/api/sync \
  -H "Content-Type: application/json" \
  -d '{"recent": 1}'
```

### Direct API Testing
```bash
# Test Engine API directly
curl "https://feeds.engine.online/api/EngineNews/GetRecentPostsV2?recent=1"

# Test Webflow API directly
curl -X GET "https://api.webflow.com/v2/collections/68dce8b9b39e7b0b2b040cf5/items?offset=0&limit=1" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "accept: application/json"
```

---

## Common Issues & Solutions

### Issue: Webflow API returns 403 Forbidden
**Solution**: Check API token has `cms:read` and `cms:write` scopes

### Issue: Staging API returns empty arrays
**Solution**: Use production environment (`NODE_ENV=production`)

### Issue: Field names don't match
**Solution**: Query Webflow API to verify actual field slugs after publishing changes

### Issue: Images not displaying
**Solution**: Verify featured-big and featured-small are Link/URL fields, not Image fields

### Issue: Sync running but no updates
**Solution**: Check smart sync logic - may be skipping unchanged articles (this is correct behavior)

---

## Performance Notes

- **Default batch size**: 20 articles
- **API timeout**: 30 seconds
- **Max retries**: 3 (with exponential backoff)
- **Cache TTL**: 15 minutes (for reference lookups)
- **Cron interval**: 15 minutes (automatic sync)

---

## Security Notes

- API tokens stored in `.env` (never commit to git)
- `.env` is in `.gitignore`
- Production tokens should be stored in Vercel environment variables
- Use environment-specific tokens (staging vs production)

---

## Success Criteria

MVP is complete when:
- ✅ Automatic sync runs every 15 minutes without errors
- ✅ Manual sync works from terminal with custom post counts
- ✅ All 14 Engine API fields map 1-to-1 with Webflow CMS
- ✅ Articles sync correctly with all data intact
- ✅ Images, dates, and formatting preserved
- ✅ Categories and tags auto-created
- ✅ Smart sync prevents unnecessary updates
- ✅ Health monitoring works
- ✅ System is deployed to production
- ✅ Documentation is complete and accurate

---

**End of Setup Documentation**
