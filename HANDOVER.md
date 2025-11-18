# Project Handover Guide

## Overview
This document explains how to take ownership of the Engine-to-Webflow sync system.

---

## Current Deployment

**Platform**: Azure Functions (Serverless)
**Region**: West Europe
**Resource Group**: `rg-we-brochure-prod-001`
**Function App**: `engine-webflow-sync`

**Functions Running**:
- **Sync** (every 15 min): Syncs recent articles from Engine to Webflow
- **Archive** (daily 2 AM): Archives old "Updates" category articles
- **Monitor**: Health check endpoint
- **Migrate**: Bulk migration tool (manual)
- **Test**: Local testing endpoint

---

## Taking Ownership

### 1. Transfer Codebase

**Option A: Azure DevOps (Recommended for Azure-centric teams)**
```bash
# Create project at dev.azure.com
# Import code from GitHub or push from local:
git remote add azure https://dev.azure.com/{your-org}/engine-webflow-sync/_git/engine
git push azure main
```

**Option B: GitHub (If you prefer GitHub)**
```bash
# Transfer GitHub repository ownership
# Or create new repo and push code
git remote set-url origin https://github.com/{your-org}/engine-webflow-sync.git
git push origin main
```

**Option C: Export Bundle (Offline transfer)**
```bash
# From developer's machine:
git bundle create engine-repo.bundle --all

# On your machine:
git clone engine-repo.bundle engine-webflow-sync
cd engine-webflow-sync
git remote set-url origin {your-git-url}
git push origin main
```

### 2. Install Required Tools

```bash
# Install Azure CLI
brew install azure-cli  # macOS
# or download from: https://aka.ms/installazurecliwindows (Windows)

# Install Azure Functions Core Tools
brew tap azure/functions  # macOS
brew install azure-functions-core-tools@4
# or: npm install -g azure-functions-core-tools@4 (Windows)

# Login to Azure
az login
```

### 3. Verify Access

```bash
# Check you can see the resource group
az group show --name rg-we-brochure-prod-001

# Check you can see the function app
az functionapp show --name engine-webflow-sync --resource-group rg-we-brochure-prod-001

# List all functions
az functionapp function list --name engine-webflow-sync --resource-group rg-we-brochure-prod-001
```

### 4. Make Your First Deployment

```bash
cd /path/to/engine-webflow-sync
func azure functionapp publish engine-webflow-sync
```

This command:
- Packages all code
- Uploads to Azure
- Installs dependencies
- Restarts functions
- Takes ~30-60 seconds

---

## Environment Variables

Already configured in Azure, but for reference:

```bash
NODE_ENV=production
WEBFLOW_API_TOKEN=aeb463cb06708b2b3ccc2edbac9b68a76c086df66e6d6b035467cc5196ead84b
WEBFLOW_SITE_ID=68b1c2c2623a4419e1af824d
WEBFLOW_NEWS_COLLECTION_ID=68dce8b9b39e7b0b2b040cf5
WEBFLOW_NEWS_CATEGORY_COLLECTION_ID=68dce91bbfdf950f5b1531fe
WEBFLOW_NEWS_TAG_COLLECTION_ID=68f8fb7885da7e9205ca38ab
```

**To update in future**:
```bash
az functionapp config appsettings set \
  --name engine-webflow-sync \
  --resource-group rg-we-brochure-prod-001 \
  --settings \
    WEBFLOW_API_TOKEN="new_token_here"
```

---

## Scheduled Jobs (Logic Apps)

Two Logic Apps run automatically:

1. **engine-sync-cron**: Triggers sync every 15 minutes
2. **engine-archive-cron**: Triggers archive daily at 2 AM UTC

**View in Azure Portal**:
- Go to portal.azure.com
- Search for "Logic Apps"
- Click each app → "Runs history"

**Disable/Enable**:
```bash
# Disable
az logic workflow update --name engine-sync-cron --resource-group rg-we-brochure-prod-001 --state Disabled

# Enable
az logic workflow update --name engine-sync-cron --resource-group rg-we-brochure-prod-001 --state Enabled
```

---

## Making Code Changes

### Workflow

1. **Edit code locally** in your preferred editor
2. **Test locally** (optional):
   ```bash
   npm install
   npm start
   # Functions run at http://localhost:7071
   ```
3. **Deploy to Azure**:
   ```bash
   func azure functionapp publish engine-webflow-sync
   ```
4. **Verify**:
   ```bash
   # Get monitor URL
   az functionapp function keys list \
     --name engine-webflow-sync \
     --resource-group rg-we-brochure-prod-001 \
     --function-name monitor \
     --query "default" -o tsv

   # Test health check
   curl "https://engine-webflow-sync.azurewebsites.net/api/monitor?code={KEY_FROM_ABOVE}"
   ```

### Common Changes

**Update sync frequency** (currently 15 minutes):
- Edit `azure/sync-cron.json`
- Change `recurrence` section
- Redeploy Logic App

**Update archive threshold** (currently 90 days):
- Edit `functions/archive/index.js`
- Change `DEFAULT_DAYS_THRESHOLD` constant
- Redeploy: `func azure functionapp publish engine-webflow-sync`

**Add new Webflow fields**:
- Edit `lib/transformer.js` (field mappings)
- Edit `config/constants.js` (field names)
- Redeploy

---

## Monitoring & Troubleshooting

### View Logs

```bash
# Stream live logs
az functionapp log tail \
  --name engine-webflow-sync \
  --resource-group rg-we-brochure-prod-001
```

**Or in Azure Portal**:
- Go to Function App → Monitoring → Log stream

### Check Function Status

```bash
# Get all function keys and test URLs
for func in sync archive migrate monitor test; do
  KEY=$(az functionapp function keys list \
    --name engine-webflow-sync \
    --resource-group rg-we-brochure-prod-001 \
    --function-name $func \
    --query 'default' -o tsv)
  echo "$func: https://engine-webflow-sync.azurewebsites.net/api/$func?code=$KEY"
done
```

### Common Issues

**"401 Unauthorized"**
- Check Webflow API token is still valid
- Regenerate token in Webflow Dashboard if needed
- Update in Azure: `az functionapp config appsettings set ...`

**"Functions not running"**
- Check Logic Apps are enabled
- Restart function app: `az functionapp restart --name engine-webflow-sync --resource-group rg-we-brochure-prod-001`

**"Rate limit exceeded"**
- System handles automatically (waits and retries)
- Check logs for repeated errors
- May need to reduce sync frequency

---

## Cost Management

**Current Plan**: Consumption (Serverless)
**Expected Cost**: $0-5/month

**Monitor costs**:
- Azure Portal → Cost Management + Billing
- View by resource group: `rg-we-brochure-prod-001`

---

## Optional: Set Up CI/CD (Future)

If you want automated deployments on git push:

1. **Azure DevOps**:
   - Create pipeline from template
   - Use Azure Repos Git
   - Auto-deploy on commit to `main`

2. **GitHub Actions**:
   - Create `.github/workflows/deploy.yml`
   - Use Azure Functions deploy action
   - Auto-deploy on push to `main`

**Not required** - manual `func publish` works fine for infrequent changes.

---

## Support Resources

**Documentation**:
- `README.md` - Full technical documentation
- `checklist.md` - Step-by-step deployment guide
- `refactor.md` - Architecture and code structure

**Azure Docs**:
- [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/)
- [Azure Logic Apps](https://learn.microsoft.com/en-us/azure/logic-apps/)
- [Azure CLI Reference](https://learn.microsoft.com/en-us/cli/azure/)

**Webflow API**:
- [Webflow API Docs](https://developers.webflow.com/)

---

## Questions?

Contact original developer during handover period for any clarifications.

After handover, refer to documentation or Azure support.
