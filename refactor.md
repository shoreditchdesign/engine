# Sync & Archive Function Optimization - November 2025

## Context

User identified critical performance and reliability issues with the sync function after successful Azure migration:

### Problems Identified

1. **Insufficient Coverage**: Only syncing 20 recent posts, needs 200
2. **Rate Limiting**: 9,000 articles in Webflow causing ~18,000 API calls during sync
   - Current: `findItemByPostId()` for each article = 200 articles × 90 pagination calls
3. **Image Import Failures**: 8 articles failed during migration with Engine CDN content-type errors
4. **Aggressive Retry Logic**: Exponential backoff too aggressive for typical 3-4 daily updates
   - Old delays: 1s, 2s, 4s, 8s, 16s, 32s, 64s, 128s, 256s, 512s = ~17 minutes total
5. **No Error Categorization**: Retrying permanent errors (400, 401) wastes time
6. **Archive Performance**: Category lookups for each article causing repeated pagination

## Solutions Implemented

### 1. Increased Recent Posts Count
**File**: `config/constants.js:56`
```javascript
DEFAULT_RECENT_COUNT: 200, // Changed from 20
```

### 2. Preloading Pattern (Performance)
**Files**: `api/sync.js`, `api/archive.js`, `lib/api/webflow.js`

**Sync Function**:
- Preload all 8,452 Webflow articles once (~85 API calls)
- Store in Map for O(1) lookups
- Reduces ~18,000 API calls to ~90 calls (99.5% reduction)

**Archive Function**:
- Preload all categories once
- O(1) lookup instead of pagination for each article

**Test Results**:
- Loaded 8,452 articles in ~28 seconds (~300 articles/sec)

### 3. Smart Error Categorization
**File**: `lib/utils.js:13-97`

```javascript
export function categorizeError(error) {
  // Returns: { isRetryable, isImageError, category }
  
  // Retryable errors:
  // - 429 (rate limit)
  // - 500, 502, 503, 504 (server errors)
  // - ECONNRESET, ETIMEDOUT, ENOTFOUND (network)
  
  // Non-retryable errors:
  // - 400, 422 (validation)
  // - 401, 403 (auth)
  // - 404 (not found)
  
  // Special handling:
  // - Image import errors (retry without images)
}
```

### 4. Capped Exponential Backoff
**File**: `config/constants.js:58`

```javascript
RETRY_DELAYS: [1000, 2000, 4000, 5000, 5000, 5000, 5000, 5000, 5000, 5000]
// Max delay: 5s (instead of unlimited exponential)
```

**Updated Retry Logic**: `lib/utils.js:100-153`
- Only retries transient errors
- Permanent errors fail immediately
- Uses capped delays from constants

### 5. Image Error Fallback
**Files**: `api/sync.js`, `lib/transformer.js`

**Transformer Update**:
```javascript
export function transformEngineToWebflow(
  engineArticle,
  references,
  useHashedSlug = false,
  excludeSlug = false,
  excludeImages = false, // NEW PARAMETER
)
```

**Sync Logic**:
- On image import error, retry without images
- Article syncs successfully, logged as warning
- User sees: "Article created without images due to import error"

### 6. Warnings Array
**Files**: `api/sync.js:36`, `api/archive.js:34`

```javascript
const summary = {
  created: [],
  updated: [],
  skipped: [],
  errors: [],
  errorDetails: [],
  warnings: [], // NEW
  totalChecked: 0,
};
```

**Output**:
```
✓ Sync complete: Created X | Updated Y | Skipped Z | Warnings W | Errors E
```

## Data Merge Issue Discovery

### Problem
Articles failing with validation error:
```json
{
  "message": "Validation Error",
  "code": "validation_error",
  "details": [{
    "param": "source-published",
    "description": "Field not described in schema: undefined"
  }]
}
```

**Root Cause**:
- `getRecentPosts()` returns: `timestamp` ✓, `updatedDate` ✓
- `getPostById()` returns: `timestamp` ✓, `updatedDate` = `undefined`
- Original merge: `{ ...article, ...fullArticle }` overwrites `updatedDate` with `undefined`

### Fix Applied
**File**: `api/sync.js:65-67`, `functions/sync/index.js:66-73`

```javascript
// OLD (BROKEN):
const completeArticle = { ...article, ...fullArticle };

// NEW (FIXED):
const completeArticle = {
  ...article, // Keep all fields from getRecentPosts (includes updatedDate)
  content: fullArticle.content, // Add content field from getPostById
};
```

### Date Formatting Fix
**File**: `lib/transformer.js:91-99`

Engine API returns dates without timezone: `2025-11-14T15:19:03`
Webflow requires full ISO 8601: `2025-11-14T15:19:03.000Z`

```javascript
// OLD:
[FIELD_MAPPING.timestamp]: engineArticle.timestamp || new Date().toISOString(),

// NEW:
[FIELD_MAPPING.timestamp]: engineArticle.timestamp
  ? new Date(engineArticle.timestamp).toISOString()
  : new Date().toISOString(),
```

## Outstanding Issue

**Error Still Occurring**:
```json
{"param":"source-published","description":"Field not described in schema: undefined"}
```

**Current Analysis**:
- Error message says the field VALUE is `undefined`, not that field is missing from schema
- Some articles may have missing `timestamp` or `desc` fields entirely
- Sending `undefined` values to Webflow API causes validation error
- Previous version may have ignored/skipped missing fields

**Next Step**: 
Filter out undefined/null values from fieldData before sending to Webflow API.

## Files Modified

### Core Logic
1. `config/constants.js` - Updated defaults and retry delays
2. `lib/utils.js` - Added error categorization, updated retry logic
3. `lib/transformer.js` - Added excludeImages parameter, fixed date formatting
4. `lib/api/webflow.js` - Already had preloadAllItems() from migrate function

### Sync Function
5. `api/sync.js` - Preloading + image fallback + warnings + data merge fix
6. `functions/sync/index.js` - Azure Functions version with all improvements

### Archive Function
7. `api/archive.js` - Preload categories + error handling + warnings
8. `functions/archive/index.js` - Azure Functions version with all improvements

## Performance Metrics

**Before Optimization**:
- API calls per sync (200 articles): ~18,000
- Retry time for 10 failures: ~17 minutes
- No graceful handling of image errors

**After Optimization**:
- API calls per sync: ~90 (99.5% reduction)
- Max retry time: ~40 seconds (capped at 5s delays)
- Image errors handled gracefully with warnings
- Preload time: ~28 seconds for 8,452 articles

## Test Results

```bash
npm run sync 5
```

**Output**:
- ✓ Preloaded 8,452 articles in ~28 seconds
- ✓ Error categorization working (identified VALIDATION_ERROR as non-retryable)
- ✗ 5 articles failing with undefined field values

**Next Action**: Implement undefined value filtering in transformer.
