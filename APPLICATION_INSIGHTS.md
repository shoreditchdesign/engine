# Application Insights Monitoring & Alerts Guide

## Overview
Your Azure Functions are instrumented with custom telemetry for comprehensive monitoring. This guide shows you how to view logs, create dashboards, and set up email alerts.

---

## What's Being Tracked

### Sync Function
**Custom Events:**
- `ArticleCreated` - When a new article is created in Webflow
- `ArticleUpdated` - When an existing article is updated

**Metrics:**
- `SyncTotalArticles` - Number of articles processed
- `SyncCreatedCount` - Articles created
- `SyncUpdatedCount` - Articles updated
- `SyncSkippedCount` - Articles skipped (no changes)
- `SyncWarningCount` - Warnings encountered
- `SyncErrorCount` - Errors encountered
- `SyncDurationSeconds` - Total sync duration
- `SyncArticlesPerSecond` - Processing rate

### Archive Function
**Custom Events:**
- `ArticleArchived` - When an article is archived

**Metrics:**
- `ArchiveTotalChecked` - Total articles checked
- `ArchiveArchivedCount` - Articles archived
- `ArchiveSkippedCount` - Articles skipped
- `ArchiveErrorCount` - Errors encountered
- `ArchiveDurationSeconds` - Total duration
- `ArchiveDaysThreshold` - Days threshold used

### Monitor Function
**Custom Events:**
- `EngineAPIHealthCheck` - Engine API health status
- `WebflowAPIHealthCheck` - Webflow API health status
- `OverallHealthCheck` - Overall system health

**Metrics:**
- `HealthCheckDurationMs` - Total health check time
- `EngineAPIResponseTimeMs` - Engine API response time
- `WebflowAPIResponseTimeMs` - Webflow API response time
- `HealthCheckSuccess` - 1 if healthy, 0 if unhealthy

---

## Viewing Logs in Azure Portal

### Option 1: Live Metrics Stream (Real-time)
1. Azure Portal → Your Function App
2. Click "Application Insights" in left menu
3. Click "Live Metrics"
4. Watch real-time telemetry as functions execute

### Option 2: Logs (Historical Query)
1. Azure Portal → Your Function App → Application Insights
2. Click "Logs" in left menu
3. Run queries using Kusto Query Language (KQL)

**Example Queries:**

```kql
// View all sync events from last 24 hours
customEvents
| where name in ("ArticleCreated", "ArticleUpdated")
| where timestamp > ago(24h)
| project timestamp, name, customDimensions.postId, customDimensions.title
| order by timestamp desc

// Count articles created per hour
customEvents
| where name == "ArticleCreated"
| where timestamp > ago(7d)
| summarize count() by bin(timestamp, 1h)
| render timechart

// View sync performance over time
customMetrics
| where name == "SyncDurationSeconds"
| where timestamp > ago(7d)
| project timestamp, value
| render timechart

// Check API health failures
customEvents
| where name in ("EngineAPIHealthCheck", "WebflowAPIHealthCheck")
| where customDimensions.status == "unhealthy"
| where timestamp > ago(24h)
| project timestamp, name, customDimensions.error

// Average sync duration by day
customMetrics
| where name == "SyncDurationSeconds"
| where timestamp > ago(30d)
| summarize avg(value) by bin(timestamp, 1d)
| render columnchart

// Top 10 errors in last week
exceptions
| where timestamp > ago(7d)
| summarize count() by outerMessage
| top 10 by count_
| order by count_ desc
```

---

## Setting Up Email Alerts

### Alert 1: Sync Failures (Recommended)
Get notified when sync errors exceed a threshold.

**Via Azure Portal:**
1. Azure Portal → Your Function App → Application Insights
2. Click "Alerts" in left menu
3. Click "+ Create" → "Alert rule"
4. **Scope**: Your Application Insights resource (pre-selected)
5. **Condition**: Click "Add condition"
   - Signal: "Custom log search"
   - Search query:
     ```kql
     customMetrics
     | where name == "SyncErrorCount"
     | where value > 0
     ```
   - Alert logic:
     - Threshold: Static
     - Operator: Greater than
     - Threshold value: 2
     - Aggregation: Total
     - Period: 15 minutes
6. **Actions**: Click "Add action group" → "Create action group"
   - Action group name: `SyncFailureNotifications`
   - Action type: Email/SMS/Push/Voice
   - Email: your-email@example.com
7. **Alert rule details**:
   - Severity: 2 - Warning
   - Alert rule name: `Sync Errors Detected`
   - Description: `Sync function encountered errors`
8. Click "Create alert rule"

**Via Azure CLI:**
```bash
# Create action group (email notification)
az monitor action-group create \
  --name SyncFailureNotifications \
  --resource-group $RESOURCE_GROUP \
  --short-name SyncFail \
  --email-receiver \
    name=AdminEmail \
    email-address=your-email@example.com

# Create alert rule
az monitor metrics alert create \
  --name "Sync Errors Detected" \
  --resource-group $RESOURCE_GROUP \
  --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/microsoft.insights/components/{app-insights-name} \
  --condition "count customMetrics where name == 'SyncErrorCount' and value > 2" \
  --window-size 15m \
  --evaluation-frequency 5m \
  --action SyncFailureNotifications \
  --description "Alert when sync encounters errors" \
  --severity 2
```

---

### Alert 2: API Health Failures (Critical)
Get notified immediately when APIs go down.

**Via Azure Portal:**
1. Create alert rule (same steps as above)
2. **Condition**: Custom log search
   ```kql
   customEvents
   | where name == "OverallHealthCheck"
   | where customDimensions.status == "unhealthy"
   ```
3. **Alert logic**:
   - Threshold: 1 (trigger on any unhealthy check)
   - Period: 5 minutes
4. **Actions**: Use same action group or create new one
5. **Details**:
   - Severity: 0 - Critical
   - Alert rule name: `API Health Check Failed`

---

### Alert 3: Slow Sync Performance (Optional)
Get notified when sync is taking too long.

**Condition:**
```kql
customMetrics
| where name == "SyncDurationSeconds"
| where value > 120  // 2 minutes
```

**Alert logic:**
- Threshold: 120 seconds
- Period: 15 minutes

---

### Alert 4: High API Response Time (Optional)
Get notified when APIs are slow.

**Condition:**
```kql
customMetrics
| where name in ("EngineAPIResponseTimeMs", "WebflowAPIResponseTimeMs")
| where value > 5000  // 5 seconds
```

**Alert logic:**
- Threshold: 5000ms
- Period: 5 minutes

---

## Creating a Dashboard

### Quick Dashboard Setup

1. Azure Portal → Your Function App → Application Insights
2. Click "Workbooks" in left menu
3. Click "+ New"
4. Click "Add" → "Add query"

**Add these charts:**

#### Chart 1: Articles Synced (Last 7 Days)
```kql
customEvents
| where name in ("ArticleCreated", "ArticleUpdated")
| where timestamp > ago(7d)
| summarize Created = countif(name == "ArticleCreated"), 
            Updated = countif(name == "ArticleUpdated") 
  by bin(timestamp, 1d)
| render columnchart
```

#### Chart 2: Sync Performance
```kql
customMetrics
| where name == "SyncDurationSeconds"
| where timestamp > ago(7d)
| project timestamp, DurationSeconds = value
| render timechart
```

#### Chart 3: API Health Status
```kql
customMetrics
| where name == "HealthCheckSuccess"
| where timestamp > ago(24h)
| project timestamp, Status = iff(value == 1, "Healthy", "Unhealthy")
| render timechart
```

#### Chart 4: Error Rate
```kql
customMetrics
| where name == "SyncErrorCount"
| where timestamp > ago(7d)
| summarize Errors = sum(value) by bin(timestamp, 1h)
| render areachart
```

5. Click "Done Editing"
6. Click "Save" → Name: `Engine Sync Dashboard`
7. Pin to Azure Dashboard for quick access

---

## Email Alert Best Practices

### Recommended Alerts (Minimal Setup)
For basic monitoring, set up these 2 alerts:

1. **API Health Failures** (Critical)
   - Sends email if Engine API or Webflow API goes down
   - Check frequency: Every 5 minutes
   - Severity: Critical

2. **Sync Errors** (Warning)
   - Sends email if sync fails for 3+ articles
   - Check frequency: Every 15 minutes
   - Severity: Warning

### Alert Fatigue Prevention
- Don't set thresholds too sensitive
- Use "Suppress alerts" to avoid repeat notifications (e.g., 1 hour)
- Use different severities for different issues
- Consider using SMS/Push for critical alerts only

### Testing Alerts
After creating an alert:
1. Azure Portal → Alerts → Your alert rule
2. Click "Test"
3. Or wait for next timer trigger to see if it fires correctly

---

## Azure CLI Quick Commands

### List all alerts
```bash
az monitor metrics alert list \
  --resource-group $RESOURCE_GROUP \
  --output table
```

### View alert history
```bash
az monitor activity-log list \
  --resource-group $RESOURCE_GROUP \
  --offset 7d \
  --query "[?contains(authorization.action, 'Microsoft.Insights/alerts')]"
```

### Test action group
```bash
az monitor action-group test-notifications create \
  --action-group-name SyncFailureNotifications \
  --resource-group $RESOURCE_GROUP \
  --notification-type Email \
  --email-receiver name=AdminEmail
```

---

## Monitoring Cost Optimization

Application Insights charges based on data ingestion. To optimize:

### 1. Adjust Sampling Rate (if costs are high)
In `host.json`:
```json
{
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "maxTelemetryItemsPerSecond": 20  // ← Lower to 10 to reduce costs
      }
    }
  }
}
```

### 2. Set Data Retention
- Default: 90 days
- Can reduce to 30 days to save costs
- Azure Portal → Application Insights → Usage and estimated costs → Data Retention

### 3. Monitor Data Volume
```kql
// Check daily data volume
union *
| where timestamp > ago(30d)
| summarize GB = sum(_BilledSize) / 1000000000 by bin(timestamp, 1d)
| render columnchart
```

---

## Summary

**Minimal Setup (5 minutes):**
1. Create "API Health Failures" alert → Email notification
2. Create "Sync Errors" alert → Email notification
3. Done! You'll get emails if something breaks

**Recommended Setup (15 minutes):**
1. Create 2-3 key alerts (API Health, Sync Errors, Performance)
2. Create a basic dashboard with 4 charts
3. Bookmark Application Insights Logs for troubleshooting

**Advanced Setup (30+ minutes):**
1. Create comprehensive alert coverage
2. Build detailed dashboards
3. Set up SMS/Slack/Teams integrations
4. Configure custom queries and saved searches

Your functions are already instrumented with all the telemetry needed. You just need to decide what alerts and dashboards you want!
