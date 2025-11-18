# Azure Logic Apps for Cron Jobs

This directory contains Logic App definitions for scheduling automated tasks.

## Files

- **sync-cron.json** - Triggers the sync function every 15 minutes
- **archive-cron.json** - Triggers the archive function daily at 2 AM UTC

## Deployment Methods

### Method 1: Azure Portal (Recommended for Beginners)

1. Go to **Azure Portal** → **Create a resource**
2. Search for **Logic App** → Click **Create**
3. Fill in the details:
   - **Resource Group**: Select your resource group (e.g., `engine-webflow-sync-rg`)
   - **Logic App name**: `engine-sync-cron` or `engine-archive-cron`
   - **Region**: Same as your Function App
   - **Plan type**: Consumption
4. Click **Review + Create** → **Create**
5. Once created, go to **Logic App Designer**
6. Choose **Blank Logic App**
7. Add **Recurrence** trigger:
   - **Sync**: Interval: 15, Frequency: Minute
   - **Archive**: Interval: 1, Frequency: Day, Time: 2:00 AM UTC
8. Click **+ New step**
9. Search for **HTTP** → Select **HTTP** action
10. Configure the HTTP action:
    - **Method**: POST
    - **URI**: `https://YOUR-FUNCTION-APP.azurewebsites.net/api/sync?code=YOUR_FUNCTION_KEY`
    - **Headers**: Add `Content-Type: application/json`
    - **Body**: `{"recent": 20}` for sync, `{"daysThreshold": 90}` for archive
11. **Save** the Logic App

### Method 2: Azure CLI

#### Deploy Sync Cron

```bash
# Set variables
RESOURCE_GROUP="engine-webflow-sync-rg"
LOCATION="eastus"
FUNCTION_APP_NAME="engine-webflow-sync"
LOGIC_APP_SYNC="engine-sync-cron"
LOGIC_APP_ARCHIVE="engine-archive-cron"

# Get function key (you'll need this)
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

# Create Logic App for sync (every 15 minutes)
az logic workflow create \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --name $LOGIC_APP_SYNC \
  --definition @sync-cron.json \
  --parameters "{\"functionAppName\": {\"value\": \"$FUNCTION_APP_NAME\"}, \"functionKey\": {\"value\": \"$SYNC_KEY\"}}"

# Create Logic App for archive (daily at 2 AM UTC)
az logic workflow create \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --name $LOGIC_APP_ARCHIVE \
  --definition @archive-cron.json \
  --parameters "{\"functionAppName\": {\"value\": \"$FUNCTION_APP_NAME\"}, \"functionKey\": {\"value\": \"$ARCHIVE_KEY\"}}"

echo "✓ Logic Apps created successfully"
```

## Getting Function Keys

### Via Azure Portal

1. Go to **Azure Portal** → **Function App** → Your Function App
2. Click **Functions** → Select function (e.g., `sync`)
3. Click **Function Keys** → Copy the `default` key

### Via Azure CLI

```bash
# Get sync function key
az functionapp function keys list \
  --name engine-webflow-sync \
  --resource-group engine-webflow-sync-rg \
  --function-name sync \
  --query "default" -o tsv

# Get archive function key
az functionapp function keys list \
  --name engine-webflow-sync \
  --resource-group engine-webflow-sync-rg \
  --function-name archive \
  --query "default" -o tsv
```

## Verify Logic Apps are Running

### Via Azure Portal

1. Go to **Azure Portal** → **Logic Apps** → Select your Logic App
2. Go to **Overview** → Check **Runs history**
3. Click on a run to see details (success/failure)

### Via Azure CLI

```bash
# List recent runs for sync cron
az logic workflow run list \
  --resource-group engine-webflow-sync-rg \
  --name engine-sync-cron \
  --top 5

# List recent runs for archive cron
az logic workflow run list \
  --resource-group engine-webflow-sync-rg \
  --name engine-archive-cron \
  --top 5
```

## Troubleshooting

### Logic App shows "Failed" status

1. Check the run details in Azure Portal
2. Common issues:
   - **Invalid function key**: Regenerate and update Logic App parameters
   - **Function timeout**: Increase timeout in `host.json` (max 10 minutes)
   - **Function error**: Check Function App logs

### Function is not being triggered

1. Verify Logic App is **Enabled** (not disabled)
2. Check the recurrence schedule is correct
3. Verify the HTTP action URI is correct

### View Function Logs

```bash
# Stream logs from Function App
az functionapp log tail \
  --name engine-webflow-sync \
  --resource-group engine-webflow-sync-rg
```

## Modifying Schedules

To change the schedule:

1. Go to **Logic App Designer**
2. Edit the **Recurrence** trigger
3. Change frequency/interval
4. **Save**

Example schedules:
- Every 5 minutes: Interval: 5, Frequency: Minute
- Every hour: Interval: 1, Frequency: Hour
- Daily at 3 AM: Interval: 1, Frequency: Day, Time: 3:00 AM
- Weekly on Monday: Interval: 1, Frequency: Week, Days: Monday

## Cost Estimate

Logic Apps on Consumption plan:
- **Execution**: $0.000025 per action execution
- **Sync cron**: ~2,880 executions/month = ~$0.07/month
- **Archive cron**: ~30 executions/month = ~$0.001/month
- **Total**: ~$0.10/month (practically free)

## Cleanup

To delete Logic Apps:

```bash
# Delete sync cron
az logic workflow delete \
  --name engine-sync-cron \
  --resource-group engine-webflow-sync-rg

# Delete archive cron
az logic workflow delete \
  --name engine-archive-cron \
  --resource-group engine-webflow-sync-rg
```
