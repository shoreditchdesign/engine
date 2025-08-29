# Engine to Webflow Sync

This project automatically syncs news articles from the Engine API to a Webflow CMS.

## Features

*   **Scheduled Sync:** Runs every 15 minutes to fetch and sync recent articles.
*   **Webhook Sync:** On-demand sync via HTTP request.
*   **Manual Operations:** Supports full resyncs and syncing individual articles.
*   **Monitoring:** System health checks for both Engine and Webflow APIs.

## Setup

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Create a `.env` file by copying `.env.example`.
4.  Fill in the environment variables in the `.env` file.
5.  Run the development server: `npm run dev`

## Deployment

This project is configured for deployment on Vercel. Connect your GitHub repository to Vercel for automatic deployments.