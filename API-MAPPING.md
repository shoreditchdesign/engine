# Engine API to Webflow CMS Mapping

## Engine API Endpoints

### Base URLs
- **Staging**: `https://uat-brochure.engine.online/api/EngineNews`
- **Production**: `https://feeds.engine.online/api/EngineNews` (assumed)

---

## Endpoint 1: Get Recent Posts (Bulk Sync)

### URL
```
GET /GetRecentPostsV2?recent={count}
```

### Example
```
https://uat-brochure.engine.online/api/EngineNews/GetRecentPostsV2?recent=5
```

### Response Structure
```json
{
  "isRecurring": true,
  "updatedDate": "2025-10-22T13:53:57.511Z",
  "content": "string",
  "featuredImageSmall": "string",
  "featuredImageBig": "string",
  "desc": "string",
  "slug": "string",
  "postId": 0,
  "cat": "string",
  "color": "string",
  "timestamp": "2025-10-22T13:53:57.511Z",
  "title": "string",
  "tags": ["string"],
  "isFeatured": true
}
```

### Fields Available (14 total)
| Field | Type | Example | Notes |
|-------|------|---------|-------|
| `isRecurring` | boolean | `true` | **NEW** - Not in old code |
| `updatedDate` | ISO Date | `"2025-10-22T13:53:57.511Z"` | **NEW** - Not in old code |
| `content` | string (HTML) | `"<p>Article content</p>"` | Rich text content |
| `featuredImageSmall` | string (URL) | `"https://..."` | Thumbnail image |
| `featuredImageBig` | string (URL) | `"https://..."` | Featured image |
| `desc` | string | `"Article description"` | Excerpt/summary |
| `slug` | string | `"article-title"` | URL slug |
| `postId` | number | `12345` | Unique identifier |
| `cat` | string | `"Technology"` | Category name |
| `color` | string | `"#FF5733"` | Category color |
| `timestamp` | ISO Date | `"2025-10-22T13:53:57.511Z"` | Publish date |
| `title` | string | `"Article Title"` | Article title |
| `tags` | array | `["news", "tech"]` | Article tags |
| `isFeatured` | boolean | `true` | Featured flag |

---

## Endpoint 2: Get Post By ID (Single Post)

### URL
```
GET /GetPostById?postId={id}
```

### Example
```
https://uat-brochure.engine.online/api/EngineNews/GetPostById?postId=12345
```

### Response Structure
```json
{
  "category": "string",
  "content": "string",
  "desc": "string",
  "slug": "string",
  "nextPost": {
    "content": "string",
    "featuredImageSmall": "string",
    "featuredImageBig": "string",
    "desc": "string",
    "slug": "string",
    "postId": 0,
    "cat": "string",
    "color": "string",
    "timestamp": "2025-10-22T13:54:57.836Z",
    "title": "string",
    "tags": ["string"],
    "isFeatured": true
  },
  "sidebar": [
    {
      "content": "string",
      "featuredImageSmall": "string",
      "featuredImageBig": "string",
      "desc": "string",
      "slug": "string",
      "postId": 0,
      "cat": "string",
      "color": "string",
      "timestamp": "2025-10-22T13:54:57.836Z",
      "title": "string",
      "tags": ["string"],
      "isFeatured": true
    }
  ],
  "postId": 0,
  "color": "string",
  "timestamp": "2025-10-22T13:54:57.836Z",
  "title": "string",
  "tags": ["string"],
  "isFeatured": true
}
```

### Fields Available (Main Post)
| Field | Type | Example | Notes |
|-------|------|---------|-------|
| `category` | string | `"Technology"` | **Different from `cat` in V2** |
| `content` | string (HTML) | `"<p>Article content</p>"` | Rich text content |
| `desc` | string | `"Article description"` | Excerpt/summary |
| `slug` | string | `"article-title"` | URL slug |
| `postId` | number | `12345` | Unique identifier |
| `color` | string | `"#FF5733"` | Category color |
| `timestamp` | ISO Date | `"2025-10-22T13:54:57.836Z"` | Publish date |
| `title` | string | `"Article Title"` | Article title |
| `tags` | array | `["news", "tech"]` | Article tags |
| `isFeatured` | boolean | `true` | Featured flag |
| `nextPost` | object | `{...}` | **NEW** - Related post data |
| `sidebar` | array | `[{...}]` | **NEW** - Related posts for sidebar |

### Notes on GetPostById Response
- **Missing fields**: `featuredImageSmall`, `featuredImageBig`, `isRecurring`, `updatedDate`
- **Uses `category` instead of `cat`**
- **Includes extra fields**: `nextPost`, `sidebar` (we probably don't need these for CMS sync)

---

## Issues Identified

### 1. ⚠️ Current Code Uses Wrong Endpoint
**Current:** `/GetRecentPosts`  
**Should be:** `/GetRecentPostsV2`

### 2. ⚠️ New Fields Not Mapped
These fields exist in API but aren't in current code:
- `isRecurring` (boolean)
- `updatedDate` (ISO Date)

### 3. ⚠️ Field Name Inconsistency
- GetRecentPostsV2 uses: `cat`
- GetPostById uses: `category`

### 4. ⚠️ Missing Image URLs in GetPostById
GetPostById response doesn't include:
- `featuredImageSmall`
- `featuredImageBig`

**Decision:** ✅ Use **only GetRecentPostsV2** for all sync operations

---

## Sync Logic (CONFIRMED)

### Single Endpoint Strategy
**Use `/GetRecentPostsV2` exclusively** - has all fields including images

### Smart Sync Logic Using `updatedDate`

The `updatedDate` field in V2 is the key to intelligent syncing:

```
For each article from GetRecentPostsV2:
  
  1. Check if postId exists in Webflow CMS
  
  2. If NOT found:
     → CREATE new article in Webflow
  
  3. If FOUND:
     → Compare updatedDate with last-synced timestamp
     → If updatedDate is newer:
        → UPDATE article in Webflow
     → If same or older:
        → SKIP (no changes)
```

### Benefits
- ✅ Only syncs what's actually changed
- ✅ Avoids unnecessary API calls
- ✅ Handles edits automatically
- ✅ Detects new articles
- ✅ More efficient than full sync every time

### Fields We'll Sync (14 total)
1. `postId` - Unique identifier (for matching)
2. `title` - Article title
3. `slug` - URL slug
4. `content` - Rich HTML content
5. `desc` - Excerpt/description
6. `timestamp` - Original publish date
7. `updatedDate` - **Last modified date (KEY FIELD)**
8. `cat` - Category name
9. `color` - Category color
10. `tags` - Array of tags
11. `isFeatured` - Featured flag
12. `isRecurring` - Recurring post flag
13. `featuredImageSmall` - Thumbnail URL
14. `featuredImageBig` - Hero image URL

### Implementation Note
We'll store `updatedDate` in Webflow as `last-modified` and use it to compare against Engine's `updatedDate` on each sync cycle.

---

## Webflow CMS Structure (AWAITING INPUT)

Please provide:
1. **List all field names** in your Webflow collection
2. **Field types** (Plain Text, Rich Text, Date/Time, Image, Switch, Multi-reference, etc.)
3. **Field constraints** (required, unique, etc.)

### Example Format:
```
Field Name          | Type          | Required | Notes
--------------------|---------------|----------|-------
name                | Plain Text    | Yes      | Article title
slug                | Plain Text    | Yes      | Unique URL slug
body-content        | Rich Text     | Yes      | Article HTML content
excerpt             | Multi-line    | No       | Short description
publish-date        | Date/Time     | Yes      | When published
category            | Plain Text    | No       | Category name
featured            | Switch        | No       | Is featured?
hero-image          | Image         | No       | Main image
thumbnail           | Image         | No       | Small image
```

---

## Next Steps

1. ✅ **User confirms endpoint names** (GetPostById vs GetRecentPostsV2)
2. ✅ **User provides Webflow CMS structure**
3. ⏳ Create complete field mapping
4. ⏳ Recommend Webflow CMS changes for 1-to-1 mapping
5. ⏳ Update codebase to use correct endpoints

---

**Last Updated**: 2025-10-22  
**Status**: Awaiting clarification on endpoints and Webflow structure
