# Azure Functions Deployment Guide

## Overview
This guide covers deploying the Engine-to-Webflow sync system to Azure Functions.

---

## Prerequisites

1. **Azure CLI installed**
   ```bash
   # Install Azure CLI (macOS)
   brew install azure-cli
   
   # Login to Azure
   az login
   ```

2. **Azure Function App created**
   - You should have a Function App already created in Azure Portal
   - Note down: Resource Group name and Function App name

---

## Environment Variables Deployment

### Option 1: Azure CLI (Recommended for Production)

This is the recommended approach for deploying to production. It's scriptable, repeatable, and can be version-controlled.

```bash
# Set your variables
RESOURCE_GROUP="your-resource-group-name"
FUNCTION_APP_NAME="your-function-app-name"

# Deploy all environment variables at once
az functionapp config appsettings set \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings \
    ENGINE_API_URL="https://feeds.engine.online/api/EngineNews" \
    ENGINE_API_TOKEN="your-engine-api-token" \
    WEBFLOW_API_TOKEN="your-webflow-api-token" \
    WEBFLOW_SITE_ID="your-webflow-site-id" \
    WEBFLOW_NEWS_COLLECTION_ID="your-news-collection-id" \
    WEBFLOW_NEWS_CATEGORY_COLLECTION_ID="your-category-collection-id" \
    WEBFLOW_NEWS_TAG_COLLECTION_ID="your-tag-collection-id"
```

**To verify settings:**
```bash
az functionapp config appsettings list \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --output table
```

### Option 2: Azure Functions Core Tools (Local → Azure)

Deploy your local `.env` settings directly to Azure:

```bash
# Install Azure Functions Core Tools (if not already installed)
npm install -g azure-functions-core-tools@4

# From your project root directory
func azure functionapp publish $FUNCTION_APP_NAME --publish-local-settings
```

**Important**: This will upload ALL settings from your `local.settings.json` file. Make sure it's populated first.

### Option 3: Azure Portal (GUI - Good for First-Time Setup)

1. Go to Azure Portal → Your Function App
2. Settings → Configuration
3. Click "+ New application setting" for each variable:
   - `ENGINE_API_URL`
   - `ENGINE_API_TOKEN`
   - `WEBFLOW_API_TOKEN`
   - `WEBFLOW_SITE_ID`
   - `WEBFLOW_NEWS_COLLECTION_ID`
   - `WEBFLOW_NEWS_CATEGORY_COLLECTION_ID`
   - `WEBFLOW_NEWS_TAG_COLLECTION_ID`
4. Click "Save" at the top

---

## Deploying Function Code

### Option 1: Azure Functions Core Tools (Recommended for Local Development)

```bash
# From your project root directory
func azure functionapp publish $FUNCTION_APP_NAME

# This will:
# 1. Package your functions
# 2. Upload to Azure
# 3. Deploy and start the functions
```

### Option 2: Azure CLI with ZIP Deploy

```bash
# Create a deployment package
zip -r deploy.zip . -x "*.git*" "node_modules/*" ".env" "local.settings.json"

# Deploy the package
az functionapp deployment source config-zip \
  --resource-group $RESOURCE_GROUP \
  --name $FUNCTION_APP_NAME \
  --src deploy.zip
```

### Option 3: GitHub Actions (CI/CD Pipeline)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Azure Functions

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Deploy to Azure Functions
        uses: Azure/functions-action@v1
        with:
          app-name: ${{ secrets.AZURE_FUNCTION_APP_NAME }}
          package: .
          publish-profile: ${{ secrets.AZURE_FUNCTIONAPP_PUBLISH_PROFILE }}
```

---

## Timer Trigger Configuration

Your functions are configured with the following schedules:

### Sync Function
- **Schedule**: Every 15 minutes
- **Cron Expression**: `0 */15 * * * *`
- **File**: `functions/sync/function.json`
- **Also available**: Manual HTTP trigger

### Archive Function
- **Schedule**: Daily at 2:00 AM UTC
- **Cron Expression**: `0 0 2 * * *`
- **File**: `functions/archive/function.json`
- **Also available**: Manual HTTP trigger

**To modify schedules**, edit the `schedule` field in the respective `function.json` files:

```json
{
  "name": "myTimer",
  "type": "timerTrigger",
  "direction": "in",
  "schedule": "0 */15 * * * *",  // ← Change this
  "runOnStartup": false
}
```

**Cron Expression Format**: `{second} {minute} {hour} {day} {month} {day-of-week}`

Examples:
- Every 5 minutes: `0 */5 * * * *`
- Every hour: `0 0 * * * *`
- Every day at 3 AM: `0 0 3 * * *`
- Every Monday at 9 AM: `0 0 9 * * 1`

---

## Manual HTTP Triggers

Even with timer triggers enabled, you can still manually trigger functions via HTTP:

### Sync Function
```bash
# Using function key
curl -X POST "https://$FUNCTION_APP_NAME.azurewebsites.net/api/sync?code=YOUR_FUNCTION_KEY" \
  -H "Content-Type: application/json" \
  -d '{"recent": 200}'

# Custom recent count
curl -X POST "https://$FUNCTION_APP_NAME.azurewebsites.net/api/sync?code=YOUR_FUNCTION_KEY" \
  -H "Content-Type: application/json" \
  -d '{"recent": 50}'
```

### Archive Function
```bash
# Using function key
curl -X POST "https://$FUNCTION_APP_NAME.azurewebsites.net/api/archive?code=YOUR_FUNCTION_KEY" \
  -H "Content-Type: application/json" \
  -d '{"daysThreshold": 60}'

# Custom threshold
curl -X POST "https://$FUNCTION_APP_NAME.azurewebsites.net/api/archive?code=YOUR_FUNCTION_KEY" \
  -H "Content-Type: application/json" \
  -d '{"daysThreshold": 90}'
```

### Monitor Function
```bash
# Health check
curl "https://$FUNCTION_APP_NAME.azurewebsites.net/api/monitor?code=YOUR_FUNCTION_KEY"
```

**To get your function keys:**
```bash
az functionapp keys list \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP
```

---

## Verification After Deployment

### 1. Check Function Status
```bash
az functionapp show \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --query "state"
```

### 2. View Live Logs
```bash
func azure functionapp logstream $FUNCTION_APP_NAME
```

Or in Azure Portal:
- Function App → Functions → Select function → Monitor → Live Metrics

### 3. Test Health Endpoint
```bash
curl "https://$FUNCTION_APP_NAME.azurewebsites.net/api/monitor?code=YOUR_FUNCTION_KEY"
```

### 4. Check Application Insights
- Azure Portal → Your Function App → Application Insights
- View custom events: `EngineAPIHealthCheck`, `WebflowAPIHealthCheck`, `ArticleCreated`, etc.
- View metrics: `SyncDurationSeconds`, `HealthCheckSuccess`, etc.

---

## Troubleshooting

### Environment Variables Not Working
```bash
# Restart the function app after setting variables
az functionapp restart \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP
```

### Check Function Logs
```bash
# Stream logs in real-time
az webapp log tail \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP
```

### Timer Not Triggering
1. Check Azure Portal → Function App → Functions → [Your Function] → Integration
2. Verify timer trigger is enabled
3. Check `runOnStartup` is set to `false` (prevents immediate execution on deploy)
4. View execution history in Monitor tab

---

## Quick Deployment Script

Save this as `deploy.sh`:

```bash
#!/bin/bash

# Configuration
RESOURCE_GROUP="your-resource-group"
FUNCTION_APP_NAME="your-function-app"

echo "🚀 Deploying to Azure Functions..."

# 1. Set environment variables
echo "📝 Setting environment variables..."
az functionapp config appsettings set \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings \
    ENGINE_API_URL="https://feeds.engine.online/api/EngineNews" \
    ENGINE_API_TOKEN="$ENGINE_API_TOKEN" \
    WEBFLOW_API_TOKEN="$WEBFLOW_API_TOKEN" \
    WEBFLOW_SITE_ID="$WEBFLOW_SITE_ID" \
    WEBFLOW_NEWS_COLLECTION_ID="$WEBFLOW_NEWS_COLLECTION_ID" \
    WEBFLOW_NEWS_CATEGORY_COLLECTION_ID="$WEBFLOW_NEWS_CATEGORY_COLLECTION_ID" \
    WEBFLOW_NEWS_TAG_COLLECTION_ID="$WEBFLOW_NEWS_TAG_COLLECTION_ID"

# 2. Deploy functions
echo "📦 Deploying functions..."
func azure functionapp publish $FUNCTION_APP_NAME

# 3. Verify deployment
echo "✅ Verifying deployment..."
az functionapp show \
  --name $FUNCTION_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --query "state"

echo "🎉 Deployment complete!"
echo "View logs: az webapp log tail --name $FUNCTION_APP_NAME --resource-group $RESOURCE_GROUP"
```

Make it executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Next Steps

After deployment, see [APPLICATION_INSIGHTS.md](./APPLICATION_INSIGHTS.md) for setting up monitoring, alerts, and dashboards.
