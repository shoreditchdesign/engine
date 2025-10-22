# Engine API to Webflow CMS Field Mapping

## Webflow CMS Fields (Current Structure)

From the CSV export, your Webflow collection has these fields:

| # | Webflow Field | Type | Currently Used |
|---|---------------|------|----------------|
| 1 | Title | Plain Text | ✅ Yes |
| 2 | Slug | Plain Text | ✅ Yes |
| 3 | Collection ID | System | Auto (Webflow) |
| 4 | Locale ID | System | Auto (Webflow) |
| 5 | Item ID | System | Auto (Webflow) |
| 6 | Archived | System | Auto (Webflow) |
| 7 | Draft | System | Auto (Webflow) |
| 8 | Created On | System | Auto (Webflow) |
| 9 | Updated On | System | Auto (Webflow) |
| 10 | Published On | System | Auto (Webflow) |
| 11 | PostID | Number/Text | ✅ Yes |
| 12 | Category | Plain Text | ✅ Yes |
| 13 | Published | Date | ✅ Yes |
| 14 | Last Updated | Date | ✅ Yes |
| 15 | Last Synced | Date | ✅ Yes |
| 16 | Sync Status | Plain Text | ✅ Yes |
| 17 | Excerpt | Plain Text / Multi-line | ✅ Yes |
| 18 | Content | Rich Text | ✅ Yes |
| 19 | Featured | Switch/Boolean | ✅ Yes |
| 20 | Featured (Big) | Image | ✅ Yes |
| 21 | Featured (Small) | Image | ✅ Yes |

---

## Engine API Fields (GetRecentPostsV2)

From your API response, Engine provides these fields:

| # | Engine Field | Type | Value |
|---|--------------|------|-------|
| 1 | postId | number | `12345` |
| 2 | title | string | `"Article Title"` |
| 3 | slug | string | `"article-title"` |
| 4 | content | string (HTML) | `"<p>Content</p>"` |
| 5 | desc | string | `"Description"` |
| 6 | timestamp | ISO Date | `"2025-10-22T13:53:57.511Z"` |
| 7 | updatedDate | ISO Date | `"2025-10-22T13:53:57.511Z"` |
| 8 | cat | string | `"Technology"` |
| 9 | color | string | `"#FF5733"` |
| 10 | tags | array | `["news", "tech"]` |
| 11 | isFeatured | boolean | `true` |
| 12 | isRecurring | boolean | `true` |
| 13 | featuredImageSmall | string (URL) | `"https://..."` |
| 14 | featuredImageBig | string (URL) | `"https://..."` |

---

## 1-to-1 Field Mapping

### ✅ Perfect Matches (Already Mapped)

| Engine Field | → | Webflow Field | Type | Notes |
|--------------|---|---------------|------|-------|
| `postId` | → | `PostID` | Number | ✅ Unique identifier |
| `title` | → | `Title` | Text | ✅ Article title |
| `slug` | → | `Slug` | Text | ✅ URL slug |
| `content` | → | `Content` | Rich Text | ✅ HTML content |
| `desc` | → | `Excerpt` | Text | ✅ Description/summary |
| `timestamp` | → | `Published` | Date | ✅ Original publish date |
| `cat` | → | `Category` | Text | ✅ Category name |
| `isFeatured` | → | `Featured` | Switch | ✅ Featured flag |
| `featuredImageBig` | → | `Featured (Big)` | Image | ✅ Hero image |
| `featuredImageSmall` | → | `Featured (Small)` | Image | ✅ Thumbnail |
| `updatedDate` | → | `Last Updated` | Date | ✅ Last modified date |
| Current sync time | → | `Last Synced` | Date | ✅ Sync timestamp |
| Sync result | → | `Sync Status` | Text | ✅ Status tracking |

**Total Mapped: 13 fields** ✅

---

## ⚠️ Missing Mappings (Need to Add)

### 1. Missing in Webflow: `color` (Category Color)

**Engine Field:** `color` (string, e.g., `"#FF5733"`)  
**Webflow Field:** ❌ **DOES NOT EXIST**

**Action Required:**
```
Add new field in Webflow CMS:
- Field Name: "Category Color" or "Color"
- Field Type: Plain Text
- Purpose: Store hex color code for category
```

### 2. Missing in Webflow: `tags` (Article Tags)

**Engine Field:** `tags` (array, e.g., `["news", "tech"]`)  
**Webflow Field:** ❌ **DOES NOT EXIST**

**Action Required:**
```
Add new field in Webflow CMS:
- Field Name: "Tags"
- Field Type: Plain Text (comma-separated) OR Multi-reference
- Purpose: Store article tags
```

**Note:** If you want proper tag filtering/relationships, use **Multi-reference** field type. If you just need to display tags, use **Plain Text** with comma-separated values.

### 3. Missing in Webflow: `isRecurring` (Recurring Post Flag)

**Engine Field:** `isRecurring` (boolean, e.g., `true`)  
**Webflow Field:** ❌ **DOES NOT EXIST**

**Action Required:**
```
Add new field in Webflow CMS:
- Field Name: "Is Recurring" or "Recurring"
- Field Type: Switch (boolean)
- Purpose: Mark recurring posts
```

**Question:** Do you actually need this field in Webflow? If not, we can skip syncing it.

---

## 📋 Summary of Changes Needed

### Fields to ADD in Webflow CMS:

1. **Category Color** (Plain Text)
   - Stores: `color` from Engine
   - Format: Hex code (e.g., `#FF5733`)

2. **Tags** (Plain Text or Multi-reference)
   - Stores: `tags` from Engine
   - Format: Array of strings

3. **Is Recurring** (Switch/Boolean) - OPTIONAL
   - Stores: `isRecurring` from Engine
   - Format: Boolean

### Current Mapping Status:

| Status | Count | Fields |
|--------|-------|--------|
| ✅ Already Mapped | 13 | postId, title, slug, content, desc, timestamp, updatedDate, cat, isFeatured, featuredImageBig, featuredImageSmall, lastSynced, syncStatus |
| ⚠️ Need to Add | 2-3 | color, tags, (isRecurring - optional) |
| ❌ Not Needed | 0 | None |

---

## Final Recommended Webflow Structure

After adding the missing fields, your Webflow collection should have:

### Content Fields
- ✅ Title (Plain Text)
- ✅ Slug (Plain Text)
- ✅ Content (Rich Text)
- ✅ Excerpt (Plain Text/Multi-line)

### Metadata Fields
- ✅ PostID (Number/Text) - Unique identifier
- ✅ Category (Plain Text)
- ➕ **Category Color (Plain Text)** - NEW
- ➕ **Tags (Plain Text or Multi-reference)** - NEW
- ✅ Published (Date) - Original publish date
- ✅ Last Updated (Date) - Last modified in Engine
- ✅ Last Synced (Date) - Last sync timestamp
- ✅ Sync Status (Plain Text) - Sync status

### Display Fields
- ✅ Featured (Switch) - Is featured?
- ➕ **Is Recurring (Switch)** - NEW (Optional)
- ✅ Featured (Big) (Image)
- ✅ Featured (Small) (Image)

### System Fields (Auto-managed by Webflow)
- Collection ID
- Locale ID
- Item ID
- Archived
- Draft
- Created On
- Updated On
- Published On

---

## Smart Sync Logic with Field Mapping

```javascript
For each article from GetRecentPostsV2:
  
  1. Check if PostID exists in Webflow
  
  2. If NOT found:
     → CREATE new article with ALL fields
  
  3. If FOUND:
     → Compare Engine.updatedDate with Webflow.LastUpdated
     → If Engine.updatedDate > Webflow.LastUpdated:
        → UPDATE article with ALL fields
        → Set Webflow.LastUpdated = Engine.updatedDate
        → Set Webflow.LastSynced = current time
        → Set Webflow.SyncStatus = "Synced"
     → If same or older:
        → SKIP (no changes needed)
```

---

## Implementation Steps

### Step 1: Add Missing Fields to Webflow
1. Open Webflow Designer
2. Go to CMS → News Collection → Settings
3. Add these fields:
   - **Category Color** (Plain Text)
   - **Tags** (Plain Text or Multi-reference)
   - **Is Recurring** (Switch) - Optional

### Step 2: Update Code Constants
Update `config/constants.js`:

```javascript
export const ENGINE_API = {
  STAGING: "https://uat-brochure.engine.online/api/EngineNews",
  PRODUCTION: "https://feeds.engine.online/api/EngineNews",
  ENDPOINTS: {
    RECENT_POSTS: "/GetRecentPostsV2",  // ← Changed from GetRecentPosts
    POST_BY_ID: "/GetPostById",
  },
};

export const FIELD_MAPPING = {
  postId: "PostID",
  title: "Title",
  slug: "Slug",
  content: "Content",
  desc: "Excerpt",
  timestamp: "Published",
  updatedDate: "Last Updated",  // ← NEW
  cat: "Category",
  color: "Category Color",       // ← NEW
  tags: "Tags",                   // ← NEW
  isFeatured: "Featured",
  isRecurring: "Is Recurring",    // ← NEW (optional)
  featuredImageBig: "Featured (Big)",
  featuredImageSmall: "Featured (Small)",
};
```

### Step 3: Update Transform Function
Update the data transformer to include new fields and use `updatedDate` for comparison.

---

## Questions & Answers (CONFIRMED)

### 1. ✅ Tags - Create Separate Field
**Answer:** Create a NEW "Tags" field separate from Categories.

**Reason:** Tags are semantically different from Categories in the new design.

**Mapping:**
- Engine `cat` → Webflow `Category` (existing field)
- Engine `tags` → Webflow `Tags` (NEW field - multi-reference, comma-separated)

### 2. ✅ Color Field - Create for Data Completeness
**Answer:** Create "Category Color" field for data completeness.

**Decision:** Store but don't display (deprecated in new design).

**Action:**
- Add "Category Color" field to Webflow (Plain Text - hex code)
- Sync the data from Engine
- Don't use it in frontend templates

### 3. ✅ Is Recurring Field - Create for Data Completeness
**Answer:** Create "Recurring" field for data completeness.

**Decision:** Store but don't necessarily display.

**Action:**
- Add "Recurring" field to Webflow (Switch/Boolean)
- Sync the data from Engine
- Available for future use if needed

---

## Updated Field Mapping Strategy

### Fields to ADD in Webflow CMS:

1. **Tags** (Multi-reference or Plain Text) - ✅ CONFIRMED
   - Maps to: Engine's `tags` array
   - Type: Multi-reference (comma-separated slugs)
   - Purpose: Store article tags (separate from Categories)
   - Display: May be used in new design

2. **Category Color** (Plain Text) - ✅ CONFIRMED
   - Maps to: Engine's `color` field
   - Type: Plain Text (hex code, e.g., "#FF5733")
   - Purpose: Data completeness (deprecated in design)
   - Display: Do not display on frontend

3. **Recurring** (Switch/Boolean) - ✅ CONFIRMED
   - Maps to: Engine's `isRecurring`
   - Type: Switch (boolean)
   - Purpose: Data completeness
   - Display: Available for future use

### Updated Mapping Table:

| Engine Field | → | Webflow Field | Status | Notes |
|--------------|---|---------------|--------|-------|
| `postId` | → | `PostID` | ✅ Existing | Unique ID |
| `title` | → | `Title` | ✅ Existing | Article title |
| `slug` | → | `Slug` | ✅ Existing | URL slug |
| `content` | → | `Content` | ✅ Existing | HTML content |
| `desc` | → | `Excerpt` | ✅ Existing | Description |
| `timestamp` | → | `Published` | ✅ Existing | Publish date |
| `updatedDate` | → | `Last Updated` | ✅ Existing | Modified date |
| `cat` | → | `Category` | ✅ Existing | Category name |
| `tags` | → | `Tags` | 🆕 ADD | Separate from Category |
| `color` | → | `Category Color` | 🆕 ADD | Store only (deprecated) |
| `isFeatured` | → | `Featured` | ✅ Existing | Featured flag |
| `isRecurring` | → | `Recurring` | 🆕 ADD | For completeness |
| `featuredImageBig` | → | `Featured (Big)` | ✅ Existing | Hero image |
| `featuredImageSmall` | → | `Featured (Small)` | ✅ Existing | Thumbnail |

---

## Final Action Plan ✅ CONFIRMED

### Step 1: Add 3 New Fields to Webflow CMS

1. **Tags** 
   - Field Type: Multi-reference or Plain Text (comma-separated)
   - Maps to: Engine's `tags` array
   - Separate from Category field
   - Purpose: Store article tags

2. **Category Color**
   - Field Type: Plain Text
   - Maps to: Engine's `color` field (hex code)
   - Purpose: Data completeness (deprecated, don't display)

3. **Recurring**
   - Field Type: Switch (Boolean)
   - Maps to: Engine's `isRecurring` field
   - Purpose: Data completeness (available for future use)

### Step 2: Update Code
- Update endpoint: `/GetRecentPosts` → `/GetRecentPostsV2`
- Map `cat` → `Category` (existing field)
- Map `tags` → `Tags` (NEW separate field)
- Map `color` → `Category Color` (NEW field)
- Map `isRecurring` → `Recurring` (NEW field)
- Implement smart sync with `updatedDate` comparison
- Remove unnecessary endpoints (webhooks, manual operations)

### Step 3: Test Complete Sync
- All 14 Engine fields will map to Webflow
- No data loss
- Full data completeness

---

**Status:** ✅ All decisions confirmed. Ready to implement!

---

## Verification: Webflow Fields Added ✅

**Updated Webflow CMS Structure (from CSV export):**

| # | Field Name | Status | Type |
|---|------------|--------|------|
| 1 | Title | ✅ Existing | Plain Text |
| 2 | Slug | ✅ Existing | Plain Text |
| 3-10 | Collection ID, Locale ID, Item ID, Archived, Draft, Created On, Updated On, Published On | ✅ System | Auto (Webflow) |
| 11 | PostID | ✅ Existing | Number/Text |
| 12 | Category | ✅ Existing | Plain Text |
| 13 | **Tags** | 🆕 ADDED | Multi-reference/Plain Text |
| 14 | Published | ✅ Existing | Date |
| 15 | Last Updated | ✅ Existing | Date |
| 16 | Last Synced | ✅ Existing | Date |
| 17 | Sync Status | ✅ Existing | Plain Text |
| 18 | Excerpt | ✅ Existing | Plain Text |
| 19 | Content | ✅ Existing | Rich Text |
| 20 | Featured | ✅ Existing | Switch |
| 21 | **Recurring** | 🆕 ADDED | Switch |
| 22 | Featured (Big) | ✅ Existing | Image |
| 23 | Featured (Small) | ✅ Existing | Image |
| 24 | **Category Color** | 🆕 ADDED | Plain Text |

**Total Fields:** 24 (21 existing + 3 new)

**New Fields Confirmed:**
1. ✅ Tags (position 13)
2. ✅ Recurring (position 21)
3. ✅ Category Color (position 24)

All 3 required fields have been successfully added to Webflow CMS!
