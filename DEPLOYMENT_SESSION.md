# Azure Functions Deployment Session - 2025-11-18

## Summary
Attempted deployment of Engine-Webflow sync functions to Azure Functions with the following configuration:
- **Function App Name**: `fa-wf-enginesync-prod-001`
- **Resource Group**: `rg-we-brochure-prod-001`
- **Storage Account**: `enginewebflowstorage`
- **Application Insights**: `ai-wf-enginesync-prod-001`
- **Region**: Southeast Asia
- **Node Version**: 20.19.5

---

## What Was Completed Successfully ✅

### 1. Azure CLI Setup
```bash
brew install azure-cli
az login
# Selected subscription: we-engine-prod-001 (6fc1bd28-78a3-4dc7-beb5-2985c606f8bd)
```

### 2. Storage Account Created
```bash
az storage account create \
  --name enginewebflowstorage \
  --location southeastasia \
  --resource-group rg-we-brochure-prod-001 \
  --sku Standard_LRS
```
**Status**: ✅ Created successfully

### 3. Function App Created
```bash
az functionapp create \
  --resource-group rg-we-brochure-prod-001 \
  --consumption-plan-location southeastasia \
  --runtime node \
  --runtime-version 20 \
  --functions-version 4 \
  --name fa-wf-enginesync-prod-001 \
  --storage-account enginewebflowstorage \
  --os-type Linux
```
**Status**: ✅ Created successfully
**URL**: https://fa-wf-enginesync-prod-001.azurewebsites.net

### 4. Application Insights Created
```bash
az monitor app-insights component create \
  --app ai-wf-enginesync-prod-001 \
  --location southeastasia \
  --resource-group rg-we-brochure-prod-001 \
  --application-type web
```
**Status**: ✅ Created successfully
**Instrumentation Key**: `c50b2a41-3d0a-4d74-a633-6c492caa561b`

### 5. Application Insights Linked to Function App
```bash
az functionapp config appsettings set \
  --name fa-wf-enginesync-prod-001 \
  --resource-group rg-we-brochure-prod-001 \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=c50b2a41-3d0a-4d74-a633-6c492caa561b
```
**Status**: ✅ Linked successfully

### 6. Environment Variables Deployed
```bash
az functionapp config appsettings set \
  --name fa-wf-enginesync-prod-001 \
  --resource-group rg-we-brochure-prod-001 \
  --settings \
    WEBFLOW_API_TOKEN=aeb463cb06708b2b3ccc2edbac9b68a76c086df66e6d6b035467cc5196ead84b \
    WEBFLOW_SITE_ID=68b1c2c2623a4419e1af824d \
    WEBFLOW_NEWS_COLLECTION_ID=68dce8b9b39e7b0b2b040cf5 \
    WEBFLOW_NEWS_CATEGORY_COLLECTION_ID=68dce91bbfdf950f5b1531fe \
    WEBFLOW_NEWS_TAG_COLLECTION_ID=68f8fb7885da7e9205ca38ab \
    NODE_ENV=production
```
**Status**: ✅ All environment variables set

**Verified settings**:
```bash
az functionapp config appsettings list \
  --name fa-wf-enginesync-prod-001 \
  --resource-group rg-we-brochure-prod-001 \
  --output table
```
All settings confirmed present with correct values.

### 7. Azure Functions Core Tools Installed
Initial attempt via Homebrew failed (only v2 available).

**Solution**: Installed via NPM
```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```
**Status**: ✅ Installed v4.5.0

---

## Current Issue: Functions Not Deploying ⚠️

### Deployment Attempts

**Attempt 1**: Basic deployment
```bash
func azure functionapp publish fa-wf-enginesync-prod-001
```
**Result**: Deployment succeeded, but output shows:
```
Functions in fa-wf-enginesync-prod-001:

```
(Empty - no functions listed)

**Attempt 2**: Remote build
```bash
func azure functionapp publish fa-wf-enginesync-prod-001 --build remote
```
**Result**: 
- Remote build succeeded
- Dependencies installed successfully (9 packages)
- Node 20.19.5 installed on Azure
- Deployment completed
- **But still no functions showing up**

### Changes Made to Fix

1. **Updated package.json**:
   - Removed `"type": "module"` (was causing CommonJS/ESM conflict)
   - Changed engines from `"node": "18.x"` to `"node": "20.x"`

2. **Redeployed after package.json fix**:
   - Same result - deployment succeeds, no functions appear

### Deployment Logs Analysis

Remote build output shows:
```
Copying files to destination directory '/home/site/wwwroot'...
Done in 0 sec(s).
```

Number of files deployed:
```
Number of files 195
Number of directories 41
Filesystem size 1763.38 Kbytes (1.72 Mbytes)
```

The deployment is uploading files, but Azure Functions runtime is not recognizing the functions.

---

## Current File Structure

```
/Users/austinshoreditch/Documents/Github/engine/
├── functions/
│   ├── sync/
│   │   ├── function.json
│   │   └── index.js
│   ├── archive/
│   │   ├── function.json
│   │   └── index.js
│   ├── migrate/
│   │   ├── function.json
│   │   └── index.js
│   └── monitor/
│       ├── function.json
│       └── index.js
├── lib/
│   ├── api/
│   │   ├── engine.js
│   │   └── webflow.js
│   ├── reference.js
│   ├── transformer.js
│   └── utils.js
├── config/
│   └── constants.js
├── host.json
├── package.json
└── local.settings.json
```

### Sample function.json (sync)
```json
{
  "bindings": [
    {
      "name": "myTimer",
      "type": "timerTrigger",
      "direction": "in",
      "schedule": "0 */15 * * * *",
      "runOnStartup": false
    },
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get", "post"]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
```

### host.json
```json
{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "maxTelemetryItemsPerSecond": 20
      }
    },
    "logLevel": {
      "default": "Information",
      "Host.Results": "Information",
      "Function": "Information",
      "Host.Aggregator": "Trace"
    }
  },
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[3.*, 4.0.0)"
  },
  "functionTimeout": "00:10:00"
}
```

---

## Potential Issues to Investigate

### 1. .funcignore File
The `.funcignore` file may be excluding too much:
```
# Current .funcignore excludes:
api/          # Old API directory
migrate/      # Migration data
*.md          # Documentation
public/       # Public assets
```

**Question**: Is the `functions/` directory being properly included?

### 2. CommonJS vs ESM
Functions use `require()` (CommonJS):
```javascript
require("dotenv").config();
const { getRecentPosts } = require("../../lib/api/engine.js");
```

But `lib/` files use ES6 exports:
```javascript
export const ENGINE_API = { ... };
export async function getRecentPosts() { ... }
```

**This mismatch may be causing runtime errors on Azure.**

### 3. Missing scriptFile Property
Azure Functions for Node.js sometimes requires `scriptFile` in function.json:
```json
{
  "scriptFile": "index.js",
  "bindings": [...]
}
```

### 4. Module Resolution
Functions require modules from `../../lib/` and `../../config/`:
- Are these paths being preserved in deployment?
- Is Azure Functions runtime finding these modules?

---

## Next Steps to Try

### Option 1: Check Azure Portal
1. Go to Azure Portal → Function App → Functions
2. Check if functions appear in UI
3. Check "Platform features" → "App files" to see what's actually deployed

### Option 2: Check Logs
```bash
az webapp log tail \
  --name fa-wf-enginesync-prod-001 \
  --resource-group rg-we-brochure-prod-001
```

### Option 3: List Functions via API
```bash
az functionapp function list \
  --name fa-wf-enginesync-prod-001 \
  --resource-group rg-we-brochure-prod-001 \
  --output table
```

### Option 4: Convert to Pure CommonJS
Make all files use `require()` instead of mixing:
- Change `lib/*.js` files from ES6 `export` to `module.exports`
- Remove ES6 import/export syntax entirely

### Option 5: Add scriptFile to function.json
Update each `function.json`:
```json
{
  "scriptFile": "index.js",
  "bindings": [...]
}
```

### Option 6: Verify Directory Structure
Check if Azure expects functions at root level instead of `functions/` subdirectory.

### Option 7: Try Local Testing First
```bash
cd /Users/austinshoreditch/Documents/Github/engine
func start
```
This tests if functions work locally before debugging Azure deployment.

---

## Resources Created

| Resource Type | Name | ID | Status |
|--------------|------|----|----|
| Resource Group | rg-we-brochure-prod-001 | (existing) | ✅ |
| Storage Account | enginewebflowstorage | AccountKey: 8HIIMtpj... | ✅ |
| Function App | fa-wf-enginesync-prod-001 | Consumption Plan | ✅ |
| Application Insights | ai-wf-enginesync-prod-001 | c50b2a41-3d0a-4d74-a633-6c492caa561b | ✅ |

**Total Cost**: ~$0 (Consumption plan, no executions yet)

---

## Configuration Summary

### Environment Variables Set on Azure
- ✅ `FUNCTIONS_WORKER_RUNTIME`: node
- ✅ `FUNCTIONS_EXTENSION_VERSION`: ~4
- ✅ `AzureWebJobsStorage`: (configured)
- ✅ `APPINSIGHTS_INSTRUMENTATIONKEY`: c50b2a41-3d0a-4d74-a633-6c492caa561b
- ✅ `WEBFLOW_API_TOKEN`: aeb463cb06708b2b3ccc2edbac9b68a76c086df66e6d6b035467cc5196ead84b
- ✅ `WEBFLOW_SITE_ID`: 68b1c2c2623a4419e1af824d
- ✅ `WEBFLOW_NEWS_COLLECTION_ID`: 68dce8b9b39e7b0b2b040cf5
- ✅ `WEBFLOW_NEWS_CATEGORY_COLLECTION_ID`: 68dce91bbfdf950f5b1531fe
- ✅ `WEBFLOW_NEWS_TAG_COLLECTION_ID`: 68f8fb7885da7e9205ca38ab
- ✅ `NODE_ENV`: production

### Timer Triggers Configured
- **Sync**: `0 */15 * * * *` (every 15 minutes)
- **Archive**: `0 0 2 * * *` (daily at 2 AM UTC)

### Application Insights Telemetry
- **Sync**: Custom events (ArticleCreated, ArticleUpdated) + metrics
- **Archive**: Custom events (ArticleArchived) + metrics  
- **Monitor**: Health check events + response time metrics

---

## Commands Reference

### Quick Deploy (after fixing)
```bash
func azure functionapp publish fa-wf-enginesync-prod-001 --build remote
```

### Check Function Status
```bash
az functionapp show \
  --name fa-wf-enginesync-prod-001 \
  --resource-group rg-we-brochure-prod-001 \
  --query "state"
```

### View Logs
```bash
az webapp log tail \
  --name fa-wf-enginesync-prod-001 \
  --resource-group rg-we-brochure-prod-001
```

### Restart Function App
```bash
az functionapp restart \
  --name fa-wf-enginesync-prod-001 \
  --resource-group rg-we-brochure-prod-001
```

### Delete and Start Over (if needed)
```bash
# Delete function app
az functionapp delete \
  --name fa-wf-enginesync-prod-001 \
  --resource-group rg-we-brochure-prod-001

# Delete storage account
az storage account delete \
  --name enginewebflowstorage \
  --resource-group rg-we-brochure-prod-001

# Delete Application Insights
az monitor app-insights component delete \
  --app ai-wf-enginesync-prod-001 \
  --resource-group rg-we-brochure-prod-001
```

---

## Session End State

**Status**: Infrastructure created ✅, code deployment unsuccessful ⚠️

**Root Cause Identified**: ✅ ES6/CommonJS module mismatch

### Local Testing Results
```bash
func start
# Output: "0 functions found"
# Error: Module type of config/constants.js is not specified and it doesn't parse as CommonJS
```

**The Problem**:
- Functions use `require()` (CommonJS) in `functions/*/index.js`
- Libraries use `export` (ES6) in `lib/**/*.js` and `config/constants.js`
- Node.js can't resolve this mix without `"type": "module"` in package.json
- BUT we removed `"type": "module"` to fix the Azure deployment
- Result: Functions can't import their dependencies = 0 functions loaded

**The Solution**:
Convert ALL library files from ES6 to CommonJS:
- Change `export const X = ...` to `module.exports.X = ...`
- Change `export function X() {}` to `module.exports.X = function() {}`
- Change `export default X` to `module.exports = X`
- Keep functions using `require()` as-is

**Recommended Next Session Actions**:
1. ✅ **PRIORITY**: Convert `lib/**/*.js` and `config/constants.js` from ES6 to CommonJS
2. Test locally with `func start` until functions appear
3. Redeploy to Azure once local test shows "4 functions found"
4. Verify timer triggers work on Azure
