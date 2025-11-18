# GitHub Actions Setup Guide

This document explains how to complete the setup for automated syncing using GitHub Actions.

## ✅ What's Been Done

### 1. Local Testing
- ✅ Tested sync function locally (working perfectly)
- ✅ Tested archive function locally (working perfectly)
- ✅ Fixed ES Module warnings by adding `"type": "module"` to package.json

### 2. Azure Cleanup
- ✅ Removed `/functions/` directory (Azure Functions implementations)
- ✅ Removed `/azure/` directory (Azure Logic Apps configs)
- ✅ Removed `azure-pipelines.yml` (Azure CI/CD)
- ✅ Removed `host.json` (Azure Functions config)
- ✅ Removed `local.settings.json` (Azure local settings)
- ✅ Removed `.funcignore` (Azure Functions ignore file)
- ✅ Removed Azure documentation files (APPLICATION_INSIGHTS.md, DEPLOYMENT*.md, etc.)
- ✅ Removed Azure project files (checklist.md, HANDOVER.md, refactor.md, summary.md)
- ✅ Updated package.json (removed Azure dependencies and scripts)
- ✅ Created new README.md focused on GitHub Actions

### 3. GitHub Actions Configuration
- ✅ Created `.github/workflows/sync.yml` - Runs every 15 minutes
- ✅ Created `.github/workflows/archive.yml` - Runs daily at 2 AM UTC
- ✅ Both workflows support manual triggers with custom parameters

---

## 🚀 Next Steps (To Complete Setup)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Migrate from Azure to GitHub Actions"
git push origin main
```

### Step 2: Add GitHub Secrets

Go to your GitHub repository and add the following secrets:

1. Navigate to: **Settings → Secrets and variables → Actions**
2. Click **"New repository secret"**
3. Add each of the following:

| Secret Name | Value | Where to Find |
|-------------|-------|---------------|
| `WEBFLOW_API_TOKEN` | Your Webflow API token | Webflow Dashboard → Account Settings → Apps & Integrations |
| `WEBFLOW_SITE_ID` | Your Webflow site ID | Webflow Designer → Site Settings → General |
| `WEBFLOW_NEWS_COLLECTION_ID` | News collection ID | Webflow Designer → CMS → Collection URL |
| `WEBFLOW_NEWS_CATEGORY_COLLECTION_ID` | Category collection ID | Webflow Designer → CMS → Collection URL |
| `WEBFLOW_NEWS_TAG_COLLECTION_ID` | Tag collection ID | Webflow Designer → CMS → Collection URL |

**Current values from your `.env` file:**
- WEBFLOW_API_TOKEN: `aeb463cb06708b2b3ccc2edbac9b68a76c086df66e6d6b035467cc5196ead84b`
- WEBFLOW_SITE_ID: `68b1c2c2623a4419e1af824d`
- WEBFLOW_NEWS_COLLECTION_ID: `68dce8b9b39e7b0b2b040cf5`
- WEBFLOW_NEWS_CATEGORY_COLLECTION_ID: `68dce91bbfdf950f5b1531fe`
- WEBFLOW_NEWS_TAG_COLLECTION_ID: `68f8fb7885da7e9205ca38ab`

### Step 3: Enable GitHub Actions

1. Go to your repository on GitHub
2. Click on the **"Actions"** tab
3. If prompted, click **"I understand my workflows, go ahead and enable them"**

### Step 4: Verify Workflows

**Option A: Wait for automatic triggers**
- Sync workflow will run automatically every 15 minutes
- Archive workflow will run automatically daily at 2 AM UTC

**Option B: Test with manual trigger**
1. Go to **Actions** tab
2. Select **"Sync Engine to Webflow"** workflow
3. Click **"Run workflow"** button
4. Optionally adjust the "recent_count" parameter
5. Click **"Run workflow"** to start

---

## 📋 Workflow Details

### Sync Workflow (`.github/workflows/sync.yml`)

**Schedule:** Every 15 minutes (`*/15 * * * *`)

**What it does:**
- Syncs 20 most recent articles from Engine API to Webflow
- Creates new articles or updates existing ones
- Auto-publishes to live site
- Uploads logs on failure for debugging

**Manual trigger options:**
- `recent_count`: Number of articles to sync (default: 20)

### Archive Workflow (`.github/workflows/archive.yml`)

**Schedule:** Daily at 2:00 AM UTC (`0 2 * * *`)

**What it does:**
- Archives "Updates" category articles older than 90 days
- Unpublishes and marks as archived in Webflow
- Saves log file with archived article details
- Uploads logs as artifacts (kept for 30 days)

**Manual trigger options:**
- `days_threshold`: Age threshold in days (default: 90)

---

## 🔍 Monitoring

### View Workflow Runs

1. Go to **Actions** tab in your repository
2. See all workflow runs with status (success/failure)
3. Click on any run to see detailed logs

### Check Logs

- Sync logs are uploaded only on failure (kept for 7 days)
- Archive logs are always uploaded (kept for 30 days)
- Download artifacts from the workflow run page

### Common Workflow Statuses

- ✅ **Success**: Workflow completed successfully
- ❌ **Failure**: An error occurred (check logs)
- 🟡 **In Progress**: Currently running
- ⏭️ **Skipped**: Workflow was skipped

---

## 🛠️ Troubleshooting

### Workflow not running

**Check:**
1. GitHub Actions is enabled in repository settings
2. Secrets are correctly configured
3. Workflow YAML files are in `.github/workflows/`
4. Branch is `main` (workflows run on main branch)

### "Secret not found" error

**Fix:**
1. Go to Settings → Secrets and variables → Actions
2. Verify all 5 secrets are added
3. Re-add any missing secrets

### Sync/Archive failing

**Debug:**
1. Click on the failed workflow run
2. Expand the "Run sync" or "Run archive" step
3. Check error messages
4. Download artifacts for detailed logs
5. Test locally: `npm run sync` or `npm run archive`

---

## 📊 Expected Behavior

### First Sync After Setup
```
SYNC COMPLETE
Total: 20   | Created: 0    | Updated: 0    | Skipped: 20   | Warnings: 0    | Errors: 0
```
All articles should be skipped (already synced)

### Ongoing Syncs
Most syncs will skip articles unless:
- New articles are published in Engine
- Existing articles are updated in Engine

### First Archive After Setup
```
ARCHIVE COMPLETE
Checked: 8476 | Archived: 0-12 | Skipped: 8464-8476 | Warnings: 0 | Errors: 0
```
Only "Updates" category articles older than 90 days will be archived

---

## 🎯 Success Criteria

✅ **Setup Complete When:**
1. Repository pushed to GitHub
2. All 5 secrets configured
3. Workflows visible in Actions tab
4. First manual test run succeeds
5. Scheduled runs appear every 15 minutes (sync)

---

## 📝 Notes

- **Cost**: GitHub Actions includes 2,000 free minutes/month for private repos
- **Each workflow run takes ~30-60 seconds**
- **Estimated monthly usage**: ~1,500 minutes (well within free tier)
- **Logs are automatically cleaned up** (7-30 days retention)

---

## 🆘 Support

If you encounter issues:
1. Check workflow logs in Actions tab
2. Test locally with `npm run sync` or `npm run archive`
3. Verify all secrets are correctly set
4. Review error messages in workflow logs

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cron Schedule Syntax](https://crontab.guru/)
- [GitHub Actions YAML Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
