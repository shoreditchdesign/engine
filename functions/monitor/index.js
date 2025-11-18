import "dotenv/config";
import { getRecentPosts } from "../../lib/api/engine.js";
import { listItems } from "../../lib/api/webflow.js";
import { WEBFLOW_COLLECTIONS } from "../../config/constants.js";

/**
 * Azure Function handler for health monitoring
 */
export default async function (context, req) {
  context.log("Monitor function triggered");

  const startTime = Date.now();

  const healthStatus = {
    engine_api: "unknown",
    webflow_api: "unknown",
    timestamp: new Date().toISOString(),
  };

  let engineResponseTime = 0;
  let webflowResponseTime = 0;

  // 1. Test Engine API connectivity
  try {
    const engineStart = Date.now();
    await getRecentPosts(1);
    engineResponseTime = Date.now() - engineStart;

    healthStatus.engine_api = "healthy";
    healthStatus.engine_api_response_time_ms = engineResponseTime;
    context.log(`Engine API health check successful (${engineResponseTime}ms)`);

    // Log custom event to Application Insights
    if (context.log) {
      context.log({
        eventName: "EngineAPIHealthCheck",
        properties: {
          status: "healthy",
          responseTimeMs: engineResponseTime,
        },
      });
    }
  } catch (error) {
    engineResponseTime = Date.now() - startTime;
    healthStatus.engine_api = "unhealthy";
    healthStatus.engine_api_error = error.message;
    healthStatus.engine_api_response_time_ms = engineResponseTime;

    context.log.error(`Engine API health check failed: ${error.message}`);

    // Log failure event to Application Insights
    if (context.log) {
      context.log({
        eventName: "EngineAPIHealthCheck",
        properties: {
          status: "unhealthy",
          error: error.message,
          responseTimeMs: engineResponseTime,
        },
      });
    }
  }

  // 2. Test Webflow API connectivity
  try {
    const webflowStart = Date.now();
    await listItems(WEBFLOW_COLLECTIONS.NEWS, { offset: 0, limit: 1 });
    webflowResponseTime = Date.now() - webflowStart;

    healthStatus.webflow_api = "healthy";
    healthStatus.webflow_api_response_time_ms = webflowResponseTime;
    context.log(
      `Webflow API health check successful (${webflowResponseTime}ms)`,
    );

    // Log custom event to Application Insights
    if (context.log) {
      context.log({
        eventName: "WebflowAPIHealthCheck",
        properties: {
          status: "healthy",
          responseTimeMs: webflowResponseTime,
        },
      });
    }
  } catch (error) {
    webflowResponseTime = Date.now() - startTime;
    healthStatus.webflow_api = "unhealthy";
    healthStatus.webflow_api_error = error.message;
    healthStatus.webflow_api_response_time_ms = webflowResponseTime;

    context.log.error(`Webflow API health check failed: ${error.message}`);

    // Log failure event to Application Insights
    if (context.log) {
      context.log({
        eventName: "WebflowAPIHealthCheck",
        properties: {
          status: "unhealthy",
          error: error.message,
          responseTimeMs: webflowResponseTime,
        },
      });
    }
  }

  const overallStatus =
    healthStatus.engine_api === "healthy" &&
    healthStatus.webflow_api === "healthy";

  const totalCheckTime = Date.now() - startTime;

  // Log overall health metrics to Application Insights
  if (context.log && context.log.metric) {
    context.log.metric("HealthCheckDurationMs", totalCheckTime);
    context.log.metric("EngineAPIResponseTimeMs", engineResponseTime);
    context.log.metric("WebflowAPIResponseTimeMs", webflowResponseTime);
    context.log.metric("HealthCheckSuccess", overallStatus ? 1 : 0);
  }

  // Log overall health event
  if (context.log) {
    context.log({
      eventName: "OverallHealthCheck",
      properties: {
        status: overallStatus ? "healthy" : "unhealthy",
        engineAPIStatus: healthStatus.engine_api,
        webflowAPIStatus: healthStatus.webflow_api,
        totalDurationMs: totalCheckTime,
      },
    });
  }

  context.res = {
    status: overallStatus ? 200 : 503,
    headers: { "Content-Type": "application/json" },
    body: {
      ...healthStatus,
      overall_status: overallStatus ? "healthy" : "unhealthy",
      total_check_time_ms: totalCheckTime,
    },
  };
}
