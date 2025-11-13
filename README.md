# Engine-to-Webflow Sync System Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [How It Works](#how-it-works)
4. [API Endpoints](#api-endpoints)
5. [Core Libraries](#core-libraries)
6. [Data Flow](#data-flow)
7. [Configuration](#configuration)
8. [Deployment](#deployment)
9. [Testing](#testing)
10. [Troubleshooting](#troubleshooting)

---

## System Overview

This is an automated synchronization system that keeps news articles from your Engine CMS in sync with your Webflow CMS. The system runs on Vercel as serverless functions and executes automatically every 15 minutes.

### Key Features
- **Automatic Sync**: Runs every 15 minutes via Vercel cron job
- **Webhook Triggered Sync**: On-demand sync via HTTP POST
- **Manual Operations**: Full resync and individual article sync
- **Health Monitoring**: Check both API endpoints for connectivity
- **Smart Updates**: Only updates changed content, creates new items as needed
- **Error Handling**: Retry logic with exponential backoff
- **Rate Limiting**: Handles Webflow API rate limits automatically

### Technology Stack
- **Runtime**: Node.js 18.x
- **Deployment**: Vercel Serverless Functions
- **API Client**: node-fetch
- **Configuration**: dotenv for environment variables
- **Module System**: ES Modules (ESM)

---

## Architecture

### High-Level Architecture
```
┌─────────────────────┐
│   Vercel Cron Job   │
│   (Every 15 min)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐      ┌──────────────────┐
│   API Endpoints     │      │   Core Libraries │
│  (/api folder)      │◄────►│   (/lib folder)  │
│                     │      │                  │
│  • sync.js          │      │  • engine-api.js │
│  • manual.js        │      │  • webflow-api.js│
│  • monitor.js       │      │  • utils.js      │
│  • webhooks.js      │      │                  │
└──────────┬──────────┘      └──────────────────┘
           │
           ▼
┌─────────────────────┐      ┌──────────────────┐
│   Engine API        │      │   Webflow API    │
│   (Source DB)       │      │   (Target CMS)   │
│                     │      │                  │
│  feeds.engine.      │      │  api.webflow.    │
│  online             │      │  com/v2          │
└─────────────────────┘      └──────────────────┘
```

### File Structure
```
engine/
├── api/                    # Serverless function endpoints
│   ├── sync.js            # Automatic 15-min sync (cron job)
│   ├── manual.js          # Manual operations endpoint
│   ├── monitor.js         # Health check endpoint
│   └── webhooks.js        # Webhook-triggered sync
│
├── lib/                    # Core business logic
│   ├── engine-api.js      # Engine API client & functions
│   ├── webflow-api.js     # Webflow API client & CRUD operations
│   └── utils.js           # Shared utilities (logging, retry, validation)
│
├── config/                 # Configuration files
│   └── constants.js       # API endpoints, field mappings, sync config
│
├── vercel.json            # Vercel deployment & cron configuration
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (NOT in git)
└── .gitignore            # Git ignore rules
```

---

## How It Works

### The Sync Process (Step-by-Step)

#### 1. **Trigger** (Every 15 minutes)
The Vercel cron job automatically calls `/api/sync`

#### 2. **Fetch Recent Articles**
- Calls Engine API: `GET /GetRecentPosts?recent=20`
- Returns: `{ featured: [], recentNews: {} }`
- Combines both featured and recent articles into a single array

#### 3. **Process Each Article**
For each article from Engine:

**a. Validate Data**
- Checks required fields (`postId`, `title`)
- Throws error if validation fails

**b. Check if Article Exists in Webflow**
- Searches Webflow collection for matching `engine-post-id`
- Note: This requires paginating through all items (potentially slow for large collections)

**c. Transform Data**
- Converts Engine field names to Webflow field names
- Maps: `postId` → `engine-post-id`, `title` → `title`, `desc` → `excerpt`, etc.
- Formats dates to ISO 8601
- Sanitizes slugs

**d. Create or Update**
- **If exists**: `PATCH` update existing Webflow item
- **If new**: `POST` create new Webflow item
- Adds metadata: `last-synced`, `sync-status`

**e. Publish**
- Calls Webflow publish API to make item live
- Published items appear immediately on the website

#### 4. **Return Summary**
Returns sync results:
```json
{
  "success": true,
  "created": 5,
  "updated": 12,
  "skipped": 0,
  "errors": 0,
  "errorDetails": [],
  "timestamp": "2025-10-22T14:30:00.000Z"
}
```

### Composite Functions Breakdown

#### `runSync()` (Core Sync Logic)
**Location**: `api/sync.js`

This is the heart of the system. Used by both the cron job and webhook endpoint.

**Flow**:
1. Fetch recent articles from Engine
2. For each article:
   - Validate data
   - Check if exists in Webflow
   - Transform Engine data to Webflow format
   - Create or update item
   - Publish item
3. Track results (created, updated, errors)
4. Return summary

**Called by**:
- `api/sync.js` (cron job handler)
- `api/webhooks.js` (webhook handler)

#### `syncArticle()` (Single Article Sync)
**Location**: `api/manual.js`

Syncs a single article by ID.

**Flow**:
1. Fetch article from Engine by ID
2. Validate data
3. Check if exists in Webflow
4. Transform data
5. Create or update
6. Publish
7. Return status

**Called by**:
- Manual sync action (`POST /api/manual` with `action: "sync-article"`)

#### `getWebflowItemByEngineId()` (Find Existing Item)
**Location**: `lib/webflow-api.js`

Searches for a Webflow item that matches an Engine post ID.

**Important**: This is a **linear search** that paginates through ALL items in the collection. Can be slow for large collections (1000+ items).

**Flow**:
1. Fetch items in batches of 100
2. Check each item's `engine-post-id` field
3. Return first match or null
4. Continue until all items checked

**Optimization Opportunity**: This could benefit from a caching layer or Webflow's search API if available.

#### `transformEngineDataToWebflow()` (Data Transformer)
**Location**: `lib/webflow-api.js`

Converts Engine article structure to Webflow CMS item structure.

**Input** (Engine article):
```javascript
{
  postId: 12345,
  title: "Article Title",
  slug: "article-title",
  content: "<p>HTML content</p>",
  desc: "Article excerpt",
  timestamp: "2025-10-22T10:00:00",
  cat: "Technology",
  color: "#FF5733",
  tags: ["news", "tech"],
  isFeatured: true,
  featuredImageBig: "https://...",
  featuredImageSmall: "https://..."
}
```

**Output** (Webflow item):
```javascript
{
  isArchived: false,
  isDraft: false,
  fieldData: {
    "engine-post-id": 12345,
    "title": "Article Title",
    "slug": "article-title",
    "content": "<p>HTML content</p>",
    "excerpt": "Article excerpt",
    "publish-date": "2025-10-22T10:00:00.000Z",
    "category": "Technology",
    "category-color": "#FF5733",
    "tags": ["news", "tech"],
    "is-featured": true,
    "featured-image": "https://...",
    "thumbnail": "https://...",
    "last-synced": "2025-10-22T14:30:00.000Z",
    "sync-status": "synced"
  }
}
```

#### `makeWebflowRequest()` (API Client)
**Location**: `lib/webflow-api.js`

Core HTTP client for all Webflow API calls.

**Features**:
- Automatic authentication (Bearer token)
- Rate limit handling (429 responses)
- Retry logic with exponential backoff
- Error logging
- Request/response logging

**Handles**:
- `GET` requests (read items)
- `POST` requests (create items, publish)
- `PATCH` requests (update items)
- `DELETE` requests (delete items)

#### `makeEngineRequest()` (API Client)
**Location**: `lib/engine-api.js`

Core HTTP client for all Engine API calls.

**Features**:
- Environment-based URL selection (staging vs production)
- Query parameter construction
- Timeout handling (30 seconds)
- Retry logic with exponential backoff
- JSON parsing with error handling
- Request abortion on timeout

#### `retryWithBackoff()` (Resilience Pattern)
**Location**: `lib/utils.js`

Implements exponential backoff retry logic for failed API calls.

**Configuration**:
- Max retries: 3 (from `SYNC_CONFIG.MAX_RETRIES`)
- Initial delay: 1000ms
- Backoff: Exponential (1s, 2s, 4s)

**Formula**: `delay = initialDelay × 2^(attempt - 1)`

**Example**:
- Attempt 1 fails → wait 1000ms
- Attempt 2 fails → wait 2000ms
- Attempt 3 fails → wait 4000ms
- Attempt 4 fails → throw error

---

## API Endpoints

### 1. `/api/sync` (Automatic Sync)
**Method**: `GET` or `POST`
**Trigger**: Vercel cron job (every 15 minutes)
**Purpose**: Automatically syncs the 20 most recent articles

**Response**:
```json
{
  "success": true,
  "created": 2,
  "updated": 8,
  "skipped": 0,
  "errors": 0,
  "errorDetails": [],
  "timestamp": "2025-10-22T14:30:00.000Z"
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Error message details"
}
```

**Configuration**: Set in `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/sync",
    "schedule": "*/15 * * * *"
  }]
}
```

### 2. `/api/webhooks` (On-Demand Sync)
**Method**: `POST` only
**Purpose**: Trigger sync manually via webhook
**Use Case**: External systems can trigger sync on-demand

**Request**:
```bash
curl -X POST https://your-domain.vercel.app/api/webhooks
```

**Response**: Same as `/api/sync`

**Implementation**: Calls the same `runSync()` function as the cron job.

### 3. `/api/manual` (Manual Operations)
**Method**: `POST` only
**Purpose**: Perform manual sync operations

#### Action: Full Sync
Syncs ALL articles from ALL categories.

**Request**:
```json
{
  "action": "full-sync"
}
```

**Process**:
1. Fetch all categories from Engine
2. For each category:
   - Paginate through all posts
   - Sync each post
3. Return results for all posts

**Warning**: This is a long-running operation and may timeout on Vercel's Hobby plan (10s limit). Use Vercel Pro for longer timeouts (30s configured in `vercel.json`).

**Response**:
```json
{
  "success": true,
  "action": "full-sync",
  "results": [
    { "status": "created", "postId": 123 },
    { "status": "updated", "postId": 456 },
    { "status": "error", "postId": 789, "error": "..." }
  ]
}
```

#### Action: Sync Single Article
Syncs a specific article by ID.

**Request**:
```json
{
  "action": "sync-article",
  "postId": 12345
}
```

**Response**:
```json
{
  "success": true,
  "action": "sync-article",
  "result": {
    "status": "updated",
    "postId": 12345
  }
}
```

#### Action: Clear Errors (Not Implemented)
**Request**:
```json
{
  "action": "clear-errors"
}
```

**Response**:
```json
{
  "success": false,
  "error": "Action not implemented"
}
```

#### Action: Report (Not Implemented)
**Request**:
```json
{
  "action": "report"
}
```

**Response**:
```json
{
  "success": false,
  "error": "Action not implemented"
}
```

### 4. `/api/monitor` (Health Check)
**Method**: `GET` or `POST`
**Purpose**: Check system health and API connectivity

**Response** (Healthy):
```json
{
  "engine_api": "healthy",
  "webflow_api": "healthy",
  "last_sync": "not implemented",
  "timestamp": "2025-10-22T14:30:00.000Z"
}
```

**Response** (Unhealthy):
```json
{
  "engine_api": "unhealthy",
  "webflow_api": "healthy",
  "last_sync": "not implemented",
  "timestamp": "2025-10-22T14:30:00.000Z"
}
```

**HTTP Status**:
- `200`: All systems healthy
- `503`: One or more systems unhealthy

**Tests**:
1. **Engine API**: Fetches 1 recent post
2. **Webflow API**: Fetches 1 item from collection

---

## Core Libraries

### 1. Engine API Client (`lib/engine-api.js`)

#### Available Functions

##### `getRecentPosts(recent = 10)`
Fetches recent posts from Engine.

**Endpoint**: `/GetRecentPosts?recent={limit}`
**Currently Used**: ✅ Yes (in automatic sync)

**Example**:
```javascript
const data = await getRecentPosts(20);
// Returns: { featured: [...], recentNews: {...} }
```

##### `getPostById(postId)`
Fetches a single post by ID.

**Endpoint**: `/GetPostById?postId={id}`
**Currently Used**: ✅ Yes (in manual sync)

**Example**:
```javascript
const post = await getPostById(12345);
```

##### `getPostBySlug(slug)` ⚠️ NEW
Fetches a single post by slug.

**Endpoint**: `/posts/{slug}`
**Currently Used**: ❌ Not yet used

**Example**:
```javascript
const post = await getPostBySlug("article-title");
```

##### `getPostsByCategory(catId, limit = 100, page = 1)`
Fetches posts by category with pagination.

**Endpoint**: `/GetPostsByCategory?catId={id}&Limit={limit}&Page={page}`
**Currently Used**: ✅ Yes (in full sync)

**Example**:
```javascript
const data = await getPostsByCategory(5, 100, 1);
// Returns: { featured: [...], generalNews: [...], totalRecords: 500, totalPages: 5 }
```

##### `getAllCategories()`
Fetches all available categories.

**Endpoint**: `/GetAllCategories`
**Currently Used**: ✅ Yes (in full sync)

**Example**:
```javascript
const categories = await getAllCategories();
// Returns: [{ catId: 1, catName: "Tech", color: "#FF0000" }, ...]
```

##### `searchPosts(searchTerm, limit = 100, page = 1)` ⚠️ NEW
Searches posts by keyword.

**Endpoint**: `/SearchPosts?searchTerm={term}&Limit={limit}&Page={page}`
**Currently Used**: ❌ Not yet used

**Example**:
```javascript
const results = await searchPosts("technology", 50, 1);
// Returns: { posts: [...], totalRecords: 150, totalPages: 3 }
```

#### Environment Configuration
The client automatically selects the correct base URL:

**Production** (`NODE_ENV=production`):
```
https://feeds.engine.online/api/EngineNews
```

**Staging** (default):
```
https://uat-brochure.engine.online/api/EngineNews
```

### 2. Webflow API Client (`lib/webflow-api.js`)

#### CRUD Operations

##### `getWebflowItems(collectionId, offset = 0, limit = 100)`
Lists items from a Webflow collection.

**Webflow API**: `GET /sites/{siteId}/collections/{collectionId}/items`

**Example**:
```javascript
const { items, pagination } = await getWebflowItems(collectionId, 0, 100);
```

##### `getWebflowItemByEngineId(collectionId, enginePostId)`
Finds a Webflow item by the Engine post ID.

**Note**: This is a custom function that searches through all items. Not a native Webflow API endpoint.

**Example**:
```javascript
const item = await getWebflowItemByEngineId(collectionId, 12345);
// Returns item or null
```

##### `createWebflowItem(collectionId, itemData)`
Creates a new item in Webflow.

**Webflow API**: `POST /sites/{siteId}/collections/{collectionId}/items`

**Example**:
```javascript
const newItem = await createWebflowItem(collectionId, {
  isArchived: false,
  isDraft: false,
  fieldData: { ... }
});
```

##### `updateWebflowItem(collectionId, itemId, itemData)`
Updates an existing Webflow item.

**Webflow API**: `PATCH /sites/{siteId}/collections/{collectionId}/items/{itemId}`

**Example**:
```javascript
const updated = await updateWebflowItem(collectionId, itemId, {
  fieldData: { title: "Updated Title" }
});
```

##### `deleteWebflowItem(collectionId, itemId)`
Deletes an item from Webflow.

**Webflow API**: `DELETE /sites/{siteId}/collections/{collectionId}/items/{itemId}`

**Example**:
```javascript
await deleteWebflowItem(collectionId, itemId);
```

##### `publishWebflowItems(collectionId, itemIds)`
Publishes one or more items.

**Webflow API**: `POST /sites/{siteId}/collections/{collectionId}/items/publish`

**Example**:
```javascript
await publishWebflowItems(collectionId, ["item1", "item2"]);
```

##### `transformEngineDataToWebflow(engineArticle)`
Transforms Engine article data to Webflow item format.

**Example**:
```javascript
const webflowData = transformEngineDataToWebflow(engineArticle);
```

#### Rate Limiting
The Webflow API client automatically handles rate limits:
- Detects `429` status codes
- Reads `Retry-After` header (or defaults to 60 seconds)
- Waits and retries automatically

### 3. Utilities (`lib/utils.js`)

##### `logWithTimestamp(message, level = "info")`
Console logging with ISO timestamps.

**Levels**: `"info"`, `"warn"`, `"error"`

**Example**:
```javascript
logWithTimestamp("Starting sync", "info");
// Output: [2025-10-22T14:30:00.000Z] [INFO] Starting sync
```

##### `retryWithBackoff(fn, maxRetries = 3, initialDelay = 1000)`
Retry logic with exponential backoff.

**Example**:
```javascript
const result = await retryWithBackoff(async () => {
  return await someApiCall();
}, 3, 1000);
```

##### `validateEngineData(data)`
Validates Engine article has required fields.

**Required**: `postId`, `title`

**Example**:
```javascript
validateEngineData(article); // Throws error if invalid
```

##### `transformEngineToWebflow(engineData)`
Alternative transformer using field mapping from config.

**Note**: There are two transform functions - this one uses `FIELD_MAPPING` from `config/constants.js`, while `transformEngineDataToWebflow()` in `lib/webflow-api.js` has the mapping hardcoded.

##### `formatDate(dateString)`
Formats dates to ISO 8601.

**Example**:
```javascript
const iso = formatDate("2025-10-22"); // "2025-10-22T00:00:00.000Z"
```

##### `sanitizeSlug(slug)`
Cleans and formats URL slugs.

**Rules**:
- Lowercase
- Replace spaces with hyphens
- Remove non-word characters
- Remove duplicate hyphens
- Trim hyphens from ends

**Example**:
```javascript
sanitizeSlug("Hello World! @#$"); // "hello-world"
```

---

## Data Flow

### Field Mapping (Engine → Webflow)

| Engine Field | Webflow Field | Transform | Example |
|-------------|---------------|-----------|---------|
| `postId` | `engine-post-id` | None | `12345` → `12345` |
| `title` | `title` | None | `"Article"` → `"Article"` |
| `slug` | `slug` | Sanitize | `"My Article!"` → `"my-article"` |
| `content` | `content` | None (raw HTML) | `"<p>...</p>"` → `"<p>...</p>"` |
| `desc` | `excerpt` | None | `"Description"` → `"Description"` |
| `timestamp` | `publish-date` | ISO 8601 | `"2025-10-22"` → `"2025-10-22T00:00:00.000Z"` |
| `cat` | `category` | None | `"Tech"` → `"Tech"` |
| `color` | `category-color` | None | `"#FF0000"` → `"#FF0000"` |
| `tags` | `tags` | None | `["news"]` → `["news"]` |
| `isFeatured` | `is-featured` | None | `true` → `true` |
| `featuredImageBig` | `featured-image` | None | URL → URL |
| `featuredImageSmall` | `thumbnail` | None | URL → URL |
| N/A | `last-synced` | Current timestamp | N/A → `"2025-10-22T14:30:00.000Z"` |
| N/A | `sync-status` | Hardcoded | N/A → `"synced"` |

### Webflow CMS Collection Requirements

Your Webflow collection must have these fields:

**Required Fields**:
- `engine-post-id` (Number or Text) - Unique identifier from Engine
- `title` (Plain Text)
- `slug` (Plain Text)
- `content` (Rich Text)
- `excerpt` (Plain Text or Multi-line Text)
- `publish-date` (Date/Time)
- `category` (Plain Text)
- `category-color` (Plain Text)
- `tags` (Multi-reference or Plain Text)
- `is-featured` (Switch/Boolean)
- `featured-image` (Image)
- `thumbnail` (Image)

**Recommended Fields** (added by system):
- `last-synced` (Date/Time) - When was this item last synced?
- `sync-status` (Plain Text) - Status of sync ("synced", "failed", etc.)

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory with these variables:

```bash
# Node Environment
NODE_ENV=production  # or "development" for staging Engine API

# Webflow Configuration
WEBFLOW_API_TOKEN=your_webflow_api_token_here
WEBFLOW_SITE_ID=your_webflow_site_id_here
WEBFLOW_COLLECTION_ID=your_webflow_collection_id_here
```

#### How to Get These Values

**1. Webflow API Token**
- Go to: https://webflow.com/dashboard
- Click: Account Settings → Apps & Integrations
- Generate a new API token
- Scope required: `CMS` (read/write), `Sites` (read)

**2. Webflow Site ID**
- In Webflow Designer, open your site
- Go to: Site Settings → General
- Copy the Site ID from the URL or API tab

**3. Webflow Collection ID**
- In Webflow Designer, open your CMS
- Click on your news collection
- The Collection ID is in the URL: `/cms/collections/{collection-id}`

**4. Node Environment**
- Set to `production` to use: `https://feeds.engine.online/api/EngineNews`
- Set to `development` to use: `https://uat-brochure.engine.online/api/EngineNews`
- Leave blank for staging (default)

### Configuration Constants

**File**: `config/constants.js`

#### Engine API Configuration
```javascript
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
```

#### Field Mapping
```javascript
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
```

#### Sync Configuration
```javascript
export const SYNC_CONFIG = {
  BATCH_SIZE: 10,        // Not currently used
  MAX_RETRIES: 3,        // Number of retry attempts
  TIMEOUT: 30000,        // Request timeout (30 seconds)
};
```

### Vercel Configuration

**File**: `vercel.json`

```json
{
  "functions": {
    "api/sync.js": {
      "maxDuration": 30
    }
  },
  "crons": [
    {
      "path": "/api/sync",
      "schedule": "*/15 * * * *"
    }
  ]
}
```

**Cron Schedule Syntax**: `*/15 * * * *`
- `*/15` - Every 15 minutes
- `*` - Every hour
- `*` - Every day of month
- `*` - Every month
- `*` - Every day of week

**Change Sync Frequency**:
- Every 5 minutes: `*/5 * * * *`
- Every 30 minutes: `*/30 * * * *`
- Every hour: `0 * * * *`
- Every 3 hours: `0 */3 * * *`

---

## Deployment

### Prerequisites
1. Vercel account (free or paid)
2. GitHub repository with this code
3. Webflow API token and IDs
4. Environment variables configured

### Deploy to Vercel

#### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add WEBFLOW_API_TOKEN
vercel env add WEBFLOW_SITE_ID
vercel env add WEBFLOW_COLLECTION_ID
vercel env add NODE_ENV

# Deploy to production
vercel --prod
```

#### Option 2: Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add environment variables in Settings → Environment Variables
4. Deploy

### Environment Variables in Vercel
1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add each variable:
   - `WEBFLOW_API_TOKEN`
   - `WEBFLOW_SITE_ID`
   - `WEBFLOW_COLLECTION_ID`
   - `NODE_ENV`
4. Redeploy after adding variables

### Verify Deployment
1. Check cron job is running:
   - Vercel Dashboard → Project → Deployments → Cron Jobs
2. Test webhook:
   ```bash
   curl -X POST https://your-domain.vercel.app/api/webhooks
   ```
3. Check health:
   ```bash
   curl https://your-domain.vercel.app/api/monitor
   ```

---

## Migration

For migrating large batches of historical articles (e.g., 9,000+ articles from CSV), use the dedicated migration tools:

### Quick Start

1. **Place your CSV file**: Copy your CSV to `migrate/export.csv`
2. **Convert to JSON**: `npm run convert`
3. **Run migration**: `npm run migrate`

### Features
- ✓ Real-time progress logging for each article
- ✓ Automatic rate limiting (500ms delay between articles)
- ✓ Error handling and retry logic
- ✓ Resume capability for interrupted migrations
- ✓ Batch progress summaries every 50 articles

### Example Output
```bash
$ npm run migrate

============================================================
Starting migration (migrate/export.json)...
Delay between articles: 500ms
============================================================

📦 Loaded 9000 articles to migrate

✓ [1/9000] CREATED: "Article Title" (ID: 12345)
✓ [2/9000] CREATED: "Another Article" (ID: 12346)
○ [3/9000] SKIPPED: "Existing Article" (ID: 12347) - no changes
↻ [4/9000] UPDATED: "Updated Article" (ID: 12348)

📊 Progress: 50/9000 | Rate: 1.89 articles/sec | Elapsed: 26.5s
...
```

### Custom Options
```bash
# Faster processing (250ms delay)
npm run migrate -- --delay=250

# Slower processing (1000ms delay)
npm run migrate -- --delay=1000

# Change batch summary frequency
npm run migrate -- --batch-size=100
```

**Full documentation**: See [migrate/README.md](migrate/README.md) for complete migration guide.

---

## Testing

### Local Development

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Create `.env` File
```bash
cp .env.example .env
# Edit .env with your credentials
```

#### 3. Run Development Server
```bash
npm run dev
```

This starts Vercel dev server at `http://localhost:3000`

### Test Endpoints Locally

#### Test Health Check
```bash
curl http://localhost:3000/api/monitor
```

Expected: `200` status with API health

#### Test Sync (Manual Trigger)
```bash
curl http://localhost:3000/api/sync
```

Expected: Sync summary with created/updated counts

#### Test Webhook
```bash
curl -X POST http://localhost:3000/api/webhooks
```

Expected: Same as sync endpoint

#### Test Manual Sync (Single Article)
```bash
curl -X POST http://localhost:3000/api/manual \
  -H "Content-Type: application/json" \
  -d '{"action": "sync-article", "postId": 12345}'
```

Expected: Single article sync result

#### Test Full Sync (WARNING: Long-running)
```bash
curl -X POST http://localhost:3000/api/manual \
  -H "Content-Type: application/json" \
  -d '{"action": "full-sync"}'
```

Expected: Full collection sync (may timeout locally)

### Verify in Webflow
1. Open Webflow CMS
2. Go to your news collection
3. Check for new/updated items
4. Verify `last-synced` field is recent
5. Check published status

### Common Test Scenarios

#### Scenario 1: New Article in Engine
1. Create new article in Engine
2. Trigger sync: `curl http://localhost:3000/api/sync`
3. Verify article appears in Webflow
4. Check it's published

#### Scenario 2: Update Existing Article
1. Update article in Engine (change title)
2. Trigger sync
3. Verify changes reflected in Webflow
4. Check `last-synced` timestamp updated

#### Scenario 3: Error Handling
1. Set invalid Webflow token
2. Trigger sync
3. Verify error is logged
4. Check error in response

#### Scenario 4: Rate Limiting
1. Trigger multiple syncs rapidly
2. Watch logs for rate limit handling
3. Verify retries work

---

## Troubleshooting

### Common Issues

#### 1. "Webflow API Error: 401 Unauthorized"
**Cause**: Invalid or expired API token

**Solution**:
- Generate new API token in Webflow
- Update `WEBFLOW_API_TOKEN` in `.env`
- Redeploy if on Vercel

#### 2. "Collection ID not found"
**Cause**: Invalid `WEBFLOW_COLLECTION_ID`

**Solution**:
- Go to Webflow CMS
- Open your collection
- Copy correct Collection ID from URL
- Update `.env` and redeploy

#### 3. "Sync timeout" or "Function exceeded time limit"
**Cause**: Too many articles to sync in one run

**Solutions**:
- Reduce number of articles in sync (change `recent=20` to lower number)
- Use full sync only for initial setup
- Upgrade Vercel plan for longer timeouts
- Split sync into smaller batches

#### 4. "Rate limit exceeded"
**Cause**: Too many API requests to Webflow

**Solution**:
- System should handle this automatically
- Check retry logs
- Reduce sync frequency if needed
- Contact Webflow support for rate limit increase

#### 5. "Field not found" errors
**Cause**: Webflow collection missing required fields

**Solution**:
- Check Webflow collection has all required fields
- Field names must match exactly (case-sensitive)
- Verify field types match (e.g., Date field for dates)

#### 6. Items not publishing
**Cause**: Missing publish step or permissions

**Solution**:
- Check API token has publish permissions
- Verify `publishWebflowItems()` is called after create/update
- Check Webflow's publish status in CMS

#### 7. Slugs causing errors
**Cause**: Duplicate or invalid slugs

**Solution**:
- Verify Engine provides unique slugs
- Check `sanitizeSlug()` function
- Ensure Webflow collection allows duplicate slugs (or enforces unique)

### Debug Mode

Enable detailed logging:

**In code**:
```javascript
// Add more logging in lib/webflow-api.js or lib/engine-api.js
logWithTimestamp(`Full response: ${JSON.stringify(response)}`, "info");
```

**Check Vercel logs**:
```bash
vercel logs [deployment-url]
```

**Check Vercel Dashboard**:
1. Go to your project
2. Click on a deployment
3. View real-time logs

### Health Monitoring

#### Set up monitoring
1. Use `/api/monitor` endpoint
2. Set up external monitoring (e.g., UptimeRobot, Pingdom)
3. Monitor for `503` responses
4. Alert on failures

#### Manual health check
```bash
# Check both APIs
curl https://your-domain.vercel.app/api/monitor

# Should return:
# {
#   "engine_api": "healthy",
#   "webflow_api": "healthy",
#   "last_sync": "not implemented",
#   "timestamp": "..."
# }
```

### Performance Optimization

#### Current Bottleneck: `getWebflowItemByEngineId()`
This function searches linearly through ALL items. For 1000+ items, this is slow.

**Solution options**:
1. **Add caching**: Cache Webflow items in memory
2. **Use external database**: Store `engine-post-id` → `webflow-item-id` mapping
3. **Batch processing**: Process articles in parallel
4. **Webflow search API**: If available, use native search instead of linear scan

#### Optimization: Parallel Processing
```javascript
// Instead of sequential:
for (const article of articles) {
  await syncArticle(article);
}

// Use parallel (with limit):
import pLimit from 'p-limit';
const limit = pLimit(5); // Max 5 concurrent requests

await Promise.all(
  articles.map(article => limit(() => syncArticle(article)))
);
```

---

## Next Steps

### Configuration Needed

1. **Create `.env` file**:
   ```bash
   touch .env
   ```

2. **Add environment variables**:
   ```bash
   WEBFLOW_API_TOKEN=your_token_here
   WEBFLOW_SITE_ID=your_site_id_here
   WEBFLOW_COLLECTION_ID=your_collection_id_here
   NODE_ENV=production
   ```

3. **Verify Webflow Collection**:
   - Ensure all required fields exist
   - Check field names match exactly
   - Verify field types are correct

4. **Test locally**:
   ```bash
   npm install
   npm run dev
   curl http://localhost:3000/api/monitor
   ```

5. **Deploy to Vercel**:
   ```bash
   vercel
   ```

6. **Monitor first sync**:
   - Check Vercel logs
   - Verify items in Webflow
   - Check for errors

### New Endpoints to Configure

You have two new Engine API endpoints that aren't being used yet:

#### 1. `getPostBySlug(slug)` - `/posts/{slug}`
**Location**: `lib/engine-api.js:53`
**Potential Use**: Sync specific article by slug instead of ID

**Example implementation**:
```javascript
// In api/manual.js, add new action:
case "sync-article-by-slug":
  if (!req.body.slug) {
    return res.status(400).json({ error: "slug is required" });
  }
  const articleBySlug = await getPostBySlug(req.body.slug);
  const result = await syncArticle(articleBySlug);
  return res.json({ success: true, result });
```

#### 2. `searchPosts(searchTerm, limit, page)` - `/SearchPosts`
**Location**: `lib/engine-api.js:93`
**Potential Use**: Search and sync specific articles by keyword

**Example implementation**:
```javascript
// In api/manual.js, add new action:
case "sync-search-results":
  if (!req.body.searchTerm) {
    return res.status(400).json({ error: "searchTerm is required" });
  }
  const searchResults = await searchPosts(req.body.searchTerm, 50, 1);
  const results = await Promise.all(
    searchResults.posts.map(p => syncArticle(p))
  );
  return res.json({ success: true, action, results });
```

### Recommended Improvements

1. **Add caching layer** for `getWebflowItemByEngineId()` to improve performance
2. **Implement "last_sync" tracking** in monitor endpoint (requires database)
3. **Add email alerts** on sync failures
4. **Implement retry queue** for failed syncs
5. **Add batch processing** for large syncs
6. **Create admin dashboard** to view sync status
7. **Add webhook signature verification** for security
8. **Implement incremental sync** (only sync changed articles)

---

## Summary

This system provides a robust, automated solution for keeping your Engine news database in sync with your Webflow CMS. The architecture is:

✅ **Reliable**: Retry logic, error handling, rate limiting
✅ **Automated**: Runs every 15 minutes via cron
✅ **Flexible**: Manual operations for full syncs and individual articles
✅ **Monitored**: Health check endpoint
✅ **Scalable**: Serverless architecture on Vercel

The main sync flow is simple:
1. Fetch recent articles from Engine
2. Check if they exist in Webflow
3. Create or update accordingly
4. Publish to make live
5. Return summary

All functions are well-documented and modular, making it easy to extend or modify as needed.
