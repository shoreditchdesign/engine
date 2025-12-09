# Engine-to-Webflow Sync System

Automated synchronization system that syncs news articles from Engine CMS to Webflow CMS using GitHub Actions.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                       GitHub Actions (Scheduler)                 │
│  ┌──────────────────────┐      ┌─────────────────────────────┐ │
│  │  Sync Workflow       │      │  Archive Workflow           │ │
│  │  (Every 30 mins)     │      │  (Daily 2 AM UTC)           │ │
│  └──────────┬───────────┘      └──────────┬──────────────────┘ │
└─────────────┼────────────────────────────┼─────────────────────┘
              │                             │
              ▼                             ▼
    ┌─────────────────┐          ┌──────────────────┐
    │   api/sync.js   │          │  api/archive.js  │
    └────────┬────────┘          └────────┬─────────┘
             │                            │
             ├────────────────────────────┤
             │                            │
    ┌────────▼──────────────────────────┐ │
    │    lib/transformer.js             │ │
    │    - Field mapping                │ │
    │    - HTML sanitization            │ │
    │    - Slug generation              │ │
    └────────┬──────────────────────────┘ │
             │                            │
    ┌────────▼──────────┐  ┌──────────────▼─────────┐
    │  lib/reference.js │  │   lib/api/webflow.js   │
    │  - Category cache │  │   - CRUD operations    │
    │  - Auto-create    │  │   - Rate limiting      │
    └────────┬──────────┘  │   - Preload items      │
             │             └─────────┬────────────┬──┘
             │                       │            │
    ┌────────▼───────────┐          │            │
    │ lib/api/engine.js  │          │            │
    │ - GetRecentPostsV2 │          │            │
    │ - GetPostById      │          │            │
    └────────┬───────────┘          │            │
             │                       │            │
             ▼                       ▼            ▼
    ┌────────────────┐     ┌─────────────────────────┐
    │   Engine API   │     │     Webflow CMS API     │
    │   (Source)     │     │     (Destination)       │
    └────────────────┘     └─────────────────────────┘
```

## Key Features
- **Automatic Sync**: Runs every 30 minutes via GitHub Actions
- **Smart Updates**: Only syncs when `updatedDate` field changes
- **Auto-Archive**: Deletes old "Updates" articles (60+ days) daily
- **Error Recovery**: Retry logic with exponential backoff
- **Rate Limiting**: Automatic Webflow API rate limit handling
- **Performance**: Preloads all items for O(1) lookups (~18K→90 API calls)

## Technology Stack
- **Runtime**: Node.js 20.x
- **Platform**: GitHub Actions
- **APIs**: Engine API, Webflow CMS API v2
- **Module System**: ES Modules

---

## Project Structure

```
brochuresync/
├── api/                    # Main scripts
│   ├── sync.js            # Sync recent articles (200 default)
│   ├── archive.js         # Delete old "Updates" articles  (60 days default)
│   ├── migrate.js         # Bulk migration from JSON (Used for historical data migration)
│   └── monitor.js         # API health check
│
├── lib/                    # Core logic
│   ├── api/
│   │   ├── engine.js      # Engine API client
│   │   └── webflow.js     # Webflow API client (v2)
│   ├── reference.js       # Category manager (cached)
│   ├── transformer.js     # Field mapping & sanitization
│   ├── converter.js       # CSV to JSON converter
│   └── utils.js           # Error handling & retry logic
│
├── config/
│   └── constants.js       # API endpoints, field mappings, retry config
│
├── .github/workflows/
│   ├── sync.yml          # 30-min sync schedule
│   └── archive.yml       # Daily archive schedule (2AM)
│
└── package.json
```

---

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env`: Already added to your GitHub environment variables for Github Action Runs

```bash
NODE_ENV=production
WEBFLOW_API_TOKEN=your_token
WEBFLOW_SITE_ID=your_site_id
WEBFLOW_NEWS_COLLECTION_ID=collection_id
WEBFLOW_NEWS_CATEGORY_COLLECTION_ID=category_collection_id
WEBFLOW_NEWS_TAG_COLLECTION_ID=tag_collection_id
```

---

## Local Usage

```bash
npm run sync              # Sync 200 recent articles
npm run sync 50           # Sync 50 recent articles
npm run archive           # Delete 60+ day old Updates
npm run archive 90        # Delete 90+ day old Updates (custom threshold)
npm run migrate           # Bulk migrate from migrate/export.json
npm run monitor           # Check API health
```

---

## Data Flow

### Field Mapping (Engine → Webflow)

| Engine Field | Webflow Field | Required | Transform |
|--------------|---------------|----------|-----------|
| `postId` | `postid` | ✅ | String |
| `title` | `name` | ✅ | None |
| `slug` | `slug` | ✅ | Sanitized, hashed on conflict |
| `content` | `content` | ❌ | HTML sanitized |
| `desc` | `desc` | ❌ | None |
| `timestamp` | `published` | ✅ | ISO 8601 |
| `updatedDate` | `last-updated` | ❌ | ISO 8601 |
| `cat` | `category` | ✅ | Reference ID (auto-created) |
| `tags` | `tags` | ❌ | Reference IDs (auto-created) |
| `color` | `category-color` | ❌ | Hex code |
| `isFeatured` | `featured` | ❌ | Boolean |
| `isRecurring` | `recurring` | ❌ | Boolean |
| `featuredImageBig` | `featured-img-big` | ❌ | URL |
| `featuredImageSmall` | `featured-img-small` | ❌ | URL |
| _(auto)_ | `last-synced` | ✅ | ISO 8601 |
| _(auto)_ | `sync-status` | ✅ | "Synced" |

### Sync Logic (`api/sync.js`)

1. Preload all Webflow items → Map by `postId`
2. Fetch 200 recent articles from Engine API
3. For each article:
   - Check if exists (O(1) lookup)
   - Compare `updatedDate` → skip if unchanged
   - Fetch full content via `GetPostById`
   - Ensure category exists (cached, auto-create)
   - Ensure tags exist (deprecated since Dec 2025))
   - Transform to Webflow format
   - Create or update → publish
   - Handle errors (slug conflicts, image imports)

### Archive Logic (`api/archive.js`)

1. Preload all categories + articles
2. Filter for:
   - Category type = "Updates" ID
   - Published date > 60 days old
3. Delete filtered articles
4. Publish site (trigger SEO re-crawl)
5. Write log: `/logs/deleted-YYYY-MM-DD.log`

---

## GitHub Actions

### Sync Workflow
- **Schedule**: `*/30 * * * *` (every 30 mins)
- **Manual**: Workflow dispatch with custom `recent_count`
- **Default**: 200 articles

### Archive Workflow
- **Schedule**: `0 2 * * *` (daily 2 AM UTC)
- **Manual**: Workflow dispatch with custom `days_threshold`
- **Default**: 60 days

---

## Error Handling

| Error Type | Action |
|------------|--------|
| Slug conflict | Retry with 4-char hash appended |
| Image import failure | Retry without images |
| Rate limit (429) | Wait 60s, retry (max 10×) |
| Network error | Exponential backoff: 1s→2s→4s→5s |
| Auth error (401) | Fail immediately |
| Validation error (400) | Fail immediately |

**Retry Config**: Max 10 attempts, capped exponential backoff

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check `WEBFLOW_API_TOKEN` |
| Collection not found | Verify collection IDs in `.env` |
| No articles syncing | Check `updatedDate` field in Engine API |
| Articles not publishing | Verify API token has publish permissions |
| GitHub Actions failing | Check secrets are set correctly |

---

## Development

**Dependencies:**
- `node-fetch` - HTTP client
- `dotenv` - Environment variables
- `abort-controller` - Request timeouts

---

## License

Private project - All rights reserved
