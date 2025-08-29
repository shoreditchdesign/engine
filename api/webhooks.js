import "dotenv/config";
import { runSync } from "./sync.js";
import { logWithTimestamp } from "../lib/utils.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  logWithTimestamp("Webhook sync triggered.");

  try {
    // Run the same core logic as the cron job
    const summary = await runSync();
    return res.status(200).json({
      success: true,
      ...summary,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logWithTimestamp(`Webhook sync handler failed: ${error.message}`, "error");
    return res.status(500).json({ success: false, error: error.message });
  }
}
