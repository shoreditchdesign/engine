# Engine-to-Webflow Sync System

Automated synchronization system that syncs news articles from Engine CMS to Webflow CMS using Azure Functions and Logic Apps.

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Functions](#functions)
4. [Core Libraries](#core-libraries)
5. [Data Flow](#data-flow)
6. [Configuration](#configuration)
7. [Deployment](#deployment)
8. [Testing](#testing)
9. [Migration](#migration)
10. [Troubleshooting](#troubleshooting)

---

## System Overview

Automated sync system running on Azure Functions with scheduled triggers via Azure Logic Apps.

### Key Features
- **Automatic Sync**: Every 15 minutes via Azure Logic App
- **Archive Old Articles**: Daily at 2 AM UTC (Updates category only, 90+ days)
- **Bulk Migration**: Migrate large batches from CSV
- **Health Monitoring**: API connectivity checks
- **Smart Updates**: Only syncs changed content
- **Error Handling**: Retry logic with exponential backoff
- **Rate Limiting**: Automatic Webflow API rate limit handling

### Technology Stack
- **Runtime**: Node.js 18.x
- **Platform**: Azure Functions (Consumption Plan)
- **Scheduling**: Azure Logic Apps
- **API Client**: node-fetch
- **Module System**: CommonJS

---

## Architecture

### High-Level Architecture
```
┌─────────────────────────┐
│  Azure Logic Apps       │
│  - Sync (15 min)        │
│  - Archive (Daily 2 AM) │
└──────────┬──────────────┘
           │ HTTP Trigger
           ▼
┌─────────────────────────┐      ┌──────────────────┐
│   Azure Functions       │      │   Core Libraries │
│   (/functions folder)   │◄────►│   (/lib folder)  │
│                         │      │                  │
│  • sync/                │      │  • api/engine.js │
│  • archive/             │      │  • api/webflow.js│
│  • migrate/             │      │  • reference.js  │
│  • monitor/             │      │  • transformer.js│
│  • test/                │      │  • utils.js      │
└──────────┬──────────────┘      └──────────────────┘
           │
           ▼
┌─────────────────────────┐      ┌──────────────────┐
│   Engine API            │      │   Webflow API    │
│   (Source)              │      │   (Target)       │
│                         │      │                  │
│  feeds.engine.online    │      │  api.webflow.com │
└─────────────────────────┘      └──────────────────┘
```

### File Structure
```
engine/
├── functions/              # Azure Functions
│   ├── sync/              # Main sync (triggered by Logic App)
│   │   ├── function.json
│   │   └── index.js
│   ├── archive/           # Archive old articles (triggered by Logic App)
│   │   ├── function.json
│   │   └── index.js
│   ├── migrate/           # Bulk migration (manual)
│   │   ├── function.json
│   │   └── index.js
│   └── monitor/           # Health check
│       ├── function.json
│       └── index.js
│
├── lib/                    # Core business logic
│   ├── api/
│   │   ├── engine.js      # Engine API client
│   │   └── webflow.js     # Webflow API client
│   ├── reference.js       # Category/tag manager
│   ├── transformer.js     # Data transformation
│   └── utils.js           # Utilities
│
├── config/
│   └── constants.js       # API endpoints, field mappings
│
├── azure-logic-apps/      # Logic App definitions
│   ├── sync-cron.json
│   └── archive-cron.json
│
├── host.json              # Azure Functions config
├── local.settings.json    # Local env vars (git-ignored)
├── azure-pipelines.yml    # CI/CD pipeline
└── package.json
```

---

## Functions

**Note**: The `test` function has been removed from the `/functions` folder as it's only run locally via `api/test.js`. All Azure-deployed functions are production-ready.

### 1. Sync (`/api/sync`)
**Trigger**: Azure Logic App (every 15 minutes)  
**Duration**: 10 minutes max  
**Purpose**: Syncs 200 most recent articles from Engine to Webflow

**Process**:
1. Preload all existing Webflow items for O(1) lookups
2. Fetch 200 recent posts from Engine API v2
3. For each article:
   - Validate required fields (postId, title, slug)
   - Check if exists in Webflow (O(1) lookup)
   - Check if update needed (skip early if no changes)
   - Only if creating/updating:
     - Fetch full content via `getPostById()`
     - Ensure category exists (create if needed)
     - Ensure tags exist (batch create)
     - Transform Engine → Webflow format
     - Create new or update existing
     - Auto-publish
4. Log metrics to Application Insights (Azure only)
5. Return summary

**Application Insights Metrics** (Azure only):
- `SyncTotalArticles` - Total articles processed
- `SyncCreatedCount` - Number created
- `SyncUpdatedCount` - Number updated
- `SyncSkippedCount` - Number skipped
- `SyncWarningCount` - Number of warnings
- `SyncErrorCount` - Number of errors
- `SyncDurationSeconds` - Execution time
- `SyncArticlesPerSecond` - Processing rate
- Custom event `SyncCompleted` with article IDs and details

**Response**:
```json
{
  "success": true,
  "created": [123, 456],
  "updated": [789],
  "skipped": [111],
  "errors": [],
  "timestamp": "2025-01-16T14:30:00.000Z",
  "recentCount": 20
}
```

**Manual trigger**:
```bash
curl -X POST "https://[app-name].azurewebsites.net/api/sync?code=[key]" \
  -H "Content-Type: application/json" \
  -d '{"recent": 5}'
```

### 2. Archive (`/api/archive`)
**Trigger**: Azure Logic App (daily at 2 AM UTC)  
**Duration**: 10 minutes max  
**Purpose**: Archives "Updates" category articles older than 90 days

**Process**:
1. Preload all categories for O(1) lookups
2. Preload all articles from Webflow
3. Filter in memory for articles that need archiving:
   - Skip if already archived
   - Skip if missing published date
   - Skip if NOT "Updates" category type
   - Skip if published date < threshold (60-90 days)
4. Sort by published date (oldest first)
5. Archive each article one by one
6. Write log to `/logs/archived-YYYY-MM-DD.log`
7. Log metrics to Application Insights (Azure only)
8. Return summary

**Application Insights Metrics** (Azure only):
- `ArchiveTotalChecked` - Total articles checked
- `ArchiveArchivedCount` - Number archived
- `ArchiveSkippedCount` - Number skipped
- `ArchiveErrorCount` - Number of errors
- `ArchiveDurationSeconds` - Execution time
- `ArchiveDaysThreshold` - Days threshold used
- Custom event `ArchiveCompleted` with full article details

**Response**:
```json
{
  "success": true,
  "archived": [{"postId": 123, "title": "...", "daysOld": 95}],
  "skipped": [...],
  "totalChecked": 500,
  "daysThreshold": 90
}
```

**Manual trigger**:
```bash
curl -X POST "https://[app-name].azurewebsites.net/api/archive?code=[key]" \
  -H "Content-Type: application/json" \
  -d '{"daysThreshold": 60}'
```

### 3. Migrate (`/api/migrate`)
**Trigger**: Manual  
**Duration**: 5 minutes max  
**Purpose**: Bulk migrate articles from `migrate/export.json`

**Features**:
- Preloads all existing items (O(1) lookup)
- Real-time progress logging per article
- Batch summaries every 50 articles
- Configurable delay (500ms default)
- Create-only mode (skip existing)

**Manual trigger**:
```bash
curl "https://[app-name].azurewebsites.net/api/migrate?code=[key]&delay=500&batchSize=50"
```

**CLI** (requires migration files):
```bash
npm run migrate -- --delay=1000 --batch-size=100 --create-only
```

### 4. Monitor (`/api/monitor`)
**Trigger**: Manual  
**Purpose**: Health check for both APIs

**Tests**:
- Engine API: Fetches 1 recent post
- Webflow API: Lists 1 item

**Response**:
```json
{
  "engine_api": "healthy",
  "webflow_api": "healthy",
  "timestamp": "2025-01-16T14:30:00.000Z"
}
```

**Manual trigger**:
```bash
curl "https://[app-name].azurewebsites.net/api/monitor?code=[key]"
```

---

## Core Libraries

### Engine API Client (`lib/api/engine.js`)

**Functions**:
- `getRecentPosts(recentCount)` - Fetches recent articles, deduplicates, sorts by updatedDate
- `getPostById(postId)` - Fetches single article with full content

**Environment selection**:
- Production (`NODE_ENV=production`): `https://feeds.engine.online/api/EngineNews`
- Staging (default): `https://uat-brochure.engine.online/api/EngineNews`

**Features**:
- Automatic timeout (30s)
- Retry with exponential backoff
- Handles nested response structure

### Webflow API Client (`lib/api/webflow.js`)

**Functions**:
- `preloadAllItems()` - Loads ALL articles into Map for O(1) lookups
- `findItemByPostId(postId)` - Pagination search (legacy, slower)
- `listItems(collectionId, options)` - Paginated list
- `createItem(collectionId, itemData)` - Create with fieldData
- `updateItem(collectionId, itemId, itemData)` - Update item
- `publishItems(collectionId, itemIds)` - Publish batch
- `deleteItem(collectionId, itemId)` - Delete item

**Features**:
- Rate limit handling (429 status → wait & retry)
- Automatic retry with backoff
- Respects `Retry-After` header (falls back to 60s)

### ReferenceManager (`lib/reference.js`)

Manages category and tag lookups/creation with caching.

**Methods**:
- `ensureCategoryExists(name, color)` - Get or create category, cache result
- `ensureTagExists(tagName)` - Get or create single tag
- `ensureTagsExist(tagNames)` - Get or create multiple tags (parallel)

**Caching**:
- Stores `{ categoryName → itemId }` and `{ tagName → itemId }`
- Per-sync instance (clears on function restart)

### Transformer (`lib/transformer.js`)

**Functions**:
- `transformEngineToWebflow(article, references, useHashedSlug, excludeSlug)` - Convert Engine → Webflow format
- `needsUpdate(existingItem, article)` - Compare updatedDate
- `validateArticle(article)` - Check required fields
- `generateUniqueSlug(slug, postId, appendHash)` - Hash generation for conflicts

**HTML Sanitization**:
- Removes null bytes and control characters
- Fixes malformed tags
- Wraps plain text in `<p>` tags

---

## Data Flow

### Field Mapping (Engine → Webflow)

| Engine | Webflow | Transform |
|--------|---------|-----------|
| `postId` | `postid` | None |
| `title` | `name` | None |
| `slug` | `slug` | Sanitize |
| `content` | `content` | HTML sanitize |
| `desc` | `desc` | None |
| `timestamp` | `published` | ISO 8601 |
| `updatedDate` | `last-updated` | ISO 8601 |
| `cat` | `category` | Reference ID |
| `tags` | `tags` | Reference IDs (array) |
| `color` | `category-color` | None |
| `isFeatured` | `featured` | Boolean |
| `isRecurring` | `recurring` | Boolean |
| `featuredImageBig` | `featured-img-big` | URL |
| `featuredImageSmall` | `featured-img-small` | URL |
| N/A | `last-synced` | Current timestamp |
| N/A | `sync-status` | "synced" |

### Webflow Collections

**Required Collections**:
1. **News** (`WEBFLOW_NEWS_COLLECTION_ID`)
   - Fields: postid, name, slug, content, desc, published, last-updated, category (ref), tags (multi-ref), category-color, featured, recurring, featured-img-big, featured-img-small, last-synced, sync-status

2. **News Categories** (`WEBFLOW_NEWS_CATEGORY_COLLECTION_ID`)
   - Fields: name, slug, color, type

3. **News Tags** (`WEBFLOW_NEWS_TAG_COLLECTION_ID`)
   - Fields: name, slug

---

## Configuration

### Environment Variables

Set in Azure Function App Settings:

```bash
NODE_ENV=production
WEBFLOW_API_TOKEN=your_token_here
WEBFLOW_SITE_ID=your_site_id
WEBFLOW_NEWS_COLLECTION_ID=collection_id
WEBFLOW_NEWS_CATEGORY_COLLECTION_ID=category_collection_id
WEBFLOW_NEWS_TAG_COLLECTION_ID=tag_collection_id
```

**Get values**:
1. **WEBFLOW_API_TOKEN**: Webflow Dashboard → Account Settings → Apps & Integrations
2. **WEBFLOW_SITE_ID**: Webflow Designer → Site Settings → General
3. **Collection IDs**: Webflow Designer → CMS → Collection URL

**Set via Azure CLI**:
```bash
az functionapp config appsettings set \
  --name [app-name] \
  --resource-group [rg-name] \
  --settings \
    NODE_ENV="production" \
    WEBFLOW_API_TOKEN="..." \
    WEBFLOW_SITE_ID="..." \
    WEBFLOW_NEWS_COLLECTION_ID="..." \
    WEBFLOW_NEWS_CATEGORY_COLLECTION_ID="..." \
    WEBFLOW_NEWS_TAG_COLLECTION_ID="..."
```

### Configuration Constants (`config/constants.js`)

**Engine API**:
```javascript
ENGINE_API: {
  PRODUCTION: "https://feeds.engine.online/api/EngineNews",
  STAGING: "https://uat-brochure.engine.online/api/EngineNews"
}
```

**Sync Config**:
```javascript
SYNC_CONFIG: {
  DEFAULT_RECENT_COUNT: 20,
  BATCH_SIZE: 10,
  MAX_RETRIES: 10,
  TIMEOUT: 30000,
  CACHE_TTL: 900000
}
```

### Azure Functions Config (`host.json`)

```json
{
  "version": "2.0",
  "functionTimeout": "00:05:00",
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[3.*, 4.0.0)"
  }
}
```

---

## Deployment

### Prerequisites
- Azure CLI installed
- Azure Functions Core Tools installed
- Azure subscription

### Deploy to Azure

**1. Install tools**:
```bash
brew install azure-cli
brew tap azure/functions
brew install azure-functions-core-tools@4
az login
```

**2. Create resources** (one-time setup):
```bash
RESOURCE_GROUP="rg-we-brochure-prod-001"
LOCATION="westeurope"
FUNCTION_APP_NAME="engine-webflow-sync"
STORAGE_ACCOUNT="enginewebflowsync"

# Create storage
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Standard_LRS

# Create Function App
az functionapp create \
  --resource-group $RESOURCE_GROUP \
  --name $FUNCTION_APP_NAME \
  --storage-account $STORAGE_ACCOUNT \
  --consumption-plan-location $LOCATION \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --os-type Linux
```

**3. Configure environment variables** (one-time setup):
```bash
az functionapp config appsettings set \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings \
    NODE_ENV="production" \
    WEBFLOW_API_TOKEN="your_token_here" \
    WEBFLOW_SITE_ID="your_site_id" \
    WEBFLOW_NEWS_COLLECTION_ID="collection_id" \
    WEBFLOW_NEWS_CATEGORY_COLLECTION_ID="category_collection_id" \
    WEBFLOW_NEWS_TAG_COLLECTION_ID="tag_collection_id"
```

**4. Deploy** (run this anytime you update code):
```bash
func azure functionapp publish $FUNCTION_APP_NAME
```

**5. Set up Logic Apps for automated scheduling** (one-time setup):
```bash
# Get function keys
SYNC_KEY=$(az functionapp function keys list \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --function-name sync \
  --query "default" -o tsv)

ARCHIVE_KEY=$(az functionapp function keys list \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --function-name archive \
  --query "default" -o tsv)

# Create Logic Apps
cd azure

az logic workflow create \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --name engine-sync-cron \
  --definition @sync-cron.json \
  --parameters "{\"functionAppName\": {\"value\": \"$FUNCTION_APP_NAME\"}, \"functionKey\": {\"value\": \"$SYNC_KEY\"}}"

az logic workflow create \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --name engine-archive-cron \
  --definition @archive-cron.json \
  --parameters "{\"functionAppName\": {\"value\": \"$FUNCTION_APP_NAME\"}, \"functionKey\": {\"value\": \"$ARCHIVE_KEY\"}}"
```

### Verify Deployment

**Test functions**:
```bash
# Get monitor key
MONITOR_KEY=$(az functionapp function keys list \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --function-name monitor \
  --query "default" -o tsv)

# Test health
curl "https://${FUNCTION_APP_NAME}.azurewebsites.net/api/monitor?code=${MONITOR_KEY}"
```

**Check Logic Apps**:
1. Azure Portal → Logic Apps → engine-sync-cron
2. Overview → Runs history
3. Verify runs every 15 minutes

**Stream logs**:
```bash
az functionapp log tail \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP
```

---

## Testing

### Local Testing

**1. Install dependencies**:
```bash
npm install
```

**2. Start locally**:
```bash
npm start
# Opens on http://localhost:7071
```

**3. Test endpoints**:
```bash
# Health check
curl http://localhost:7071/api/monitor

# Sync (manual)
curl -X POST http://localhost:7071/api/sync \
  -H "Content-Type: application/json" \
  -d '{"recent": 5}'

# Archive (manual)
curl -X POST http://localhost:7071/api/archive \
  -H "Content-Type: application/json" \
  -d '{"daysThreshold": 90}'
```

### Verify in Webflow

1. Open Webflow CMS
2. Go to News collection
3. Check `last-synced` field is recent
4. Verify published status

---

## Migration

For bulk migration of historical articles from CSV:

### Quick Start

**1. Place CSV**: Copy to `migrate/export.csv`

**2. Convert to JSON**:
```bash
npm run convert
```

**3. Run migration**:
```bash
npm run migrate
```

### CSV Format

Required columns:
- Title
- Slug
- PostID
- Category
- Content
- Desc or Excerpt
- Published (DD/MM/YYYY HH:MM)
- Last Updated (DD/MM/YYYY HH:MM)
- Tags (comma-separated)
- Featured (true/false)
- Recurring (true/false)
- Category Color (hex)
- Featured Image (Big)
- Featured Image (Small)

### Options

```bash
# Custom delay (ms)
npm run migrate -- --delay=1000

# Batch summary frequency
npm run migrate -- --batch-size=100

# Create only (skip existing)
npm run migrate -- --create-only
```

### Notes

- Default delay: 1000ms (adjust if rate limited)
- Existing articles skipped unless content changed
- Slug conflicts auto-resolved with hash append
- Safe to re-run

---

## Troubleshooting

### Common Issues

**"401 Unauthorized"**
- Check `WEBFLOW_API_TOKEN` is correct
- Regenerate token in Webflow if needed

**"Collection ID not found"**
- Verify collection IDs in Azure Function App Settings
- Check IDs match Webflow CMS

**Function timeout**
- Increase timeout in `host.json` (max 10 minutes on Consumption Plan)
- Use App Service Plan for unlimited duration

**Rate limit exceeded**
- System handles automatically (waits 60s)
- Check logs for retry attempts
- Increase delay in migration

**Cron not triggering**
- Check Logic App is enabled
- Verify run history in Azure Portal
- Check function key is correct

**Items not publishing**
- Verify API token has publish permissions
- Check `publishItems()` is called
- Check Webflow CMS publish status

### Debug

**Enable detailed logging**:
```javascript
// In lib/api/webflow.js or lib/api/engine.js
console.log('Full response:', JSON.stringify(response));
```

**Check Azure logs**:
```bash
az functionapp log tail \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP
```

**Monitor Logic Apps**:
1. Azure Portal → Logic Apps → [app name]
2. Runs history → Click run → View details

**View Application Insights Metrics**:
1. Azure Portal → Function App → Application Insights
2. Logs → Run query:
```kusto
// View sync metrics
customMetrics
| where name startswith "Sync"
| order by timestamp desc

// View sync events with details
customEvents
| where name == "SyncCompleted"
| order by timestamp desc
| project timestamp, 
          createdCount = toint(customDimensions.createdCount),
          updatedCount = toint(customDimensions.updatedCount),
          skippedCount = toint(customDimensions.skippedCount),
          errorCount = toint(customDimensions.errorCount),
          durationSeconds = todouble(customDimensions.durationSeconds)

// View archive metrics
customMetrics
| where name startswith "Archive"
| order by timestamp desc

// View archive events with details
customEvents
| where name == "ArchiveCompleted"
| order by timestamp desc
| project timestamp, 
          archivedCount = toint(customDimensions.archivedCount),
          totalChecked = toint(customDimensions.totalChecked),
          daysThreshold = toint(customDimensions.daysThreshold),
          durationSeconds = todouble(customDimensions.durationSeconds)

// Chart sync activity over time
customEvents
| where name == "SyncCompleted"
| summarize Created = sum(toint(customDimensions.createdCount)),
            Updated = sum(toint(customDimensions.updatedCount)),
            Errors = sum(toint(customDimensions.errorCount))
            by bin(timestamp, 1h)
| render timechart
```

3. Metrics Explorer → Select metrics like `SyncCreatedCount`, `ArchiveArchivedCount`
4. Create dashboards and alerts based on these metrics (e.g., alert if SyncErrorCount > 5)

### Performance

**Bottleneck**: `findItemByPostId()` searches linearly

**Solutions**:
- Use `preloadAllItems()` for bulk operations (already implemented in migrate)
- Add caching layer
- Use external database for ID mapping

---

## Summary

Automated sync system running on Azure Functions with:

✅ **Reliable**: Retry logic, error handling, rate limiting  
✅ **Automated**: Runs every 15 minutes via Logic App  
✅ **Flexible**: Manual functions for testing and bulk migration  
✅ **Monitored**: Health check endpoint  
✅ **Scalable**: Serverless on Azure Consumption Plan

**Cost**: ~$0-5/month on Consumption Plan

**Main flow**:
1. Logic App triggers sync every 15 minutes
2. Function fetches recent articles from Engine
3. Checks if exists in Webflow
4. Creates/updates and publishes
5. Returns summary
