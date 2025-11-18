# Engine-to-Webflow Sync System

Automated synchronization system that syncs news articles from Engine CMS to Webflow CMS using GitHub Actions.

## Overview

This system automatically syncs news articles from the Engine API to Webflow CMS and archives old articles on a schedule.

### Key Features
- **Automatic Sync**: Scheduled via GitHub Actions
- **Archive Old Articles**: Archives "Updates" category articles older than 90 days
- **Smart Updates**: Only syncs when content has changed
- **Error Handling**: Retry logic with exponential backoff
- **Rate Limiting**: Automatic Webflow API rate limit handling
- **Performance Optimized**: Preloads all items for O(1) lookups

### Technology Stack
- **Runtime**: Node.js 20.x
- **Platform**: GitHub Actions
- **API Client**: node-fetch
- **Module System**: ES Modules

---

## Project Structure

```
brochuresync/
├── api/                    # Main scripts
│   ├── sync.js            # Sync recent articles from Engine to Webflow
│   ├── archive.js         # Archive old "Updates" articles
│   ├── monitor.js         # Health check for APIs
│   └── migrate.js         # Bulk migration from CSV
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
├── .github/workflows/     # GitHub Actions workflows
│   ├── sync.yml          # Scheduled sync job
│   └── archive.yml       # Scheduled archive job
│
└── package.json
```

---

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Node Environment
NODE_ENV=production

# Webflow API Configuration
WEBFLOW_API_TOKEN=your_token_here
WEBFLOW_SITE_ID=your_site_id

# Webflow Collection IDs
WEBFLOW_NEWS_COLLECTION_ID=collection_id
WEBFLOW_NEWS_CATEGORY_COLLECTION_ID=category_collection_id
WEBFLOW_NEWS_TAG_COLLECTION_ID=tag_collection_id
```

**How to get these values:**
1. **WEBFLOW_API_TOKEN**: Webflow Dashboard → Account Settings → Apps & Integrations
2. **WEBFLOW_SITE_ID**: Webflow Designer → Site Settings → General
3. **Collection IDs**: Webflow Designer → CMS → Collection URL

### 3. GitHub Actions Secrets

Add the following secrets to your GitHub repository:
- Go to Settings → Secrets and variables → Actions → New repository secret
- Add each environment variable from your `.env` file

---

## Usage

### Local Testing

**Sync articles:**
```bash
npm run sync          # Syncs default 20 recent articles
npm run sync 5        # Syncs 5 recent articles
```

**Archive old articles:**
```bash
npm run archive       # Archives articles older than 90 days
npm run archive 60    # Archives articles older than 60 days
```

**Monitor API health:**
```bash
npm run monitor       # Checks Engine and Webflow API connectivity
```

**Bulk migration:**
```bash
npm run migrate       # Migrates articles from migrate/export.json
```

---

## Functions

### Sync (`api/sync.js`)

Syncs recent articles from Engine API to Webflow CMS.

**What it does:**
1. Preloads all existing Webflow items for fast lookups
2. Fetches recent articles from Engine API
3. For each article:
   - Validates required fields
   - Checks if it exists in Webflow
   - Skips if no changes detected
   - Creates or updates article if needed
   - Ensures categories and tags exist
   - Auto-publishes to live site

**Output:**
```
SYNC COMPLETE
Total: 20   | Created: 2    | Updated: 3    | Skipped: 15   | Warnings: 0    | Errors: 0    | Time: 25.3  s | Rate: 0.79 /s
```

### Archive (`api/archive.js`)

Archives old "Updates" category articles.

**What it does:**
1. Preloads all categories and articles
2. Filters for "Updates" category articles older than threshold
3. Archives each article (unpublishes and marks as archived)
4. Writes log file to `/logs/archived-YYYY-MM-DD.log`

**Output:**
```
ARCHIVE COMPLETE
Checked: 8476 | Archived: 12   | Skipped: 8464 | Warnings: 0    | Errors: 0    | Time: 35.2  s
```

---

## Data Flow

### Field Mapping (Engine → Webflow)

| Engine Field | Webflow Field | Transform |
|--------------|---------------|-----------|
| `postId` | `postid` | None |
| `title` | `name` | None |
| `slug` | `slug` | Sanitized |
| `content` | `content` | HTML sanitized |
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

---

## GitHub Actions

### Automated Schedules

**Sync Workflow** (`.github/workflows/sync.yml`)
- Runs every 15 minutes
- Syncs 20 most recent articles from Engine

**Archive Workflow** (`.github/workflows/archive.yml`)
- Runs daily at 2:00 AM UTC
- Archives "Updates" articles older than 90 days

### Manual Triggers

You can also trigger workflows manually from GitHub:
1. Go to Actions tab in your repository
2. Select the workflow (Sync or Archive)
3. Click "Run workflow"
4. Optionally adjust parameters

---

## Error Handling

The system handles common errors gracefully:

- **Slug Conflicts**: Automatically retries with hashed slug
- **Image Import Failures**: Retries without images and logs warning
- **Rate Limits**: Waits and retries when Webflow API rate limit hit
- **Network Errors**: Exponential backoff retry logic
- **Missing Data**: Validates and skips articles with missing required fields

---

## Troubleshooting

### "401 Unauthorized"
- Check `WEBFLOW_API_TOKEN` is correct
- Regenerate token in Webflow if needed

### "Collection ID not found"
- Verify collection IDs match your Webflow CMS
- Check IDs in Webflow Designer → CMS

### No articles syncing
- Check Engine API is accessible
- Verify articles have `updatedDate` field
- Run `npm run monitor` to check API connectivity

### Articles not publishing
- Verify API token has publish permissions
- Check Webflow CMS for draft status

---

## Development

### Project Dependencies

```json
{
  "abort-controller": "^3.0.0",
  "dotenv": "^16.3.1",
  "node-fetch": "^3.3.2"
}
```

### Environment Selection

The Engine API endpoint is selected based on `NODE_ENV`:
- **Production** (`NODE_ENV=production`): `https://feeds.engine.online/api/EngineNews`
- **Staging** (default): `https://uat-brochure.engine.online/api/EngineNews`

---

## License

Private project - All rights reserved
