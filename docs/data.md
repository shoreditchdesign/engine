---
title: Introduction
slug: data/reference/rest-introduction
subtitle: Your reference for building successful integrations with the Webflow Data API.
layout: reference
hidden: false
---

import { ApiEndpoint } from "../../../../components/ApiEndpoint/ApiEndpoint.tsx";

The Webflow Data API provides an extensive set of RESTful endpoints to help you create advanced tools and applications for Webflow users. This documentation is your guide to building successful integrations.

## Make your first API call

<div class="my-6">
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center" style={{ alignItems: 'start' }}>
    <div class="prose dark:prose-invert">
        To get started, click the "Try it" button on the Get Sites endpoint to make your first API call. Clicking it will open an interactive API explorer where you can authenticate and send a live request to see a list of your sites.

        Once you authenticate, you can navigate to other endpoints to see the different resources and actions you can perform.
    </div>
    <ApiEndpoint
      method="GET"
      endpoint="/v2/sites"
      link="/data/reference/sites/list?explorer=true"
      returnPath="/data/reference/rest-introduction"
    />
  </div>
</div>

## Core concepts

Get familiar with the core concepts of the Webflow Data API.

<CardGroup>
  <Card
    title="Authentication"
    href="/data/reference/authentication"
    iconPosition="left"
    iconSize="12"
    icon={
      <>
        <img
          src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/SecurityCertified.svg"
          alt=""
          className="hidden dark:block"
        />
        <img
          src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/SecurityCertified.svg"
          alt=""
          className="block dark:hidden"
        />
      </>
    }
  >
    Learn how to authenticate your requests to the Webflow Data API.
  </Card>
  <Card
    title="Rate Limiting"
    href="/data/reference/rate-limits"
    iconPosition="left"
    iconSize="12"
    icon={
      <>
        <img
          src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/TimeTurner.svg"
          alt=""
          className="hidden dark:block"
        />
        <img
          src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/TimeTurner.svg"
          alt=""
          className="block dark:hidden"
        />
      </>
    }
  >
    Understand the rate limits for the Webflow Data API.
  </Card>
  <Card
    title="Versioning"
    href="/data/reference/versioning"
    iconPosition="left"
    iconSize="12"
    icon={
      <>
        <img
          src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/BranchMerge.svg"
          alt=""
          className="hidden dark:block"
        />
        <img
          src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/BranchMerge.svg"
          alt=""
          className="block dark:hidden"
        />
      </>
    }
  >
    Learn how to work with API versions.
  </Card>
  <Card
    title="Error Handling"
    href="/data/reference/error-handling"
    iconPosition="left"
    iconSize="12"
    icon={
      <>
        <img
          src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Support.svg"
          alt=""
          className="hidden dark:block"
        />
        <img
          src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Support.svg"
          alt=""
          className="block dark:hidden"
        />
      </>
    }
  >
    Understand how to handle errors returned by the API.
  </Card>
</CardGroup>

<br />

## API structure

Webflow's API follows a resource model, providing a clear hierarchy for accessing and manipulating data. The diagram below illustrates the main resources and their relationships. Lear more about the response objects for each resource in the [API structure](/data/reference/structure-1) documentation.

<div style={{ marginBottom: "2rem", height: "850px", overflow: "hidden" }}>
  <iframe
    src="https://webflow-api-diagram.netlify.app"
    width="100%"
    height="800px"
    style={{
      border: "none",
      transform: "scale(0.6)",
      transformOrigin: "top left",
      width: "166.67%",
      height: "166.67%",
    }}
  />
</div>

## Next steps

Now that you've made your first API call, you're ready to dive deeper.

<CardGroup cols={2}>
  <Card
    title="Developer Guides"
    href="/data/docs/data-clients"
    iconPosition="left"
    iconSize="12"
    icon={
      <>
        <img
          src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Docs.svg"
          alt=""
          className="hidden dark:block"
        />
        <img
          src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Docs.svg"
          alt=""
          className="block dark:hidden"
        />
      </>
    }
  >
    Follow our guides to build common integrations and workflows.
  </Card>
  <Card
    title="SDKs"
    href="/data/reference/sdks"
    iconPosition="left"
    iconSize="12"
    icon={
      <>
        <img
          src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Code.svg"
          alt=""
          className="hidden dark:block"
        />
        <img
          src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Code.svg"
          alt=""
          className="block dark:hidden"
        />
      </>
    }
  >
    Explore our official SDKs to accelerate your development.
  </Card>
</CardGroup>

<br />

<Note title="Need to work directly in the Designer?">
  If you're looking to build apps that create and enhance designs within
  Webflow, the [Designer APIs](/designer/reference/introduction) are the right
  tools for the job. These APIs enable you to add and modify elements, styles,
  assets, and more on your design canvas.
  <br />
  <br />
  <a href="/designer/reference/introduction">
    <button class="cc-primary">Explore the Designer APIs</button>
  </a>
</Note>

<br />

---
title: Getting Started
hidden: false
'og:title': 'Getting Started with Webflow Apps: Data Clients'
'og:description': >-
  A quick guide to help you set up an App and start making request to Webflow's
  REST API
---
In this guide, you'll create your first Data Client app to authorize with Webflow and make your first request to the Webflow REST API.

#### Before you start
To successfully follow along with this guide, make sure you have the following:

- A Webflow site for development and testing
-[A registered app on your Workspace](/data/docs/register-an-app) with the `sites:read` scope enabled
- An IDE of your choice
- Node.js installed on your machine.

<br />

## Quick Start (5 minutes)
This quick start will get you up and running with a data client app

<Steps>
### Clone the starter app
   ```bash
   git clone https://github.com/Webflow-Examples/webflow-app-starter-v2
   cd webflow-app-starter-v2
   npm install
   ```

### Add your credentials to `.env`
Navigate to your Workspace settings in the Webflow dashboard and find your Client ID and Secret in the Apps & Integrations -> App Development section. Replace the placeholder values in the `.env.example` file with your own Client ID and Secret. Then save the file as `.env`.
   ```env
   WEBFLOW_CLIENT_ID=your_client_id
   WEBFLOW_SECRET=your_client_secret
   ```

### Start the server
   ```bash
   npm run dev
   ```

### Update your redirect URI
In your workspace settings, navigate to the app development section and your app's details, update the redirect URI to `http://localhost:3000/auth`

  <Frame>![Redirect URI](file:1125562d-5dc7-42a6-91b4-28f6cabba448)</Frame>

### Visit your app
Visit `http://localhost:3000` (or the port of your choice)and click "Connect with Webflow" to see your Webflow sites!
<Frame>![Webflow App Example](file:1d2bd6ba-a9fd-4c61-9d6f-d2b65f27f8c9)</Frame>
</Steps>

## Understanding the example
[This example](https://github.com/Webflow-Examples/webflow-app-starter-v2) is a simple Node.js app that handles authorization and makes a single request to the Webflow REST API.

Review the code in `server.js`to understand how the App works.

<Accordion title="Installation and configuration">
   The app uses [Fastify](https://www.fastify.io/) to create a lightweight server, [Level](https://github.com/Level/level) as a database, and the [Webflow JavaScript SDK](https://www.npmjs.com/package/webflow-api) to make authenticated requests to the Webflow REST API. To keep things simple, the frontend of the app is built with vanilla JavaScript and CSS, with a simple HTML file served from the `public` directory.

   In the beginning of `server.js`, imports the necessary dependencies, loads environment variables, and initializes the Fastify server. Here, security headers are added to the server to protect against common web vulnerabilities. Also, it initializes the database for storing access tokens.

   ```javascript title="server.js" maxLines=10
   import { WebflowClient } from "webflow-api";
   import Fastify from "fastify";
   import fastifyStatic from "@fastify/static";
   import path from "path";
   import url from "url";
   import { Level } from "level";
   import fs from "fs/promises";

   // Load environment variables from .env file
   const {
   WEBFLOW_CLIENT_ID,
   WEBFLOW_SECRET,
   PORT
   NODE_ENV = "development",
   } = process.env;

   // Validate required environment variables
   if (!WEBFLOW_CLIENT_ID || !WEBFLOW_SECRET) {
   console.error(
      "Missing required environment variables. Please check your .env file:"
   );
   console.error("WEBFLOW_CLIENT_ID and WEBFLOW_SECRET are required");
   process.exit(1);
   }

   // Initialize our server with basic security headers
   const server = Fastify({
   logger: true,
   trustProxy: true, // Required for secure cookies behind a proxy
   });

   // Add security headers
   server.addHook("onSend", async (request, reply) => {
   reply.headers({
      "X-Content-Type-Options": "nosniff", // Prevent MIME type sniffing
      "X-Frame-Options": "DENY", // Prevent clickjacking
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains", // Enforce HTTPS
   });
   });

   // Initialize the database (Note: Use a proper database in production)
   const db = new Level("data", { valueEncoding: "json" });
   await db.open();
   ```
</Accordion>

<Accordion title="OAuth Authentication">
The App implements OAuth 2.0 authentication through a dedicated `/auth` route that handles both initiating the authorization flow and processing Webflow's callback response. When a user clicks "Connect with Webflow", this route first redirects them to Webflow's authorization page. After the user grants permission, Webflow redirects back to this route with an authorization code that the App exchanges for an access token.

For a comprehensive walkthrough of implementing OAuth 2.0 authentication in your App, refer to the detailed [OAuth 2.0 guide](/data/reference/oauth-app).

#### Start the OAuth 2.0 authorization flow
This route will check for a `code` query parameter. If the code isn't present, Webflow will redirect the user to the Webflow OAuth 2.0 authorization page using the `authorizeURL` method of the Webflow JavaScript SDK.

```javascript server.js
// OAuth 2.0 authentication endpoint
server.get("/auth", async (req, reply) => {
  const { code, error, error_description } = req.query;

  // If no code is provided, redirect to the authorization URL
  if (!code) {
    const installUrl = WebflowClient.authorizeURL({
      scope: scopes,
      clientId: WEBFLOW_CLIENT_ID,
      // Optional: Add state parameter for CSRF protection
      state: Math.random().toString(36).substring(7),
    });
    return reply.redirect(installUrl);
  }
});
```

#### Request an access token
If the `code` query parameter is present, we'll use it to request an access token from Webflow using the `getAccessToken` method of the Webflow JavaScript SDK. We'll also store the access token in the database and redirect the user to the root URL of the App.

```javascript server.js
// OAuth 2.0 authentication endpoint
server.get("/auth", async (req, reply) => {

// Previous Code //

  try {
    // Exchange the code for an access token
    const token = await WebflowClient.getAccessToken({
      clientId: WEBFLOW_CLIENT_ID,
      clientSecret: WEBFLOW_SECRET,
      code: code,
    });

    // Store the token in the database
    await db.put("token", token);

    if (NODE_ENV === "development") {
      console.log("\nAccess Token Received:", token, "\n");
    }

    return reply.redirect("/?authorized=true");
  } catch (error) {
    console.error("Auth Error:", error);
    return reply.code(500).send({
      error: "Authentication failed",
      message: error.message,
    });
  }
});
```

<Warning>
The example App stores and retrieves a single access token directly in the Level database. In a production app, you'll want to implement proper user management and token storage, including:

- Storing tokens securely per user/workspace
- Encrypting sensitive data
- Using secure session management

Consider using dedicated auth services or implementing these security measures using libraries like Passport.js, JWT tokens, and proper database encryption.
</Warning>
</Accordion>

<Accordion title="Making requests to the REST API">
After the user has authorized the App, it can make requests to the REST API using the `WebflowClient` object. Here, the `/sites` route makes a request to the "[List Sites](https://developers.webflow.com/data/reference/sites/list)" endpoint.

Before calling the API, the App retrieves the access token from the database and creates a new, authenticated `WebflowClient` object.

```javascript server.js
// Example API endpoint
server.get("/sites", async (req, reply) => {
  try {
    const accessToken = await db.get("token");

    const webflow = new WebflowClient({ accessToken });

    const sites = await webflow.sites.list();
    return sites;

  } catch (error) {
    console.error("API Error:", error);

    // Handle different types of errors
    if (error.response?.status === 401) {
      return reply.code(401).send({
        error: "Invalid token",
        message: "Please authenticate again",
      });
    }

    return reply.code(500).send({
      error: "Server error",
      message: "Failed to fetch sites",
    });
  }
});
```
</Accordion>
## Next Steps

Now that you have a working app, you can:

{/* <!-- vale off --> */}
1. **Add more API endpoints**: Explore the [API Reference](/data/reference) and the [Data Client Guides](/data/docs/data-clients) to add functionality
2. **Add Designer Extension capabilities**: Learn how to [add Designer Extension capabilities](/designer/docs/getting-started-designer-extensions) to your App.
4. **Authenticate a Hybrid App**: [Learn how to implement authentication](/apps/docs/authenticating-users-with-id-tokens) for Apps using Data Client and Designer Extension capabilities.
3. **Prepare your Marketplace app**: Learn how to [prepare your App for submission to the Webflow Marketplace](/apps/docs/marketplace/submitting-your-app)
{/* <!-- vale on --> */}

### FAQs

<Accordion title="Why can't other users install my app on their sites?">
  Only apps published to the Webflow Marketplace, either [publicly](/apps/docs/marketplace/submitting-your-app) or [privately](/apps/docs/private-apps), can be installed by other users. Submit your app for review to make it available for installation.

  **Want to test with a few users before publishing?**
  Email [developers@webflow.com](mailto:developers@webflow.com) with up to **5** Webflow user emails. Our team can add them to a test group so they can install and use your app with the [install URL](/apps/docs/marketplace/submitting-your-app#installation-configuration).
</Accordion>


---
title: Structure
slug: data/reference/structure-1
layout: overview
hidden: false
---
Webflow's API follows a well-structured resource model, providing a clear hierarchy for accessing and manipulating data within a Webflow project. Each resource represents a distinct aspect of a Webflow project, which Apps can access to perform specific operations and retrieve relevant data.

<div style={{ marginBottom: '2rem', height: '715px' }}>
  <iframe
    src="https://webflow-api-diagram.netlify.app"
    width="100%"
    height="1300px"
    style={{ transform: 'scale(0.55)', transformOrigin: 'top center', width: '200%', marginLeft: '-50%' }}
  />
</div>


---
title: OAuth
slug: data/reference/oauth-app
hidden: false
---
This tutorial guides you through setting up an [OAuth 2.0](https://oauth.net/2/) authentication flow. This flow allows users to grant limited permissions to your App and enables your App to request an access token to perform actions on behalf of the user.

By the end of this tutorial, your Webflow App will be able to obtain an access token on behalf of a user using the [Authorization Code Grant flow.](https://developer.okta.com/blog/2018/04/10/oauth-authorization-code-grant-type)

<Card
  title="Quickstart"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Apps.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Apps.svg" alt="" className="block dark:hidden" />
        </>
    }
  iconSize={12}
  iconPosition="left"
  href="https://github.com/Webflow-Examples/cms-examples"
>
  Our example Apps come with the OAuth 2.0 flow already set up for you. Start building your Webflow App quickly by using one of our pre-configured example apps. <br/><br/>
     <a href="https://github.com/Webflow-Examples/cms-examples">
      <button class="button cc-primary">CMS Explorer</button>
    </a>
</Card>

### Authorization Code Grant Flow

Webflow uses the [Authorization Code Grant flow](https://developer.okta.com/blog/2018/04/10/oauth-authorization-code-grant-type) to provide access tokens to Apps. This flow involves a series of interactions between Webflow's authorization server and your web app. Here’s how the process works when a user visits your site for the first time:

1. **User sign-up/Login**: A user signs up or logs in to your App. At some point, they may need to perform an action that requires using the Webflow API.
2. **Authorization request**: To make requests to the Webflow API on the user’s behalf, your App redirects the user to an authorization screen. Here, they can review the permissions your App is requesting and authorize access to specific Webflow Sites or a Workspace.
3. **User authorization**: Once the user grants authorization, Webflow redirects them back to your App via a redirect URI specified during the app setup, adding a `code` parameter to the query string.
4. **Token Request**: Your app uses the `code` to make a secure request to Webflow's authorization server to obtain an access token. If the request is valid, Webflow responds with an access token.
5. **API Requests**: Your app can now use this access token to make requests to the Webflow API on behalf of the user.

<br />

<br />


# Get an access token

#### Requirements

Before you begin, ensure you have the following:

- A Webflow App created with the "Data Client" building block. [Learn more here](https://developers.webflow.com/data/docs/getting-started-apps)
- Your app's client credentials: `client_id` and `client_secret.`<br />
  **Note:** Only workspace administrators are authorized to view a client secret. If you're not a site administrator, please contact one to get the secret for you.

<br />

<Accordion title="1. Set up your server">
Before you can request an access token, you'll need to set up your server to handle the OAuth 2.0 flow. We recommend using JavaScript or Python, as we provide SDKs for these languages that can help simplify the authentication process.

Follow the below examples in Node.js or Python to help you create a server that can accept requests and communicate with the Webflow authorization server.

<Tabs>
  <Tab title="Node.js">
    1. **Install the necessary packages**

       Ensure all required libraries and dependencies are installed.

       ```bash
       npm install express dotenv webflow-api
       ```

    2. **Store environment variables**

       Create a `.env` file to store your sensitive information like the `CLIENT_ID` and `CLIENT_SECRET`.

       ```txt .env
       CLIENT_ID=your_client_id
       CLIENT_SECRET=your_client_secret
       REDIRECT_URI=your_redirect_uri #optional
       STATE=your_unique_state #optional
       ```

    3. **Initialize server**

       Set up the server to listen on a specific port.

       ```javascript server.js
       require('dotenv').config();
       const express = require('express');
       const { WebflowClient } = require('webflow-api');

       const app = express();
       const port = 3000;

       /*
         We'll add the necessary endpoints here in the steps below.
       */

       app.listen(port, () => {
           console.log(`Server is running at http://localhost:${port}`);
       });
       ```
  </Tab>
  <Tab title="Python">
1. **Install the necessary packages**

   Ensure all required libraries and dependencies are installed.

   ```bash
   pip install flask requests python-dotenv >webflow
   ```

2. **Store environment variables**

   Create a `.env` file to store your sensitive information like the `CLIENT_ID` and `CLIENT_SECRET`.

   ```txt .env
   CLIENT_ID=your_client_id
   CLIENT_SECRET=your_client_secret
   REDIRECT_URI=your_redirect_uri #optional
   STATE=your_unique_state #optional
   ```

3. **Initialize server**

   Set up the server to listen on a specific port.

   ```python server.py
   from flask import Flask, request, redirect
     import requests
     from webflow import WebflowClient
     from dotenv import load_dotenv
     import os

     load_dotenv()

     app = Flask(__name__)

     client_id = os.getenv('CLIENT_ID')
     client_secret = os.getenv('CLIENT_SECRET')
     redirect_uri = os.getenv('REDIRECT_URI')
     state = os.getenv('STATE')

     # We'll add the necessary endpoints here in the steps below

     if __name__ == '__main__':
         app.run(port=3000)
   ```
  </Tab>
</Tabs>

</Accordion>
<Accordion title="2. Create an authorization link">

To enable users to install your App, you need to create an authorization link. This link directs users to a Webflow authorization screen where they can grant your App permission to access their Webflow data.

  <Note title="Where do I put this link?">

  **App Marketplace Submission:** Supply this link in your application to the App marketplace. Users will use it to install your App from the marketplace.

  **Your Site:** Place this link on your site to direct users to try out or install your App.
  </Note>

You can create the authorization link using various methods, with the recommended approach being through our JavaScript and Python SDKs.

  ### Request Parameters

  To create the authorization link, you will need the following information:

{/* <!-- vale off --> */}

  <ParamField path="client_id" type="string" required={true}>
  Unique ID for your application. Can be found in the dashboard.
  </ParamField>

  <ParamField path="response_type" type="string" required={true}>
  This value should always be "code".
  </ParamField>

  <ParamField path="redirect_uri" type="string" required={true}>
  The URI to redirect the user once they've granted authorization. This must match what's used in your App settings.
  </ParamField>

  <ParamField path="state" type="string" required={false}>
  A token value provided by your application to prevent [CSRF attacks.](https://owasp.org/www-community/attacks/csrf#:~:text=CSRF%20attacks%20target%20functionality%20that,the%20response%2C%20the%20victim%20does.) If passed, the authorization server should respond with this parameter.
  </ParamField>

  {/* <!-- vale on --> */}



  ### Constructing the authorization link

  <Note title="Scopes on the OAuth URL">
  Verify that the scopes requested in this Install/OAuth URL are equal to or a subset of the scopes configured for your app in the app settings. If there's a mismatch where the Install URL requests scopes beyond what's configured in the app settings, users won't be able to install your app and an error will be displayed.
  </Note>

    #### Using the SDK

    To simplify the process of creating authorization links and handling OAuth flows, you can use the provided JavaScript and Python SDKs. These SDKs offer convenient methods to generate the authorization URL with the required parameters.

    <Tabs>
      <Tab title="Node.js">
        <CodeBlocks>
        ```javascript server.js
        require('dotenv').config();
        const express = require('express');
        const { WebflowClient } = require('webflow-api');

        const app = express();
        const port = 3000;

        // Endpoint to redirect to the authorization link
        app.get('/auth', (req, res) => {
            const authorizeUrl = WebflowClient.authorizeURL({
                state: process.env.STATE,
                scope: 'sites:read',
                clientId: process.env.CLIENT_ID,
                redirectUri: process.env.REDIRECT_URI,
            });

            res.redirect(authorizeUrl);
        });

        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
        ```
        </CodeBlocks>
      </Tab>
      <Tab title="Python">
        ```python server.py
        from flask import Flask, request, redirect
        import requests
        from webflow import WebflowClient
        from dotenv import load_dotenv
        import os

        load_dotenv()

        app = Flask(__name__)

        client_id = os.getenv('CLIENT_ID')
        client_secret = os.getenv('CLIENT_SECRET')
        redirect_uri = os.getenv('REDIRECT_URI')
        state = os.getenv('STATE')

        # Endpoint to redirect to the authorization link
        @app.route('/auth')
        def auth():
            authorize_url = WebflowClient.authorize_url(
                client_id=client_id,
                redirect_uri=redirect_uri,
                scope='sites:read',
                state=state
            )
            return redirect(authorize_url)

        if __name__ == '__main__':
            app.run(port=3000)
        ```
      </Tab>
    </Tabs>

    <Accordion title="Manually create the authorization link">

    If you prefer not to use the SDKs, you can manually construct the authorization link by adding the necessary query parameters to the authorization URL:

    ```
    https://webflow.com/oauth/authorize
    ```

    Construct the authorization URL using the gathered parameters:

    ```
    https://webflow.com/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&scope=assets%3Aread%20assets%3Awrite%20authorized_user%3Aread%20cms%3Aread%20cms%3Awrite%20custom_code%3Aread%20custom_code%3Awrite%20forms%3Aread%20forms%3Awrite%20pages%3Aread%20pages%3Awrite%20sites%3Aread%20sites%3Awrite
    ```

    - When URL encoding multiple scopes, they should be connected by a space (`%20`).
    - Scopes are written in the format `scope:action`, so the colon (`:`) should be encoded as `%3A`.

    For example passing the following scopes: `sites:read`, `sites:write`, and `pages:read` should look like `sites%3Aread%20sites%3Awrite%20pages%3Aread`
    </Accordion>
    <Accordion title="Copy the link from the Dashboard">
    Additionally, you can copy an auto-generated installation link from your App's settings.

    In your Workspace Dashboard:

    1. Select to "Apps and Integrations" in the left-hand menu
    2. Scroll to the "App Development" section and find your App
    3. Copy the link from the "Install" button

    ![](file:b6abf9cd-ee39-497a-89c9-e57b880df180)
    </Accordion>

</Accordion>

<Accordion title="3. Handle redirect to the callback URI">
When users click on the authorization link, they will be taken to a screen where they can review and grant the necessary permissions for your App.

![](file:52624fd1-32b9-4a0e-b4b3-c3bd2ca68e79)

After the user authorizes the App, Webflow redirects them to your server using the redirect URI specified in your App settings. This `GET` request to your server includes the following query parameters:

- `code` - A single-use authorization code that you'll exchange for an access token. This code is only valid for 15 minutes.
- `state` : _optional_ - The unique state value you provided in the initial request. Ensure this value matches the original to protect against CSRF attacks.

---

Let's set up an endpoint to handle the callback request and store these parameters, as you'll need them in the next step to request an access token from Webflow.

See the example below for details on completing the following steps:

1. **Setup the callback endpoint**
   Create a route to handle the redirect from Webflow
2. **Verify `state` parameter**
   Optionally, check that the state parameter matches the one sent in the authorization request.
3. **Extract authorization code**
   Retrieve the code from the query parameters.

#### Example

<Tabs>
<Tab title="Node.js">

```javascript server.js
require('dotenv').config();
const express = require('express');
const { WebflowClient } = require('webflow-api');

const app = express();
const port = 3000;

// Endpoint to redirect to the authorization link
app.get('/auth', (req, res) => {
    const authorizeUrl = WebflowClient.authorizeURL({
        state: process.env.STATE,
        scope: 'sites:read',
        clientId: process.env.CLIENT_ID,
        redirectUri: process.env.REDIRECT_URI,
    });

    res.redirect(authorizeUrl);
});

// Endpoint to receive info from the callback URL
app.get('/callback', async (req, res) => {
    const { code, state } = req.query; // Store code and state parameters as variables

    if (state !== process.env.STATE) {
        return res.status(400).send('State does not match');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
```
</Tab>
<Tab title="Python">

```python server.py
from flask import Flask, request, redirect
import requests
from webflow import WebflowClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')
redirect_uri = os.getenv('REDIRECT_URI')
state = os.getenv('STATE')

# Endpoint to redirect to the authorization link
@app.route('/auth')
def auth():
    authorize_url = WebflowClient.authorize_url(
        client_id=client_id,
        redirect_uri=redirect_uri,
        scope='sites:read',
        state=state
    )
    return redirect(authorize_url)

# Endpoint to receive info from the callback URL
@app.route('/callback')
def callback():
    authorization_code = request.args.get('code') // Store parameters
    state_received = request.args.get('state') // Store parameters

    if state_received != state:
        return 'State does not match', 400


if __name__ == '__main__':
    app.run(port=3000)
```
</Tab>
</Tabs>

</Accordion>


<Accordion title="4. Request an access token">

Now that you have the authorization code you can exchange it for an access token. The access token request should be made as soon as possible after authorization as an unconfirmed authorization code is only valid for 15 minutes.

Let's walk through the steps to create a smooth flow for a user:

1. **Request an access token from Webflow's authorization server**

   In the same endpoint we just set up, create a request to Webflow with the following parameters. Webflow requires these parameters to ensure that the entity requesting the access token is the same entity that received the authorization code.

   #### Authorization server endpoint
   `POST https://api.webflow.com/oauth/access_token`

   #### Request parameters

{/* <!-- vale off --> */}

   <ParamField path="client_id" type="string" required={true}>
   Unique ID for your application. Can be found in the dashboard.
   </ParamField>

   <ParamField path="client_secret" type="string" required={true}>
   Private value unique to your application. Can be found in the dashboard.
   </ParamField>

   <ParamField path="code" type="string" required={true}>
   Authorization code used to retrieve an `access_token` for the user. Can only be used once.
   </ParamField>

{/* <!-- vale on --> */}

2. **Store the access token securely**

   For demonstration purposes, we're storing the access token in a variable and printing it to the terminal. However, this approach isn't secure for production. You should store the access token securely in a database or environment variables. For comprehensive guidance on securely storing tokens, please refer to our example apps on [GitHub](https://github.com/Webflow-Examples).

3. **Redirect the user within your App**

   After successfully obtaining the access token, redirect the user to an appropriate location within your app. This could be a dashboard, a welcome page, or any other relevant section. Ensure that the user experience is smooth and they're informed about the successful authentication.

#### Example

<Tabs>
<Tab title="Node.js">

```javascript server.js
require('dotenv').config();
  const express = require('express');
  const { WebflowClient } = require('webflow-api');

  const app = express();
  const port = 3000;

  // Endpoint to redirect to the authorization link
  app.get( '/auth', (req, res) => {
      const authorizeUrl = WebflowClient.authorizeURL({
          state: process.env.STATE,
          scope: 'sites:read',
          clientId: process.env.CLIENT_ID,
          redirectUri: process.env.REDIRECT_URI, // If the redirect URI is included in the auth link, it must also be included in the request for an access token
      });

      res.redirect(authorizeUrl);
  });

  // Endpoint to receive info from the callback URL
  app.get('/callback', async (req, res) => {
      const { code, state } = req.query;

      if (state !== process.env.STATE) {
          return res.status(400).send('State does not match');
      }

      try {
        // Request an access token
       const accessToken = await WebflowClient.getAccessToken({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
        });

        // Store the access token securely, e.g., in a database or session (not shown here for brevity)
      console.log(accessToken)

      // Redirect the user to your App
      res.redirect('/dashboard')


    } catch (error) {
        console.error('Error during OAuth process:', error);
        res.status(500).send('Internal Server Error');
    }

  });

    // Dashboard route for demonstraton purposes
    app.get('/dashboard', async (req, res) => {
        res.send('Welcome to your dashboard!')
    });

  app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
  });

```
</Tab>
<Tab title="Python">

```python server.py
from flask import Flask, request, redirect
  import requests
  from webflow import WebflowClient
  from dotenv import load_dotenv
  import os

  load_dotenv()

  app = Flask(__name__)

  client_id = os.getenv('CLIENT_ID')
  client_secret = os.getenv('CLIENT_SECRET')
  redirect_uri = os.getenv('REDIRECT_URI')
  state = os.getenv('STATE')

  # Endpoint to redirect to authorization link
  @app.route('/auth')
  def auth():
      authorize_url = WebflowClient.authorize_url(
          client_id=client_id,
          redirect_uri=redirect_uri,
          scope='sites:read',
          state=state
      )
      return redirect(authorize_url)

  # Endpoint to recieve info from the callback URI
  @app.route('/callback')
  def callback():
      authorization_code = request.args.get('code')
      state_received = request.args.get('state')

      if state_received != state:
          return 'State does not match', 400

      # Request an access token
      try:
          access_token = WebflowClient().get_access_token(
              client_id=client_id,
              client_secret=client_secret,
              code=authorization_code,
              redirect_uri=redirect_uri,
          )

          # Store the access token securely, e.g., in a database or session (not shown here for brevity)
       print(access_token)

          # Redirect the user to the dashboard
          return redirect('/dashboard')

      except Exception as e:
          print('Error during OAuth process:', e)
          return 'Internal Server Error', 500


    # Dashboard route for demonstration purposes
    @app.route('/dashboard')
    def dashboard():
        return 'Welcome to your dashboard'

    if __name__ == '__main__':
      app.run(port=3000)
```
</Tab>
</Tabs>

</Accordion>

<Accordion title="5. Start your server and test the authentication flow">

You're ready to test your newly created authentication flow! In this step, we'll start our server, navigate to the authorization screen, and get an access token from Webflow.

1. **Create a secure tunnel using [ngrok](https://ngrok.com/) _(OPTIONAL)_**

    <Accordion title="using ngrok">

      ngrok can be used to create a secure tunnel to your localhost, providing you with an HTTPS link that can be used as a valid redirect URI.

      1. **Install ngrok**
      Download and install ngrok using a package manager or [directly from their website](https://developers.webflow.com/data/reference/oauth-app).

      <Tabs>
      <Tab title="Homebrew">
      ```shell
      brew install ngrok/ngrok/ngrok
      ```
      </Tab>
      <Tab title="Choco">

      ```shell
      choco install ngrok
      ```
      </Tab>
      </Tabs>
      2. **Authorize the ngrok agent**
      [Copy your authentication token](https://ngrok.com/blog-post/authentication-with-ngrok) from ngrok, and enter the following command in your terminal.

      ```
      ngrok config add-authtoken $YOUR_AUTHTOKEN
      ```
      3. **Create a secure tunnel**
      In a new terminal window, run the following command to create a tunnel to your local server:
      ```
      ngrok http 3000
      ```

      Ngrok will provide you with a public HTTPS URL that forwards to your local server running on port 3000. It should look something like this:
      ```
      https://your-ngrok-url.ngrok.io
      ```
      4. **Update your redirect URI in your App's settings**
        1. In your workspace settings, navigate to Apps & Integrations > App Development
        2. Find your App and click the "Edit App" button
        3. Navigate to the "Building Blocks" menu
        4. Update the Redirect URI with your Ngrok URL, ensuring that you include the correct endpoint. For example, if your endpoint is `/callback`, your Redirect URI should look something like `https://your-ngrok-url.ngrok.io/callback`.

      5. **Update the redirect URI in your `.env` file**
      Be sure to also update your redirect URI in your `.env` file if you're passing your callback URI when creating an authorization link.

      ```
      REDIRECT_URI=https://your-ngrok-url.ngrok.io/callback
      ```
    </Accordion>

2. **Start your server**
Enter the following command into your terminal to start your server.

    <Tabs>
    <Tab title="Node.js">
    ```
    node server.js
    ```
    </Tab>
    <Tab title="Python">
    ```
    python app.py
    ```
    </Tab>
    </Tabs>

3. **Start the authorization flow**
    1. **Start the authentication process**
      Open your browser and go to `http://localhost:3000/auth`. You will be redirected to Webflow's authorization screen for your App.
    2. **Authorize your app**
      Select the workspace or sites you want your app to access, and click the "Authorize" button.
    3. **Redirect to your app**
      Upon successful authorization, you will be redirected to your app's dashboard.
    4. **Verify the access token**
      Check your terminal to see the access token printed out.

Didn't see what you expected? [Read the troubleshooting guide below](https://developers.webflow.com/data/reference/oauth-app#troubleshooting).

</Accordion>


# Revoke an access token

To revoke an access token that has been issued to your application, make a POST request to the following endpoint with the below parameters:

```
https://webflow.com/oauth/revoke_authorization
```

### Request Parameters

<ParamField path="client_id" type="string" required={true}>
The unique identifier for your OAuth application.
</ParamField>
<ParamField path="client_secret" type="string" required={true}>
The secret key associated with your OAuth application.
</ParamField>
<ParamField path="access_token" type="string" required={true}>
The access token that you wish to revoke.
</ParamField>


### Example Request

```curl cURL
curl -X POST https://webflow.com/oauth/revoke_authorization \
  -H "Content-Type: application/json" \
  -d '{
        "client_id": "2ccc1b455c782fd60093590c83ee5e315b36bd6640507bb48570e5d0265c2854",
        "client_secret": "d26ec60528020e1caf426db1a20dceaf5f4e3581bb29bc659b2886d46a7160ed",
        "access_token": "53db404efe82daea0c65c635a49bc9388e470146b4d800f559cb9a7f3daf83f1"
      }'
```

### Response

If the request is successful, the access token will be revoked, and the response will return an HTTP status code of `200` OK with the following response body:

```json
{
    "did_revoke": true
}
```

### Possible Errors

| Error Type        | Description                                                                               |
| :---------------- | :---------------------------------------------------------------------------------------- |
| `invalid_client`  | The `client_id` or `client_secret` is invalid or doesn't match the provided credentials. |
| `invalid_token`   | The `access_token` provided doesn't exist or has already been revoked.                   |
| `invalid_request` | The request is missing one or more required parameters, or is otherwise malformed.        |

<br />

<br />


# Troubleshooting

<Accordion title="My authorization link shows 400 Bad Request">
If your authorization link returns a 400 Bad Request error, ensure the following:<ul>  <li>The `client_id` is correct and matches the one provided in your app's settings.</li>  <li>The scopes you are requesting are registered and valid for your app in the dashboard.</li>  <li>If you are including the `redirect_uri` parameter, verify that it matches the one registered for your app in the dashboard.</li>  <li>Ensure that the URL is properly constructed and encoded if you are creating it manually.</li></ul>
</Accordion>

<Accordion title="My server responds with an invalid_grant error">
<ul>  <li>If you included a `redirect_uri` in your authorization link, you must also include it in your request for an access token.</li>  <li>Ensure your environment variables are loading, and you're sending the correct `client_id` and `client_secret`.</li>  <li>Make sure you have a fresh `code` value, these tokens are single-use and can not be used again. Also, the token is only valid for 15 minutes after it has been granted.</li></ul>
</Accordion>


<br />




---
title: Site Token
description: >-
  Create an API token to access site-specific resources via the Webflow Data
  API.
'og:title': Site Token
'og:description': >-
  Create an API token to access site-specific resources via the Webflow Data
  API.
subtitle: Create an Site API token.
hidden: false
---
Site tokens provide access to site-specific [resources](/data/reference/structure-1) via the Webflow Data API.

Site tokens are required to authenticate requests to the Webflow Data API. Each token acts as a unique identifier and password, allowing Webflow to verify:

- **Who** is making the request
- **What** they're allowed to do through [scopes and permissions](https://developers.webflow.com/data/reference/scopes)
- **Which** sites and workspaces they're accessing

You'll need to include your site token in the "Authorization" header of every API request. You'll see how to do this in the examples below.

<br />


## Creating a site token

<Note title="Site administrator access required">
   Only site administrators are authorized to create a site token. If you're not a site administrator, please contact one to create the token for you.
</Note>

{/* <!-- vale off --> */}

1. In your workspace, find the site you want to create a token for and click the <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/24px/Settings.svg" style={{display: "inline", verticalAlign: "middle", width: "20px", height: "20px", margin: "0 2px"}} /> gear icon to open the site settings.

2. In the left sidebar of your site's settings, select **Apps & integrations**. Scroll to the bottom of the page to the **API access** section.
      <Frame>
         ![](file:9961dfc6-32c8-45ce-93d5-d5ed4ab780d3)
      </Frame>
2. Click Generate API token.
3. Enter a name for your token, and choose the [scopes](/data/reference/scopes) needed for your use case.
      {/* <!-- vale off --> */}
         <div style={{maxWidth: "50%", margin: "0 auto"}}>
            <Frame>
               ![](file:dcbf137f-043c-4fe2-9a8e-57ab302862f8)
            </Frame>
         </div>
         {/* <!-- vale on --> */}

5. Click "Generate token."
6. Copy the generated token to your clipboard and save it in a secure location.

<br />
{/* <!-- vale on --> */}


### Limitations

- **API tokens expire after 365 consecutive days of inactivity.** Any API call made with the token before expiry will reset the inactivity period.
- **Site tokens are created per site.** If you're looking to build an integration that works across multiple sites, [consider creating a Webflow App.](/data/docs/getting-started-apps)
- **Each site can have up to 5 tokens.** This limit ensures manageable token access and security.
- **Site tokens don't grant access to the following endpoints:**
  <br />
  - Authorization endpoints
  - Custom code endpoints
  - Workspace Activity log endpoints

<br />


## Using a site token

Now that you have your site token, you can start making requests to the Webflow Data APIs.

<Tabs>
   <Tab title="cURL">
   **Example**
   ```bash request
   curl --request GET \
     --url https://api.webflow.com/v2/sites \
     --header 'accept: application/json' \
     --header 'authorization: Bearer YOUR_API_TOKEN'
   ```

   This command retrieves a list of sites associated with your Webflow account. Replace `YOUR_API_TOKEN` with the site token you generated.
   </Tab>
   <Tab title="JavaScript">
   If you prefer working with JavaScript, you can use the Webflow JavaScript SDK. The SDK simplifies interacting with the Webflow API and handling requests.

   First, install the Webflow SDK using npm:
   ```bash
   npm install webflow-api
   ```

   **Example**
   ```javascript request
   import { WebflowClient } from 'webflow-api';

   const token = 'YOUR_API_TOKEN';
   const webflow = new WebflowClient({ accessToken: token });

   (async () => {
   try {
      const sites = await webflow.sites.list();
      console.log(sites);
   } catch (error) {
      console.error('Error fetching sites:', error);
   }
   })();
   ```
   This command retrieves a list of sites associated with your Webflow account. Replace `YOUR_API_TOKEN` with the site token you generated.
   </Tab>
   <Tab title="Python">
   To make requests to the Webflow API using Python, you'll need to install the Webflow package and use it to interact with the API.

   First, install the Webflow package using pip:
   ```bash
   pip install webflow
   ```

   **Example**
   ```python request
   from webflow.client import Webflow

   # Initialize the Webflow client with your access token
   client = Webflow(access_token="YOUR_ACCESS_TOKEN")

   # Fetch the list of sites
   sites = client.sites.list()

   # Print the list of sites
   print(sites)
   ```

   This command retrieves a list of sites associated with your Webflow account. Replace `YOUR_API_TOKEN` with the site token you generated.
   </Tab>
</Tabs>

### Example API response

Here's an example of what a response from the Webflow API might look like:

   {/* <!-- vale off --> */}
   <CodeBlocks>
      ```json Response
      {
         "id": "42e98c9a982ac9b8b742",
         "workspaceId": "42e63e98c9a982ac9b8b742",
         "displayName": "The Hitchhiker's Guide to the Galaxy",
         "shortName": "hitchhikers-guide",
         "previewUrl": "https://screenshots.webflow.com/sites/6258612d1ee792848f805dcf/20231219211811_d5990556c743f33b7071300a03bf67e6.png",
         "timeZone": "Magrathea/FactoryFloor",
         "createdOn": "1979-10-12T12:00:00.000Z",
         "lastUpdated": "2023-04-02T12:42:00.000Z",
         "lastPublished": "2023-04-02T12:42:00.000Z",
         "parentFolderId": "1as2d3f4g5h6j7k8l9z0x1c2v3b4n5m6",
         "customDomains": [
            {
               "id": "589a331aa51e760df7ccb89d",
               "url": "hitchhikersguide.galaxy"
            },
            {
               "id": "589a331aa51e760df7ccb89e",
               "url": "heartofgold.spaceship"
            }
         ],
         "locales": {
            "value": {
               "primary": {
                  "id": "653fd9af6a07fc9cfd7a5e57",
                  "cmsLocaleId": "653ad57de882f528b32e810e",
                  "enabled": false,
                  "displayName": "English (United States)",
                  "displayImageId": null,
                  "redirect": true,
                  "subdirectory": "",
                  "tag": "en-US"
               },
               "secondary": [
                  {
                     "id": "653fd9af6a07fc9cfd7a5e56",
                     "cmsLocaleId": "653fd9af6a07fc9cfd7a5e5d",
                     "enabled": true,
                     "displayName": "French (France)",
                     "displayImageId": null,
                     "subdirectory": "fr-fr",
                     "tag": "fr-FR"
                  },
                  {
                     "id": "654112a3a525b2739d97664c",
                     "cmsLocaleId": "654112a3a525b2739d97664f",
                     "enabled": true,
                     "displayName": "Spanish (Mexico)",
                     "displayImageId": null,
                     "subdirectory": "es-mx",
                     "tag": "es-MX"
                  }
               ]
            }
         }
      }
      ```
   </CodeBlocks>
   {/* <!-- vale on --> */}


<br />

## Revoking a site token

To revoke a site token:

1. Go to Site settings > Apps & integrations > API access.
2. Find your site token
3. Select the "revoke" button

<Frame>
<img src="file:2ca1ffea-0b4e-4e84-ae9e-1b7a41ea57af" alt="Revoke site token" />
</Frame>

Revoking a site token is an additional security measure for your Webflow site. This process disables the token, preventing any further access or use. You should consider revoking a site token in the following situations:

- **Security Concerns:** If there's a potential security issue, revoke the token immediately.
- **Administrator Changes:** If an administrator leaves or their role changes, revoke their token to maintain security.
- **Token Management:** Regularly review and revoke tokens that are no longer needed.

<br />

### Best practices

- **Mint tokens for each use case**: Instead of reusing tokens, generate a new token for each specific use case to maintain better security and control.
- **Rotate tokens periodically**: Regularly update and revoke old tokens to maintain security.
- **Be Descriptive**: Name your tokens something descriptive and meaningful to easily identify their purpose.
- **Minimal Scopes**: Generate tokens with the minimal scopes needed for your use case. Mint a new one if you need to add new scopes. This limits the potential impact if a token is compromised.

<br />


## Troubleshooting and FAQs

<Accordion title="How long is a site token valid?">
   Site tokens are valid until they're manually revoked or after 365 days of inactivity.
</Accordion>

<Accordion title="Can I regenerate a site token?">
   Yes, you can generate a new token at any time from the API access section in your site settings.
</Accordion>

<Accordion title="What happens if I lose my site token?">
   You will need to generate a new one and update any integrations using the old token.
</Accordion>



---
title: Workspace Token
hidden: false
description: >-
  Create an API token to access workspace-specific resources via the Webflow
  Data API.
'og:title': Workspace Token
'og:description': >-
  Create an API token to access workspace-specific resources via the Webflow
  Data API.
subtitle: Create a Workspace API token.
---

Workspace tokens provide access to workspace-specific resources via the Webflow Data API.

These tokens are useful for workspace administrators that need access to workspace-level information and [audit logs](/data/reference/enterprise/workspace-audit-logs/get). For access to site data, use a [site token](/data/reference/site-token) instead.

<Warning title="Enterprise only">
   Workspace tokens are only available for Enterprise workspaces.
</Warning>

<br />

## Scopes and endpoints
Create workspace tokens with the following scopes and endpoints.

| Scope | Endpoints |
|-------|-----------|
| `workspace_activity: read` | [`GET` Workspace Audit Logs](/data/reference/enterprise/workspace-audit-logs/get) |


Workspace tokens use separate [scopes](/data/reference/scopes) and [resources](/data/reference/structure-1) than site tokens. For example, workspace tokens don't have access to the `site` scope, therefore they can't access site-specific endpoints like [Get Site Information](/data/reference/sites/get). To ensure you're using the correct token for your use case, please refer to the [scopes](/data/reference/scopes) and [resources](/data/reference/structure-1) documentation.

<br/>
## Creating a workspace token

<Note title="Workspace administrator access required">
   Only workspace administrators can create a workspace token.
</Note>

1. In the left sidebar of your Workspace, select **Apps & integrations** > **Manage**. Scroll to the bottom of the page to the **Workspace API access** section.
        <Frame background="subtle">
        <img src="file:0ed62576-987a-4d3e-8190-a078e587e940" alt="Workspace API access" />
        </Frame>
2. Click "Generate API token".
3. Enter a name for your API token.
4. Choose the permissions you want the API token to have for each [scope](/data/reference/scopes).
   (e.g., no access or read-only).
        {/* <!-- vale off --> */}
        <div style={{maxWidth: "50%", margin: "0 auto"}}>
            <Frame background="subtle">
                <img src="file:80a28281-9bd9-4351-9e69-c8f74b4170f5" alt="Create token" />
            </Frame>
        </div>
        {/* <!-- vale on --> */}

5. Click Generate token.
6. Copy the generated token to your clipboard and save it in a secure location.

<br />

### Limitations

- **Enterprise only.** Workspace tokens are only available for Enterprise workspaces.
- **API tokens expire after 365 consecutive days of inactivity.** Any API call made with the token before expiry will reset the inactivity period.
- **Each workspace can have up to 5 tokens.** This limit ensures manageable token access and security.
- **Limited endpoints.** Workspace tokens are designed with different scopes than site tokens. For example, workspace tokens don't have access to the `site` scope, therefore they can't be used to access site-specific endpoints. Please refer to the [scopes](/data/reference/scopes) documentation for more information.
<br />

## Using a workspace token

Now that you have your workspace token, you can start making requests to the Webflow Data APIs that require a workspace token.

<Tabs>
   <Tab title="cURL">
   The simplest way to make a request is by using cURL

   **Example**
   ```bash request
   curl --request GET \
     --url https://api.webflow.com/v2/workspaces/:workspace_id_or_slug/audit_logs \
     --header 'accept: application/json' \
     --header 'authorization: Bearer YOUR_API_TOKEN'
   ```

   This command retrieves a list of activity across your workspace. Replace `YOUR_API_TOKEN` with the workspace token you generated.
   </Tab>
   <Tab title="JavaScript">
   If you prefer working with JavaScript, you can use the Webflow JavaScript SDK. The SDK simplifies interacting with the Webflow API and handling requests.

   First, install the Webflow SDK using npm:
   ```shell
   npm install webflow-api
   ```

   **Example**
   ```javascript request
   import { WebflowClient } from 'webflow-api';

   const token = 'YOUR_API_TOKEN';
   const webflow = new WebflowClient({ accessToken: token });

   (async () => {
   try {
      const auditLogs = await webflow.workspaces.auditLogs.getWorkspaceAuditLogs('workspace_id_or_slug', {
         from: "2024-04-22T16:00:31Z",
         to: "2024-04-22T16:00:31Z"
      });
      console.log(auditLogs);
   } catch (error) {
      console.error('Error fetching audit logs:', error);
   }
   })();
   ```
   This command retrieves a list of activity across your workspace. Replace `YOUR_API_TOKEN` with the workspace token you generated.
   </Tab>
   <Tab title="Python">
   To make requests to the Webflow API using Python, you'll need to install the Webflow package and use it to interact with the API.

   First, install the Webflow package using pip:
   ```bash
   pip install webflow
   ```

   **Example**
   ```python request
   from webflow.client import Webflow

   # Initialize the Webflow client with your access token
   client = Webflow(access_token="YOUR_ACCESS_TOKEN")

   # Fetch the list of activity across your workspace
   client.workspaces.audit_logs.get_workspace_audit_logs(
    workspace_id_or_slug="hitchhikers-workspace",
    from_=datetime.datetime.fromisoformat(
        "2024-04-22 16:00:31+00:00",
    ),
    to=datetime.datetime.fromisoformat(
        "2024-04-22 16:00:31+00:00",
    ),
   )

   # Print the audit logs
   print(audit_logs)
   ```

   This command retrieves a list of activity across your workspace. Replace `YOUR_API_TOKEN` with the workspace token you generated.
   </Tab>
</Tabs>

### Example API response

Here's an example of what a response from the Webflow API might look like:

   {/* <!-- vale off --> */}
   <CodeBlocks>
      ```json Response
        {
        "items": [
            {
            "eventType": "user_access",
            "eventSubType": "login",
            "payload": {
                "method": "dashboard",
                "location": "Ashburn US",
                "ipAddress": "54.165.18.93"
            }
            },
            {
            "eventType": "user_access",
            "eventSubType": "login",
            "payload": {
                "method": "sso"
            }
            },
            {
            "eventType": "user_access",
            "eventSubType": "login",
            "payload": {
                "method": "dashboard"
            }
            }
        ],
        "pagination": {
            "limit": 10,
            "offset": 0,
            "total": 3
        }
        }
      ```
   </CodeBlocks>
   {/* <!-- vale on --> */}


<br />

### Best practices

- **Mint tokens for each use case**: Instead of reusing tokens, generate a new token for each specific use case to maintain better security and control.
- **Rotate tokens periodically**: Regularly update and revoke old tokens to maintain security.
- **Be Descriptive**: Name your tokens something descriptive and meaningful to easily identify their purpose.
- **Minimal Scopes**: Generate tokens with the minimal scopes needed for your use case. Mint a new one if you need to add new scopes. This limits the potential impact if a token is compromised.

<br />



<br />

## Revoking a workspace token
To revoke a workspace token:

1. In the left sidebar of your Workspace, select **Apps & integrations** > **Manage**. Scroll to the bottom of the page to the **Workspace API access** section.
2. Find your workspace token
3. Click the "Revoke" button

<Frame background="subtle">
   <img src="file:57853500-0962-4124-a196-f7f0c18416d2" alt="Revoke token" />
</Frame>

Revoking a site token is an additional security measure for your Webflow site. This process disables the token, preventing any further access or use. You should consider revoking a site token in the following situations:

- **Security Concerns:** If there's a potential security issue, revoke the token immediately.
- **Administrator Changes:** If an administrator leaves or their role changes, revoke their token to maintain security.
- **Token Management:** Regularly review and revoke tokens that are no longer needed.

<br />

## Troubleshooting and FAQs

<Accordion title="How long is a workspace token valid?">
   Workspace tokens are valid until they're manually revoked or after 365 days of inactivity.
</Accordion>

<Accordion title="Can I regenerate a workspace token?">
   You can not regenerate an existing token. However you can generate a new token at any time from the API access section in your workspace settings.
</Accordion>

<Accordion title="What happens if I lose my workspace token?">
   You will need to generate a new workspace token and update any integrations using the old token.
</Accordion>

---
title: Scopes
slug: data/reference/scopes
hidden: false
---

## Available scopes

Available scopes are determined by the type of token you're creating. For [Data Client apps](/data/reference/oauth-app) and [site tokens](/data/reference/site-token), refer to the site-level scopes. For [workspace tokens](/data/reference/authentication/workspace-token), refer to the workspace-level scopes.

<Tabs>
   <Tab title="Site-level">

   | Resource           | Scopes                              | Endpoints                                                                               |
| :----------------- | :---------------------------------- | :-------------------------------------------------------------------------------------- |
| Assets             | `assets:read`, `assets:write`          | → [API Docs](/data/reference/assets/assets/list)          |
| Authorized User    | `authorized_user:read`                | → [API Docs](/data/reference/token/authorized-by)        |
| Authorization info | None required                       | → [API Docs](/data/reference/token/introspect)           |
| CMS                | `cms:read`, `cms:write`                 | → [API Docs](/data/reference/cms/collections/list)     |
| Comments           | `comments:read`, `comments:write`                 | → [API Docs](/data/reference/comments/list-comment-threads)     |
| Components                | `components:read`, `components:write`                 | → [API Docs](/data/reference/pages-and-components/components/list)     |
| Custom Code        | `custom_code:read`, `custom_code:write` | → [API Docs](/data/reference/custom-code/custom-code/list)          |
| Ecommerce          | `ecommerce:read`, `ecommerce:write`     | → [API Docs](/data/reference/ecommerce/products/list)             |
| Forms              | `forms:read`, `forms:write`             | → [API Docs](/data/reference/forms/list)           |
| Pages              | `pages:read`, `pages:write`             | → [API Docs](/data/reference/pages-and-components/pages/list)           |
| Sites              | `sites:read`, `sites:write`             | → [API Docs](/data/reference/sites/list)           |
| Site Activity      | `site_activity:read`                  | → [API Docs](/data/reference/enterprise/site-activity/list) |
| Site Configuration      | `site_config:read`, `site_config:write`               | → [API Docs](/data/reference/enterprise/site-configuration/url-redirects/get) |
| Users              | `users:read`, `users:write`             | → [API Docs](/data/reference/users/users/list)           |
| Webhooks           | Depends on `trigger_type`             | → [API Docs](/data/reference/webhooks/list)        |
| Workspace            | `workspace:read`, `workspace:write`             | → [API Docs](/data/reference/enterprise/workspace-management/create)        |

   </Tab>
   <Tab title="Workspace-level">
 | Resource           | Scopes                              | Endpoints                                                                               |
| :----------------- | :---------------------------------- | :-------------------------------------------------------------------------------------- |
| Workspace Activity      | `workspace_activity:read`             | → [API Docs](/data/reference/enterprise/workspace-audit-logs/get)        |


   </Tab>
</Tabs>

<Note title="Quick tip: Finding required scopes">
Each API endpoint lists its required scopes in the description. When planning your integration, check the endpoints you'll use to determine which scopes to request.
</Note>

## Understanding scopes

Scopes are permissions that control what data your app can access. Think of them like permissions on your phone - an app might request access to your camera, photos, or contacts. In Webflow's API:

- Each scope gives access to specific [resources](/data/reference/structure-1)
- Scopes usually come in pairs: `:read` for viewing data, `:write` for modifying data
- Users will see and approve these permissions when connecting to your app

<Note title="Best practice">
Only request scopes your app actually needs. Requesting unnecessary scopes can make users hesitant to approve your app.
</Note>

## Adding scopes

When creating a Data Client App or an API token, you'll first register your required scopes:

<Tabs>
   <Tab title="Data Client App">
   During [app registration](/data/docs/register-an-app), select the scopes that match your app's required functionality. These scopes define what data your app can access.

    <Frame caption="Scope Registration">
        <img src='file:10d84c74-b9be-42a8-9b6d-b317b1585d6b' alt="Scope Registration" />
    </Frame>

    <Note title="Using scopes in OAuth">
    After registration, you'll use these same scopes in your [Authorization URL](/data/reference/oauth-app#constructing-the-authorization-link) during the OAuth flow. This shows users an authorization page where they can review and approve your requested permissions.

    See our [authorization guide](/data/reference/oauth-app) for step-by-step OAuth implementation.
    </Note>

   </Tab>
   <Tab title="API Token">
   When creating a [site](/data/reference/site-token) or [workspace](/data/reference/authentication/workspace-token) token, select the scopes that match your integration's required functionality. These scopes define what data your token can access.

   <Frame caption="Scope Registration">
   <div style={{maxWidth: "50%", margin: "0 auto"}}>
   <img src='file:78d60d9b-81c2-4c20-b375-7ff5006e3e8a' alt="Scope Registration" />
   </div>
   </Frame>
   </Tab>
</Tabs>



---
title: Rate Limits
slug: data/reference/rate-limits
hidden: false
---
To ensure consistent performance and fair access to all users, Webflow enforces rate limits on its Data API. These limits vary based on your [site subscription plan](https://www.webflow.com/pricing) and are essential for maintaining the stability of the services.


Your Webflow site plan determines your rate limit:

| Plan                         | Request Per Minute |
| :--------------------------- | :----------------- |
| Starter and Basic            | 60                 |
| CMS, eCommerce, and Business | 120                |
| Enterprise                   | Custom             |

If you exceed your rate limit, Webflow’s API will return an HTTP `429` Too Many Requests error. Along with this response, the `Retry-After` header will tell you how long to wait before attempting new requests—typically, this reset time is 60 seconds.

<Note>
If your App or integration requires a higher limit, consider [exploring the enterprise options](https://webflow.com/pricing) to request increased access.
</Note>

<br />

### Endpoint-specific limits

While the general rate limits apply to most API requests, some endpoints have additional constraints. For example, [Site Publish](/data/reference/webhooks/events/site-publish) operations are limited to **one successful publish per minute.** Any endpoint-specific rate limits will be identified within the endpoint's documentation.

<br />

## Caching and rate limits

For cached requests to the [content delivery API](/data/docs/working-with-the-cms/content-delivery), there are effectively no rate limits. However, uncached requests to the origin server count against your plan's rate limits. To learn more about serving live CMS content from a CDN, see the [multi-channel content delivery documentation](/data/docs/working-with-the-cms/content-delivery).


## How rate limits apply to Webflow APIs

Rate limits are applied on a per API key basis. This means that each API key is subject to its own rate limit, independent of any other keys you may be using. Whether you’re running multiple applications or integrating various services, each API key’s usage is tracked.

<br />


## Tracking your API usage

To help you monitor and manage your API usage, Webflow provides three key HTTP response headers with every API request:

| HTTP Response Header  | Description                                                               |
| :-------------------- | :------------------------------------------------------------------------ |
| X-RateLimit-Remaining | Contains the number of available requests remaining in the current minute |
| X-RateLimit-Limit     | Contains your current overall rate limit per minute                       |
| Retry-After           | Contains the time to wait before attempting new requests                  |

<br />

### Example Request

To illustrate how these headers work, here's an example using cURL to make a request to the Webflow Data API:

<CodeBlocks>
```curl cURL Request
curl --request GET \
    --url https://api.webflow.com/v2/token/authorized_by \
    --header 'accept: application/json' \
    --header 'authorization: Bearer YOUR_API_TOKEN'
```
</CodeBlocks>

<br />

### Example response headers

```
HTTP/1.1 200 OK
Date: Sat, 14 May 2022 09:00:00 GMT
Status: 200 OK
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
Retry-After: 60
```

<br />


## Exceeding rate limits

If your application exceeds the rate limit and encounters a `429 Too Many Requests` error, it’s important to handle retries. [The Webflow SDK](https://developers.webflow.com/data/reference/sdks) includes built-in exponential backoff, automatically adjusting the wait time between retries to minimize further errors. If you’re not using the SDK, it's recommended to implement your own retry logic that respects the `Retry-After` header to keep your application running.

<br />

### Example error

```json
{
    "message": "Too Many Requests",
    "code": "too_many_requests",
    "externalReference": null,
    "details": []
}
```

If you are seeing these errors, you should ensure your application is built to limit the rate of requests it's performing. It could, for example, be triggered by polling aggressively when waiting for resources to be created or making a large number of highly concurrent API calls.

<br />

### Optimizing API usage with webhooks

Frequent polling of the API can lead to rate limit issues, especially if your application is waiting for specific changes or updates. To mitigate this, Webflow offers [Webhooks](https://developers.webflow.com/data/docs/working-with-webhooks), which allow your application to receive real-time updates without the need for continuous API calls. [Implementing webhooks](https://developers.webflow.com/data/docs/working-with-webhooks) is a highly effective way to stay within your rate limits while still maintaining responsive applications.



---
title: Error handling
slug: reference/error-handling
hidden: false
---

The Webflow Data API uses standard HTTP status codes to indicate the success or failure of an API request. In general, codes in the `2xx` range indicate success, codes in the `4xx` range indicate a client-side error (e.g., a problem with the request), and codes in the `5xx` range indicate a server-side error.

## Error response body

When an error occurs, the API will return a JSON object with the following properties:

| Property | Type | Description |
| :--- | :--- | :--- |
| `code` | `string` | A machine-readable error code. |
| `message`| `string` | A human-readable error message. |
| `externalReference` | `string` | A link to more information about the error. |
| `details` | `array` | An array of additional error details. |

**Example error response body:**
```json
{
  "message": "Requested resource not found: The site cannot be found",
  "code": "resource_not_found",
  "externalReference": null,
  "details": []
}
```

## Handling rate limit errors

If your application exceeds the rate limit, you will receive a `429 Too Many Requests` error. When this happens, you should check the `Retry-After` header to see how long you should wait before making another request.

The [official Webflow SDKs](/data/reference/sdks) have built-in exponential backoff, which will automatically handle these retries for you. If you are not using one of our SDKs, you should implement your own retry logic.

For more information, see the [rate limits documentation](/data/reference/rate-limits).

## Common error codes

| Status Code | Code | Description |
| :--- | :--- | :--- |
| `400` | `bad_request` | The request was malformed. |
| `401` | `not_authorized` | The request lacks valid authentication credentials. |
| `403` | `forbidden` | The authenticated user does not have permissions to perform the requested action. |
| `404` | `resource_not_found` | The requested resource was not found. |
| `409` | `conflict` | The request could not be completed due to a conflict with the current state of the resource. |
| `429` | `too_many_requests` | The user has sent too many requests in a given amount of time. |
| `500` | `internal_error` | An unexpected error occurred on our end. |

---
title: Versioning
slug: data/reference/versioning
hidden: false
---
API v2 versioning is **explicit** as part of the API endpoint URI.

## Versions

API v2 is composed of two version namespaces:

| Namespace | Description                                          |
| :-------- | :--------------------------------------------------- |
| `/beta/`  | A monolithic version that houses all new APIs.       |
| `/v2/`    | A subset of v2 APIs that are considered "production" |

Auth tokens will be compatible across the v2 beta and v2 production namespaces

## URL

An example of an API request to v2 beta:

<CodeBlocks>
```curl cURL
curl --request GET \
     --url https://api.webflow.com/beta/token/authorized_by \
     --header 'accept: application/json'
```
</CodeBlocks>

## Webflow SDK

Currently, the Webflow SDK doesn't support requests to beta endpoints. For access to these endpoints, please refer to the Webflow API documentation and make requests directly through an HTTP client or your preferred API tool.


---
title: Migrating to v2
slug: data/docs/migrating-to-v2
hidden: false
'og:title': Webflow API Docs - Migrating to API v2
---
<Warning title="Webflow API v1 is deprecated.">

 For more details about this deprecation, timeline, and its implications, please refer to the [Webflow API v1 deprecation notice](/data/docs/webflow-v1-api-deprecation-notice).
</Warning>

## v2 Apps and APIs

Webflow's new v2 Apps and APIs enhance security, efficiency, and developer experience. With [scopes](/data/reference/scopes) and an expanded [resources](/data/reference/structure-1), both developers and users gain more control and clarity over their Webflow data. Follow the sections below to migrate from v1 Apps, site tokens, webhooks, or APIs.

## Migrating to API v2 for site owners
Did you receive a notification that your site may be using v1 APIs? Read the below section for instructions on how to transition to using v2 APIs by the deprecation date.

<Accordion title="Migrating to v2 site tokens, webhooks, and v2 Apps">
   <Tabs>
      <Tab title="Site Tokens">
         <Note>
            <b>Action Item:</b> Create a new v2 site token.
            <ul>
               <li><b>Site tokens with third-party integrations</b> - Reach out to the external integration provider for guidance on how to use the v2 API Site Token with their Webflow integrations</li>
               <li><b>Site tokens for custom integrations</b> - Replace v1 Site Token with the new v2 Site Token and [update v1 API calls](/data/changelog/webflow-api-changed-endpoints) to [v2 APIs](/data/reference/token/authorized-by)</li>
            </ul>
         </Note>

         ### Third-party integrations
         If you're using v1 site tokens with third-party tools — for example, integrations or chrome extensions that have asked for your API Key — you'll want to replace them with a new [v2 API site token](/data/reference/site-token) to persist any critical workflows you have in place. These new tokens are more secure and can be used to call v2 Webflow APIs.

         To check for v1 API Site Tokens, go to <b>Apps & Integrations -> API access</b> in your site settings. v1 tokens will show a warning about using the legacy API.

         <Frame background="subtle">
            <img src="file:d27b44a8-e09b-44b9-9054-387a485fa0ae" alt="v1 Site Token warning" />
         </Frame>

         First, check to see if the token is still needed by seeing if the "Last used" date is recent. If it is, you'll want to generate a new v2 API token. To persist existing, active workflows, [generate a new v2 API token](https://help.webflow.com/hc/en-us/articles/33961356296723-Intro-to-Webflow-s-APIs) and update your integration to use the new token.

         When generating a new API token, you'll have the option to select the needed [permissions](/data/reference/scopes) for the token. If you're not sure which permissions to set, reach out to the integration provider for guidance.

         ### Third-party tools that don't support v2 site tokens
         If your third-party tool doesn't accept v2 site tokens, contact their support team for guidance. You can also email developers@webflow.com to let us know which tool you're using so we can help ensure they add v2 support.

         ## Custom integrations

         If your team built and/or owns a custom integration that uses a v1 site token, in addition to switching to use a v2 API site token, you'll need to update the requests your integration is making from v1 APIs to v2 APIs.

         You can find more information about the changes from v1 to v2 in the [changelog](/data/changelog/webflow-api-changed-endpoints), and explore the new [v2 API structure and resources in the v2 API reference docs](/data/reference/structure-1).

         For more details on site tokens and how to use them for calling Webflow APIs, see the [site token guide](/data/reference/site-token).
      </Tab>
      <Tab title="Webhooks">
         <Note>
         <b>Action Item:</b>
         - **Create a new API V2 webhook** in the **Apps & Integrations -> Webhooks** section of your site settings
         - **Delete the old v1 Webhook** once you've confirmed your workflows still persist as expected
         </Note>

         If you're using v1 webhooks to recieve notifications about your site, you'll need to create new v2 webhooks to persist existing data workflows.

         To check for v1 webhooks, navigate to the <b>Apps & Integrations -> Webhooks</b> section of your site's settings to see a list of webhooks. Each webhook will show the event type, as well as the API version of the webhook.

         <Frame background="subtle">
            <img src="file:54fd27fa-1fa0-4eec-84f5-bb5fa6618074" alt="v1 webhook" />
         </Frame>

         To replace any active v1 webhooks, create an equivalent v2 webhook with the same even type to match functionality. You can do this by clicking the "Add webhook" button to create a v2 Webhook for the relevant event. Once you have equivalent v2 webhooks established alongside your v1 webhooks and tested that automations work with the new webhook, feel free to remove the v1 Webhook.

         ### Webhooks created by third-party Webflow Apps
         If a third-party Webflow App created the v1 webhook (i.e. Zapier),  migrate your workflow by using the newest version of the Webflow App.
      </Tab>
      <Tab title="Apps">
         <Note>
         <b>Action Item:</b> Re-authorize any v1 Apps with their updated v2 App in the [App Marketplace](https://webflow.com/apps).

         One way to note if an App is a v2 App if it lists Permissions on the App Listing (see screenshot below)
         <img src='file:97237577-a4b0-47a6-982d-080ee39b521c' alt="v2 App Listing with permissions" />
         </Note>

         If you're using Webflow Apps to help manage your Webflow data, make sure you're using the v2 version of the App if it exists.

         To check if you're using the latest version of the App, navigate to the <b>Apps & Integrations -> Connected Apps</b> section of your site and/or workspace settings. There, you'll see a list of all the Apps connected to your site and/or workspace. Each App will have a "View details" button. Clicking this will show you more information about the App, including the permissions it requests.

         <Tabs>
            <Tab title="v1 App indicator">
               v1 authorizations do not list the permissions the App requires on install. See below for an example of a v1 App authorization
               <img src='file:03f4d24c-5b05-4a1c-9770-f22c9896f2ff' alt="v1 App indicator example" />
            </Tab>
            <Tab title="v2 App indicator">
               In contrast, v2 App authorizations list the permissions the App requires on install. See below for an example of a v2 App authorization
               <img src="file:7c99b77c-db26-48e8-9006-3ba83294cc7e" alt="v2 App indicator example" />
            </Tab>
         </Tabs>

         ### Third-party Apps that don't support v2
         If you cannot find a v2 version of the App in the marketplace, please reach out to that App developer for more support on how to migrate existing workflows to use v2 APIs. Additionally, you can search in the App Marketplace for other v2 Apps that are compatible with your use case.
      </Tab>
   </Tabs>
</Accordion>

## Migrating to API v2 for App developers
Are you a developer using v1 APIs and need guidance on implementing v2 APIs for a new v2 App? Read this section below.

<Accordion title="Building v2 Apps">
We know migrating APIs can be challenging, but we're excited to help you upgrade to v2. The new version brings powerful capabilities that will let you build even better experiences for your users. Let's walk through how to migrate your existing v1 App:

<Steps>

### Register a new v2 App
   To use the v2 API, you'll need to create a brand new App with a new Client ID and secret. Additionally, you'll need to add permissions to your App to align with the [v2 API scopes](/data/reference/scopes). Please use this [App registraton guide to help create a new v2 App.](/data/docs/register-an-app)

### Update your App's OAuth flow
   Update your App's [OAuth flow](/data/reference/oauth-app) to use your new client ID and secret. Additionally, you will need to use the new [v2 API scopes](/data/reference/scopes) in your App's Authorization URI. For a full guide on how to update your App's OAuth flow, see the [OAuth flow guide](/data/reference/oauth-app).

### Update your App to use v2 APIs
   Update the logic in your App to make requests to the new [v2 resources and endpoints.](/data/reference/structure-1) Additionally, you can use the updated [JavaScript or Python SDKs](/data/reference/sdks) to make requests to the new v2 APIs.

### Submit your v2 App to the Marketplace
   Once you've updated your App to use scopes and v2 endpoints, you can share these updates by [submitting your new App to the Marketplace](https://developers.webflow.com/submit). Before submitting your App, please refer to Webflow's [guidance on Marketplace submissions and listings](/apps/docs/marketplace-guidelines) to make sure your App is compliant with Webflow's guidelines.

   <Note title="Avoiding disruption">
   To avoid disrupting any existing workflows for users on the v1 App version, you'll want to support both v1 and v2 Apps in production until you've migrated all users to the v2 App.
   </Note>


### Instruct users to migrate to your v2 App
   Webflow won't automatically migrate or notify users of your new v2 App. Instead, **users must create a new authorization for the v2 App**. It's recommended that you reach out to existing v1 App users with migration instructions on how to safely migrate their existing workflows to your approved, v2 Marketplace App. This could include:
      - Notifications in your v1 App that tell users about the upcoming deprecation and the need to migrate to the v2 App
      - A link to your new v2 App Authorization page and/or a link to your v2 App in the Webflow App Marketplace
      - A migration tool in your v1 App that automatically replaces existing v1 integrations with v2 integrations
      - A blog post or migration guide on how to migrate from v1 to v2
</Steps>

## v2 Apps and API changes

-  **v1 Apps are now named ‘Data Clients’**
   The v2 equivalent of v1 Apps are named [‘Data Clients’](/data/docs/data-clients). This is a change from the previous naming convention of ‘Apps’. Here's a quick rundown of what that means:
   - Data Clients access site data, spanning from the [CMS](/data/reference/cms/collection-items/staged-items/get-item) to [Ecommerce](/data/reference/ecommerce/settings/get-settings), as well as new resources like [assets](/data/reference/assets/assets/list), [pages](/data/reference/pages/list), and [custom code](/data/reference/custom-code). For an overview of the v2 API resources, see the [v2 API reference docs](/data/reference/structure-1).
   - Data Clients leverage Webflow's REST APIs to fetch this information.
   - For use cases that require real-time updates, Data Clients can send event notifications through [webhooks.](/data/reference/webhooks/list)

-  **Data API changes**
   The v2 API includes significant changes to Webflow's REST APIs, including updates, additions, and removals to key endpoints. For a thorough overview of what's changed, visit the changelog of:
   - [Changed Endpoints](/data/changelog/webflow-api-changed-endpoints)
   - [New Endpoints](/data/changelog/webflow-api-new-endpoints)
   - [Removed Endpoints](/data/changelog/webflow-api-removed-endpoints)

   To explore the current v2 API offerings, check out the [reference docs](https://developers.webflow.com/data/reference/token/authorized-by).

- **Introduction of scopes**
   The new version of the API incorporates [scopes](/data/reference/scopes) into the authorization process. Scopes specify an App's permissions, ensuring that users have clearer control over the data an App can access and act upon. It's a step towards more transparency and security. For a granular approach to permissions, make sure you're aligned with [Webflow's guidance on scopes.](/data/reference/scopes)

- **Updates to the JavaScript SDK**
   We're currently revamping the JavaScript SDK to provide robust support for the v2 APIs. In the meantime, if you're using the [JavaScript SDK](https://github.com/webflow/js-webflow-api), please:

   - Update to the most recent SDK version.
   - Use TypeScript/Intellisense in your code editor to guide API usage after instantiating a client. You may also find SDK snippets in the API reference docs examples. Here's a brief example on usage:

   <CodeBlocks>
   ```javascript JavaScript
      import { WebflowClient } from "webflow-api";

      const webflow = new WebflowClient({ accessToken });

      // Env. variables
      // in format of string, e.g.: "639656400769508adc12fe42"
      const siteId = process.env.SITE_ID;
      const customDomainId1 = process.env.CUSTOM_DOMAIN_ID_1;
      const customDomainId2 = process.env.CUSTOM_DOMAIN_ID_2;

      // Sites

      // List Sites
      const sites = await webflow.sites.list();

      // Get Site
      const site = await webflow.sites.get(siteId);

      // Get Custom Domains
      const customDomains = await webflow.sites.getCustomDomain(siteId);

      // Publish Site
      const site = await webflow.sites.publish(siteId, {
         customDomains: [customDomainId1, customDomainId2],
         publishToWebflowSubdomain: true,
      });
   ```
   </CodeBlocks>
</Accordion>


---
title: Webflow v1 API Deprecation Notice
slug: data/docs/webflow-v1-api-deprecation-notice
hidden: false
---
As part of Webflow's ongoing commitment to enhancing your developer experience, we're transitioning from the v1 APIs to the more advanced v2 APIs. This document outlines the deprecation timeline for v1 Apps, APIs, and Webhooks, and provides guidance on managing a smooth transition to v2. We recommend starting your migration as soon as possible to ensure uninterrupted service for your integrations.

## Key changes

1. **API Site Tokens:**
   - **Webflow has discontinued creation of v1 API Site Tokens.**<br/>
      For new integrations or updates, developers should use v2 API Site Tokens.

      <Note>
         API Tokens are distinct from [auth tokens](/data/reference/oauth-app) generated via Webflow Apps.
      </Note>

   - See the [v2 migration guide](/data/docs/migrating-to-v2#migrating-to-v2-site-tokens-webhooks-and-v2-apps) for more on migrating to v2 API Site Tokens

2. **Webhooks:**
   - **Webflow will no longer support manual creation of v1 Webhooks.**<br/>
      To continue receiving real-time notifications via webhooks, [register v2 webhooks](/data/docs/working-with-webhooks).
   - See the [v2 migration guide](/data/docs/migrating-to-v2#migrating-to-v2-site-tokens-webhooks-and-v2-apps) for more on migrating to v2 Webhooks

3. **App Registrations:**
   - **Webflow no longer accepts App submissions for new v1 Apps.**<br/>
      To create new applications or update your existing v1 Apps to v2, use the [v2 App registration process](/data/docs/migrating-to-v2#building-v2-apps).
   - **Integrations/automations created by v1 Apps will stop receiving maintenance and support after <span style="color: #146EF5; font-weight: 600;">March 31, 2025</span>.**<br/>
   See the [v2 migration guide](/data/docs/migrating-to-v2#migrating-to-v2-site-tokens-webhooks-and-v2-apps) for more on migrating to v2 Apps

## Important dates

- **<span style="color: #146EF5; font-weight: 600;">August 1, 2024</span>**: De-listing of Marketplace Apps that are still reliant on v1 (non-scoped) authorization.
- **<span style="color: #146EF5; font-weight: 600;">March 31, 2025</span>**: Deprecation date for the v1 API. While the v1 API may continue to function after this date, it will no longer receive maintenance, updates, or support. We recommend completing your migration to v2 before this date to ensure uninterrupted service.

Transitioning to the v2 API ensures that developers have access to the latest features, enhanced security, and improved performance. We understand the challenges that come with such transitions, and are committed to supporting the Webflow developer community every step of the way.

For any queries or support migrating to v2 APIs, Apps, and Webhooks, reach out to developers@webflow.com. For other support matters, please reach out to Webflow's [support team](https://support.webflow.com/).



---
title: SDKs
slug: data/reference/sdks
hidden: false
---
Our SDKs provide comprehensive tools and libraries tailored for efficient and easy integration with our suite of APIs, enabling developers to quickly build and scale applications across various platforms.

<div class="card-grid">  <div class="card">    <div class="card-header">      <svg xmlns="http://www.w3.org/2000/svg" aria-label="JavaScript" role="img" viewBox="0 0 512 512" width="64px"        height="64px">        <rect width="512" height="512" rx="15%" fill="#f7df1e" />        <path          d="M324 370c10 17 24 29 47 29c20 0 33-10 33 -24c0-16 -13 -22 -35 -32l-12-5c-35-15 -58 -33 -58 -72c0-36 27 -64 70 -64c31 0 53 11 68 39l-37 24c-8-15 -17 -21 -31 -21c-14 0-23 9 -23 21c0 14 9 20 30 29l12 5c41 18 64 35 64 76c0 43-34 67 -80 67c-45 0-74 -21 -88 -49zm-170 4c8 13 14 25 31 25c16 0 26-6 26 -30V203h48v164c0 50-29 72 -72 72c-39 0-61 -20 -72 -44z" />      </svg>      <h3>JavaScript</h3>    </div>    <div class="card-body">      <p>Leverage the Webflow JavaScript SDK for intuitive integration within Node.js environments.</p><br />      <a href="https://www.npmjs.com/package/webflow-api"><button class="button cc-secondary">View          SDK</button></a>    </div>  </div>  <div class="card">    <div class="card-header">      <svg width="70px" height="70px" viewBox="0 0 70 70" aria-label="Python" fill="none" xmlns="http://www.w3.org/2000/svg">        <path          d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454c.771 0 1.395.624 1.395 1.395s-.624 1.395-1.395 1.395a1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"          fill="url(#a)" />        <path          d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395c0-.77.624-1.394 1.395-1.394s1.395.623 1.395 1.394c0 .772-.624 1.395-1.395 1.395z"          fill="url(#b)" />        <defs>          <linearGradient id="a" x1="19.075" y1="18.782" x2="34.898" y2="34.658" gradientUnits="userSpaceOnUse">            <stop stop-color="#387EB8" />            <stop offset="1" stop-color="#366994" />          </linearGradient>          <linearGradient id="b" x1="28.809" y1="28.882" x2="45.803" y2="45.163" gradientUnits="userSpaceOnUse">            <stop stop-color="#FFE052" />            <stop offset="1" stop-color="#FFC331" />          </linearGradient>        </defs>      </svg>      <h3>Python</h3>    </div>    <div class="card-body">      <p>Use the Webflow Python SDK to seamlessly incorporate Webflow functionalities into your Python projects.</p>      <br />      <a href="https://pypi.org/project/webflow/"><button class="button cc-secondary">View          SDK</button></a>    </div>  </div></div>


<br />



# Get Authorization User Info

GET https://api.webflow.com/v2/token/authorized_by

Information about the Authorized User

Required Scope | `authorized_user:read`


Reference: https://developers.webflow.com/data/reference/token/authorized-by

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Authorization User Info
  version: endpoint_token.authorized-by
paths:
  /token/authorized_by:
    get:
      operationId: authorized-by
      summary: Get Authorization User Info
      description: |
        Information about the Authorized User

        Required Scope | `authorized_user:read`
      tags:
        - - subpackage_token
      parameters:
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/token_authorized-by_Response_200'
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '403':
          description: Provided access token is valid, but is missing the required scopes.
          content: {}
components:
  schemas:
    token_authorized-by_Response_200:
      type: object
      properties:
        id:
          type: string
          format: objectid
        email:
          type: string
          format: email
        firstName:
          type: string
        lastName:
          type: string

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.token.authorized_by()

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.token.authorizedBy();

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/token/authorized_by"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/token/authorized_by")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/token/authorized_by")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/token/authorized_by', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/token/authorized_by");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/token/authorized_by")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Get Authorization Info

GET https://api.webflow.com/v2/token/introspect

Information about the authorization token

<Note>Access to this endpoint requires a bearer token from a [Data Client App](/data/docs/getting-started-data-clients).</Note>


Reference: https://developers.webflow.com/data/reference/token/introspect

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Authorization Info
  version: endpoint_token.introspect
paths:
  /token/introspect:
    get:
      operationId: introspect
      summary: Get Authorization Info
      description: >
        Information about the authorization token


        <Note>Access to this endpoint requires a bearer token from a [Data
        Client App](/data/docs/getting-started-data-clients).</Note>
      tags:
        - - subpackage_token
      parameters:
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/token_introspect_Response_200'
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
components:
  schemas:
    TokenIntrospectGetResponsesContentApplicationJsonSchemaAuthorizationAuthorizedTo:
      type: object
      properties:
        siteIds:
          type: array
          items:
            description: Any type
        workspaceIds:
          type: array
          items:
            description: Any type
        userIds:
          type: array
          items:
            description: Any type
    TokenIntrospectGetResponsesContentApplicationJsonSchemaAuthorization:
      type: object
      properties:
        id:
          type: string
          format: objectid
        createdOn:
          type: string
          format: date-time
        lastUsed:
          type: string
          format: date-time
        grantType:
          type: string
        rateLimit:
          type: integer
        scope:
          type: string
        authorizedTo:
          $ref: >-
            #/components/schemas/TokenIntrospectGetResponsesContentApplicationJsonSchemaAuthorizationAuthorizedTo
    TokenIntrospectGetResponsesContentApplicationJsonSchemaApplication:
      type: object
      properties:
        id:
          type: string
          format: objectid
        description:
          type: string
        homepage:
          type: string
          format: uri
        displayName:
          type: string
    token_introspect_Response_200:
      type: object
      properties:
        authorization:
          $ref: >-
            #/components/schemas/TokenIntrospectGetResponsesContentApplicationJsonSchemaAuthorization
        application:
          $ref: >-
            #/components/schemas/TokenIntrospectGetResponsesContentApplicationJsonSchemaApplication

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.token.introspect()

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.token.introspect();

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/token/introspect"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/token/introspect")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/token/introspect")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/token/introspect', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/token/introspect");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/token/introspect")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# List Sites

GET https://api.webflow.com/v2/sites

List of all sites the provided access token is able to access.

Required scope | `sites:read`


Reference: https://developers.webflow.com/data/reference/sites/list

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: List Sites
  version: endpoint_sites.list
paths:
  /sites:
    get:
      operationId: list
      summary: List Sites
      description: |
        List of all sites the provided access token is able to access.

        Required scope | `sites:read`
      tags:
        - - subpackage_sites
      parameters:
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/sites_list_Response_200'
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
components:
  schemas:
    SitesGetResponsesContentApplicationJsonSchemaSitesItemsCustomDomainsItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        url:
          type: string
        lastPublished:
          type:
            - string
            - 'null'
          format: date-time
      required:
        - id
    SitesGetResponsesContentApplicationJsonSchemaSitesItemsLocalesPrimary:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        enabled:
          type: boolean
        displayName:
          type: string
        displayImageId:
          type:
            - string
            - 'null'
        redirect:
          type: boolean
        subdirectory:
          type: string
        tag:
          type: string
    SitesGetResponsesContentApplicationJsonSchemaSitesItemsLocalesSecondaryItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        enabled:
          type: boolean
        displayName:
          type: string
        displayImageId:
          type:
            - string
            - 'null'
        redirect:
          type: boolean
        subdirectory:
          type: string
        tag:
          type: string
    SitesGetResponsesContentApplicationJsonSchemaSitesItemsLocales:
      type: object
      properties:
        primary:
          $ref: >-
            #/components/schemas/SitesGetResponsesContentApplicationJsonSchemaSitesItemsLocalesPrimary
        secondary:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesGetResponsesContentApplicationJsonSchemaSitesItemsLocalesSecondaryItems
    SitesGetResponsesContentApplicationJsonSchemaSitesItemsDataCollectionType:
      type: string
      enum:
        - value: always
        - value: optOut
        - value: disabled
    SitesGetResponsesContentApplicationJsonSchemaSitesItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        workspaceId:
          type: string
          format: objectid
        createdOn:
          type: string
          format: date-time
        displayName:
          type: string
        shortName:
          type: string
        lastPublished:
          type: string
          format: date-time
        lastUpdated:
          type: string
          format: date-time
        previewUrl:
          type: string
          format: uri
        timeZone:
          type: string
        parentFolderId:
          type:
            - string
            - 'null'
          format: objectid
        customDomains:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesGetResponsesContentApplicationJsonSchemaSitesItemsCustomDomainsItems
        locales:
          $ref: >-
            #/components/schemas/SitesGetResponsesContentApplicationJsonSchemaSitesItemsLocales
        dataCollectionEnabled:
          type: boolean
        dataCollectionType:
          $ref: >-
            #/components/schemas/SitesGetResponsesContentApplicationJsonSchemaSitesItemsDataCollectionType
      required:
        - id
    sites_list_Response_200:
      type: object
      properties:
        sites:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesGetResponsesContentApplicationJsonSchemaSitesItems

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.sites.list()

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.sites.list();

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/sites")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/sites', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Get Site

GET https://api.webflow.com/v2/sites/{site_id}

Get details of a site.

Required scope | `sites:read`


Reference: https://developers.webflow.com/data/reference/sites/get

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Site
  version: endpoint_sites.get
paths:
  /sites/{site_id}:
    get:
      operationId: get
      summary: Get Site
      description: |
        Get details of a site.

        Required scope | `sites:read`
      tags:
        - - subpackage_sites
      parameters:
        - name: site_id
          in: path
          description: Unique identifier for a Site
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/sites_get_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    SitesSiteIdGetResponsesContentApplicationJsonSchemaCustomDomainsItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        url:
          type: string
        lastPublished:
          type:
            - string
            - 'null'
          format: date-time
      required:
        - id
    SitesSiteIdGetResponsesContentApplicationJsonSchemaLocalesPrimary:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        enabled:
          type: boolean
        displayName:
          type: string
        displayImageId:
          type:
            - string
            - 'null'
        redirect:
          type: boolean
        subdirectory:
          type: string
        tag:
          type: string
    SitesSiteIdGetResponsesContentApplicationJsonSchemaLocalesSecondaryItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        enabled:
          type: boolean
        displayName:
          type: string
        displayImageId:
          type:
            - string
            - 'null'
        redirect:
          type: boolean
        subdirectory:
          type: string
        tag:
          type: string
    SitesSiteIdGetResponsesContentApplicationJsonSchemaLocales:
      type: object
      properties:
        primary:
          $ref: >-
            #/components/schemas/SitesSiteIdGetResponsesContentApplicationJsonSchemaLocalesPrimary
        secondary:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdGetResponsesContentApplicationJsonSchemaLocalesSecondaryItems
    SitesSiteIdGetResponsesContentApplicationJsonSchemaDataCollectionType:
      type: string
      enum:
        - value: always
        - value: optOut
        - value: disabled
    sites_get_Response_200:
      type: object
      properties:
        id:
          type: string
          format: objectid
        workspaceId:
          type: string
          format: objectid
        createdOn:
          type: string
          format: date-time
        displayName:
          type: string
        shortName:
          type: string
        lastPublished:
          type: string
          format: date-time
        lastUpdated:
          type: string
          format: date-time
        previewUrl:
          type: string
          format: uri
        timeZone:
          type: string
        parentFolderId:
          type:
            - string
            - 'null'
          format: objectid
        customDomains:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdGetResponsesContentApplicationJsonSchemaCustomDomainsItems
        locales:
          $ref: >-
            #/components/schemas/SitesSiteIdGetResponsesContentApplicationJsonSchemaLocales
        dataCollectionEnabled:
          type: boolean
        dataCollectionType:
          $ref: >-
            #/components/schemas/SitesSiteIdGetResponsesContentApplicationJsonSchemaDataCollectionType
      required:
        - id

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.sites.get(
    site_id="580e63e98c9a982ac9b8b741",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.sites.get("580e63e98c9a982ac9b8b741");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Get Custom Domains

GET https://api.webflow.com/v2/sites/{site_id}/custom_domains

Get a list of all custom domains related to site.

Required scope | `sites:read`


Reference: https://developers.webflow.com/data/reference/sites/get-custom-domain

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Custom Domains
  version: endpoint_sites.get-custom-domain
paths:
  /sites/{site_id}/custom_domains:
    get:
      operationId: get-custom-domain
      summary: Get Custom Domains
      description: |
        Get a list of all custom domains related to site.

        Required scope | `sites:read`
      tags:
        - - subpackage_sites
      parameters:
        - name: site_id
          in: path
          description: Unique identifier for a Site
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/sites_get-custom-domain_Response_200'
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '403':
          description: Forbidden
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    SitesSiteIdCustomDomainsGetResponsesContentApplicationJsonSchemaCustomDomainsItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        url:
          type: string
        lastPublished:
          type:
            - string
            - 'null'
          format: date-time
      required:
        - id
    sites_get-custom-domain_Response_200:
      type: object
      properties:
        customDomains:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdCustomDomainsGetResponsesContentApplicationJsonSchemaCustomDomainsItems

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.sites.get_custom_domain(
    site_id="580e63e98c9a982ac9b8b741",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.sites.getCustomDomain("580e63e98c9a982ac9b8b741");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/custom_domains"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/custom_domains")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/custom_domains")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/custom_domains', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/custom_domains");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/custom_domains")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Publish Site

POST https://api.webflow.com/v2/sites/{site_id}/publish
Content-Type: application/json

Publishes a site to one or more more domains.

To publish to a specific custom domain, use the domain IDs from the [Get Custom Domains](/data/reference/sites/get-custom-domain) endpoint.

<Note title="Rate limit: 1 publish per minute">This endpoint has a specific rate limit of one successful publish queue per minute.</Note>

Required scope | `sites:write`


Reference: https://developers.webflow.com/data/reference/sites/publish

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Publish Site
  version: endpoint_sites.publish
paths:
  /sites/{site_id}/publish:
    post:
      operationId: publish
      summary: Publish Site
      description: >
        Publishes a site to one or more more domains.


        To publish to a specific custom domain, use the domain IDs from the [Get
        Custom Domains](/data/reference/sites/get-custom-domain) endpoint.


        <Note title="Rate limit: 1 publish per minute">This endpoint has a
        specific rate limit of one successful publish queue per minute.</Note>


        Required scope | `sites:write`
      tags:
        - - subpackage_sites
      parameters:
        - name: site_id
          in: path
          description: Unique identifier for a Site
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '202':
          description: Request accepted
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/sites_publish_Response_202'
        '400':
          description: Bad Request
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '403':
          description: Forbidden
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                customDomains:
                  type: array
                  items:
                    type: string
                publishToWebflowSubdomain:
                  type: boolean
components:
  schemas:
    SitesSiteIdPublishPostResponsesContentApplicationJsonSchemaCustomDomainsItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        url:
          type: string
        lastPublished:
          type:
            - string
            - 'null'
          format: date-time
      required:
        - id
    sites_publish_Response_202:
      type: object
      properties:
        customDomains:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdPublishPostResponsesContentApplicationJsonSchemaCustomDomainsItems
        publishToWebflowSubdomain:
          type: boolean

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.sites.publish(
    site_id="580e63e98c9a982ac9b8b741",
    custom_domains=["660c6449dd97ebc7346ac629", "660c6449dd97ebc7346ac62f"],
    publish_to_webflow_subdomain=False,
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.sites.publish("580e63e98c9a982ac9b8b741", {
    customDomains: ["660c6449dd97ebc7346ac629", "660c6449dd97ebc7346ac62f"],
    publishToWebflowSubdomain: false
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/publish"

	payload := strings.NewReader("{\n  \"customDomains\": [\n    \"660c6449dd97ebc7346ac629\",\n    \"660c6449dd97ebc7346ac62f\"\n  ],\n  \"publishToWebflowSubdomain\": false\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/publish")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"customDomains\": [\n    \"660c6449dd97ebc7346ac629\",\n    \"660c6449dd97ebc7346ac62f\"\n  ],\n  \"publishToWebflowSubdomain\": false\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/publish")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"customDomains\": [\n    \"660c6449dd97ebc7346ac629\",\n    \"660c6449dd97ebc7346ac62f\"\n  ],\n  \"publishToWebflowSubdomain\": false\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/publish', [
  'body' => '{
  "customDomains": [
    "660c6449dd97ebc7346ac629",
    "660c6449dd97ebc7346ac62f"
  ],
  "publishToWebflowSubdomain": false
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/publish");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"customDomains\": [\n    \"660c6449dd97ebc7346ac629\",\n    \"660c6449dd97ebc7346ac62f\"\n  ],\n  \"publishToWebflowSubdomain\": false\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "customDomains": ["660c6449dd97ebc7346ac629", "660c6449dd97ebc7346ac62f"],
  "publishToWebflowSubdomain": false
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/publish")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# List Pages

GET https://api.webflow.com/v2/sites/{site_id}/pages

List of all pages for a site.

Required scope | `pages:read`


Reference: https://developers.webflow.com/data/reference/pages-and-components/pages/list

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: List Pages
  version: endpoint_pages.list
paths:
  /sites/{site_id}/pages:
    get:
      operationId: list
      summary: List Pages
      description: |
        List of all pages for a site.

        Required scope | `pages:read`
      tags:
        - - subpackage_pages
      parameters:
        - name: site_id
          in: path
          description: Unique identifier for a Site
          required: true
          schema:
            type: string
            format: objectid
        - name: localeId
          in: query
          description: >
            Unique identifier for a specific Locale.


            [Lear more about
            localization.](/data/v2.0.0/docs/working-with-localization)
          required: false
          schema:
            type: string
        - name: limit
          in: query
          description: 'Maximum number of records to be returned (max limit: 100)'
          required: false
          schema:
            type: number
            format: double
        - name: offset
          in: query
          description: >-
            Offset used for pagination if the results have more than limit
            records
          required: false
          schema:
            type: number
            format: double
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/pages_list_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    SitesSiteIdPagesGetResponsesContentApplicationJsonSchemaPagesItemsSeo:
      type: object
      properties:
        title:
          type: string
        description:
          type: string
    SitesSiteIdPagesGetResponsesContentApplicationJsonSchemaPagesItemsOpenGraph:
      type: object
      properties:
        title:
          type: string
        titleCopied:
          type: boolean
        description:
          type: string
        descriptionCopied:
          type: boolean
    SitesSiteIdPagesGetResponsesContentApplicationJsonSchemaPagesItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        siteId:
          type: string
          format: objectid
        title:
          type: string
        slug:
          type: string
        parentId:
          type: string
          format: objectid
        collectionId:
          type: string
          format: objectid
        createdOn:
          type: string
          format: date-time
        lastUpdated:
          type: string
          format: date-time
        archived:
          type: boolean
        draft:
          type: boolean
        canBranch:
          type: boolean
        isBranch:
          type: boolean
        branchId:
          type:
            - string
            - 'null'
          format: objectid
        seo:
          $ref: >-
            #/components/schemas/SitesSiteIdPagesGetResponsesContentApplicationJsonSchemaPagesItemsSeo
        openGraph:
          $ref: >-
            #/components/schemas/SitesSiteIdPagesGetResponsesContentApplicationJsonSchemaPagesItemsOpenGraph
        localeId:
          type:
            - string
            - 'null'
          format: objectid
        publishedPath:
          type: string
      required:
        - id
    SitesSiteIdPagesGetResponsesContentApplicationJsonSchemaPagination:
      type: object
      properties:
        limit:
          type: number
          format: double
        offset:
          type: number
          format: double
        total:
          type: number
          format: double
      required:
        - limit
        - offset
        - total
    pages_list_Response_200:
      type: object
      properties:
        pages:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdPagesGetResponsesContentApplicationJsonSchemaPagesItems
        pagination:
          $ref: >-
            #/components/schemas/SitesSiteIdPagesGetResponsesContentApplicationJsonSchemaPagination

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.pages.list(
    site_id="580e63e98c9a982ac9b8b741",
    locale_id="65427cf400e02b306eaa04a0",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.pages.list("580e63e98c9a982ac9b8b741", {
    localeId: "65427cf400e02b306eaa04a0"
});

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/pages?localeId=65427cf400e02b306eaa04a0&limit=100&offset=0"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/pages?localeId=65427cf400e02b306eaa04a0&limit=100&offset=0")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/pages?localeId=65427cf400e02b306eaa04a0&limit=100&offset=0")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/pages?localeId=65427cf400e02b306eaa04a0&limit=100&offset=0', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/pages?localeId=65427cf400e02b306eaa04a0&limit=100&offset=0");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/pages?localeId=65427cf400e02b306eaa04a0&limit=100&offset=0")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Get Page Metadata

GET https://api.webflow.com/v2/pages/{page_id}

Get metadata information for a single page.

Required scope | `pages:read`


Reference: https://developers.webflow.com/data/reference/pages-and-components/pages/get-metadata

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Page Metadata
  version: endpoint_pages.get-metadata
paths:
  /pages/{page_id}:
    get:
      operationId: get-metadata
      summary: Get Page Metadata
      description: |
        Get metadata information for a single page.

        Required scope | `pages:read`
      tags:
        - - subpackage_pages
      parameters:
        - name: page_id
          in: path
          description: Unique identifier for a Page
          required: true
          schema:
            type: string
            format: objectid
        - name: localeId
          in: query
          description: >
            Unique identifier for a specific Locale.


            [Lear more about
            localization.](/data/v2.0.0/docs/working-with-localization)
          required: false
          schema:
            type: string
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/pages_get-metadata_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    PagesPageIdGetResponsesContentApplicationJsonSchemaSeo:
      type: object
      properties:
        title:
          type: string
        description:
          type: string
    PagesPageIdGetResponsesContentApplicationJsonSchemaOpenGraph:
      type: object
      properties:
        title:
          type: string
        titleCopied:
          type: boolean
        description:
          type: string
        descriptionCopied:
          type: boolean
    pages_get-metadata_Response_200:
      type: object
      properties:
        id:
          type: string
          format: objectid
        siteId:
          type: string
          format: objectid
        title:
          type: string
        slug:
          type: string
        parentId:
          type: string
          format: objectid
        collectionId:
          type: string
          format: objectid
        createdOn:
          type: string
          format: date-time
        lastUpdated:
          type: string
          format: date-time
        archived:
          type: boolean
        draft:
          type: boolean
        canBranch:
          type: boolean
        isBranch:
          type: boolean
        branchId:
          type:
            - string
            - 'null'
          format: objectid
        seo:
          $ref: >-
            #/components/schemas/PagesPageIdGetResponsesContentApplicationJsonSchemaSeo
        openGraph:
          $ref: >-
            #/components/schemas/PagesPageIdGetResponsesContentApplicationJsonSchemaOpenGraph
        localeId:
          type:
            - string
            - 'null'
          format: objectid
        publishedPath:
          type: string
      required:
        - id

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.pages.get_metadata(
    page_id="63c720f9347c2139b248e552",
    locale_id="65427cf400e02b306eaa04a0",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.pages.getMetadata("63c720f9347c2139b248e552", {
    localeId: "65427cf400e02b306eaa04a0"
});

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/pages/63c720f9347c2139b248e552?localeId=65427cf400e02b306eaa04a0"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/pages/63c720f9347c2139b248e552?localeId=65427cf400e02b306eaa04a0")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/pages/63c720f9347c2139b248e552?localeId=65427cf400e02b306eaa04a0")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/pages/63c720f9347c2139b248e552?localeId=65427cf400e02b306eaa04a0', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/pages/63c720f9347c2139b248e552?localeId=65427cf400e02b306eaa04a0");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/pages/63c720f9347c2139b248e552?localeId=65427cf400e02b306eaa04a0")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Update Page Metadata

PUT https://api.webflow.com/v2/pages/{page_id}
Content-Type: application/json

Update Page-level metadata, including SEO and Open Graph fields.

Required scope | `pages:write`


Reference: https://developers.webflow.com/data/reference/pages-and-components/pages/update-page-settings

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Update Page Metadata
  version: endpoint_pages.update-page-settings
paths:
  /pages/{page_id}:
    put:
      operationId: update-page-settings
      summary: Update Page Metadata
      description: |
        Update Page-level metadata, including SEO and Open Graph fields.

        Required scope | `pages:write`
      tags:
        - - subpackage_pages
      parameters:
        - name: page_id
          in: path
          description: Unique identifier for a Page
          required: true
          schema:
            type: string
            format: objectid
        - name: localeId
          in: query
          description: >
            Unique identifier for a specific Locale.


            [Lear more about
            localization.](/data/v2.0.0/docs/working-with-localization)
          required: false
          schema:
            type: string
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pages_update-page-settings_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                title:
                  type: string
                slug:
                  type: string
                seo:
                  $ref: >-
                    #/components/schemas/PagesPageIdPutRequestBodyContentApplicationJsonSchemaSeo
                openGraph:
                  $ref: >-
                    #/components/schemas/PagesPageIdPutRequestBodyContentApplicationJsonSchemaOpenGraph
components:
  schemas:
    PagesPageIdPutRequestBodyContentApplicationJsonSchemaSeo:
      type: object
      properties:
        title:
          type: string
        description:
          type: string
    PagesPageIdPutRequestBodyContentApplicationJsonSchemaOpenGraph:
      type: object
      properties:
        title:
          type: string
        titleCopied:
          type: boolean
        description:
          type: string
        descriptionCopied:
          type: boolean
    PagesPageIdPutResponsesContentApplicationJsonSchemaSeo:
      type: object
      properties:
        title:
          type: string
        description:
          type: string
    PagesPageIdPutResponsesContentApplicationJsonSchemaOpenGraph:
      type: object
      properties:
        title:
          type: string
        titleCopied:
          type: boolean
        description:
          type: string
        descriptionCopied:
          type: boolean
    Pages_update-page-settings_Response_200:
      type: object
      properties:
        id:
          type: string
          format: objectid
        siteId:
          type: string
          format: objectid
        title:
          type: string
        slug:
          type: string
        parentId:
          type: string
          format: objectid
        collectionId:
          type: string
          format: objectid
        createdOn:
          type: string
          format: date-time
        lastUpdated:
          type: string
          format: date-time
        archived:
          type: boolean
        draft:
          type: boolean
        canBranch:
          type: boolean
        isBranch:
          type: boolean
        branchId:
          type:
            - string
            - 'null'
          format: objectid
        seo:
          $ref: >-
            #/components/schemas/PagesPageIdPutResponsesContentApplicationJsonSchemaSeo
        openGraph:
          $ref: >-
            #/components/schemas/PagesPageIdPutResponsesContentApplicationJsonSchemaOpenGraph
        localeId:
          type:
            - string
            - 'null'
          format: objectid
        publishedPath:
          type: string
      required:
        - id

```

## SDK Code Examples

```python
from webflow import Webflow
from webflow.resources.pages import (
    PageMetadataWriteOpenGraph,
    PageMetadataWriteSeo,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.pages.update_page_settings(
    page_id="63c720f9347c2139b248e552",
    locale_id="65427cf400e02b306eaa04a0",
    title="Guide to the Galaxy",
    slug="guide-to-the-galaxy",
    seo=PageMetadataWriteSeo(
        title="The Ultimate Hitchhiker's Guide to the Galaxy",
        description="Everything you need to know about the galaxy, from avoiding Vogon poetry to the importance of towels.",
    ),
    open_graph=PageMetadataWriteOpenGraph(
        title="Explore the Cosmos with The Ultimate Guide",
        title_copied=False,
        description="Dive deep into the mysteries of the universe with your guide to everything galactic.",
        description_copied=False,
    ),
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.pages.updatePageSettings("63c720f9347c2139b248e552", {
    localeId: "65427cf400e02b306eaa04a0",
    title: "Guide to the Galaxy",
    slug: "guide-to-the-galaxy",
    seo: {
        title: "The Ultimate Hitchhiker's Guide to the Galaxy",
        description: "Everything you need to know about the galaxy, from avoiding Vogon poetry to the importance of towels."
    },
    openGraph: {
        title: "Explore the Cosmos with The Ultimate Guide",
        titleCopied: false,
        description: "Dive deep into the mysteries of the universe with your guide to everything galactic.",
        descriptionCopied: false
    }
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/pages/63c720f9347c2139b248e552?localeId=65427cf400e02b306eaa04a0"

	payload := strings.NewReader("{\n  \"title\": \"Guide to the Galaxy\",\n  \"slug\": \"guide-to-the-galaxy\",\n  \"seo\": {\n    \"title\": \"The Ultimate Hitchhiker's Guide to the Galaxy\",\n    \"description\": \"Everything you need to know about the galaxy, from avoiding Vogon poetry to the importance of towels.\"\n  },\n  \"openGraph\": {\n    \"title\": \"Explore the Cosmos with The Ultimate Guide\",\n    \"titleCopied\": false,\n    \"description\": \"Dive deep into the mysteries of the universe with your guide to everything galactic.\",\n    \"descriptionCopied\": false\n  }\n}")

	req, _ := http.NewRequest("PUT", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/pages/63c720f9347c2139b248e552?localeId=65427cf400e02b306eaa04a0")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Put.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"title\": \"Guide to the Galaxy\",\n  \"slug\": \"guide-to-the-galaxy\",\n  \"seo\": {\n    \"title\": \"The Ultimate Hitchhiker's Guide to the Galaxy\",\n    \"description\": \"Everything you need to know about the galaxy, from avoiding Vogon poetry to the importance of towels.\"\n  },\n  \"openGraph\": {\n    \"title\": \"Explore the Cosmos with The Ultimate Guide\",\n    \"titleCopied\": false,\n    \"description\": \"Dive deep into the mysteries of the universe with your guide to everything galactic.\",\n    \"descriptionCopied\": false\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.put("https://api.webflow.com/v2/pages/63c720f9347c2139b248e552?localeId=65427cf400e02b306eaa04a0")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"title\": \"Guide to the Galaxy\",\n  \"slug\": \"guide-to-the-galaxy\",\n  \"seo\": {\n    \"title\": \"The Ultimate Hitchhiker's Guide to the Galaxy\",\n    \"description\": \"Everything you need to know about the galaxy, from avoiding Vogon poetry to the importance of towels.\"\n  },\n  \"openGraph\": {\n    \"title\": \"Explore the Cosmos with The Ultimate Guide\",\n    \"titleCopied\": false,\n    \"description\": \"Dive deep into the mysteries of the universe with your guide to everything galactic.\",\n    \"descriptionCopied\": false\n  }\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PUT', 'https://api.webflow.com/v2/pages/63c720f9347c2139b248e552?localeId=65427cf400e02b306eaa04a0', [
  'body' => '{
  "title": "Guide to the Galaxy",
  "slug": "guide-to-the-galaxy",
  "seo": {
    "title": "The Ultimate Hitchhiker\'s Guide to the Galaxy",
    "description": "Everything you need to know about the galaxy, from avoiding Vogon poetry to the importance of towels."
  },
  "openGraph": {
    "title": "Explore the Cosmos with The Ultimate Guide",
    "titleCopied": false,
    "description": "Dive deep into the mysteries of the universe with your guide to everything galactic.",
    "descriptionCopied": false
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/pages/63c720f9347c2139b248e552?localeId=65427cf400e02b306eaa04a0");
var request = new RestRequest(Method.PUT);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"title\": \"Guide to the Galaxy\",\n  \"slug\": \"guide-to-the-galaxy\",\n  \"seo\": {\n    \"title\": \"The Ultimate Hitchhiker's Guide to the Galaxy\",\n    \"description\": \"Everything you need to know about the galaxy, from avoiding Vogon poetry to the importance of towels.\"\n  },\n  \"openGraph\": {\n    \"title\": \"Explore the Cosmos with The Ultimate Guide\",\n    \"titleCopied\": false,\n    \"description\": \"Dive deep into the mysteries of the universe with your guide to everything galactic.\",\n    \"descriptionCopied\": false\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "title": "Guide to the Galaxy",
  "slug": "guide-to-the-galaxy",
  "seo": [
    "title": "The Ultimate Hitchhiker's Guide to the Galaxy",
    "description": "Everything you need to know about the galaxy, from avoiding Vogon poetry to the importance of towels."
  ],
  "openGraph": [
    "title": "Explore the Cosmos with The Ultimate Guide",
    "titleCopied": false,
    "description": "Dive deep into the mysteries of the universe with your guide to everything galactic.",
    "descriptionCopied": false
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/pages/63c720f9347c2139b248e552?localeId=65427cf400e02b306eaa04a0")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PUT"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Get Page Content

GET https://api.webflow.com/v2/pages/{page_id}/dom

Get text and component instance content from a static page.

<Badge intent="info">Localization</Badge>

Required scope | `pages:read`


Reference: https://developers.webflow.com/data/reference/pages-and-components/pages/get-content

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Page Content
  version: endpoint_pages.get-content
paths:
  /pages/{page_id}/dom:
    get:
      operationId: get-content
      summary: Get Page Content
      description: |
        Get text and component instance content from a static page.

        <Badge intent="info">Localization</Badge>

        Required scope | `pages:read`
      tags:
        - - subpackage_pages
      parameters:
        - name: page_id
          in: path
          description: Unique identifier for a Page
          required: true
          schema:
            type: string
            format: objectid
        - name: localeId
          in: query
          description: >
            Unique identifier for a specific Locale.


            [Lear more about
            localization.](/data/v2.0.0/docs/working-with-localization)
          required: false
          schema:
            type: string
        - name: limit
          in: query
          description: 'Maximum number of records to be returned (max limit: 100)'
          required: false
          schema:
            type: number
            format: double
        - name: offset
          in: query
          description: >-
            Offset used for pagination if the results have more than limit
            records
          required: false
          schema:
            type: number
            format: double
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/pages_get-content_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '403':
          description: Forbidden
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf0Type:
      type: string
      enum:
        - value: text
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf0Text:
      type: object
      properties:
        html:
          type:
            - string
            - 'null'
        text:
          type:
            - string
            - 'null'
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems0:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf0Type
        text:
          $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf0Text
        attributes:
          type: object
          additionalProperties:
            type: string
      required:
        - id
        - type
        - text
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf1Type:
      type: string
      enum:
        - value: image
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf1Image:
      type: object
      properties:
        alt:
          type:
            - string
            - 'null'
        assetId:
          type: string
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems1:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf1Type
        image:
          $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf1Image
        attributes:
          type: object
          additionalProperties:
            type: string
      required:
        - id
        - type
        - image
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2Type:
      type: string
      enum:
        - value: component-instance
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2PropertyOverridesItemsType:
      type: string
      enum:
        - value: Plain Text
        - value: Rich Text
        - value: Alt Text
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2PropertyOverridesItemsText:
      type: object
      properties:
        html:
          type:
            - string
            - 'null'
        text:
          type:
            - string
            - 'null'
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2PropertyOverridesItems:
      type: object
      properties:
        propertyId:
          type: string
        type:
          $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2PropertyOverridesItemsType
        label:
          type: string
        text:
          $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2PropertyOverridesItemsText
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems2:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2Type
        componentId:
          type: string
        propertyOverrides:
          type: array
          items:
            $ref: >-
              #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2PropertyOverridesItems
      required:
        - id
        - type
        - componentId
        - propertyOverrides
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf3Type:
      type: string
      enum:
        - value: text-input
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems3:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf3Type
        placeholder:
          type: string
        attributes:
          type: object
          additionalProperties:
            type: string
      required:
        - id
        - type
        - placeholder
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf4Type:
      type: string
      enum:
        - value: select
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf4ChoicesItems:
      type: object
      properties:
        value:
          type: string
        text:
          type: string
      required:
        - value
        - text
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems4:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf4Type
        choices:
          type: array
          items:
            $ref: >-
              #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf4ChoicesItems
        attributes:
          type: object
          additionalProperties:
            type: string
      required:
        - id
        - type
        - choices
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf5Type:
      type: string
      enum:
        - value: submit-button
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems5:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf5Type
        value:
          type: string
        waitingText:
          type: string
        attributes:
          type: object
          additionalProperties:
            type: string
      required:
        - id
        - type
        - value
        - waitingText
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf6Type:
      type: string
      enum:
        - value: search-button
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems6:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf6Type
        value:
          type: string
        attributes:
          type: object
          additionalProperties:
            type: string
      required:
        - id
        - type
        - value
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems:
      oneOf:
        - $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems0
        - $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems1
        - $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems2
        - $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems3
        - $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems4
        - $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems5
        - $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems6
    PagesPageIdDomGetResponsesContentApplicationJsonSchemaPagination:
      type: object
      properties:
        limit:
          type: number
          format: double
        offset:
          type: number
          format: double
        total:
          type: number
          format: double
      required:
        - limit
        - offset
        - total
    pages_get-content_Response_200:
      type: object
      properties:
        pageId:
          type: string
        branchId:
          type:
            - string
            - 'null'
          format: objectid
        nodes:
          type: array
          items:
            $ref: >-
              #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaNodesItems
        pagination:
          $ref: >-
            #/components/schemas/PagesPageIdDomGetResponsesContentApplicationJsonSchemaPagination
        lastUpdated:
          type:
            - string
            - 'null'
          format: date-time

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.pages.get_content(
    page_id="63c720f9347c2139b248e552",
    locale_id="65427cf400e02b306eaa04a0",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.pages.getContent("63c720f9347c2139b248e552", {
    localeId: "65427cf400e02b306eaa04a0"
});

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom?localeId=65427cf400e02b306eaa04a0&limit=100&offset=0"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom?localeId=65427cf400e02b306eaa04a0&limit=100&offset=0")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom?localeId=65427cf400e02b306eaa04a0&limit=100&offset=0")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom?localeId=65427cf400e02b306eaa04a0&limit=100&offset=0', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom?localeId=65427cf400e02b306eaa04a0&limit=100&offset=0");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom?localeId=65427cf400e02b306eaa04a0&limit=100&offset=0")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Update Page Content

POST https://api.webflow.com/v2/pages/{page_id}/dom
Content-Type: application/json

This endpoint updates content on a static page in **secondary locales**. It supports updating up to 1000 nodes in a single request.

Before making updates:
1. Use the [get page content](/data/reference/pages-and-components/pages/get-content) endpoint to identify available content nodes and their types.
2. If the page has component instances, retrieve the component's properties that you'll override using the [get component properties](/data/reference/pages-and-components/components/get-properties) endpoint.
3. DOM elements may include a `data-w-id` attribute. This attribute is used by Webflow to maintain custom attributes and links across locales. Always include the original `data-w-id` value in your update requests to ensure consistent behavior across all locales.

<Note>
  This endpoint is specifically for localized pages. Ensure that the specified `localeId` is a valid **secondary locale** for the site otherwise the request will fail.
</Note>

Required scope | `pages:write`


Reference: https://developers.webflow.com/data/reference/pages-and-components/pages/update-static-content

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Update Page Content
  version: endpoint_pages.update-static-content
paths:
  /pages/{page_id}/dom:
    post:
      operationId: update-static-content
      summary: Update Page Content
      description: >
        This endpoint updates content on a static page in **secondary locales**.
        It supports updating up to 1000 nodes in a single request.


        Before making updates:

        1. Use the [get page
        content](/data/reference/pages-and-components/pages/get-content)
        endpoint to identify available content nodes and their types.

        2. If the page has component instances, retrieve the component's
        properties that you'll override using the [get component
        properties](/data/reference/pages-and-components/components/get-properties)
        endpoint.

        3. DOM elements may include a `data-w-id` attribute. This attribute is
        used by Webflow to maintain custom attributes and links across locales.
        Always include the original `data-w-id` value in your update requests to
        ensure consistent behavior across all locales.


        <Note>
          This endpoint is specifically for localized pages. Ensure that the specified `localeId` is a valid **secondary locale** for the site otherwise the request will fail.
        </Note>


        Required scope | `pages:write`
      tags:
        - - subpackage_pages
      parameters:
        - name: page_id
          in: path
          description: Unique identifier for a Page
          required: true
          schema:
            type: string
            format: objectid
        - name: localeId
          in: query
          description: The locale identifier.
          required: true
          schema:
            type: string
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pages_update-static-content_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '403':
          description: Forbidden
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                nodes:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems
              required:
                - nodes
components:
  schemas:
    PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems0:
      type: object
      properties:
        nodeId:
          type: string
        text:
          type: string
      required:
        - nodeId
        - text
    PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItemsOneOf1PropertyOverridesItems:
      type: object
      properties:
        propertyId:
          type: string
        text:
          type: string
      required:
        - propertyId
        - text
    PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems1:
      type: object
      properties:
        nodeId:
          type: string
        propertyOverrides:
          type: array
          items:
            $ref: >-
              #/components/schemas/PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItemsOneOf1PropertyOverridesItems
      required:
        - nodeId
        - propertyOverrides
    PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItemsOneOf2ChoicesItems:
      type: object
      properties:
        value:
          type: string
        text:
          type: string
      required:
        - value
        - text
    PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems2:
      type: object
      properties:
        nodeId:
          type: string
        choices:
          type: array
          items:
            $ref: >-
              #/components/schemas/PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItemsOneOf2ChoicesItems
      required:
        - nodeId
        - choices
    PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems3:
      type: object
      properties:
        nodeId:
          type: string
        placeholder:
          type: string
      required:
        - nodeId
        - placeholder
    PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems4:
      type: object
      properties:
        nodeId:
          type: string
        value:
          type: string
        waitingText:
          type: string
      required:
        - nodeId
    PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems5:
      type: object
      properties:
        nodeId:
          type: string
        value:
          type: string
      required:
        - nodeId
        - value
    PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems:
      oneOf:
        - $ref: >-
            #/components/schemas/PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems0
        - $ref: >-
            #/components/schemas/PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems1
        - $ref: >-
            #/components/schemas/PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems2
        - $ref: >-
            #/components/schemas/PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems3
        - $ref: >-
            #/components/schemas/PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems4
        - $ref: >-
            #/components/schemas/PagesPageIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems5
    Pages_update-static-content_Response_200:
      type: object
      properties:
        errors:
          type: array
          items:
            type: string
      required:
        - errors

```

## SDK Code Examples

```python
from webflow import (
    ComponentInstance,
    ComponentInstanceNodePropertyOverridesWritePropertyOverridesItem,
    Select,
    SelectNodeWriteChoicesItem,
    SubmitButton,
    TextInput,
    TextNode,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.pages.update_static_content(
    page_id="63c720f9347c2139b248e552",
    locale_id="localeId",
    nodes=[
        TextNode(
            node_id="a245c12d-995b-55ee-5ec7-aa36a6cad623",
            text="<h1>The Hitchhiker's Guide to the Galaxy</h1>",
        ),
        TextNode(
            node_id="a245c12d-995b-55ee-5ec7-aa36a6cad627",
            text="<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>",
        ),
        Select(
            node_id="a245c12d-995b-55ee-5ec7-aa36a6cad635",
            choices=[
                SelectNodeWriteChoicesItem(
                    value="choice-1",
                    text="First choice",
                ),
                SelectNodeWriteChoicesItem(
                    value="choice-2",
                    text="Second choice",
                ),
            ],
        ),
        TextInput(
            node_id="a245c12d-995b-55ee-5ec7-aa36a6cad642",
            placeholder="Enter something here...",
        ),
        SubmitButton(
            node_id="a245c12d-995b-55ee-5ec7-aa36a6cad671",
            value="Submit",
            waiting_text="Submitting...",
        ),
        ComponentInstance(
            node_id="a245c12d-995b-55ee-5ec7-aa36a6cad629",
            property_overrides=[
                ComponentInstanceNodePropertyOverridesWritePropertyOverridesItem(
                    property_id="7dd14c08-2e96-8d3d-2b19-b5c03642a0f0",
                    text="<div><h1>Time is an <em>illusion</em></h1></div>",
                ),
                ComponentInstanceNodePropertyOverridesWritePropertyOverridesItem(
                    property_id="7dd14c08-2e96-8d3d-2b19-b5c03642a0f1",
                    text="Life, the Universe and Everything",
                ),
            ],
        ),
    ],
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.pages.updateStaticContent("63c720f9347c2139b248e552", {
    localeId: "localeId",
    nodes: [{
            nodeId: "a245c12d-995b-55ee-5ec7-aa36a6cad623",
            text: "<h1>The Hitchhiker's Guide to the Galaxy</h1>"
        }, {
            nodeId: "a245c12d-995b-55ee-5ec7-aa36a6cad627",
            text: "<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>"
        }, {
            nodeId: "a245c12d-995b-55ee-5ec7-aa36a6cad635",
            choices: [{
                    value: "choice-1",
                    text: "First choice"
                }, {
                    value: "choice-2",
                    text: "Second choice"
                }]
        }, {
            nodeId: "a245c12d-995b-55ee-5ec7-aa36a6cad642",
            placeholder: "Enter something here..."
        }, {
            nodeId: "a245c12d-995b-55ee-5ec7-aa36a6cad671",
            value: "Submit",
            waitingText: "Submitting..."
        }, {
            nodeId: "a245c12d-995b-55ee-5ec7-aa36a6cad629",
            propertyOverrides: [{
                    propertyId: "7dd14c08-2e96-8d3d-2b19-b5c03642a0f0",
                    text: "<div><h1>Time is an <em>illusion</em></h1></div>"
                }, {
                    propertyId: "7dd14c08-2e96-8d3d-2b19-b5c03642a0f1",
                    text: "Life, the Universe and Everything"
                }]
        }]
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom?localeId=localeId"

	payload := strings.NewReader("{\n  \"nodes\": [\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad623\",\n      \"text\": \"<h1>The Hitchhiker's Guide to the Galaxy</h1>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad627\",\n      \"text\": \"<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad635\",\n      \"choices\": [\n        {\n          \"value\": \"choice-1\",\n          \"text\": \"First choice\"\n        },\n        {\n          \"value\": \"choice-2\",\n          \"text\": \"Second choice\"\n        }\n      ]\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad642\",\n      \"placeholder\": \"Enter something here...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad671\",\n      \"value\": \"Submit\",\n      \"waitingText\": \"Submitting...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad629\",\n      \"propertyOverrides\": [\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f0\",\n          \"text\": \"<div><h1>Time is an <em>illusion</em></h1></div>\"\n        },\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f1\",\n          \"text\": \"Life, the Universe and Everything\"\n        }\n      ]\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom?localeId=localeId")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"nodes\": [\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad623\",\n      \"text\": \"<h1>The Hitchhiker's Guide to the Galaxy</h1>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad627\",\n      \"text\": \"<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad635\",\n      \"choices\": [\n        {\n          \"value\": \"choice-1\",\n          \"text\": \"First choice\"\n        },\n        {\n          \"value\": \"choice-2\",\n          \"text\": \"Second choice\"\n        }\n      ]\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad642\",\n      \"placeholder\": \"Enter something here...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad671\",\n      \"value\": \"Submit\",\n      \"waitingText\": \"Submitting...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad629\",\n      \"propertyOverrides\": [\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f0\",\n          \"text\": \"<div><h1>Time is an <em>illusion</em></h1></div>\"\n        },\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f1\",\n          \"text\": \"Life, the Universe and Everything\"\n        }\n      ]\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom?localeId=localeId")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"nodes\": [\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad623\",\n      \"text\": \"<h1>The Hitchhiker's Guide to the Galaxy</h1>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad627\",\n      \"text\": \"<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad635\",\n      \"choices\": [\n        {\n          \"value\": \"choice-1\",\n          \"text\": \"First choice\"\n        },\n        {\n          \"value\": \"choice-2\",\n          \"text\": \"Second choice\"\n        }\n      ]\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad642\",\n      \"placeholder\": \"Enter something here...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad671\",\n      \"value\": \"Submit\",\n      \"waitingText\": \"Submitting...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad629\",\n      \"propertyOverrides\": [\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f0\",\n          \"text\": \"<div><h1>Time is an <em>illusion</em></h1></div>\"\n        },\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f1\",\n          \"text\": \"Life, the Universe and Everything\"\n        }\n      ]\n    }\n  ]\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom?localeId=localeId', [
  'body' => '{
  "nodes": [
    {
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad623",
      "text": "<h1>The Hitchhiker\'s Guide to the Galaxy</h1>"
    },
    {
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad627",
      "text": "<div><h3>Don\'t Panic!</h3><p>Always know where your towel is.</p></div>"
    },
    {
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad635",
      "choices": [
        {
          "value": "choice-1",
          "text": "First choice"
        },
        {
          "value": "choice-2",
          "text": "Second choice"
        }
      ]
    },
    {
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad642",
      "placeholder": "Enter something here..."
    },
    {
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad671",
      "value": "Submit",
      "waitingText": "Submitting..."
    },
    {
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad629",
      "propertyOverrides": [
        {
          "propertyId": "7dd14c08-2e96-8d3d-2b19-b5c03642a0f0",
          "text": "<div><h1>Time is an <em>illusion</em></h1></div>"
        },
        {
          "propertyId": "7dd14c08-2e96-8d3d-2b19-b5c03642a0f1",
          "text": "Life, the Universe and Everything"
        }
      ]
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom?localeId=localeId");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"nodes\": [\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad623\",\n      \"text\": \"<h1>The Hitchhiker's Guide to the Galaxy</h1>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad627\",\n      \"text\": \"<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad635\",\n      \"choices\": [\n        {\n          \"value\": \"choice-1\",\n          \"text\": \"First choice\"\n        },\n        {\n          \"value\": \"choice-2\",\n          \"text\": \"Second choice\"\n        }\n      ]\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad642\",\n      \"placeholder\": \"Enter something here...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad671\",\n      \"value\": \"Submit\",\n      \"waitingText\": \"Submitting...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad629\",\n      \"propertyOverrides\": [\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f0\",\n          \"text\": \"<div><h1>Time is an <em>illusion</em></h1></div>\"\n        },\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f1\",\n          \"text\": \"Life, the Universe and Everything\"\n        }\n      ]\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["nodes": [
    [
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad623",
      "text": "<h1>The Hitchhiker's Guide to the Galaxy</h1>"
    ],
    [
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad627",
      "text": "<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>"
    ],
    [
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad635",
      "choices": [
        [
          "value": "choice-1",
          "text": "First choice"
        ],
        [
          "value": "choice-2",
          "text": "Second choice"
        ]
      ]
    ],
    [
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad642",
      "placeholder": "Enter something here..."
    ],
    [
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad671",
      "value": "Submit",
      "waitingText": "Submitting..."
    ],
    [
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad629",
      "propertyOverrides": [
        [
          "propertyId": "7dd14c08-2e96-8d3d-2b19-b5c03642a0f0",
          "text": "<div><h1>Time is an <em>illusion</em></h1></div>"
        ],
        [
          "propertyId": "7dd14c08-2e96-8d3d-2b19-b5c03642a0f1",
          "text": "Life, the Universe and Everything"
        ]
      ]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom?localeId=localeId")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# List Components

GET https://api.webflow.com/v2/sites/{site_id}/components

List of all components for a site.

Required scope | `components:read`


Reference: https://developers.webflow.com/data/reference/pages-and-components/components/list

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: List Components
  version: endpoint_components.list
paths:
  /sites/{site_id}/components:
    get:
      operationId: list
      summary: List Components
      description: |
        List of all components for a site.

        Required scope | `components:read`
      tags:
        - - subpackage_components
      parameters:
        - name: site_id
          in: path
          description: Unique identifier for a Site
          required: true
          schema:
            type: string
            format: objectid
        - name: branchId
          in: query
          description: Scope the operation to work on a specific branch.
          required: false
          schema:
            type: string
            format: objectid
        - name: limit
          in: query
          description: 'Maximum number of records to be returned (max limit: 100)'
          required: false
          schema:
            type: number
            format: double
        - name: offset
          in: query
          description: >-
            Offset used for pagination if the results have more than limit
            records
          required: false
          schema:
            type: number
            format: double
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/components_list_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    SitesSiteIdComponentsGetResponsesContentApplicationJsonSchemaComponentsItems:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        group:
          type: string
        description:
          type: string
        readonly:
          type: boolean
      required:
        - id
    SitesSiteIdComponentsGetResponsesContentApplicationJsonSchemaPagination:
      type: object
      properties:
        limit:
          type: number
          format: double
        offset:
          type: number
          format: double
        total:
          type: number
          format: double
      required:
        - limit
        - offset
        - total
    components_list_Response_200:
      type: object
      properties:
        components:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdComponentsGetResponsesContentApplicationJsonSchemaComponentsItems
        pagination:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsGetResponsesContentApplicationJsonSchemaPagination

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.components.list(
    site_id="580e63e98c9a982ac9b8b741",
    branch_id="68026fa68ef6dc744c75b833",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.components.list("580e63e98c9a982ac9b8b741", {
    branchId: "68026fa68ef6dc744c75b833"
});

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components?branchId=68026fa68ef6dc744c75b833&limit=100&offset=0"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components?branchId=68026fa68ef6dc744c75b833&limit=100&offset=0")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components?branchId=68026fa68ef6dc744c75b833&limit=100&offset=0")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components?branchId=68026fa68ef6dc744c75b833&limit=100&offset=0', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components?branchId=68026fa68ef6dc744c75b833&limit=100&offset=0");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components?branchId=68026fa68ef6dc744c75b833&limit=100&offset=0")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Get Component Content

GET https://api.webflow.com/v2/sites/{site_id}/components/{component_id}/dom

Get static content from a component definition. This includes text nodes, image nodes, select nodes, text input nodes, submit button nodes, and nested component instances.
To retrieve dynamic content set by component properties, use the [get component properties](/data/reference/pages-and-components/components/get-properties) endpoint.

<Note>If you do not provide a Locale ID in your request, the response will return any content that can be localized from the Primary locale.</Note>

Required scope | `components:read`


Reference: https://developers.webflow.com/data/reference/pages-and-components/components/get-content

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Component Content
  version: endpoint_components.get-content
paths:
  /sites/{site_id}/components/{component_id}/dom:
    get:
      operationId: get-content
      summary: Get Component Content
      description: >
        Get static content from a component definition. This includes text
        nodes, image nodes, select nodes, text input nodes, submit button nodes,
        and nested component instances.

        To retrieve dynamic content set by component properties, use the [get
        component
        properties](/data/reference/pages-and-components/components/get-properties)
        endpoint.


        <Note>If you do not provide a Locale ID in your request, the response
        will return any content that can be localized from the Primary
        locale.</Note>


        Required scope | `components:read`
      tags:
        - - subpackage_components
      parameters:
        - name: site_id
          in: path
          description: Unique identifier for a Site
          required: true
          schema:
            type: string
            format: objectid
        - name: component_id
          in: path
          description: Unique identifier for a Component
          required: true
          schema:
            type: string
        - name: localeId
          in: query
          description: >
            Unique identifier for a specific Locale.


            [Lear more about
            localization.](/data/v2.0.0/docs/working-with-localization)
          required: false
          schema:
            type: string
        - name: branchId
          in: query
          description: Scope the operation to work on a specific branch.
          required: false
          schema:
            type: string
            format: objectid
        - name: limit
          in: query
          description: 'Maximum number of records to be returned (max limit: 100)'
          required: false
          schema:
            type: number
            format: double
        - name: offset
          in: query
          description: >-
            Offset used for pagination if the results have more than limit
            records
          required: false
          schema:
            type: number
            format: double
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/components_get-content_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf0Type:
      type: string
      enum:
        - value: text
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf0Text:
      type: object
      properties:
        html:
          type:
            - string
            - 'null'
        text:
          type:
            - string
            - 'null'
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems0:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf0Type
        text:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf0Text
        attributes:
          type: object
          additionalProperties:
            type: string
      required:
        - id
        - type
        - text
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf1Type:
      type: string
      enum:
        - value: image
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf1Image:
      type: object
      properties:
        alt:
          type:
            - string
            - 'null'
        assetId:
          type: string
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems1:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf1Type
        image:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf1Image
        attributes:
          type: object
          additionalProperties:
            type: string
      required:
        - id
        - type
        - image
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2Type:
      type: string
      enum:
        - value: component-instance
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2PropertyOverridesItemsType:
      type: string
      enum:
        - value: Plain Text
        - value: Rich Text
        - value: Alt Text
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2PropertyOverridesItemsText:
      type: object
      properties:
        html:
          type:
            - string
            - 'null'
        text:
          type:
            - string
            - 'null'
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2PropertyOverridesItems:
      type: object
      properties:
        propertyId:
          type: string
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2PropertyOverridesItemsType
        label:
          type: string
        text:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2PropertyOverridesItemsText
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems2:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2Type
        componentId:
          type: string
        propertyOverrides:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf2PropertyOverridesItems
      required:
        - id
        - type
        - componentId
        - propertyOverrides
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf3Type:
      type: string
      enum:
        - value: text-input
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems3:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf3Type
        placeholder:
          type: string
        attributes:
          type: object
          additionalProperties:
            type: string
      required:
        - id
        - type
        - placeholder
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf4Type:
      type: string
      enum:
        - value: select
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf4ChoicesItems:
      type: object
      properties:
        value:
          type: string
        text:
          type: string
      required:
        - value
        - text
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems4:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf4Type
        choices:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf4ChoicesItems
        attributes:
          type: object
          additionalProperties:
            type: string
      required:
        - id
        - type
        - choices
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf5Type:
      type: string
      enum:
        - value: submit-button
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems5:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf5Type
        value:
          type: string
        waitingText:
          type: string
        attributes:
          type: object
          additionalProperties:
            type: string
      required:
        - id
        - type
        - value
        - waitingText
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf6Type:
      type: string
      enum:
        - value: search-button
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems6:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItemsOneOf6Type
        value:
          type: string
        attributes:
          type: object
          additionalProperties:
            type: string
      required:
        - id
        - type
        - value
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems:
      oneOf:
        - $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems0
        - $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems1
        - $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems2
        - $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems3
        - $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems4
        - $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems5
        - $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems6
    SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaPagination:
      type: object
      properties:
        limit:
          type: number
          format: double
        offset:
          type: number
          format: double
        total:
          type: number
          format: double
      required:
        - limit
        - offset
        - total
    components_get-content_Response_200:
      type: object
      properties:
        componentId:
          type: string
        nodes:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaNodesItems
        pagination:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomGetResponsesContentApplicationJsonSchemaPagination

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.components.get_content(
    site_id="580e63e98c9a982ac9b8b741",
    component_id="8505ba55-ef72-629e-f85c-33e4b703d48b",
    locale_id="65427cf400e02b306eaa04a0",
    branch_id="68026fa68ef6dc744c75b833",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.components.getContent("580e63e98c9a982ac9b8b741", "8505ba55-ef72-629e-f85c-33e4b703d48b", {
    localeId: "65427cf400e02b306eaa04a0",
    branchId: "68026fa68ef6dc744c75b833"
});

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/dom?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833&limit=100&offset=0"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/dom?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833&limit=100&offset=0")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/dom?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833&limit=100&offset=0")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/dom?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833&limit=100&offset=0', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/dom?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833&limit=100&offset=0");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/dom?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833&limit=100&offset=0")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Update Component Content

POST https://api.webflow.com/v2/sites/{site_id}/components/{component_id}/dom
Content-Type: application/json

This endpoint updates content within a component defintion for **secondary locales**. It supports updating up to 1000 nodes in a single request.

Before making updates:
1. Use the [get component content](/data/reference/pages-and-components/components/get-content) endpoint to identify available content nodes and their types.
2. If your component definition has a component instance nested within it, retrieve the nested component instance's properties that you'll override using the [get component properties](/data/reference/pages-and-components/components/get-properties) endpoint.
3. DOM elements may include a `data-w-id` attribute. This attribute is used by Webflow to maintain custom attributes and links across locales. Always include the original `data-w-id` value in your update requests to ensure consistent behavior across all locales.

<Note>
  This endpoint is specifically for localizing component definitions. Ensure that the specified `localeId` is a valid **secondary locale** for the site otherwise the request will fail.
</Note>

Required scope | `components:write`


Reference: https://developers.webflow.com/data/reference/pages-and-components/components/update-content

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Update Component Content
  version: endpoint_components.update-content
paths:
  /sites/{site_id}/components/{component_id}/dom:
    post:
      operationId: update-content
      summary: Update Component Content
      description: >
        This endpoint updates content within a component defintion for
        **secondary locales**. It supports updating up to 1000 nodes in a single
        request.


        Before making updates:

        1. Use the [get component
        content](/data/reference/pages-and-components/components/get-content)
        endpoint to identify available content nodes and their types.

        2. If your component definition has a component instance nested within
        it, retrieve the nested component instance's properties that you'll
        override using the [get component
        properties](/data/reference/pages-and-components/components/get-properties)
        endpoint.

        3. DOM elements may include a `data-w-id` attribute. This attribute is
        used by Webflow to maintain custom attributes and links across locales.
        Always include the original `data-w-id` value in your update requests to
        ensure consistent behavior across all locales.


        <Note>
          This endpoint is specifically for localizing component definitions. Ensure that the specified `localeId` is a valid **secondary locale** for the site otherwise the request will fail.
        </Note>


        Required scope | `components:write`
      tags:
        - - subpackage_components
      parameters:
        - name: site_id
          in: path
          description: Unique identifier for a Site
          required: true
          schema:
            type: string
            format: objectid
        - name: component_id
          in: path
          description: Unique identifier for a Component
          required: true
          schema:
            type: string
        - name: localeId
          in: query
          description: >
            Unique identifier for a specific Locale.


            [Lear more about
            localization.](/data/v2.0.0/docs/working-with-localization)
          required: false
          schema:
            type: string
        - name: branchId
          in: query
          description: Scope the operation to work on a specific branch.
          required: false
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/components_update-content_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '403':
          description: Forbidden
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                nodes:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems
              required:
                - nodes
components:
  schemas:
    SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems0:
      type: object
      properties:
        nodeId:
          type: string
        text:
          type: string
      required:
        - nodeId
        - text
    SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItemsOneOf1PropertyOverridesItems:
      type: object
      properties:
        propertyId:
          type: string
        text:
          type: string
      required:
        - propertyId
        - text
    SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems1:
      type: object
      properties:
        nodeId:
          type: string
        propertyOverrides:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItemsOneOf1PropertyOverridesItems
      required:
        - nodeId
        - propertyOverrides
    SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItemsOneOf2ChoicesItems:
      type: object
      properties:
        value:
          type: string
        text:
          type: string
      required:
        - value
        - text
    SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems2:
      type: object
      properties:
        nodeId:
          type: string
        choices:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItemsOneOf2ChoicesItems
      required:
        - nodeId
        - choices
    SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems3:
      type: object
      properties:
        nodeId:
          type: string
        placeholder:
          type: string
      required:
        - nodeId
        - placeholder
    SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems4:
      type: object
      properties:
        nodeId:
          type: string
        value:
          type: string
        waitingText:
          type: string
      required:
        - nodeId
    SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems5:
      type: object
      properties:
        nodeId:
          type: string
        value:
          type: string
      required:
        - nodeId
        - value
    SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems:
      oneOf:
        - $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems0
        - $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems1
        - $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems2
        - $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems3
        - $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems4
        - $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdDomPostRequestBodyContentApplicationJsonSchemaNodesItems5
    components_update-content_Response_200:
      type: object
      properties:
        errors:
          type: array
          items:
            type: string
      required:
        - errors

```

## SDK Code Examples

```python
from webflow import (
    ComponentInstance,
    ComponentInstanceNodePropertyOverridesWritePropertyOverridesItem,
    Select,
    SelectNodeWriteChoicesItem,
    SubmitButton,
    TextInput,
    TextNode,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.components.update_content(
    site_id="580e63e98c9a982ac9b8b741",
    component_id="8505ba55-ef72-629e-f85c-33e4b703d48b",
    locale_id="65427cf400e02b306eaa04a0",
    branch_id="68026fa68ef6dc744c75b833",
    nodes=[
        TextNode(
            node_id="a245c12d-995b-55ee-5ec7-aa36a6cad623",
            text="<h1>The Hitchhiker's Guide to the Galaxy</h1>",
        ),
        TextNode(
            node_id="a245c12d-995b-55ee-5ec7-aa36a6cad627",
            text="<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>",
        ),
        Select(
            node_id="a245c12d-995b-55ee-5ec7-aa36a6cad635",
            choices=[
                SelectNodeWriteChoicesItem(
                    value="choice-1",
                    text="First choice",
                ),
                SelectNodeWriteChoicesItem(
                    value="choice-2",
                    text="Second choice",
                ),
            ],
        ),
        TextInput(
            node_id="a245c12d-995b-55ee-5ec7-aa36a6cad642",
            placeholder="Enter something here...",
        ),
        SubmitButton(
            node_id="a245c12d-995b-55ee-5ec7-aa36a6cad671",
            value="Submit",
            waiting_text="Submitting...",
        ),
        ComponentInstance(
            node_id="a245c12d-995b-55ee-5ec7-aa36a6cad629",
            property_overrides=[
                ComponentInstanceNodePropertyOverridesWritePropertyOverridesItem(
                    property_id="7dd14c08-2e96-8d3d-2b19-b5c03642a0f0",
                    text="<div><h1>Time is an <em>illusion</em></h1></div>",
                ),
                ComponentInstanceNodePropertyOverridesWritePropertyOverridesItem(
                    property_id="7dd14c08-2e96-8d3d-2b19-b5c03642a0f1",
                    text="Life, the Universe and Everything",
                ),
            ],
        ),
    ],
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.components.updateContent("580e63e98c9a982ac9b8b741", "8505ba55-ef72-629e-f85c-33e4b703d48b", {
    localeId: "65427cf400e02b306eaa04a0",
    branchId: "68026fa68ef6dc744c75b833",
    nodes: [{
            nodeId: "a245c12d-995b-55ee-5ec7-aa36a6cad623",
            text: "<h1>The Hitchhiker's Guide to the Galaxy</h1>"
        }, {
            nodeId: "a245c12d-995b-55ee-5ec7-aa36a6cad627",
            text: "<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>"
        }, {
            nodeId: "a245c12d-995b-55ee-5ec7-aa36a6cad635",
            choices: [{
                    value: "choice-1",
                    text: "First choice"
                }, {
                    value: "choice-2",
                    text: "Second choice"
                }]
        }, {
            nodeId: "a245c12d-995b-55ee-5ec7-aa36a6cad642",
            placeholder: "Enter something here..."
        }, {
            nodeId: "a245c12d-995b-55ee-5ec7-aa36a6cad671",
            value: "Submit",
            waitingText: "Submitting..."
        }, {
            nodeId: "a245c12d-995b-55ee-5ec7-aa36a6cad629",
            propertyOverrides: [{
                    propertyId: "7dd14c08-2e96-8d3d-2b19-b5c03642a0f0",
                    text: "<div><h1>Time is an <em>illusion</em></h1></div>"
                }, {
                    propertyId: "7dd14c08-2e96-8d3d-2b19-b5c03642a0f1",
                    text: "Life, the Universe and Everything"
                }]
        }]
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/dom?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833"

	payload := strings.NewReader("{\n  \"nodes\": [\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad623\",\n      \"text\": \"<h1>The Hitchhiker's Guide to the Galaxy</h1>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad627\",\n      \"text\": \"<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad635\",\n      \"choices\": [\n        {\n          \"value\": \"choice-1\",\n          \"text\": \"First choice\"\n        },\n        {\n          \"value\": \"choice-2\",\n          \"text\": \"Second choice\"\n        }\n      ]\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad642\",\n      \"placeholder\": \"Enter something here...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad671\",\n      \"value\": \"Submit\",\n      \"waitingText\": \"Submitting...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad629\",\n      \"propertyOverrides\": [\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f0\",\n          \"text\": \"<div><h1>Time is an <em>illusion</em></h1></div>\"\n        },\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f1\",\n          \"text\": \"Life, the Universe and Everything\"\n        }\n      ]\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/dom?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"nodes\": [\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad623\",\n      \"text\": \"<h1>The Hitchhiker's Guide to the Galaxy</h1>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad627\",\n      \"text\": \"<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad635\",\n      \"choices\": [\n        {\n          \"value\": \"choice-1\",\n          \"text\": \"First choice\"\n        },\n        {\n          \"value\": \"choice-2\",\n          \"text\": \"Second choice\"\n        }\n      ]\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad642\",\n      \"placeholder\": \"Enter something here...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad671\",\n      \"value\": \"Submit\",\n      \"waitingText\": \"Submitting...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad629\",\n      \"propertyOverrides\": [\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f0\",\n          \"text\": \"<div><h1>Time is an <em>illusion</em></h1></div>\"\n        },\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f1\",\n          \"text\": \"Life, the Universe and Everything\"\n        }\n      ]\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/dom?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"nodes\": [\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad623\",\n      \"text\": \"<h1>The Hitchhiker's Guide to the Galaxy</h1>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad627\",\n      \"text\": \"<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad635\",\n      \"choices\": [\n        {\n          \"value\": \"choice-1\",\n          \"text\": \"First choice\"\n        },\n        {\n          \"value\": \"choice-2\",\n          \"text\": \"Second choice\"\n        }\n      ]\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad642\",\n      \"placeholder\": \"Enter something here...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad671\",\n      \"value\": \"Submit\",\n      \"waitingText\": \"Submitting...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad629\",\n      \"propertyOverrides\": [\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f0\",\n          \"text\": \"<div><h1>Time is an <em>illusion</em></h1></div>\"\n        },\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f1\",\n          \"text\": \"Life, the Universe and Everything\"\n        }\n      ]\n    }\n  ]\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/dom?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833', [
  'body' => '{
  "nodes": [
    {
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad623",
      "text": "<h1>The Hitchhiker\'s Guide to the Galaxy</h1>"
    },
    {
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad627",
      "text": "<div><h3>Don\'t Panic!</h3><p>Always know where your towel is.</p></div>"
    },
    {
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad635",
      "choices": [
        {
          "value": "choice-1",
          "text": "First choice"
        },
        {
          "value": "choice-2",
          "text": "Second choice"
        }
      ]
    },
    {
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad642",
      "placeholder": "Enter something here..."
    },
    {
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad671",
      "value": "Submit",
      "waitingText": "Submitting..."
    },
    {
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad629",
      "propertyOverrides": [
        {
          "propertyId": "7dd14c08-2e96-8d3d-2b19-b5c03642a0f0",
          "text": "<div><h1>Time is an <em>illusion</em></h1></div>"
        },
        {
          "propertyId": "7dd14c08-2e96-8d3d-2b19-b5c03642a0f1",
          "text": "Life, the Universe and Everything"
        }
      ]
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/dom?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"nodes\": [\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad623\",\n      \"text\": \"<h1>The Hitchhiker's Guide to the Galaxy</h1>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad627\",\n      \"text\": \"<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad635\",\n      \"choices\": [\n        {\n          \"value\": \"choice-1\",\n          \"text\": \"First choice\"\n        },\n        {\n          \"value\": \"choice-2\",\n          \"text\": \"Second choice\"\n        }\n      ]\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad642\",\n      \"placeholder\": \"Enter something here...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad671\",\n      \"value\": \"Submit\",\n      \"waitingText\": \"Submitting...\"\n    },\n    {\n      \"nodeId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad629\",\n      \"propertyOverrides\": [\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f0\",\n          \"text\": \"<div><h1>Time is an <em>illusion</em></h1></div>\"\n        },\n        {\n          \"propertyId\": \"7dd14c08-2e96-8d3d-2b19-b5c03642a0f1\",\n          \"text\": \"Life, the Universe and Everything\"\n        }\n      ]\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["nodes": [
    [
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad623",
      "text": "<h1>The Hitchhiker's Guide to the Galaxy</h1>"
    ],
    [
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad627",
      "text": "<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>"
    ],
    [
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad635",
      "choices": [
        [
          "value": "choice-1",
          "text": "First choice"
        ],
        [
          "value": "choice-2",
          "text": "Second choice"
        ]
      ]
    ],
    [
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad642",
      "placeholder": "Enter something here..."
    ],
    [
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad671",
      "value": "Submit",
      "waitingText": "Submitting..."
    ],
    [
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad629",
      "propertyOverrides": [
        [
          "propertyId": "7dd14c08-2e96-8d3d-2b19-b5c03642a0f0",
          "text": "<div><h1>Time is an <em>illusion</em></h1></div>"
        ],
        [
          "propertyId": "7dd14c08-2e96-8d3d-2b19-b5c03642a0f1",
          "text": "Life, the Universe and Everything"
        ]
      ]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/dom?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Get Component Properties

GET https://api.webflow.com/v2/sites/{site_id}/components/{component_id}/properties

Get the default property values of a component definition.

<Note>If you do not include a `localeId` in your request, the response will return any properties that can be localized from the Primary locale.</Note>

Required scope | `components:read`


Reference: https://developers.webflow.com/data/reference/pages-and-components/components/get-properties

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Component Properties
  version: endpoint_components.get-properties
paths:
  /sites/{site_id}/components/{component_id}/properties:
    get:
      operationId: get-properties
      summary: Get Component Properties
      description: >
        Get the default property values of a component definition.


        <Note>If you do not include a `localeId` in your request, the response
        will return any properties that can be localized from the Primary
        locale.</Note>


        Required scope | `components:read`
      tags:
        - - subpackage_components
      parameters:
        - name: site_id
          in: path
          description: Unique identifier for a Site
          required: true
          schema:
            type: string
            format: objectid
        - name: component_id
          in: path
          description: Unique identifier for a Component
          required: true
          schema:
            type: string
        - name: localeId
          in: query
          description: >
            Unique identifier for a specific Locale.


            [Lear more about
            localization.](/data/v2.0.0/docs/working-with-localization)
          required: false
          schema:
            type: string
        - name: branchId
          in: query
          description: Scope the operation to work on a specific branch.
          required: false
          schema:
            type: string
            format: objectid
        - name: limit
          in: query
          description: 'Maximum number of records to be returned (max limit: 100)'
          required: false
          schema:
            type: number
            format: double
        - name: offset
          in: query
          description: >-
            Offset used for pagination if the results have more than limit
            records
          required: false
          schema:
            type: number
            format: double
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/components_get-properties_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    SitesSiteIdComponentsComponentIdPropertiesGetResponsesContentApplicationJsonSchemaItemsType:
      type: string
      enum:
        - value: Plain Text
        - value: Rich Text
        - value: Alt Text
    SitesSiteIdComponentsComponentIdPropertiesGetResponsesContentApplicationJsonSchemaItemsText:
      type: object
      properties:
        html:
          type:
            - string
            - 'null'
        text:
          type:
            - string
            - 'null'
    SitesSiteIdComponentsComponentIdPropertiesGetResponsesContentApplicationJsonSchemaItems:
      type: object
      properties:
        propertyId:
          type: string
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdPropertiesGetResponsesContentApplicationJsonSchemaItemsType
        label:
          type: string
        text:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdPropertiesGetResponsesContentApplicationJsonSchemaItemsText
    SitesSiteIdComponentsComponentIdPropertiesGetResponsesContentApplicationJsonSchemaPagination:
      type: object
      properties:
        limit:
          type: number
          format: double
        offset:
          type: number
          format: double
        total:
          type: number
          format: double
      required:
        - limit
        - offset
        - total
    components_get-properties_Response_200:
      type: object
      properties:
        componentId:
          type: string
        properties:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdComponentsComponentIdPropertiesGetResponsesContentApplicationJsonSchemaItems
        pagination:
          $ref: >-
            #/components/schemas/SitesSiteIdComponentsComponentIdPropertiesGetResponsesContentApplicationJsonSchemaPagination

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.components.get_properties(
    site_id="580e63e98c9a982ac9b8b741",
    component_id="8505ba55-ef72-629e-f85c-33e4b703d48b",
    locale_id="65427cf400e02b306eaa04a0",
    branch_id="68026fa68ef6dc744c75b833",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.components.getProperties("580e63e98c9a982ac9b8b741", "8505ba55-ef72-629e-f85c-33e4b703d48b", {
    localeId: "65427cf400e02b306eaa04a0",
    branchId: "68026fa68ef6dc744c75b833"
});

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/properties?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833&limit=100&offset=0"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/properties?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833&limit=100&offset=0")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/properties?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833&limit=100&offset=0")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/properties?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833&limit=100&offset=0', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/properties?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833&limit=100&offset=0");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/properties?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833&limit=100&offset=0")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Update Component Properties

POST https://api.webflow.com/v2/sites/{site_id}/components/{component_id}/properties
Content-Type: application/json

Update the default property values of a component definition in a specificed locale.

Before making updates:
1. Use the [get component properties](/data/reference/pages-and-components/components/get-properties) endpoint to identify properties that can be updated in a secondary locale.
2. Rich Text properties may include a `data-w-id` attribute. This attribute is used by Webflow to maintain links across locales. Always include the original `data-w-id` value in your update requests to ensure consistent behavior across all locales.

<Note>The request requires a secondary locale ID. If a `localeId` is missing, the request will not be processed and will result in an error.</Note>

Required scope | `components:write`


Reference: https://developers.webflow.com/data/reference/pages-and-components/components/update-properties

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Update Component Properties
  version: endpoint_components.update-properties
paths:
  /sites/{site_id}/components/{component_id}/properties:
    post:
      operationId: update-properties
      summary: Update Component Properties
      description: >
        Update the default property values of a component definition in a
        specificed locale.


        Before making updates:

        1. Use the [get component
        properties](/data/reference/pages-and-components/components/get-properties)
        endpoint to identify properties that can be updated in a secondary
        locale.

        2. Rich Text properties may include a `data-w-id` attribute. This
        attribute is used by Webflow to maintain links across locales. Always
        include the original `data-w-id` value in your update requests to ensure
        consistent behavior across all locales.


        <Note>The request requires a secondary locale ID. If a `localeId` is
        missing, the request will not be processed and will result in an
        error.</Note>


        Required scope | `components:write`
      tags:
        - - subpackage_components
      parameters:
        - name: site_id
          in: path
          description: Unique identifier for a Site
          required: true
          schema:
            type: string
            format: objectid
        - name: component_id
          in: path
          description: Unique identifier for a Component
          required: true
          schema:
            type: string
        - name: localeId
          in: query
          description: >
            Unique identifier for a specific Locale.


            [Lear more about
            localization.](/data/v2.0.0/docs/working-with-localization)
          required: false
          schema:
            type: string
        - name: branchId
          in: query
          description: Scope the operation to work on a specific branch.
          required: false
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/components_update-properties_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                properties:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/SitesSiteIdComponentsComponentIdPropertiesPostRequestBodyContentApplicationJsonSchemaItems
              required:
                - properties
components:
  schemas:
    SitesSiteIdComponentsComponentIdPropertiesPostRequestBodyContentApplicationJsonSchemaItems:
      type: object
      properties:
        propertyId:
          type: string
        text:
          type: string
      required:
        - propertyId
        - text
    components_update-properties_Response_200:
      type: object
      properties:
        errors:
          type: array
          items:
            type: string
      required:
        - errors

```

## SDK Code Examples

```python
from webflow import Webflow
from webflow.resources.components import ComponentPropertiesWritePropertiesItem

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.components.update_properties(
    site_id="580e63e98c9a982ac9b8b741",
    component_id="8505ba55-ef72-629e-f85c-33e4b703d48b",
    locale_id="65427cf400e02b306eaa04a0",
    branch_id="68026fa68ef6dc744c75b833",
    properties=[
        ComponentPropertiesWritePropertiesItem(
            property_id="a245c12d-995b-55ee-5ec7-aa36a6cad623",
            text="The Hitchhiker’s Guide to the Galaxy",
        ),
        ComponentPropertiesWritePropertiesItem(
            property_id="a245c12d-995b-55ee-5ec7-aa36a6cad627",
            text="<div><h3>Dont Panic!</h3><p>Always know where your towel is.</p></div>",
        ),
    ],
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.components.updateProperties("580e63e98c9a982ac9b8b741", "8505ba55-ef72-629e-f85c-33e4b703d48b", {
    localeId: "65427cf400e02b306eaa04a0",
    branchId: "68026fa68ef6dc744c75b833",
    properties: [{
            propertyId: "a245c12d-995b-55ee-5ec7-aa36a6cad623",
            text: "The Hitchhiker\u2019s Guide to the Galaxy"
        }, {
            propertyId: "a245c12d-995b-55ee-5ec7-aa36a6cad627",
            text: "<div><h3>Dont Panic!</h3><p>Always know where your towel is.</p></div>"
        }]
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/properties?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833"

	payload := strings.NewReader("{\n  \"properties\": [\n    {\n      \"propertyId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad623\",\n      \"text\": \"The Hitchhiker’s Guide to the Galaxy\"\n    },\n    {\n      \"propertyId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad627\",\n      \"text\": \"<div><h3>Dont Panic!</h3><p>Always know where your towel is.</p></div>\"\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/properties?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"properties\": [\n    {\n      \"propertyId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad623\",\n      \"text\": \"The Hitchhiker’s Guide to the Galaxy\"\n    },\n    {\n      \"propertyId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad627\",\n      \"text\": \"<div><h3>Dont Panic!</h3><p>Always know where your towel is.</p></div>\"\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/properties?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"properties\": [\n    {\n      \"propertyId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad623\",\n      \"text\": \"The Hitchhiker’s Guide to the Galaxy\"\n    },\n    {\n      \"propertyId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad627\",\n      \"text\": \"<div><h3>Dont Panic!</h3><p>Always know where your towel is.</p></div>\"\n    }\n  ]\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/properties?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833', [
  'body' => '{
  "properties": [
    {
      "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad623",
      "text": "The Hitchhiker’s Guide to the Galaxy"
    },
    {
      "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad627",
      "text": "<div><h3>Dont Panic!</h3><p>Always know where your towel is.</p></div>"
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/properties?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"properties\": [\n    {\n      \"propertyId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad623\",\n      \"text\": \"The Hitchhiker’s Guide to the Galaxy\"\n    },\n    {\n      \"propertyId\": \"a245c12d-995b-55ee-5ec7-aa36a6cad627\",\n      \"text\": \"<div><h3>Dont Panic!</h3><p>Always know where your towel is.</p></div>\"\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["properties": [
    [
      "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad623",
      "text": "The Hitchhiker’s Guide to the Galaxy"
    ],
    [
      "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad627",
      "text": "<div><h3>Dont Panic!</h3><p>Always know where your towel is.</p></div>"
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/components/8505ba55-ef72-629e-f85c-33e4b703d48b/properties?localeId=65427cf400e02b306eaa04a0&branchId=68026fa68ef6dc744c75b833")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

---
title: Webflow CMS API
description: Learn how to interact with the Webflow CMS using the Data API.
hidden: false
layout: reference
subtitle: Manage your Webflow CMS content using the Data API
---

Webflow's CMS API lets you programmatically create, manage, and publish content. Use it to build custom workflows, integrate with external systems, and automate content management. For general information on the Webflow CMS, see the [help center documentation](https://help.webflow.com/hc/en-us/articles/33961307099027-Intro-to-the-Webflow-CMS).

## Overview
Use the Data API to manage three core components of the Webflow CMS:

<CardGroup cols={3}>
    <Card
        title="Collections"
        href="#collections"
    >
        Database-like containers that define content structure and fields.
    </Card>
    <Card
        title="Fields"
        href="#collection-fields"
    >
        Individual data fields that define content types within a collection.
    </Card>
    <Card
        title="Items"
        href="#collection-items"
    >
        Content records stored within a collection.
    </Card>
</CardGroup>

The API supports both **staged** and **live** content, giving you precise control over your [publishing workflow](/data/docs/working-with-the-cms/publishing). You can create content programmatically, perform bulk updates, and manage multi-locale content.

---

## Workflows

There are a few workflows that are particularly helpful to understand when working with the CMS API.

<CardGroup cols={2} id="workflow-cards">
    <Card
        title="Collection Management"
        href="/data/docs/working-with-the-cms/manage-collections-and-items"
        iconPosition="left"
        iconSize="12"
        icon={
            <>
                <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/CMS.svg" alt="" className="hidden dark:block" />
                <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/64px/CMS.svg" alt="" className="block dark:hidden" />
            </>
        }
    >
        Learn how to create, manage, and publish collections and items.
    </Card>
    <Card
        title="Publishing"
        href="/data/docs/working-with-the-cms/publishing"
        data-path="publishing"
        iconPosition="left"
        iconSize="12"
        icon={
            <>
                <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/PublishDesigner.svg" alt="" className="hidden dark:block" />
                <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/64px/PublishDesigner.svg" alt="" className="block dark:hidden" />
            </>
        }
    >
        Learn how items are published, updated, and unpublished.
    </Card>
    <Card
        title="Localization"
        href="/data/docs/working-with-the-cms/localization"
        data-path="cms-localization"
        iconPosition="left"
        iconSize="12"
        icon={
            <>
                <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Localization.svg" alt="" className="hidden dark:block" />
                <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Localization.svg" alt="" className="block dark:hidden" />
            </>
        }
    >
        Learn how to create and manage linked CMS items across multiple locales.
    </Card>
    <Card
        title="Content Delivery"
        href="/data/docs/working-with-the-cms/content-delivery"
        data-path="cms-cdn"
        iconPosition="left"
        iconSize="12"
        icon={
            <>
                <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/GlobalCDN.svg" alt="" className="hidden dark:block" />
                <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/64px/GlobalCDN.svg" alt="" className="block dark:hidden" />
            </>
        }
    >
        Learn how to deliver cached content to external applications.
    </Card>
</CardGroup>

---

## Key concepts

<Accordion title="Collections">
Collections are structured containers for dynamic content, similar to database tables. Each collection defines a content type, like blog posts, team members, or testimonials, by specifying a set of fields.

Collections can contain various [field types](/data/reference/field-types-item-values), including text, rich text, images, dates, numbers, and references to other collections.

Each collection has a unique ID used to manage its details, fields, and items.

### Collections endpoints

| Endpoint | Description |
|----------|-------------|
|  <span data-badge-type="http-method" data-http-method="GET" class="fern-docs-badge small green subtle shrink-0">GET</span> [List collections](/data/reference/cms/collections/list) | Retrieve all collections for a site. |
|  <span data-badge-type="http-method" data-http-method="GET" class="fern-docs-badge small green subtle shrink-0">GET</span> [Get collection](/data/reference/cms/collections/get) | Retrieve the schema and details for a specific collection. |
|  <span data-badge-type="http-method" data-http-method="POST" class="fern-docs-badge small blue subtle shrink-0">POST</span> [Create collection](/data/reference/cms/collections/create) | Create a new collection. |
|  <span data-badge-type="http-method" data-http-method="DELETE" class="fern-docs-badge small red subtle shrink-0">DELETE</span> [Delete collection](/data/reference/cms/collections/delete) | Remove a collection and all of its items. |
<br/>
</Accordion>
<Accordion title="Collection fields">
Fields define the structure and data type for content in a collection. Each field has a unique ID used to manage its details and item data. Each field's type determines the kind of content it can store. See the [field types reference](/data/reference/field-types-item-values) for a full list of types and their properties.

### Collection fields endpoints

| Endpoint | Description |
|----------|-------------|
|  <span data-badge-type="http-method" data-http-method="POST" class="fern-docs-badge small blue subtle shrink-0">POST</span> [Create field](/data/reference/cms/collection-fields/create) | Create a new field in a collection. |
|  <span data-badge-type="http-method" data-http-method="PATCH" class="fern-docs-badge small orange subtle shrink-0">PATCH</span> [Update field](/data/reference/cms/collection-fields/update) | Modify an existing field. |
|  <span data-badge-type="http-method" data-http-method="DELETE" class="fern-docs-badge small red subtle shrink-0">DELETE</span> [Delete field](/data/reference/cms/collection-fields/delete) | Remove a field from a collection. |

<Note title="List fields">
    To list fields, retrieve collection details using the [get collection](/data/reference/cms/collections/get) endpoint.
</Note>

</Accordion>
<Accordion title="Collection items">
Items are individual records within a collection. Each item has a unique ID and contains data for the fields defined in that collection.

### Collection Item states
Items exist in two main states:
<CardGroup>
    <Card
        title="Staged"
    >
        Draft content not visible on your live site.
    </Card>
    <Card
        title="Live"
    >
        Published content that appears on your website.
    </Card>
</CardGroup>

This dual-state system lets you prepare content changes without affecting your live site. You can create, edit, and preview staged content before publishing. For more details, see the [CMS publishing guide](/data/docs/working-with-the-cms/publishing).


### Collection items endpoints

<Tabs>
    <Tab title="Staged">

    Manage staged items on a site. These endpoints also work with live items. Updating a live item automatically updates its staged version. Creating a new item with these endpoints always creates a draft.

        | Endpoint | Description |
        |----------|-------------|
        | <span data-badge-type="http-method" data-http-method="GET" class="fern-docs-badge small green subtle shrink-0">GET</span> [List items](/data/reference/cms/collection-items/staged-items/list-items) | Retrieve a list of all items in a collection. |
        | <span data-badge-type="http-method" data-http-method="GET" class="fern-docs-badge small green subtle shrink-0">GET</span> [Get item](/data/reference/cms/collection-items/staged-items/get-item) | Retrieve a specific item. |
        | <span data-badge-type="http-method" data-http-method="POST" class="fern-docs-badge small blue subtle shrink-0">POST</span> [Create item(s)](/data/reference/cms/collection-items/staged-items/create-items) | Create items. Use `cmsLocaleIds` to create items across multiple locales. |
        | <span data-badge-type="http-method" data-http-method="PUT" class="fern-docs-badge small orange subtle shrink-0">PATCH</span> [Update items](/data/reference/cms/collection-items/staged-items/update-items) | Modify one or more items. |
        | <span data-badge-type="http-method" data-http-method="POST" class="fern-docs-badge small red subtle shrink-0">DELETE</span> [Delete items](/data/reference/cms/collection-items/staged-items/delete-items) | Delete one or more items. |
        | <span data-badge-type="http-method" data-http-method="POST" class="fern-docs-badge small blue subtle shrink-0">POST</span> [Publish item](/data/reference/cms/collection-items/staged-items/publish-item) | Publish one or more items. |

        <Note title="Unpublish items">
            Use the [unpublish live item endpoint](/data/reference/cms/collection-items/live-items/delete-items-live) to unpublish a live item.
        </Note>
    </Tab>

    <Tab title="Live">
        Manage live items on a site. These endpoints only work for live items.

        | Endpoint | Description |
        |----------|-------------|
        | <span data-badge-type="http-method" data-http-method="GET" class="fern-docs-badge small green subtle shrink-0">GET</span> [List live items](/data/reference/cms/collection-items/live-items/list-items-live) | Retrieve a list of all live items in a collection. |
        | <span data-badge-type="http-method" data-http-method="GET" class="fern-docs-badge small green subtle shrink-0">GET</span> [Get live item](/data/reference/cms/collection-items/live-items/get-item-live) | Retrieve a specific live item. |
        | <span data-badge-type="http-method" data-http-method="POST" class="fern-docs-badge small blue subtle shrink-0">POST</span> [Create items](/data/reference/cms/collection-items/live-items/create-item-live) | Create new live items. |
        | <span data-badge-type="http-method" data-http-method="PUT" class="fern-docs-badge small orange subtle shrink-0">PATCH</span> [Update items](/data/reference/cms/collection-items/live-items/update-items-live) | Modify one or more live items. |
        | <span data-badge-type="http-method" data-http-method="POST" class="fern-docs-badge small red subtle shrink-0">DELETE</span> [Unpublish items](/data/reference/cms/collection-items/live-items/delete-items-live) | Unpublish one or more live items. |
        | <span data-badge-type="http-method" data-http-method="POST" class="fern-docs-badge small blue subtle shrink-0">POST</span> [Publish item](/data/reference/cms/collection-items/staged-items/publish-item) | Publish one or more live items. |
    </Tab>
</Tabs>

</Accordion>

---
## Start working with the CMS API
Below is an interactive tutorial that will walk you through the basic steps of getting a collection, listing a collection schema, listing collection items, and creating a collection item.

<iframe style={{width:"100%", height:"650px"}} src="https://my-astro-app.victoria-l-plummer.workers.dev" />

## Bulk operations

For most CMS operations, the API provides both single-item and bulk endpoints. Bulk endpoints allow you to perform `CRUD` operations (Create, Read, Update, Delete) on multiple items in a single API call, which is more efficient for managing content at scale.

<Note>
    To keep the sidebar clean, we've hidden most single-item endpoints. However, they are fully functional and not deprecated. The tables below show both the visible and hidden endpoints for staged and live collection items.
</Note>

<Accordion title="Staged Items">

| Operation | Single Item Endpoint | Bulk Endpoint |
|---|---|---|
| **List** | [`GET /collections/{collection_id}/items`](/data/v2.0.0/reference/cms/collection-items/staged-items/list-items) | N/A |
| **Get** | [`GET /collections/{collection_id}/items/{item_id}`](/data/v2.0.0/reference/cms/collection-items/staged-items/get-item) | N/A |
| **Create** | [`POST /collections/{collection_id}/items`](/data/v2.0.0/reference/cms/collection-items/staged-items/create-item) | [`POST /collections/{collection_id}/items/bulk`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/staged-items/create-items) |
| **Update** | [`PATCH /collections/{collection_id}/items/{item_id}`](/data/v2.0.0/reference/cms/collection-items/staged-items/update-item) | [`PATCH /collections/{collection_id}/items`](/data/v2.0.0/reference/cms/collection-items/staged-items/update-items) |
| **Delete** | [`DELETE /collections/{collection_id}/items/{item_id}`](/data/v2.0.0/reference/cms/collection-items/staged-items/delete-item) | [`DELETE /collections/{collection_id}/items`](/data/v2.0.0/reference/cms/collection-items/staged-items/delete-items) |
| **Publish** | N/A | [`POST /collections/{collection_id}/items/publish`](/data/v2.0.0/reference/cms/collection-items/staged-items/publish-item) |
</Accordion>

<Accordion title="Live Items">
| Operation | Single Item Endpoint | Bulk Endpoint |
|---|---|---|
| **List** | [`GET /collections/{collection_id}/items/live`](/data/v2.0.0/reference/cms/collection-items/live-items/list-items-live) | N/A |
| **Get** | [`GET /collections/{collection_id}/items/{item_id}/live`](/data/v2.0.0/reference/cms/collection-items/live-items/get-item-live) | N/A |
| **Create** | [`POST /collections/{collection_id}/items/live`](/data/v2.0.0/reference/cms/collection-items/live-items/create-item-live) | N/A |
| **Update** | [`PATCH /collections/{collection_id}/items/{item_id}/live`](data/v2.0.0/reference/cms/collection-items/live-items/update-item-live) | [`PATCH /collections/{collection_id}/items/live`](/data/v2.0.0/reference/cms/collection-items/live-items/update-items-live) |
| **Unpublish**| [`DELETE /collections/{collection_id}/items/{item_id}/live`](/https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/delete-item-live) | [`DELETE /collections/{collection_id}/items/live`](/data/v2.0.0/reference/cms/collection-items/live-items/delete-items-live) |
</Accordion>

## Webhooks

Use webhooks to receive real-time notifications about changes to your content. This enables automated workflows and integrations with other systems.

### Webhook events

[Create a webhook](/data/reference/webhooks/create) and subscribe to the following events for a given collection:

- [Collection item created](/data/reference/webhooks/events/collection-item-created)
- [Collection item updated](/data/reference/webhooks/events/collection-item-changed)
- [Collection item deleted](/data/reference/webhooks/events/collection-item-deleted)
- [Collection item published](/data/reference/webhooks/events/collection-item-published)
- [Collection item un-published](/data/reference/webhooks/events/collection-item-unpublished)

## Next Steps

<CardGroup cols={2}>
    <Card
        title="Getting started"
        href="/data/docs/working-with-the-cms/manage-collections-and-items"
    >
        Create a collection, add fields, and create items. Includes pagination examples.
    </Card>
    <Card
        title="Working with webhooks"
        href="/data/docs/working-with-webhooks"
    >
        Set up real-time notifications for content changes to build automated workflows.
    </Card>
</CardGroup>

# List Collections

GET https://api.webflow.com/v2/sites/{site_id}/collections

List of all Collections within a Site.

Required scope | `cms:read`


Reference: https://developers.webflow.com/data/reference/cms/collections/list

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: List Collections
  version: endpoint_collections.list
paths:
  /sites/{site_id}/collections:
    get:
      operationId: list
      summary: List Collections
      description: |
        List of all Collections within a Site.

        Required scope | `cms:read`
      tags:
        - - subpackage_collections
      parameters:
        - name: site_id
          in: path
          description: Unique identifier for a Site
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_list_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    SitesSiteIdCollectionsGetResponsesContentApplicationJsonSchemaCollectionsItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        displayName:
          type: string
        singularName:
          type: string
        slug:
          type: string
        createdOn:
          type: string
          format: date-time
        lastUpdated:
          type: string
          format: date-time
      required:
        - id
    collections_list_Response_200:
      type: object
      properties:
        collections:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdCollectionsGetResponsesContentApplicationJsonSchemaCollectionsItems

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.list(
    site_id="580e63e98c9a982ac9b8b741",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.list("580e63e98c9a982ac9b8b741");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Get Collection Details

GET https://api.webflow.com/v2/collections/{collection_id}

Get the full details of a collection from its ID.

Required scope | `cms:read`


Reference: https://developers.webflow.com/data/reference/cms/collections/get

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Collection Details
  version: endpoint_collections.get
paths:
  /collections/{collection_id}:
    get:
      operationId: get
      summary: Get Collection Details
      description: |
        Get the full details of a collection from its ID.

        Required scope | `cms:read`
      tags:
        - - subpackage_collections
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_get_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItemsType:
      type: string
      enum:
        - value: Color
        - value: DateTime
        - value: Email
        - value: ExtFileRef
        - value: File
        - value: Image
        - value: Link
        - value: MultiImage
        - value: MultiReference
        - value: Number
        - value: Option
        - value: Phone
        - value: PlainText
        - value: Reference
        - value: RichText
        - value: Switch
        - value: VideoLink
    CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItemsValidationsAdditionalProperties:
      oneOf:
        - type: string
        - type: number
          format: double
        - type: boolean
        - type: integer
        - type: object
          additionalProperties:
            description: Any type
    CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItemsValidations:
      type: object
      properties:
        additionalProperties:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItemsValidationsAdditionalProperties
    CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isRequired:
          type: boolean
        isEditable:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItemsType
        slug:
          type: string
        displayName:
          type: string
        helpText:
          type: string
        validations:
          oneOf:
            - $ref: >-
                #/components/schemas/CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItemsValidations
            - type: 'null'
      required:
        - id
        - isRequired
        - type
        - displayName
    collections_get_Response_200:
      type: object
      properties:
        id:
          type: string
          format: objectid
        displayName:
          type: string
        singularName:
          type: string
        slug:
          type: string
        createdOn:
          type: string
          format: date-time
        lastUpdated:
          type: string
          format: date-time
        fields:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItems
      required:
        - id
        - displayName
        - singularName
        - fields

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.get(
    collection_id="580e63fc8c9a982ac9b8b745",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.get("580e63fc8c9a982ac9b8b745");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Create Collection

POST https://api.webflow.com/v2/sites/{site_id}/collections
Content-Type: application/json

Create a Collection for a site with collection fields.

Each collection includes the required _name_ and _slug_ fields, which are generated automatically. You can update the `displayName` of these fields, but the slug for them cannot be changed. Fields slugs are automatically converted to lowercase. Spaces in slugs are replaced with hyphens.

Required scope | `cms:write`


Reference: https://developers.webflow.com/data/reference/cms/collections/create

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Create Collection
  version: endpoint_collections.create
paths:
  /sites/{site_id}/collections:
    post:
      operationId: create
      summary: Create Collection
      description: >
        Create a Collection for a site with collection fields.


        Each collection includes the required _name_ and _slug_ fields, which
        are generated automatically. You can update the `displayName` of these
        fields, but the slug for them cannot be changed. Fields slugs are
        automatically converted to lowercase. Spaces in slugs are replaced with
        hyphens.


        Required scope | `cms:write`
      tags:
        - - subpackage_collections
      parameters:
        - name: site_id
          in: path
          description: Unique identifier for a Site
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_create_Response_200'
        '400':
          description: Validation failure
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '409':
          description: Collection already exists
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: >-
          Pass the Name of the collection, as well as the singular name of each
          item in the collection.
        content:
          application/json:
            schema:
              type: object
              properties:
                displayName:
                  type: string
                singularName:
                  type: string
                slug:
                  type: string
                fields:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems
              required:
                - displayName
                - singularName
components:
  schemas:
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf0Type:
      type: string
      enum:
        - value: Color
        - value: DateTime
        - value: Email
        - value: File
        - value: Image
        - value: Link
        - value: MultiImage
        - value: Number
        - value: Phone
        - value: PlainText
        - value: RichText
        - value: Switch
        - value: VideoLink
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems0:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf0Type
        displayName:
          type: string
        helpText:
          type: string
      required:
        - type
        - displayName
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf1Type:
      type: string
      enum:
        - value: Option
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf1MetadataOptionsItems:
      type: object
      properties:
        name:
          type: string
        id:
          type: string
      required:
        - name
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf1Metadata:
      type: object
      properties:
        options:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf1MetadataOptionsItems
      required:
        - options
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems1:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf1Type
        displayName:
          type: string
        helpText:
          type: string
        metadata:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf1Metadata
      required:
        - type
        - displayName
        - metadata
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf2Type:
      type: string
      enum:
        - value: MultiReference
        - value: Reference
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf2Metadata:
      type: object
      properties:
        collectionId:
          type: string
      required:
        - collectionId
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems2:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf2Type
        displayName:
          type: string
        helpText:
          type: string
        metadata:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf2Metadata
      required:
        - type
        - displayName
        - metadata
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems0
        - $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems1
        - $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems2
    SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItemsType:
      type: string
      enum:
        - value: Color
        - value: DateTime
        - value: Email
        - value: ExtFileRef
        - value: File
        - value: Image
        - value: Link
        - value: MultiImage
        - value: MultiReference
        - value: Number
        - value: Option
        - value: Phone
        - value: PlainText
        - value: Reference
        - value: RichText
        - value: Switch
        - value: VideoLink
    SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItemsValidationsAdditionalProperties:
      oneOf:
        - type: string
        - type: number
          format: double
        - type: boolean
        - type: integer
        - type: object
          additionalProperties:
            description: Any type
    SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItemsValidations:
      type: object
      properties:
        additionalProperties:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItemsValidationsAdditionalProperties
    SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isRequired:
          type: boolean
        isEditable:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItemsType
        slug:
          type: string
        displayName:
          type: string
        helpText:
          type: string
        validations:
          oneOf:
            - $ref: >-
                #/components/schemas/SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItemsValidations
            - type: 'null'
      required:
        - id
        - isRequired
        - type
        - displayName
    collections_create_Response_200:
      type: object
      properties:
        id:
          type: string
          format: objectid
        displayName:
          type: string
        singularName:
          type: string
        slug:
          type: string
        createdOn:
          type: string
          format: date-time
        lastUpdated:
          type: string
          format: date-time
        fields:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItems
      required:
        - id
        - displayName
        - singularName
        - fields

```

## SDK Code Examples

```python
from webflow import ReferenceField, ReferenceFieldMetadata, StaticField, Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.create(
    site_id="580e63e98c9a982ac9b8b741",
    display_name="Blog Posts",
    singular_name="Blog Post",
    slug="posts",
    fields=[
        StaticField(
            is_required=True,
            type="PlainText",
            display_name="Title",
            help_text="The title of the blog post",
        ),
        StaticField(
            is_required=True,
            type="RichText",
            display_name="Content",
            help_text="The content of the blog post",
        ),
        ReferenceField(
            is_required=True,
            type="Reference",
            display_name="Author",
            help_text="The author of the blog post",
            metadata=ReferenceFieldMetadata(
                collection_id="23cc2d952d4e4631ffd4345d2743db4e",
            ),
        ),
    ],
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.create("580e63e98c9a982ac9b8b741", {
    displayName: "Blog Posts",
    singularName: "Blog Post",
    slug: "posts",
    fields: [{
            isRequired: true,
            type: "PlainText",
            displayName: "Title",
            helpText: "The title of the blog post"
        }, {
            isRequired: true,
            type: "RichText",
            displayName: "Content",
            helpText: "The content of the blog post"
        }, {
            isRequired: true,
            type: "Reference",
            displayName: "Author",
            helpText: "The author of the blog post",
            metadata: {
                collectionId: "23cc2d952d4e4631ffd4345d2743db4e"
            }
        }]
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections"

	payload := strings.NewReader("{\n  \"displayName\": \"Blog Posts\",\n  \"singularName\": \"Blog Post\",\n  \"slug\": \"posts\",\n  \"fields\": [\n    {\n      \"isRequired\": true,\n      \"type\": \"PlainText\",\n      \"displayName\": \"Title\",\n      \"helpText\": \"The title of the blog post\",\n      \"slug\": \"title\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"RichText\",\n      \"displayName\": \"Content\",\n      \"helpText\": \"The content of the blog post\",\n      \"slug\": \"content\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"Reference\",\n      \"displayName\": \"Author\",\n      \"helpText\": \"The author of the blog post\",\n      \"metadata\": {\n        \"collectionId\": \"23cc2d952d4e4631ffd4345d2743db4e\"\n      },\n      \"slug\": \"author\"\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"displayName\": \"Blog Posts\",\n  \"singularName\": \"Blog Post\",\n  \"slug\": \"posts\",\n  \"fields\": [\n    {\n      \"isRequired\": true,\n      \"type\": \"PlainText\",\n      \"displayName\": \"Title\",\n      \"helpText\": \"The title of the blog post\",\n      \"slug\": \"title\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"RichText\",\n      \"displayName\": \"Content\",\n      \"helpText\": \"The content of the blog post\",\n      \"slug\": \"content\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"Reference\",\n      \"displayName\": \"Author\",\n      \"helpText\": \"The author of the blog post\",\n      \"metadata\": {\n        \"collectionId\": \"23cc2d952d4e4631ffd4345d2743db4e\"\n      },\n      \"slug\": \"author\"\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"displayName\": \"Blog Posts\",\n  \"singularName\": \"Blog Post\",\n  \"slug\": \"posts\",\n  \"fields\": [\n    {\n      \"isRequired\": true,\n      \"type\": \"PlainText\",\n      \"displayName\": \"Title\",\n      \"helpText\": \"The title of the blog post\",\n      \"slug\": \"title\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"RichText\",\n      \"displayName\": \"Content\",\n      \"helpText\": \"The content of the blog post\",\n      \"slug\": \"content\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"Reference\",\n      \"displayName\": \"Author\",\n      \"helpText\": \"The author of the blog post\",\n      \"metadata\": {\n        \"collectionId\": \"23cc2d952d4e4631ffd4345d2743db4e\"\n      },\n      \"slug\": \"author\"\n    }\n  ]\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections', [
  'body' => '{
  "displayName": "Blog Posts",
  "singularName": "Blog Post",
  "slug": "posts",
  "fields": [
    {
      "isRequired": true,
      "type": "PlainText",
      "displayName": "Title",
      "helpText": "The title of the blog post",
      "slug": "title"
    },
    {
      "isRequired": true,
      "type": "RichText",
      "displayName": "Content",
      "helpText": "The content of the blog post",
      "slug": "content"
    },
    {
      "isRequired": true,
      "type": "Reference",
      "displayName": "Author",
      "helpText": "The author of the blog post",
      "metadata": {
        "collectionId": "23cc2d952d4e4631ffd4345d2743db4e"
      },
      "slug": "author"
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"displayName\": \"Blog Posts\",\n  \"singularName\": \"Blog Post\",\n  \"slug\": \"posts\",\n  \"fields\": [\n    {\n      \"isRequired\": true,\n      \"type\": \"PlainText\",\n      \"displayName\": \"Title\",\n      \"helpText\": \"The title of the blog post\",\n      \"slug\": \"title\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"RichText\",\n      \"displayName\": \"Content\",\n      \"helpText\": \"The content of the blog post\",\n      \"slug\": \"content\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"Reference\",\n      \"displayName\": \"Author\",\n      \"helpText\": \"The author of the blog post\",\n      \"metadata\": {\n        \"collectionId\": \"23cc2d952d4e4631ffd4345d2743db4e\"\n      },\n      \"slug\": \"author\"\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "displayName": "Blog Posts",
  "singularName": "Blog Post",
  "slug": "posts",
  "fields": [
    [
      "isRequired": true,
      "type": "PlainText",
      "displayName": "Title",
      "helpText": "The title of the blog post",
      "slug": "title"
    ],
    [
      "isRequired": true,
      "type": "RichText",
      "displayName": "Content",
      "helpText": "The content of the blog post",
      "slug": "content"
    ],
    [
      "isRequired": true,
      "type": "Reference",
      "displayName": "Author",
      "helpText": "The author of the blog post",
      "metadata": ["collectionId": "23cc2d952d4e4631ffd4345d2743db4e"],
      "slug": "author"
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```


# Delete Collection

DELETE https://api.webflow.com/v2/collections/{collection_id}

Delete a collection using its ID.

Required scope | `cms:write`


Reference: https://developers.webflow.com/data/reference/cms/collections/delete

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Delete Collection
  version: endpoint_collections.delete
paths:
  /collections/{collection_id}:
    delete:
      operationId: delete
      summary: Delete Collection
      description: |
        Delete a collection using its ID.

        Required scope | `cms:write`
      tags:
        - - subpackage_collections
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Request was successful. No Content is returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_delete_Response_204'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    collections_delete_Response_204:
      type: object
      properties: {}

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.delete(
    collection_id="580e63fc8c9a982ac9b8b745",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.delete("580e63fc8c9a982ac9b8b745");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745"

	req, _ := http.NewRequest("DELETE", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.delete("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('DELETE', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745");
var request = new RestRequest(Method.DELETE);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "DELETE"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Create field

POST https://api.webflow.com/v2/collections/{collection_id}/fields
Content-Type: application/json

Create a custom field in a collection.

Field validation is currently not available through the API.

Bulk creation of fields is not supported with this endpoint. To add multiple fields at once, include them when you [create the collection.](/data/v2.0.0/reference/cms/collections/create)

Required scope | `cms:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-fields/create

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Create Collection Field
  version: endpoint_collections/fields.create
paths:
  /collections/{collection_id}/fields:
    post:
      operationId: create
      summary: Create Collection Field
      description: >
        Create a custom field in a collection.


        Field validation is currently not available through the API.


        Bulk creation of fields is not supported with this endpoint. To add
        multiple fields at once, include them when you [create the
        collection.](/data/v2.0.0/reference/cms/collections/create)


        Required scope | `cms:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/fields
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_fields_create_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '409':
          description: Collection already exists
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: The field to create
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/collections_fields_create_Request'
components:
  schemas:
    CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf0Type:
      type: string
      enum:
        - value: Color
        - value: DateTime
        - value: Email
        - value: File
        - value: Image
        - value: Link
        - value: MultiImage
        - value: Number
        - value: Phone
        - value: PlainText
        - value: RichText
        - value: Switch
        - value: VideoLink
    CollectionsFieldsCreateRequest0:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf0Type
        displayName:
          type: string
        helpText:
          type: string
      required:
        - type
        - displayName
    CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf1Type:
      type: string
      enum:
        - value: Option
    CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf1MetadataOptionsItems:
      type: object
      properties:
        name:
          type: string
        id:
          type: string
      required:
        - name
    CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf1Metadata:
      type: object
      properties:
        options:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf1MetadataOptionsItems
      required:
        - options
    CollectionsFieldsCreateRequest1:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf1Type
        displayName:
          type: string
        helpText:
          type: string
        metadata:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf1Metadata
      required:
        - type
        - displayName
        - metadata
    CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf2Type:
      type: string
      enum:
        - value: MultiReference
        - value: Reference
    CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf2Metadata:
      type: object
      properties:
        collectionId:
          type: string
      required:
        - collectionId
    CollectionsFieldsCreateRequest2:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf2Type
        displayName:
          type: string
        helpText:
          type: string
        metadata:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf2Metadata
      required:
        - type
        - displayName
        - metadata
    collections_fields_create_Request:
      oneOf:
        - $ref: '#/components/schemas/CollectionsFieldsCreateRequest0'
        - $ref: '#/components/schemas/CollectionsFieldsCreateRequest1'
        - $ref: '#/components/schemas/CollectionsFieldsCreateRequest2'
    CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf0Type:
      type: string
      enum:
        - value: Color
        - value: DateTime
        - value: Email
        - value: File
        - value: Image
        - value: Link
        - value: MultiImage
        - value: Number
        - value: Phone
        - value: PlainText
        - value: RichText
        - value: Switch
        - value: VideoLink
    CollectionsFieldsCreateResponse2000:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf0Type
        displayName:
          type: string
        helpText:
          type: string
      required:
        - type
        - displayName
    CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf1Type:
      type: string
      enum:
        - value: Option
    CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf1MetadataOptionsItems:
      type: object
      properties:
        name:
          type: string
        id:
          type: string
      required:
        - name
    CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf1Metadata:
      type: object
      properties:
        options:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf1MetadataOptionsItems
      required:
        - options
    CollectionsFieldsCreateResponse2001:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf1Type
        displayName:
          type: string
        helpText:
          type: string
        metadata:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf1Metadata
      required:
        - type
        - displayName
        - metadata
    CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf2Type:
      type: string
      enum:
        - value: MultiReference
        - value: Reference
    CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf2Metadata:
      type: object
      properties:
        collectionId:
          type: string
      required:
        - collectionId
    CollectionsFieldsCreateResponse2002:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf2Type
        displayName:
          type: string
        helpText:
          type: string
        metadata:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf2Metadata
      required:
        - type
        - displayName
        - metadata
    collections_fields_create_Response_200:
      oneOf:
        - $ref: '#/components/schemas/CollectionsFieldsCreateResponse2000'
        - $ref: '#/components/schemas/CollectionsFieldsCreateResponse2001'
        - $ref: '#/components/schemas/CollectionsFieldsCreateResponse2002'

```

## SDK Code Examples

```python StaticField
from webflow import StaticField, Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.fields.create(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=StaticField(
        id="562ac0395358780a1f5e6fbc",
        is_editable=True,
        is_required=False,
        type="RichText",
        display_name="Post Body",
        help_text="Add the body of your post here",
    ),
)

```

```typescript StaticField
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.fields.create("580e63fc8c9a982ac9b8b745", {
    id: "562ac0395358780a1f5e6fbc",
    isEditable: true,
    isRequired: false,
    type: "RichText",
    displayName: "Post Body",
    helpText: "Add the body of your post here"
});

```

```go StaticField
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields"

	payload := strings.NewReader("{\n  \"isRequired\": false,\n  \"type\": \"RichText\",\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\",\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby StaticField
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"isRequired\": false,\n  \"type\": \"RichText\",\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\",\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}"

response = http.request(request)
puts response.read_body
```

```java StaticField
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"isRequired\": false,\n  \"type\": \"RichText\",\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\",\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}")
  .asString();
```

```php StaticField
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields', [
  'body' => '{
  "isRequired": false,
  "type": "RichText",
  "displayName": "Post Body",
  "helpText": "Add the body of your post here",
  "id": "562ac0395358780a1f5e6fbc",
  "isEditable": true
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp StaticField
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"isRequired\": false,\n  \"type\": \"RichText\",\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\",\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift StaticField
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "isRequired": false,
  "type": "RichText",
  "displayName": "Post Body",
  "helpText": "Add the body of your post here",
  "id": "562ac0395358780a1f5e6fbc",
  "isEditable": true
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python OptionField
from webflow import Metadata, MetadataOptionsItem, OptionField, Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.fields.create(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=OptionField(
        id="562ac0395358780a1f5e6fbc",
        is_editable=True,
        is_required=False,
        display_name="Post Type",
        help_text="Add the body of your post here",
        metadata=Metadata(
            options=[
                MetadataOptionsItem(
                    name="Feature",
                ),
                MetadataOptionsItem(
                    name="News",
                ),
                MetadataOptionsItem(
                    name="Product Highlight",
                ),
            ],
        ),
    ),
)

```

```typescript OptionField
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.fields.create("580e63fc8c9a982ac9b8b745", {
    id: "562ac0395358780a1f5e6fbc",
    isEditable: true,
    isRequired: false,
    type: "Option",
    displayName: "Post Type",
    helpText: "Add the body of your post here",
    metadata: {
        options: [{
                name: "Feature"
            }, {
                name: "News"
            }, {
                name: "Product Highlight"
            }]
    }
});

```

```go OptionField
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields"

	payload := strings.NewReader("{\n  \"isRequired\": false,\n  \"type\": \"Option\",\n  \"displayName\": \"Post Type\",\n  \"helpText\": \"Add the body of your post here\",\n  \"metadata\": {\n    \"options\": [\n      {\n        \"name\": \"Feature\"\n      },\n      {\n        \"name\": \"News\"\n      },\n      {\n        \"name\": \"Product Highlight\"\n      }\n    ]\n  },\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby OptionField
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"isRequired\": false,\n  \"type\": \"Option\",\n  \"displayName\": \"Post Type\",\n  \"helpText\": \"Add the body of your post here\",\n  \"metadata\": {\n    \"options\": [\n      {\n        \"name\": \"Feature\"\n      },\n      {\n        \"name\": \"News\"\n      },\n      {\n        \"name\": \"Product Highlight\"\n      }\n    ]\n  },\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}"

response = http.request(request)
puts response.read_body
```

```java OptionField
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"isRequired\": false,\n  \"type\": \"Option\",\n  \"displayName\": \"Post Type\",\n  \"helpText\": \"Add the body of your post here\",\n  \"metadata\": {\n    \"options\": [\n      {\n        \"name\": \"Feature\"\n      },\n      {\n        \"name\": \"News\"\n      },\n      {\n        \"name\": \"Product Highlight\"\n      }\n    ]\n  },\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}")
  .asString();
```

```php OptionField
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields', [
  'body' => '{
  "isRequired": false,
  "type": "Option",
  "displayName": "Post Type",
  "helpText": "Add the body of your post here",
  "metadata": {
    "options": [
      {
        "name": "Feature"
      },
      {
        "name": "News"
      },
      {
        "name": "Product Highlight"
      }
    ]
  },
  "id": "562ac0395358780a1f5e6fbc",
  "isEditable": true
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp OptionField
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"isRequired\": false,\n  \"type\": \"Option\",\n  \"displayName\": \"Post Type\",\n  \"helpText\": \"Add the body of your post here\",\n  \"metadata\": {\n    \"options\": [\n      {\n        \"name\": \"Feature\"\n      },\n      {\n        \"name\": \"News\"\n      },\n      {\n        \"name\": \"Product Highlight\"\n      }\n    ]\n  },\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift OptionField
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "isRequired": false,
  "type": "Option",
  "displayName": "Post Type",
  "helpText": "Add the body of your post here",
  "metadata": ["options": [["name": "Feature"], ["name": "News"], ["name": "Product Highlight"]]],
  "id": "562ac0395358780a1f5e6fbc",
  "isEditable": true
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python ReferenceField
from webflow import ReferenceField, ReferenceFieldMetadata, Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.fields.create(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=ReferenceField(
        id="562ac0395358780a1f5e6fbd",
        is_editable=True,
        is_required=False,
        type="Reference",
        display_name="Author",
        help_text="Add the post author here",
        metadata=ReferenceFieldMetadata(
            collection_id="63692ab61fb2852f582ba8f5",
        ),
    ),
)

```

```typescript ReferenceField
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.fields.create("580e63fc8c9a982ac9b8b745", {
    id: "562ac0395358780a1f5e6fbd",
    isEditable: true,
    isRequired: false,
    type: "Reference",
    displayName: "Author",
    helpText: "Add the post author here",
    metadata: {
        collectionId: "63692ab61fb2852f582ba8f5"
    }
});

```

```go ReferenceField
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields"

	payload := strings.NewReader("{\n  \"isRequired\": false,\n  \"type\": \"Reference\",\n  \"displayName\": \"Author\",\n  \"helpText\": \"Add the post author here\",\n  \"metadata\": {\n    \"collectionId\": \"63692ab61fb2852f582ba8f5\"\n  },\n  \"id\": \"562ac0395358780a1f5e6fbd\",\n  \"isEditable\": true\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby ReferenceField
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"isRequired\": false,\n  \"type\": \"Reference\",\n  \"displayName\": \"Author\",\n  \"helpText\": \"Add the post author here\",\n  \"metadata\": {\n    \"collectionId\": \"63692ab61fb2852f582ba8f5\"\n  },\n  \"id\": \"562ac0395358780a1f5e6fbd\",\n  \"isEditable\": true\n}"

response = http.request(request)
puts response.read_body
```

```java ReferenceField
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"isRequired\": false,\n  \"type\": \"Reference\",\n  \"displayName\": \"Author\",\n  \"helpText\": \"Add the post author here\",\n  \"metadata\": {\n    \"collectionId\": \"63692ab61fb2852f582ba8f5\"\n  },\n  \"id\": \"562ac0395358780a1f5e6fbd\",\n  \"isEditable\": true\n}")
  .asString();
```

```php ReferenceField
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields', [
  'body' => '{
  "isRequired": false,
  "type": "Reference",
  "displayName": "Author",
  "helpText": "Add the post author here",
  "metadata": {
    "collectionId": "63692ab61fb2852f582ba8f5"
  },
  "id": "562ac0395358780a1f5e6fbd",
  "isEditable": true
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp ReferenceField
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"isRequired\": false,\n  \"type\": \"Reference\",\n  \"displayName\": \"Author\",\n  \"helpText\": \"Add the post author here\",\n  \"metadata\": {\n    \"collectionId\": \"63692ab61fb2852f582ba8f5\"\n  },\n  \"id\": \"562ac0395358780a1f5e6fbd\",\n  \"isEditable\": true\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift ReferenceField
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "isRequired": false,
  "type": "Reference",
  "displayName": "Author",
  "helpText": "Add the post author here",
  "metadata": ["collectionId": "63692ab61fb2852f582ba8f5"],
  "id": "562ac0395358780a1f5e6fbd",
  "isEditable": true
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Update field

PATCH https://api.webflow.com/v2/collections/{collection_id}/fields/{field_id}
Content-Type: application/json

Update a custom field in a collection.

Required scope | `cms:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-fields/update

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Update Collection Field
  version: endpoint_collections/fields.update
paths:
  /collections/{collection_id}/fields/{field_id}:
    patch:
      operationId: update
      summary: Update Collection Field
      description: |
        Update a custom field in a collection.

        Required scope | `cms:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/fields
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: field_id
          in: path
          description: Unique identifier for a Field in a collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_fields_update_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: The field details to update
        content:
          application/json:
            schema:
              type: object
              properties:
                isRequired:
                  type: boolean
                displayName:
                  type: string
                helpText:
                  type: string
components:
  schemas:
    CollectionsCollectionIdFieldsFieldIdPatchResponsesContentApplicationJsonSchemaType:
      type: string
      enum:
        - value: Color
        - value: DateTime
        - value: Email
        - value: ExtFileRef
        - value: File
        - value: Image
        - value: Link
        - value: MultiImage
        - value: MultiReference
        - value: Number
        - value: Option
        - value: Phone
        - value: PlainText
        - value: Reference
        - value: RichText
        - value: Switch
        - value: VideoLink
    CollectionsCollectionIdFieldsFieldIdPatchResponsesContentApplicationJsonSchemaValidationsAdditionalProperties:
      oneOf:
        - type: string
        - type: number
          format: double
        - type: boolean
        - type: integer
        - type: object
          additionalProperties:
            description: Any type
    CollectionsCollectionIdFieldsFieldIdPatchResponsesContentApplicationJsonSchemaValidations:
      type: object
      properties:
        additionalProperties:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsFieldIdPatchResponsesContentApplicationJsonSchemaValidationsAdditionalProperties
    collections_fields_update_Response_200:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isRequired:
          type: boolean
        isEditable:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsFieldIdPatchResponsesContentApplicationJsonSchemaType
        slug:
          type: string
        displayName:
          type: string
        helpText:
          type: string
        validations:
          oneOf:
            - $ref: >-
                #/components/schemas/CollectionsCollectionIdFieldsFieldIdPatchResponsesContentApplicationJsonSchemaValidations
            - type: 'null'
      required:
        - id
        - isRequired
        - type
        - displayName

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.fields.update(
    collection_id="580e63fc8c9a982ac9b8b745",
    field_id="580e63fc8c9a982ac9b8b745",
    is_required=False,
    display_name="Post Body",
    help_text="Add the body of your post here",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.fields.update("580e63fc8c9a982ac9b8b745", "580e63fc8c9a982ac9b8b745", {
    isRequired: false,
    displayName: "Post Body",
    helpText: "Add the body of your post here"
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745"

	payload := strings.NewReader("{\n  \"isRequired\": false,\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\"\n}")

	req, _ := http.NewRequest("PATCH", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"isRequired\": false,\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\"\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"isRequired\": false,\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\"\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745', [
  'body' => '{
  "isRequired": false,
  "displayName": "Post Body",
  "helpText": "Add the body of your post here"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"isRequired\": false,\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "isRequired": false,
  "displayName": "Post Body",
  "helpText": "Add the body of your post here"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Delete field

DELETE https://api.webflow.com/v2/collections/{collection_id}/fields/{field_id}

Delete a custom field in a collection. This endpoint does not currently support bulk deletion.

Required scope | `cms:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-fields/delete

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Delete Collection Field
  version: endpoint_collections/fields.delete
paths:
  /collections/{collection_id}/fields/{field_id}:
    delete:
      operationId: delete
      summary: Delete Collection Field
      description: >
        Delete a custom field in a collection. This endpoint does not currently
        support bulk deletion.


        Required scope | `cms:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/fields
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: field_id
          in: path
          description: Unique identifier for a Field in a collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Request was successful. No Content is returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_fields_delete_Response_204'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    collections_fields_delete_Response_204:
      type: object
      properties: {}

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.fields.delete(
    collection_id="580e63fc8c9a982ac9b8b745",
    field_id="580e63fc8c9a982ac9b8b745",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.fields.delete("580e63fc8c9a982ac9b8b745", "580e63fc8c9a982ac9b8b745");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745"

	req, _ := http.NewRequest("DELETE", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.delete("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('DELETE', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745");
var request = new RestRequest(Method.DELETE);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "DELETE"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

---
title: Field Types & Item Values
description: A reference for all Webflow CMS field types and the value formats they accept.
slug: data/reference/field-types-item-values
hidden: false
'og:title': CMS Field Types & Item Values
'og:description': A reference for all Webflow CMS field types and the value formats they accept.
---

This page is a reference for all Webflow CMS field types and the value formats they accept. Use it to:

- Understand each field type’s purpose and behavior
- Learn how to format values when creating or updating items via the API

To retrieve the specific fields used in a collection, call the [Get Collection](/data/reference/cms/collections/get) endpoint.

<Note title="Field Type Names">
Some field types may use slightly different names in the Webflow UI. This document uses the API name for each field type.
</Note>

## [Plain Text](https://university.webflow.com/lesson/plain-text-field)

Stores text without formatting.

<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```
    "Always know where your towel is."
    ```
  </Tab>
</Tabs>

## [Rich Text](https://university.webflow.com/lesson/rich-text-field)

Stores long-form text with HTML formatting.

<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```html
    "<p>A small, blue-green planet orbiting an unregarded yellow sun in the uncharted backwaters of the Galaxy's western spiral arm.</p>
    <h3>Notable features</h3>
    <blockquote>It has a population of humans, who are mostly harmless. They have developed digital watches and are known for their ability to make tea.</blockquote>"
    ```
  </Tab>
</Tabs>

<Warning title="Code Blocks in Rich Text Fields">
  The API doesn't currently support code blocks in Rich Text fields. Passing code blocks will result in an empty string.
</Warning>

## [ImageRef / Image](https://university.webflow.com/lesson/image-field)

Stores a single image. Images must be hosted on a publicly accessible URL to be uploaded via the API. The maximum file size for images is 4MB.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Read Value">
    <CodeBlocks>
    ```javascript Format
    {
      "fileId": "string",
      "url": "string",
      "alt": "string" (optional)
    }
    ```
    ```javascript Example
    {
      "fileId": "6390ba25bfe63b0cca1dd136",
      "url": "https://.../image.jpg",
      "alt": "Marvin the Paranoid Android"
    }
    ```
    </CodeBlocks>
  </Tab>
  <Tab title="Write Value">
    To upload a new image, provide an object containing a `url`.
    <CodeBlocks>
    ```javascript title="New Upload"
    {
      "myImageField": {
        "url": "https://.../image.png",
        "alt": "Finn and Jake fist bumping"
      }
    }
    ```
    </CodeBlocks>
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## [Multi-Image](https://university.webflow.com/lesson/multi-image-field-overview)

Stores multiple images. Images must be hosted on a publicly accessible URL to be uploaded via the API. The maximum file size for each image is 4MB.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Read Value">
    <CodeBlocks>
    ```javascript Format
    [
      {
        "fileId": "string",
        "url": "string",
        "alt": "string" (optional)
      }
    ]
    ```
    ```json Example
    {
      "myImageField": [
        {
          "fileId": "6390ba25bfe63b0cca1dd136",
          "url": "https://.../image1.jpeg",
          "alt": "Marvin the Paranoid Android"
        },
        {
          "fileId": "6390ba25bfe63b0cca1dd137",
          "url": "https://.../image2.jpeg",
          "alt": "Vogon Poetry"
        }
      ]
    }
    ```
    </CodeBlocks>
  </Tab>
  <Tab title="Write Value">
    To upload new images, provide an array of objects, each containing a `url`.
    <CodeBlocks>
    ```javascript title="New Uploads"
    {
      "myImageField": [
        {
          "url": "https://.../image1.png",
          "alt": "Finn and Jake fist bumping"
        },
        {
          "url": "https://.../image2.png",
          "alt": "Finn and Jake hugging"
        }
      ]
    }
    ```
    </CodeBlocks>
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## VideoLink

Accepts a URL string for videos hosted on platforms like YouTube or Vimeo.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "myVideoLink": "https://www.youtube.com/watch?v=jfKfPfyJRdk"
    }
    ```
  </Tab>
</Tabs>

## [Link](https://university.webflow.com/lesson/link-field)

Stores a URL.

<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "myLink": "https://www.webflow.com"
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## [Email](https://university.webflow.com/lesson/email-field)

Stores an email address.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "myEmail": "hello@webflow.com"
    }
    ```
  </Tab>
</Tabs>

## [Phone](https://university.webflow.com/lesson/phone-field)

Stores a phone number.

<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "myPhone": "2024561111"
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## [Number](https://university.webflow.com/lesson/number-field)

Stores an integer or a decimal number.

{/* <!-- vale off --> */}

<Tabs>
  <Tab title="Value Format">
    ```
    number
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "myNumber": 42
    }
    ```
  </Tab>
</Tabs>

## [Date/Time](https://university.webflow.com/lesson/date-time-field)

Stores a date and time.

<Tabs>
  <Tab title="Read Value Format">
    ```
    string (ISO 8601)
    ```
  </Tab>
  <Tab title="Write Value Format">
    ```
    Date | string (ISO 8601)
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "myDateTime": "2022-11-18T00:00:00.000Z"
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## [Switch](https://university.webflow.com/lesson/switch-field)

Stores a boolean value (`true` or `false`).

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Value Format">
    ```
    boolean
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "mostly-harmless": true
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## [Color](https://university.webflow.com/lesson/color-field-overview)

Stores a color value. Accepts HEX, RGB, HSL, and named color formats.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "bulldozer": "#FFFF00"
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

Accepted formats include:
- `#RGB`
- `#RGBA`
- `#RRGGBB`
- `#RRGGBBAA`
- `rgb(red,green,blue)`
- `rgba(red,green,blue,alpha)`
- `hsl(hue,saturation,lightness)`
- `hsla(hue,saturation,lightness,alpha)`
- `orchid`, `aqua`, `black`, etc.
- `transparent`


## [Option](https://university.webflow.com/lesson/option-field)

Creates a predefined list of choices for an item.

### Create an Option Field
To create an Option field, send a `POST` request to the [Create Field](/data/reference/cms/collection-fields/create) endpoint. The request body must include `"type": "Option"` and a `metadata` object containing an `options` array. Each object in the array defines a choice with a `name`.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Create Field Request">
    ```javascript
    {
      "type": "Option",
      "displayName": "milliways-drink-menu",
      "metadata": {
        "options": [
          {"name": "pan-galactic gargle blaster"},
          {"name": "waturi punch"},
          {"name": "gnab gib"}
        ]
      }
    }
    ```
  </Tab>
  <Tab title="Read Field Definition">
    ```javascript
    {
      "type": "Option",
      "validations": {
        "options": [
          {
            "name": "pan-galactic gargle blaster",
            "id": "a1b2c3d4"
          },
          // ...
        ]
      }
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

### Write an option value
To set an option for an item, get the option `id` of the desired option and pass it as a string. You can get the option `id` by calling the [Get Collection Details](/data/reference/cms/collections/get) endpoint and then searching for the option field and it's metadata in the `fields` array.

<Tabs>
  <Tab title="Value Format">
    ```
    string (Option ID)
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "milliways-drink-menu": "a1b2c3d4"
    }
    ```
  </Tab>
</Tabs>


## File

Stores a file reference. You can upload a new file from a public URL or use an existing file by referencing its `fileId`.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Read Value">
    ```javascript
    {
      "fileId": "string",
      "url": "string",
      "alt"?: "string"
    }
    ```
  </Tab>
  <Tab title="Write Value">
    ```javascript
    {
      "url": "https://data.wa.gov/api/views/f6w7-q2d2/rows.csv"
      alt"?: "Electric Vehicle Data"
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## [ItemRef / Reference](https://university.webflow.com/lesson/reference-field)

Links an item to another item in the same or a different collection.

### Create a reference field
To create a Reference field, send a `POST` request to the [Create Field](/data/reference/cms/collection-fields/create) endpoint. The request body must include `"type": "Reference"` and a `metadata` object containing the `collectionId` of the collection you want to reference.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Create Field Request">
    ```javascript
    // Include the metadata property in the request body
    {
      "type": "Reference",
      "displayName": "Author",
      "helpText": "Add the post author here",
      "metadata": {
        "collectionId": "63692ab61fb2852f582ba8f5"
      }
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

### Write a reference value
To set a reference for an item, get the item `id` of the referenced item and pass it as a string. You can get the item `id` by calling the [Get Items](/data/reference/cms/collection-items/staged-items/list-items) endpoint for the referenced collection.

<Tabs>
  <Tab title="Value Format">
    ```
    string (Item ID)
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "author": "63764ec7981aa0138e99abc"
    }
    ```
  </Tab>
</Tabs>

## [Multi-Reference](https://university.webflow.com/lesson/multi-reference-field)

Links an item to multiple items in the same or a different collection.

### Create a multi-reference field
To create a Multi-Reference field, send a `POST` request to the [Create Field](/data/reference/cms/collection-fields/create) endpoint. The request body must include `"type": "MultiReference"` and a `metadata` object containing the `collectionId` of the collection you want to reference.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Create Field Request">
    ```javascript
    // Include the metadata property in the request body
    {
      "type": "MultiReference",
      "displayName": "Authors",
      "helpText": "Add post authors here",
      "metadata": {
        "collectionId": "63692ab61fb2852f582ba8f5"
      }
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

### Write a multi-reference value
To set multiple references for an item, pass an array of item `id` strings.

<Tabs>
  <Tab title="Value Format">
    ```
    [string, string] (Item IDs)
    ```
  </Tab>
  <Tab title="Example">

    ```json
    {
      "authors": [
        "63764ec7981aa0138e99abc",
        "63764ec7981aa0138e99abd"
      ]
    }
    ```
  </Tab>
</Tabs>


## User

A read-only field containing the unique ID of a Webflow user. This field is used for the "created-by" and "updated-by" properties on an item.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```
    "Person_63209baeac0b804b455624ce"
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}


# List Items

GET https://api.webflow.com/v2/collections/{collection_id}/items

List of all Items within a Collection.

Required scope | `CMS:read`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/staged-items/list-items

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: List Collection Items
  version: endpoint_collections/items.list-items
paths:
  /collections/{collection_id}/items:
    get:
      operationId: list-items
      summary: List Collection Items
      description: |
        List of all Items within a Collection.

        Required scope | `CMS:read`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: cmsLocaleId
          in: query
          description: >-
            Unique identifier for a CMS Locale. This UID is different from the
            Site locale identifier and is listed as `cmsLocaleId` in the Sites
            response. To query multiple locales, input a comma separated string.
          required: false
          schema:
            type: string
        - name: offset
          in: query
          description: >-
            Offset used for pagination if the results have more than limit
            records
          required: false
          schema:
            type: number
            format: double
        - name: limit
          in: query
          description: 'Maximum number of records to be returned (max limit: 100)'
          required: false
          schema:
            type: number
            format: double
        - name: name
          in: query
          description: Filter by the exact name of the item(s)
          required: false
          schema:
            type: string
        - name: slug
          in: query
          description: Filter by the exact slug of the item
          required: false
          schema:
            type: string
        - name: lastPublished
          in: query
          description: Filter by the last published date of the item(s)
          required: false
          schema:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsGetParametersLastPublished
        - name: sortBy
          in: query
          description: Sort results by the provided value
          required: false
          schema:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsGetParametersSortBy
        - name: sortOrder
          in: query
          description: Sorts the results by asc or desc
          required: false
          schema:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsGetParametersSortOrder
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_items_list-items_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    CollectionsCollectionIdItemsGetParametersLastPublished:
      type: object
      properties:
        lte:
          type: string
          format: date-time
        gte:
          type: string
          format: date-time
    CollectionsCollectionIdItemsGetParametersSortBy:
      type: string
      enum:
        - value: lastPublished
        - value: name
        - value: slug
    CollectionsCollectionIdItemsGetParametersSortOrder:
      type: string
      enum:
        - value: asc
        - value: desc
    CollectionsCollectionIdItemsGetResponsesContentApplicationJsonSchemaItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsGetResponsesContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsGetResponsesContentApplicationJsonSchemaItemsItemsFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    CollectionsCollectionIdItemsGetResponsesContentApplicationJsonSchemaPagination:
      type: object
      properties:
        limit:
          type: number
          format: double
        offset:
          type: number
          format: double
        total:
          type: number
          format: double
    collections_items_list-items_Response_200:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsGetResponsesContentApplicationJsonSchemaItemsItems
        pagination:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsGetResponsesContentApplicationJsonSchemaPagination
      required:
        - items
        - pagination

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.list_items(
    collection_id="580e63fc8c9a982ac9b8b745",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.listItems("580e63fc8c9a982ac9b8b745");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?offset=0&limit=100"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?offset=0&limit=100")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?offset=0&limit=100")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?offset=0&limit=100', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?offset=0&limit=100");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?offset=0&limit=100")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Get Item

GET https://api.webflow.com/v2/collections/{collection_id}/items/{item_id}

Get details of a selected Collection Item.

Required scope | `CMS:read`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/staged-items/get-item

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Collection Item
  version: endpoint_collections/items.get-item
paths:
  /collections/{collection_id}/items/{item_id}:
    get:
      operationId: get-item
      summary: Get Collection Item
      description: |
        Get details of a selected Collection Item.

        Required scope | `CMS:read`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: item_id
          in: path
          description: Unique identifier for an Item
          required: true
          schema:
            type: string
            format: objectid
        - name: cmsLocaleId
          in: query
          description: >-
            Unique identifier for a CMS Locale. This UID is different from the
            Site locale identifier and is listed as `cmsLocaleId` in the Sites
            response. To query multiple locales, input a comma separated string.
          required: false
          schema:
            type: string
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_items_get-item_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    CollectionsCollectionIdItemsItemIdGetResponsesContentApplicationJsonSchemaFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    collections_items_get-item_Response_200:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsItemIdGetResponsesContentApplicationJsonSchemaFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - isArchived
        - isDraft
        - fieldData

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.get_item(
    collection_id="580e63fc8c9a982ac9b8b745",
    item_id="580e64008c9a982ac9b8b754",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.getItem("580e63fc8c9a982ac9b8b745", "580e64008c9a982ac9b8b754");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Create Items

POST https://api.webflow.com/v2/collections/{collection_id}/items/bulk
Content-Type: application/json

Create an item or multiple items in a CMS Collection across multiple corresponding locales.

<Note>
  - This endpoint can create up to 100 items in a request.
  - If the `cmsLocaleIds` parameter is not included in the request, an item will only be created in the primary locale.
</Note>

Required scope | `CMS:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/staged-items/create-item

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Create Collection Items
  version: endpoint_collections/items.create-items
paths:
  /collections/{collection_id}/items/bulk:
    post:
      operationId: create-items
      summary: Create Collection Items
      description: >
        Create an item or multiple items in a CMS Collection across multiple
        corresponding locales.


        <Note>
          - This endpoint can create up to 100 items in a request.
          - If the `cmsLocaleIds` parameter is not included in the request, an item will only be created in the primary locale.
        </Note>


        Required scope | `CMS:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: skipInvalidFiles
          in: query
          description: >-
            When true, invalid files are skipped and processing continues. When
            false, the entire request fails if any file is invalid.
          required: false
          schema:
            type: boolean
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '202':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_create-items_Response_202
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                cmsLocaleIds:
                  type: array
                  items:
                    type: string
                lastPublished:
                  type: string
                  format: date-string
                lastUpdated:
                  type: string
                  format: date-string
                createdOn:
                  type: string
                  format: date-string
                isArchived:
                  type: boolean
                isDraft:
                  type: boolean
                fieldData:
                  $ref: >-
                    #/components/schemas/CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldData
              required:
                - fieldData
components:
  schemas:
    CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldData0:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldDataOneOf1Items:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldData1:
      type: array
      items:
        $ref: >-
          #/components/schemas/CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldDataOneOf1Items
    CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldData:
      oneOf:
        - $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldData0
        - $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldData1
    CollectionsCollectionIdItemsBulkPostResponsesContentApplicationJsonSchemaFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
    collections_items_create-items_Response_202:
      type: object
      properties:
        id:
          type: string
        cmsLocaleIds:
          type: array
          items:
            type: string
        lastPublished:
          type:
            - string
            - 'null'
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsBulkPostResponsesContentApplicationJsonSchemaFieldData
      required:
        - id
        - cmsLocaleIds
        - lastPublished
        - lastUpdated
        - createdOn
        - isArchived
        - isDraft
        - fieldData

```

## SDK Code Examples

```python Single item created across multiple locales
from webflow import Webflow
from webflow.resources.collections.resources.items import SingleCmsItem

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.create_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    cms_locale_ids=[
        "66f6e966c9e1dc700a857ca3",
        "66f6e966c9e1dc700a857ca4",
        "66f6e966c9e1dc700a857ca5",
    ],
    is_archived=False,
    is_draft=False,
    field_data=SingleCmsItem(
        name="Don’t Panic",
        slug="dont-panic",
    ),
)

```

```typescript Single item created across multiple locales
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.createItems("580e63fc8c9a982ac9b8b745", {
    cmsLocaleIds: ["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4", "66f6e966c9e1dc700a857ca5"],
    isArchived: false,
    isDraft: false,
    fieldData: {
        name: "Don\u2019t Panic",
        slug: "dont-panic"
    }
});

```

```go Single item created across multiple locales
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Single item created across multiple locales
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

```java Single item created across multiple locales
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .asString();
```

```php Single item created across multiple locales
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Single item created across multiple locales
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
IRestResponse response = client.Execute(request);
```

```swift Single item created across multiple locales
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python Multiple items created across multiple locales
from webflow import Webflow
from webflow.resources.collections.resources.items import SingleCmsItem

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.create_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    cms_locale_ids=[
        "66f6e966c9e1dc700a857ca3",
        "66f6e966c9e1dc700a857ca4",
        "66f6e966c9e1dc700a857ca5",
    ],
    is_archived=False,
    is_draft=False,
    field_data=SingleCmsItem(
        name="Don’t Panic",
        slug="dont-panic",
    ),
)

```

```typescript Multiple items created across multiple locales
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.createItems("580e63fc8c9a982ac9b8b745", {
    cmsLocaleIds: ["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4", "66f6e966c9e1dc700a857ca5"],
    isArchived: false,
    isDraft: false,
    fieldData: {
        name: "Don\u2019t Panic",
        slug: "dont-panic"
    }
});

```

```go Multiple items created across multiple locales
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Multiple items created across multiple locales
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

```java Multiple items created across multiple locales
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .asString();
```

```php Multiple items created across multiple locales
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Multiple items created across multiple locales
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
IRestResponse response = client.Execute(request);
```

```swift Multiple items created across multiple locales
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python Create a single item across multiple locales
from webflow import Webflow
from webflow.resources.collections.resources.items import SingleCmsItem

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.create_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    cms_locale_ids=[
        "66f6e966c9e1dc700a857ca3",
        "66f6e966c9e1dc700a857ca4",
        "66f6e966c9e1dc700a857ca5",
    ],
    is_archived=False,
    is_draft=False,
    field_data=SingleCmsItem(
        name="Don’t Panic",
        slug="dont-panic",
    ),
)

```

```typescript Create a single item across multiple locales
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.createItems("580e63fc8c9a982ac9b8b745", {
    cmsLocaleIds: ["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4", "66f6e966c9e1dc700a857ca5"],
    isArchived: false,
    isDraft: false,
    fieldData: {
        name: "Don\u2019t Panic",
        slug: "dont-panic"
    }
});

```

```go Create a single item across multiple locales
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"fieldData\": {\n    \"name\": \"Don’t Panic\",\n    \"slug\": \"dont-panic\"\n  },\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\",\n    \"66f6e966c9e1dc700a857ca5\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Create a single item across multiple locales
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"fieldData\": {\n    \"name\": \"Don’t Panic\",\n    \"slug\": \"dont-panic\"\n  },\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\",\n    \"66f6e966c9e1dc700a857ca5\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}"

response = http.request(request)
puts response.read_body
```

```java Create a single item across multiple locales
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"fieldData\": {\n    \"name\": \"Don’t Panic\",\n    \"slug\": \"dont-panic\"\n  },\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\",\n    \"66f6e966c9e1dc700a857ca5\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}")
  .asString();
```

```php Create a single item across multiple locales
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true', [
  'body' => '{
  "fieldData": {
    "name": "Don’t Panic",
    "slug": "dont-panic"
  },
  "cmsLocaleIds": [
    "66f6e966c9e1dc700a857ca3",
    "66f6e966c9e1dc700a857ca4",
    "66f6e966c9e1dc700a857ca5"
  ],
  "isArchived": false,
  "isDraft": false
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Create a single item across multiple locales
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"fieldData\": {\n    \"name\": \"Don’t Panic\",\n    \"slug\": \"dont-panic\"\n  },\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\",\n    \"66f6e966c9e1dc700a857ca5\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Create a single item across multiple locales
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "fieldData": [
    "name": "Don’t Panic",
    "slug": "dont-panic"
  ],
  "cmsLocaleIds": ["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4", "66f6e966c9e1dc700a857ca5"],
  "isArchived": false,
  "isDraft": false
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python Create multiple items across multiple locales
from webflow import Webflow
from webflow.resources.collections.resources.items import (
    CreateBulkCollectionItemRequestBodyFieldDataItem,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.create_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    cms_locale_ids=["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4"],
    is_archived=False,
    is_draft=False,
    field_data=[
        CreateBulkCollectionItemRequestBodyFieldDataItem(
            name="Don’t Panic",
            slug="dont-panic",
        ),
        CreateBulkCollectionItemRequestBodyFieldDataItem(
            name="So Long and Thanks for All the Fish",
            slug="so-long-and-thanks",
        ),
    ],
)

```

```typescript Create multiple items across multiple locales
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.createItems("580e63fc8c9a982ac9b8b745", {
    cmsLocaleIds: ["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4"],
    isArchived: false,
    isDraft: false,
    fieldData: [{
            name: "Don\u2019t Panic",
            slug: "dont-panic"
        }, {
            name: "So Long and Thanks for All the Fish",
            slug: "so-long-and-thanks"
        }]
});

```

```go Create multiple items across multiple locales
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"fieldData\": [\n    {\n      \"name\": \"Don’t Panic\",\n      \"slug\": \"dont-panic\"\n    },\n    {\n      \"name\": \"So Long and Thanks for All the Fish\",\n      \"slug\": \"so-long-and-thanks\"\n    }\n  ],\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Create multiple items across multiple locales
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"fieldData\": [\n    {\n      \"name\": \"Don’t Panic\",\n      \"slug\": \"dont-panic\"\n    },\n    {\n      \"name\": \"So Long and Thanks for All the Fish\",\n      \"slug\": \"so-long-and-thanks\"\n    }\n  ],\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}"

response = http.request(request)
puts response.read_body
```

```java Create multiple items across multiple locales
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"fieldData\": [\n    {\n      \"name\": \"Don’t Panic\",\n      \"slug\": \"dont-panic\"\n    },\n    {\n      \"name\": \"So Long and Thanks for All the Fish\",\n      \"slug\": \"so-long-and-thanks\"\n    }\n  ],\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}")
  .asString();
```

```php Create multiple items across multiple locales
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true', [
  'body' => '{
  "fieldData": [
    {
      "name": "Don’t Panic",
      "slug": "dont-panic"
    },
    {
      "name": "So Long and Thanks for All the Fish",
      "slug": "so-long-and-thanks"
    }
  ],
  "cmsLocaleIds": [
    "66f6e966c9e1dc700a857ca3",
    "66f6e966c9e1dc700a857ca4"
  ],
  "isArchived": false,
  "isDraft": false
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Create multiple items across multiple locales
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"fieldData\": [\n    {\n      \"name\": \"Don’t Panic\",\n      \"slug\": \"dont-panic\"\n    },\n    {\n      \"name\": \"So Long and Thanks for All the Fish\",\n      \"slug\": \"so-long-and-thanks\"\n    }\n  ],\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Create multiple items across multiple locales
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "fieldData": [
    [
      "name": "Don’t Panic",
      "slug": "dont-panic"
    ],
    [
      "name": "So Long and Thanks for All the Fish",
      "slug": "so-long-and-thanks"
    ]
  ],
  "cmsLocaleIds": ["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4"],
  "isArchived": false,
  "isDraft": false
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Update Items

PATCH https://api.webflow.com/v2/collections/{collection_id}/items
Content-Type: application/json

Update a single item or multiple items in a Collection.

The limit for this endpoint is 100 items.

<Tip title="Localization Tip">Items will only be updated in the primary locale, unless a `cmsLocaleId` is included in the request.</Tip>

Required scope | `CMS:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/staged-items/update-items

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Update Collection Items
  version: endpoint_collections/items.update-items
paths:
  /collections/{collection_id}/items:
    patch:
      operationId: update-items
      summary: Update Collection Items
      description: >
        Update a single item or multiple items in a Collection.


        The limit for this endpoint is 100 items.


        <Tip title="Localization Tip">Items will only be updated in the primary
        locale, unless a `cmsLocaleId` is included in the request.</Tip>


        Required scope | `CMS:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: skipInvalidFiles
          in: query
          description: >-
            When true, invalid files are skipped and processing continues. When
            false, the entire request fails if any file is invalid.
          required: false
          schema:
            type: boolean
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_update-items_Response_200
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: Details of the item to update
        content:
          application/json:
            schema:
              type: object
              properties:
                items:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/CollectionsCollectionIdItemsPatchRequestBodyContentApplicationJsonSchemaItemsItems
components:
  schemas:
    CollectionsCollectionIdItemsPatchRequestBodyContentApplicationJsonSchemaItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
    CollectionsCollectionIdItemsPatchRequestBodyContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsPatchRequestBodyContentApplicationJsonSchemaItemsItemsFieldData
      required:
        - id
    CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf0FieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsItemsUpdateItemsResponse2000:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf0FieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf1ItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf1ItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf1ItemsItemsFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf1Pagination:
      type: object
      properties:
        limit:
          type: number
          format: double
        offset:
          type: number
          format: double
        total:
          type: number
          format: double
    CollectionsItemsUpdateItemsResponse2001:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf1ItemsItems
        pagination:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf1Pagination
    collections_items_update-items_Response_200:
      oneOf:
        - $ref: '#/components/schemas/CollectionsItemsUpdateItemsResponse2000'
        - $ref: '#/components/schemas/CollectionsItemsUpdateItemsResponse2001'

```

## SDK Code Examples

```python LocalizedItems
from webflow import (
    CollectionItemWithIdInput,
    CollectionItemWithIdInputFieldData,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.update_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Ne Paniquez Pas",
                slug="ne-paniquez-pas",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="No Entrar en Pánico",
                slug="no-entrar-en-panico",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Au Revoir et Merci pour Tous les Poissons",
                slug="au-revoir-et-merci",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="Hasta Luego y Gracias por Todo el Pescado",
                slug="hasta-luego-y-gracias",
            ),
        ),
    ],
)

```

```typescript LocalizedItems
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.updateItems("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Ne Paniquez Pas",
                slug: "ne-paniquez-pas"
            }
        }, {
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "No Entrar en P\u00E1nico",
                slug: "no-entrar-en-panico"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Au Revoir et Merci pour Tous les Poissons",
                slug: "au-revoir-et-merci"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "Hasta Luego y Gracias por Todo el Pescado",
                slug: "hasta-luego-y-gracias"
            }
        }]
});

```

```go LocalizedItems
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}")

	req, _ := http.NewRequest("PATCH", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby LocalizedItems
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java LocalizedItems
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}")
  .asString();
```

```php LocalizedItems
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true', [
  'body' => '{
  "items": [
    {
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": {
        "name": "Ne Paniquez Pas",
        "slug": "ne-paniquez-pas",
        "featured": false
      }
    },
    {
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": {
        "name": "No Entrar en Pánico",
        "slug": "no-entrar-en-panico",
        "featured": false
      }
    },
    {
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": {
        "name": "Au Revoir et Merci pour Tous les Poissons",
        "slug": "au-revoir-et-merci",
        "featured": false
      }
    },
    {
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": {
        "name": "Hasta Luego y Gracias por Todo el Pescado",
        "slug": "hasta-luego-y-gracias",
        "featured": false
      }
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp LocalizedItems
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift LocalizedItems
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": [
        "name": "Ne Paniquez Pas",
        "slug": "ne-paniquez-pas",
        "featured": false
      ]
    ],
    [
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": [
        "name": "No Entrar en Pánico",
        "slug": "no-entrar-en-panico",
        "featured": false
      ]
    ],
    [
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": [
        "name": "Au Revoir et Merci pour Tous les Poissons",
        "slug": "au-revoir-et-merci",
        "featured": false
      ]
    ],
    [
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": [
        "name": "Hasta Luego y Gracias por Todo el Pescado",
        "slug": "hasta-luego-y-gracias",
        "featured": false
      ]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python MultipleItems
from webflow import (
    CollectionItemWithIdInput,
    CollectionItemWithIdInputFieldData,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.update_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        CollectionItemWithIdInput(
            id="580e64008c9a982ac9b8b754",
            is_archived=False,
            is_draft=False,
            field_data=CollectionItemWithIdInputFieldData(
                name="Senior Data Analyst",
                slug="senior-data-analyst",
            ),
        ),
        CollectionItemWithIdInput(
            id="580e64008c9a982ac9b8b754",
            is_archived=False,
            is_draft=False,
            field_data=CollectionItemWithIdInputFieldData(
                name="Product Manager",
                slug="product-manager",
            ),
        ),
    ],
)

```

```typescript MultipleItems
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.updateItems("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "580e64008c9a982ac9b8b754",
            isArchived: false,
            isDraft: false,
            fieldData: {
                name: "Senior Data Analyst",
                slug: "senior-data-analyst"
            }
        }, {
            id: "580e64008c9a982ac9b8b754",
            isArchived: false,
            isDraft: false,
            fieldData: {
                name: "Product Manager",
                slug: "product-manager"
            }
        }]
});

```

```go MultipleItems
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}")

	req, _ := http.NewRequest("PATCH", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby MultipleItems
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java MultipleItems
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}")
  .asString();
```

```php MultipleItems
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true', [
  'body' => '{
  "items": [
    {
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": {
        "name": "Senior Data Analyst",
        "slug": "senior-data-analyst",
        "url": "https://boards.greenhouse.io/webflow/jobs/26567701",
        "department": "Data"
      }
    },
    {
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": {
        "name": "Product Manager",
        "slug": "product-manager",
        "url": "https://boards.greenhouse.io/webflow/jobs/31234567",
        "department": "Product"
      }
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp MultipleItems
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift MultipleItems
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": [
        "name": "Senior Data Analyst",
        "slug": "senior-data-analyst",
        "url": "https://boards.greenhouse.io/webflow/jobs/26567701",
        "department": "Data"
      ]
    ],
    [
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": [
        "name": "Product Manager",
        "slug": "product-manager",
        "url": "https://boards.greenhouse.io/webflow/jobs/31234567",
        "department": "Product"
      ]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Delete Items

DELETE https://api.webflow.com/v2/collections/{collection_id}/items
Content-Type: application/json

Delete Items from a Collection.

<Tip title="Localization Tip">Items will only be deleted in the primary locale unless a `cmsLocaleId` is included in the request.</Tip>

Required scope | `CMS:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/staged-items/delete-items

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Delete Collection Items
  version: endpoint_collections/items.delete-items
paths:
  /collections/{collection_id}/items:
    delete:
      operationId: delete-items
      summary: Delete Collection Items
      description: >
        Delete Items from a Collection.


        <Tip title="Localization Tip">Items will only be deleted in the primary
        locale unless a `cmsLocaleId` is included in the request.</Tip>


        Required scope | `CMS:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_delete-items_Response_204
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '409':
          description: Site is published to multiple domains at different times
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: Details of the items to delete
        content:
          application/json:
            schema:
              type: object
              properties:
                items:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/CollectionsCollectionIdItemsDeleteRequestBodyContentApplicationJsonSchemaItemsItems
              required:
                - items
components:
  schemas:
    CollectionsCollectionIdItemsDeleteRequestBodyContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleIds:
          type: array
          items:
            type: string
      required:
        - id
    collections_items_delete-items_Response_204:
      type: object
      properties: {}

```

## SDK Code Examples

```python
from webflow import Webflow
from webflow.resources.collections.resources.items import (
    ItemsDeleteItemsRequestItemsItem,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.delete_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        ItemsDeleteItemsRequestItemsItem(
            id="580e64008c9a982ac9b8b754",
        )
    ],
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.deleteItems("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "580e64008c9a982ac9b8b754"
        }]
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}")

	req, _ := http.NewRequest("DELETE", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.delete("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('DELETE', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items', [
  'body' => '{
  "items": [
    {
      "id": "580e64008c9a982ac9b8b754"
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items");
var request = new RestRequest(Method.DELETE);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [["id": "580e64008c9a982ac9b8b754"]]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "DELETE"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Publish Items

POST https://api.webflow.com/v2/collections/{collection_id}/items/publish
Content-Type: application/json

Publish an item or multiple items.

Required scope | `cms:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/staged-items/publish-item

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Publish Collection Item
  version: endpoint_collections/items.publish-item
paths:
  /collections/{collection_id}/items/publish:
    post:
      operationId: publish-item
      summary: Publish Collection Item
      description: |
        Publish an item or multiple items.

        Required scope | `cms:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '202':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_publish-item_Response_202
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '409':
          description: Site is published to multiple domains at different times
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: An array of Item IDs
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/collections_items_publish-item_Request'
components:
  schemas:
    CollectionsItemsPublishItemRequest0:
      type: object
      properties:
        itemIds:
          type: array
          items:
            type: string
            format: objectid
    CollectionsCollectionIdItemsPublishPostRequestBodyContentApplicationJsonSchemaOneOf1ItemsItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        cmsLocaleIds:
          type: array
          items:
            type: string
      required:
        - id
    CollectionsItemsPublishItemRequest1:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsPublishPostRequestBodyContentApplicationJsonSchemaOneOf1ItemsItems
    collections_items_publish-item_Request:
      oneOf:
        - $ref: '#/components/schemas/CollectionsItemsPublishItemRequest0'
        - $ref: '#/components/schemas/CollectionsItemsPublishItemRequest1'
    collections_items_publish-item_Response_202:
      type: object
      properties:
        publishedItemIds:
          type: array
          items:
            type: string
        errors:
          type: array
          items:
            type: string

```

## SDK Code Examples

```python collections_items_publish-item_example
from webflow import Webflow
from webflow.resources.collections.resources.items import (
    ItemIDsWithLocales,
    ItemsPublishItemRequestItemsItemsItem,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.publish_item(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=ItemIDsWithLocales(
        items=[
            ItemsPublishItemRequestItemsItemsItem(
                id="643fd856d66b6528195ee2ca",
                cms_locale_ids=[
                    "653ad57de882f528b32e810e",
                    "6514390aea353fc691d69827",
                    "65143930ea353fc691d69cd8",
                ],
            )
        ],
    ),
)

```

```typescript collections_items_publish-item_example
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.publishItem("580e63fc8c9a982ac9b8b745", {
    itemIds: ["643fd856d66b6528195ee2ca", "643fd856d66b6528195ee2cb", "643fd856d66b6528195ee2cc"]
});

```

```go collections_items_publish-item_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby collections_items_publish-item_example
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

```java collections_items_publish-item_example
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .asString();
```

```php collections_items_publish-item_example
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp collections_items_publish-item_example
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
IRestResponse response = client.Execute(request);
```

```swift collections_items_publish-item_example
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python PrimaryLocale
from webflow import Webflow
from webflow.resources.collections.resources.items import ItemIDs

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.publish_item(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=ItemIDs(
        item_ids=[
            "643fd856d66b6528195ee2ca",
            "643fd856d66b6528195ee2cb",
            "643fd856d66b6528195ee2cc",
        ],
    ),
)

```

```typescript PrimaryLocale
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.publishItem("580e63fc8c9a982ac9b8b745", {
    itemIds: ["643fd856d66b6528195ee2ca", "643fd856d66b6528195ee2cb", "643fd856d66b6528195ee2cc"]
});

```

```go PrimaryLocale
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish"

	payload := strings.NewReader("{\n  \"itemIds\": [\n    \"643fd856d66b6528195ee2ca\",\n    \"643fd856d66b6528195ee2cb\",\n    \"643fd856d66b6528195ee2cc\"\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby PrimaryLocale
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"itemIds\": [\n    \"643fd856d66b6528195ee2ca\",\n    \"643fd856d66b6528195ee2cb\",\n    \"643fd856d66b6528195ee2cc\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java PrimaryLocale
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"itemIds\": [\n    \"643fd856d66b6528195ee2ca\",\n    \"643fd856d66b6528195ee2cb\",\n    \"643fd856d66b6528195ee2cc\"\n  ]\n}")
  .asString();
```

```php PrimaryLocale
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish', [
  'body' => '{
  "itemIds": [
    "643fd856d66b6528195ee2ca",
    "643fd856d66b6528195ee2cb",
    "643fd856d66b6528195ee2cc"
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp PrimaryLocale
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"itemIds\": [\n    \"643fd856d66b6528195ee2ca\",\n    \"643fd856d66b6528195ee2cb\",\n    \"643fd856d66b6528195ee2cc\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift PrimaryLocale
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["itemIds": ["643fd856d66b6528195ee2ca", "643fd856d66b6528195ee2cb", "643fd856d66b6528195ee2cc"]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python SecondaryLocale
from webflow import Webflow
from webflow.resources.collections.resources.items import (
    ItemIDsWithLocales,
    ItemsPublishItemRequestItemsItemsItem,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.publish_item(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=ItemIDsWithLocales(
        items=[
            ItemsPublishItemRequestItemsItemsItem(
                id="643fd856d66b6528195ee2ca",
                cms_locale_ids=["653ad57de882f528b32e810e"],
            ),
            ItemsPublishItemRequestItemsItemsItem(
                id="643fd856d66b6528195ee2cb",
                cms_locale_ids=["653ad57de882f528b32e810e"],
            ),
            ItemsPublishItemRequestItemsItemsItem(
                id="643fd856d66b6528195ee2cc",
                cms_locale_ids=["653ad57de882f528b32e810e"],
            ),
        ],
    ),
)

```

```typescript SecondaryLocale
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.publishItem("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "643fd856d66b6528195ee2ca",
            cmsLocaleIds: ["653ad57de882f528b32e810e"]
        }, {
            id: "643fd856d66b6528195ee2cb",
            cmsLocaleIds: ["653ad57de882f528b32e810e"]
        }, {
            id: "643fd856d66b6528195ee2cc",
            cmsLocaleIds: ["653ad57de882f528b32e810e"]
        }]
});

```

```go SecondaryLocale
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cb\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cc\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby SecondaryLocale
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cb\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cc\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java SecondaryLocale
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cb\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cc\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    }\n  ]\n}")
  .asString();
```

```php SecondaryLocale
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish', [
  'body' => '{
  "items": [
    {
      "id": "643fd856d66b6528195ee2ca",
      "cmsLocaleIds": [
        "653ad57de882f528b32e810e"
      ]
    },
    {
      "id": "643fd856d66b6528195ee2cb",
      "cmsLocaleIds": [
        "653ad57de882f528b32e810e"
      ]
    },
    {
      "id": "643fd856d66b6528195ee2cc",
      "cmsLocaleIds": [
        "653ad57de882f528b32e810e"
      ]
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp SecondaryLocale
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cb\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cc\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift SecondaryLocale
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "id": "643fd856d66b6528195ee2ca",
      "cmsLocaleIds": ["653ad57de882f528b32e810e"]
    ],
    [
      "id": "643fd856d66b6528195ee2cb",
      "cmsLocaleIds": ["653ad57de882f528b32e810e"]
    ],
    [
      "id": "643fd856d66b6528195ee2cc",
      "cmsLocaleIds": ["653ad57de882f528b32e810e"]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python MultipleLocales
from webflow import Webflow
from webflow.resources.collections.resources.items import (
    ItemIDsWithLocales,
    ItemsPublishItemRequestItemsItemsItem,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.publish_item(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=ItemIDsWithLocales(
        items=[
            ItemsPublishItemRequestItemsItemsItem(
                id="643fd856d66b6528195ee2ca",
                cms_locale_ids=[
                    "653ad57de882f528b32e810e",
                    "6514390aea353fc691d69827",
                    "65143930ea353fc691d69cd8",
                ],
            )
        ],
    ),
)

```

```typescript MultipleLocales
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.publishItem("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "643fd856d66b6528195ee2ca",
            cmsLocaleIds: ["653ad57de882f528b32e810e", "6514390aea353fc691d69827", "65143930ea353fc691d69cd8"]
        }]
});

```

```go MultipleLocales
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\",\n        \"6514390aea353fc691d69827\",\n        \"65143930ea353fc691d69cd8\"\n      ]\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby MultipleLocales
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\",\n        \"6514390aea353fc691d69827\",\n        \"65143930ea353fc691d69cd8\"\n      ]\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java MultipleLocales
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\",\n        \"6514390aea353fc691d69827\",\n        \"65143930ea353fc691d69cd8\"\n      ]\n    }\n  ]\n}")
  .asString();
```

```php MultipleLocales
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish', [
  'body' => '{
  "items": [
    {
      "id": "643fd856d66b6528195ee2ca",
      "cmsLocaleIds": [
        "653ad57de882f528b32e810e",
        "6514390aea353fc691d69827",
        "65143930ea353fc691d69cd8"
      ]
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp MultipleLocales
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\",\n        \"6514390aea353fc691d69827\",\n        \"65143930ea353fc691d69cd8\"\n      ]\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift MultipleLocales
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "id": "643fd856d66b6528195ee2ca",
      "cmsLocaleIds": ["653ad57de882f528b32e810e", "6514390aea353fc691d69827", "65143930ea353fc691d69cd8"]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# List Live Items

GET https://api.webflow.com/v2/collections/{collection_id}/items/live

List all published items in a collection.

<Note title="Serve data with the Content Delivery API">
  To serve content to your other frontends applications, enterprise sites have access to a dedicated [content delivery API](/data/docs/cms-content-delivery), available at api-cdn.webflow.com.

</Note>

Required scope | `CMS:read`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/live-items/list-items-live

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: List Live Collection Items
  version: endpoint_collections/items.list-items-live
paths:
  /collections/{collection_id}/items/live:
    get:
      operationId: list-items-live
      summary: List Live Collection Items
      description: |
        List all published items in a collection.

        <Note title="Serve data with the Content Delivery API">
          To serve content to your other frontends applications, enterprise sites have access to a dedicated [content delivery API](/data/docs/cms-content-delivery), available at api-cdn.webflow.com.

        </Note>

        Required scope | `CMS:read`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: cmsLocaleId
          in: query
          description: >-
            Unique identifier for a CMS Locale. This UID is different from the
            Site locale identifier and is listed as `cmsLocaleId` in the Sites
            response. To query multiple locales, input a comma separated string.
          required: false
          schema:
            type: string
        - name: offset
          in: query
          description: >-
            Offset used for pagination if the results have more than limit
            records
          required: false
          schema:
            type: number
            format: double
        - name: limit
          in: query
          description: 'Maximum number of records to be returned (max limit: 100)'
          required: false
          schema:
            type: number
            format: double
        - name: name
          in: query
          description: Filter by the exact name of the item(s)
          required: false
          schema:
            type: string
        - name: slug
          in: query
          description: Filter by the exact slug of the item
          required: false
          schema:
            type: string
        - name: lastPublished
          in: query
          description: Filter by the last published date of the item(s)
          required: false
          schema:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsLiveGetParametersLastPublished
        - name: sortBy
          in: query
          description: Sort results by the provided value
          required: false
          schema:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsLiveGetParametersSortBy
        - name: sortOrder
          in: query
          description: Sorts the results by asc or desc
          required: false
          schema:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsLiveGetParametersSortOrder
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_list-items-live_Response_200
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    CollectionsCollectionIdItemsLiveGetParametersLastPublished:
      type: object
      properties:
        lte:
          type: string
          format: date-time
        gte:
          type: string
          format: date-time
    CollectionsCollectionIdItemsLiveGetParametersSortBy:
      type: string
      enum:
        - value: lastPublished
        - value: name
        - value: slug
    CollectionsCollectionIdItemsLiveGetParametersSortOrder:
      type: string
      enum:
        - value: asc
        - value: desc
    CollectionsCollectionIdItemsLiveGetResponsesContentApplicationJsonSchemaItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsLiveGetResponsesContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLiveGetResponsesContentApplicationJsonSchemaItemsItemsFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    CollectionsCollectionIdItemsLiveGetResponsesContentApplicationJsonSchemaPagination:
      type: object
      properties:
        limit:
          type: number
          format: double
        offset:
          type: number
          format: double
        total:
          type: number
          format: double
    collections_items_list-items-live_Response_200:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsLiveGetResponsesContentApplicationJsonSchemaItemsItems
        pagination:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLiveGetResponsesContentApplicationJsonSchemaPagination
      required:
        - items
        - pagination

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.list_items_live(
    collection_id="580e63fc8c9a982ac9b8b745",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.listItemsLive("580e63fc8c9a982ac9b8b745");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?offset=0&limit=100"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?offset=0&limit=100")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?offset=0&limit=100")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?offset=0&limit=100', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?offset=0&limit=100");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?offset=0&limit=100")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Get Live Item

GET https://api.webflow.com/v2/collections/{collection_id}/items/{item_id}/live

Get details of a selected Collection live Item.

<Note title="Serve data with the Content Delivery API">
  To serve content to your other frontends applications, enterprise sites have access to a dedicated [content delivery API](/data/docs/cms-content-delivery), available at api-cdn.webflow.com.

</Note>

Required scope | `CMS:read`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/live-items/get-item-live

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Live Collection Item
  version: endpoint_collections/items.get-item-live
paths:
  /collections/{collection_id}/items/{item_id}/live:
    get:
      operationId: get-item-live
      summary: Get Live Collection Item
      description: |
        Get details of a selected Collection live Item.

        <Note title="Serve data with the Content Delivery API">
          To serve content to your other frontends applications, enterprise sites have access to a dedicated [content delivery API](/data/docs/cms-content-delivery), available at api-cdn.webflow.com.

        </Note>

        Required scope | `CMS:read`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: item_id
          in: path
          description: Unique identifier for an Item
          required: true
          schema:
            type: string
            format: objectid
        - name: cmsLocaleId
          in: query
          description: >-
            Unique identifier for a CMS Locale. This UID is different from the
            Site locale identifier and is listed as `cmsLocaleId` in the Sites
            response. To query multiple locales, input a comma separated string.
          required: false
          schema:
            type: string
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_get-item-live_Response_200
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    CollectionsCollectionIdItemsItemIdLiveGetResponsesContentApplicationJsonSchemaFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    collections_items_get-item-live_Response_200:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsItemIdLiveGetResponsesContentApplicationJsonSchemaFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - isArchived
        - isDraft
        - fieldData

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.get_item_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    item_id="580e64008c9a982ac9b8b754",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.getItemLive("580e63fc8c9a982ac9b8b745", "580e64008c9a982ac9b8b754");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754/live"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754/live")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754/live")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754/live', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754/live");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754/live")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Create Live Items

POST https://api.webflow.com/v2/collections/{collection_id}/items/live
Content-Type: application/json

Create item(s) in a collection that will be immediately published to the live site.


To create items across multiple locales, [please use this endpoint.](/data/reference/cms/collection-items/staged-items/create-items)


Required scope | `CMS:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/live-items/create-item-live

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Create Live Collection Item(s)
  version: endpoint_collections/items.create-item-live
paths:
  /collections/{collection_id}/items/live:
    post:
      operationId: create-item-live
      summary: Create Live Collection Item(s)
      description: >
        Create item(s) in a collection that will be immediately published to the
        live site.



        To create items across multiple locales, [please use this
        endpoint.](/data/reference/cms/collection-items/staged-items/create-items)



        Required scope | `CMS:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: skipInvalidFiles
          in: query
          description: >-
            When true, invalid files are skipped and processing continues. When
            false, the entire request fails if any file is invalid.
          required: false
          schema:
            type: boolean
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '202':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_create-item-live_Response_202
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: Details of the item(s) to create
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/collections_items_create-item-live_Request'
components:
  schemas:
    CollectionsCollectionIdItemsLivePostRequestBodyContentApplicationJsonSchemaOneOf0FieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsItemsCreateItemLiveRequest0:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLivePostRequestBodyContentApplicationJsonSchemaOneOf0FieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    CollectionsCollectionIdItemsLivePostRequestBodyContentApplicationJsonSchemaOneOf1ItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsLivePostRequestBodyContentApplicationJsonSchemaOneOf1ItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLivePostRequestBodyContentApplicationJsonSchemaOneOf1ItemsItemsFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    CollectionsItemsCreateItemLiveRequest1:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsLivePostRequestBodyContentApplicationJsonSchemaOneOf1ItemsItems
    collections_items_create-item-live_Request:
      oneOf:
        - $ref: '#/components/schemas/CollectionsItemsCreateItemLiveRequest0'
        - $ref: '#/components/schemas/CollectionsItemsCreateItemLiveRequest1'
    CollectionsCollectionIdItemsLivePostResponsesContentApplicationJsonSchemaFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    collections_items_create-item-live_Response_202:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLivePostResponsesContentApplicationJsonSchemaFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - isArchived
        - isDraft
        - fieldData

```

## SDK Code Examples

```python
from webflow import CollectionItem, CollectionItemFieldData, Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.create_item_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=CollectionItem(
        is_archived=False,
        is_draft=False,
        field_data=CollectionItemFieldData(
            name="Pan Galactic Gargle Blaster Recipe",
            slug="pan-galactic-gargle-blaster",
        ),
    ),
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.createItemLive("580e63fc8c9a982ac9b8b745", {
    body: {
        isArchived: false,
        isDraft: false,
        fieldData: {
            name: "Pan Galactic Gargle Blaster Recipe",
            slug: "pan-galactic-gargle-blaster"
        }
    }
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true', [
  'body' => '{
  "items": [
    {
      "isArchived": false,
      "isDraft": false,
      "fieldData": {
        "name": "Senior Data Analyst",
        "slug": "senior-data-analyst",
        "url": "https://boards.greenhouse.io/webflow/jobs/26567701",
        "department": "Data"
      }
    },
    {
      "isArchived": false,
      "isDraft": false,
      "fieldData": {
        "name": "Product Manager",
        "slug": "product-manager",
        "url": "https://boards.greenhouse.io/webflow/jobs/31234567",
        "department": "Product"
      }
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "isArchived": false,
      "isDraft": false,
      "fieldData": [
        "name": "Senior Data Analyst",
        "slug": "senior-data-analyst",
        "url": "https://boards.greenhouse.io/webflow/jobs/26567701",
        "department": "Data"
      ]
    ],
    [
      "isArchived": false,
      "isDraft": false,
      "fieldData": [
        "name": "Product Manager",
        "slug": "product-manager",
        "url": "https://boards.greenhouse.io/webflow/jobs/31234567",
        "department": "Product"
      ]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python
from webflow import CollectionItem, CollectionItemFieldData, Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.create_item_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=CollectionItem(
        is_archived=False,
        is_draft=False,
        field_data=CollectionItemFieldData(
            name="Pan Galactic Gargle Blaster Recipe",
            slug="pan-galactic-gargle-blaster",
        ),
    ),
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.createItemLive("580e63fc8c9a982ac9b8b745", {
    body: {
        isArchived: false,
        isDraft: false,
        fieldData: {
            name: "Pan Galactic Gargle Blaster Recipe",
            slug: "pan-galactic-gargle-blaster"
        }
    }
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"isArchived\": false,\n  \"isDraft\": false,\n  \"fieldData\": {\n    \"name\": \"The Hitchhiker's Guide to the Galaxy\",\n    \"slug\": \"hitchhikers-guide-to-the-galaxy\",\n    \"plain-text\": \"Don't Panic.\",\n    \"rich-text\": \"<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don't forget yours!</strong></p>\",\n    \"main-image\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n    },\n    \"image-gallery\": [\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabd\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabd_image.png\"\n      },\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n      }\n    ],\n    \"intro-video\": \"https://www.youtube.com/watch?v=aJ83KAggd-4\",\n    \"official-site\": \"https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy\",\n    \"contact-email\": \"zaphod.beeblebrox@heartofgold.gov\",\n    \"support-phone\": \"424-242-4242\",\n    \"answer-to-everything\": 42,\n    \"release-date\": \"1979-10-12T00:00:00.000Z\",\n    \"is-featured\": true,\n    \"brand-color\": \"#000000\",\n    \"category\": \"62b720ef280c7a7a3be8cabf\",\n    \"author\": \"62b720ef280c7a7a3be8cab0\",\n    \"tags\": [\n      \"62b720ef280c7a7a3be8cab1\",\n      \"62b720ef280c7a7a3be8cab2\"\n    ],\n    \"downloadable-asset\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cab3\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cab3_document.pdf\"\n    }\n  }\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"isArchived\": false,\n  \"isDraft\": false,\n  \"fieldData\": {\n    \"name\": \"The Hitchhiker's Guide to the Galaxy\",\n    \"slug\": \"hitchhikers-guide-to-the-galaxy\",\n    \"plain-text\": \"Don't Panic.\",\n    \"rich-text\": \"<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don't forget yours!</strong></p>\",\n    \"main-image\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n    },\n    \"image-gallery\": [\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabd\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabd_image.png\"\n      },\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n      }\n    ],\n    \"intro-video\": \"https://www.youtube.com/watch?v=aJ83KAggd-4\",\n    \"official-site\": \"https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy\",\n    \"contact-email\": \"zaphod.beeblebrox@heartofgold.gov\",\n    \"support-phone\": \"424-242-4242\",\n    \"answer-to-everything\": 42,\n    \"release-date\": \"1979-10-12T00:00:00.000Z\",\n    \"is-featured\": true,\n    \"brand-color\": \"#000000\",\n    \"category\": \"62b720ef280c7a7a3be8cabf\",\n    \"author\": \"62b720ef280c7a7a3be8cab0\",\n    \"tags\": [\n      \"62b720ef280c7a7a3be8cab1\",\n      \"62b720ef280c7a7a3be8cab2\"\n    ],\n    \"downloadable-asset\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cab3\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cab3_document.pdf\"\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"isArchived\": false,\n  \"isDraft\": false,\n  \"fieldData\": {\n    \"name\": \"The Hitchhiker's Guide to the Galaxy\",\n    \"slug\": \"hitchhikers-guide-to-the-galaxy\",\n    \"plain-text\": \"Don't Panic.\",\n    \"rich-text\": \"<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don't forget yours!</strong></p>\",\n    \"main-image\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n    },\n    \"image-gallery\": [\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabd\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabd_image.png\"\n      },\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n      }\n    ],\n    \"intro-video\": \"https://www.youtube.com/watch?v=aJ83KAggd-4\",\n    \"official-site\": \"https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy\",\n    \"contact-email\": \"zaphod.beeblebrox@heartofgold.gov\",\n    \"support-phone\": \"424-242-4242\",\n    \"answer-to-everything\": 42,\n    \"release-date\": \"1979-10-12T00:00:00.000Z\",\n    \"is-featured\": true,\n    \"brand-color\": \"#000000\",\n    \"category\": \"62b720ef280c7a7a3be8cabf\",\n    \"author\": \"62b720ef280c7a7a3be8cab0\",\n    \"tags\": [\n      \"62b720ef280c7a7a3be8cab1\",\n      \"62b720ef280c7a7a3be8cab2\"\n    ],\n    \"downloadable-asset\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cab3\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cab3_document.pdf\"\n    }\n  }\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true', [
  'body' => '{
  "isArchived": false,
  "isDraft": false,
  "fieldData": {
    "name": "The Hitchhiker\'s Guide to the Galaxy",
    "slug": "hitchhikers-guide-to-the-galaxy",
    "plain-text": "Don\'t Panic.",
    "rich-text": "<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don\'t forget yours!</strong></p>",
    "main-image": {
      "fileId": "62b720ef280c7a7a3be8cabe",
      "url": "/files/62b720ef280c7a7a3be8cabe_image.png"
    },
    "image-gallery": [
      {
        "fileId": "62b720ef280c7a7a3be8cabd",
        "url": "/files/62b720ef280c7a7a3be8cabd_image.png"
      },
      {
        "fileId": "62b720ef280c7a7a3be8cabe",
        "url": "/files/62b720ef280c7a7a3be8cabe_image.png"
      }
    ],
    "intro-video": "https://www.youtube.com/watch?v=aJ83KAggd-4",
    "official-site": "https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy",
    "contact-email": "zaphod.beeblebrox@heartofgold.gov",
    "support-phone": "424-242-4242",
    "answer-to-everything": 42,
    "release-date": "1979-10-12T00:00:00.000Z",
    "is-featured": true,
    "brand-color": "#000000",
    "category": "62b720ef280c7a7a3be8cabf",
    "author": "62b720ef280c7a7a3be8cab0",
    "tags": [
      "62b720ef280c7a7a3be8cab1",
      "62b720ef280c7a7a3be8cab2"
    ],
    "downloadable-asset": {
      "fileId": "62b720ef280c7a7a3be8cab3",
      "url": "/files/62b720ef280c7a7a3be8cab3_document.pdf"
    }
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"isArchived\": false,\n  \"isDraft\": false,\n  \"fieldData\": {\n    \"name\": \"The Hitchhiker's Guide to the Galaxy\",\n    \"slug\": \"hitchhikers-guide-to-the-galaxy\",\n    \"plain-text\": \"Don't Panic.\",\n    \"rich-text\": \"<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don't forget yours!</strong></p>\",\n    \"main-image\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n    },\n    \"image-gallery\": [\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabd\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabd_image.png\"\n      },\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n      }\n    ],\n    \"intro-video\": \"https://www.youtube.com/watch?v=aJ83KAggd-4\",\n    \"official-site\": \"https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy\",\n    \"contact-email\": \"zaphod.beeblebrox@heartofgold.gov\",\n    \"support-phone\": \"424-242-4242\",\n    \"answer-to-everything\": 42,\n    \"release-date\": \"1979-10-12T00:00:00.000Z\",\n    \"is-featured\": true,\n    \"brand-color\": \"#000000\",\n    \"category\": \"62b720ef280c7a7a3be8cabf\",\n    \"author\": \"62b720ef280c7a7a3be8cab0\",\n    \"tags\": [\n      \"62b720ef280c7a7a3be8cab1\",\n      \"62b720ef280c7a7a3be8cab2\"\n    ],\n    \"downloadable-asset\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cab3\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cab3_document.pdf\"\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "isArchived": false,
  "isDraft": false,
  "fieldData": [
    "name": "The Hitchhiker's Guide to the Galaxy",
    "slug": "hitchhikers-guide-to-the-galaxy",
    "plain-text": "Don't Panic.",
    "rich-text": "<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don't forget yours!</strong></p>",
    "main-image": [
      "fileId": "62b720ef280c7a7a3be8cabe",
      "url": "/files/62b720ef280c7a7a3be8cabe_image.png"
    ],
    "image-gallery": [
      [
        "fileId": "62b720ef280c7a7a3be8cabd",
        "url": "/files/62b720ef280c7a7a3be8cabd_image.png"
      ],
      [
        "fileId": "62b720ef280c7a7a3be8cabe",
        "url": "/files/62b720ef280c7a7a3be8cabe_image.png"
      ]
    ],
    "intro-video": "https://www.youtube.com/watch?v=aJ83KAggd-4",
    "official-site": "https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy",
    "contact-email": "zaphod.beeblebrox@heartofgold.gov",
    "support-phone": "424-242-4242",
    "answer-to-everything": 42,
    "release-date": "1979-10-12T00:00:00.000Z",
    "is-featured": true,
    "brand-color": "#000000",
    "category": "62b720ef280c7a7a3be8cabf",
    "author": "62b720ef280c7a7a3be8cab0",
    "tags": ["62b720ef280c7a7a3be8cab1", "62b720ef280c7a7a3be8cab2"],
    "downloadable-asset": [
      "fileId": "62b720ef280c7a7a3be8cab3",
      "url": "/files/62b720ef280c7a7a3be8cab3_document.pdf"
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Update Live Items

PATCH https://api.webflow.com/v2/collections/{collection_id}/items/live
Content-Type: application/json

Update a single published item or multiple published items (up to 100) in a Collection

<Tip title="Localization Tip">Items will only be updated in the primary locale, unless a `cmsLocaleId` is included in the request.</Tip>

Required scope | `CMS:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/live-items/update-items-live

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Update Live Collection Items
  version: endpoint_collections/items.update-items-live
paths:
  /collections/{collection_id}/items/live:
    patch:
      operationId: update-items-live
      summary: Update Live Collection Items
      description: >
        Update a single published item or multiple published items (up to 100)
        in a Collection


        <Tip title="Localization Tip">Items will only be updated in the primary
        locale, unless a `cmsLocaleId` is included in the request.</Tip>


        Required scope | `CMS:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: skipInvalidFiles
          in: query
          description: >-
            When true, invalid files are skipped and processing continues. When
            false, the entire request fails if any file is invalid.
          required: false
          schema:
            type: boolean
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_update-items-live_Response_200
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '409':
          description: Conflict with server data. Item not published
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: Details of the live items to update
        content:
          application/json:
            schema:
              type: object
              properties:
                items:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/CollectionsCollectionIdItemsLivePatchRequestBodyContentApplicationJsonSchemaItemsItems
components:
  schemas:
    CollectionsCollectionIdItemsLivePatchRequestBodyContentApplicationJsonSchemaItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
    CollectionsCollectionIdItemsLivePatchRequestBodyContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLivePatchRequestBodyContentApplicationJsonSchemaItemsItemsFieldData
      required:
        - id
    CollectionsCollectionIdItemsLivePatchResponsesContentApplicationJsonSchemaItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsLivePatchResponsesContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLivePatchResponsesContentApplicationJsonSchemaItemsItemsFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    collections_items_update-items-live_Response_200:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsLivePatchResponsesContentApplicationJsonSchemaItemsItems

```

## SDK Code Examples

```python Multiple items updated across multiple locales
from webflow import (
    CollectionItemWithIdInput,
    CollectionItemWithIdInputFieldData,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.update_items_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Ne Paniquez Pas",
                slug="ne-paniquez-pas",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="No Entrar en Pánico",
                slug="no-entrar-en-panico",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Au Revoir et Merci pour Tous les Poissons",
                slug="au-revoir-et-merci",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="Hasta Luego y Gracias por Todo el Pescado",
                slug="hasta-luego-y-gracias",
            ),
        ),
    ],
)

```

```typescript Multiple items updated across multiple locales
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.updateItemsLive("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Ne Paniquez Pas",
                slug: "ne-paniquez-pas"
            }
        }, {
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "No Entrar en P\u00E1nico",
                slug: "no-entrar-en-panico"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Au Revoir et Merci pour Tous les Poissons",
                slug: "au-revoir-et-merci"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "Hasta Luego y Gracias por Todo el Pescado",
                slug: "hasta-luego-y-gracias"
            }
        }]
});

```

```go Multiple items updated across multiple locales
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true"

	req, _ := http.NewRequest("PATCH", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Multiple items updated across multiple locales
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

```java Multiple items updated across multiple locales
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .asString();
```

```php Multiple items updated across multiple locales
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Multiple items updated across multiple locales
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
IRestResponse response = client.Execute(request);
```

```swift Multiple items updated across multiple locales
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python Multiple items updated in a single locale
from webflow import (
    CollectionItemWithIdInput,
    CollectionItemWithIdInputFieldData,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.update_items_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Ne Paniquez Pas",
                slug="ne-paniquez-pas",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="No Entrar en Pánico",
                slug="no-entrar-en-panico",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Au Revoir et Merci pour Tous les Poissons",
                slug="au-revoir-et-merci",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="Hasta Luego y Gracias por Todo el Pescado",
                slug="hasta-luego-y-gracias",
            ),
        ),
    ],
)

```

```typescript Multiple items updated in a single locale
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.updateItemsLive("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Ne Paniquez Pas",
                slug: "ne-paniquez-pas"
            }
        }, {
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "No Entrar en P\u00E1nico",
                slug: "no-entrar-en-panico"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Au Revoir et Merci pour Tous les Poissons",
                slug: "au-revoir-et-merci"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "Hasta Luego y Gracias por Todo el Pescado",
                slug: "hasta-luego-y-gracias"
            }
        }]
});

```

```go Multiple items updated in a single locale
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true"

	req, _ := http.NewRequest("PATCH", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Multiple items updated in a single locale
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

```java Multiple items updated in a single locale
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .asString();
```

```php Multiple items updated in a single locale
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Multiple items updated in a single locale
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
IRestResponse response = client.Execute(request);
```

```swift Multiple items updated in a single locale
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python LocalizedItems
from webflow import (
    CollectionItemWithIdInput,
    CollectionItemWithIdInputFieldData,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.update_items_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Ne Paniquez Pas",
                slug="ne-paniquez-pas",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="No Entrar en Pánico",
                slug="no-entrar-en-panico",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Au Revoir et Merci pour Tous les Poissons",
                slug="au-revoir-et-merci",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="Hasta Luego y Gracias por Todo el Pescado",
                slug="hasta-luego-y-gracias",
            ),
        ),
    ],
)

```

```typescript LocalizedItems
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.updateItemsLive("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Ne Paniquez Pas",
                slug: "ne-paniquez-pas"
            }
        }, {
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "No Entrar en P\u00E1nico",
                slug: "no-entrar-en-panico"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Au Revoir et Merci pour Tous les Poissons",
                slug: "au-revoir-et-merci"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "Hasta Luego y Gracias por Todo el Pescado",
                slug: "hasta-luego-y-gracias"
            }
        }]
});

```

```go LocalizedItems
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}")

	req, _ := http.NewRequest("PATCH", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby LocalizedItems
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java LocalizedItems
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}")
  .asString();
```

```php LocalizedItems
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true', [
  'body' => '{
  "items": [
    {
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": {
        "name": "Ne Paniquez Pas",
        "slug": "ne-paniquez-pas",
        "featured": false
      }
    },
    {
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": {
        "name": "No Entrar en Pánico",
        "slug": "no-entrar-en-panico",
        "featured": false
      }
    },
    {
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": {
        "name": "Au Revoir et Merci pour Tous les Poissons",
        "slug": "au-revoir-et-merci",
        "featured": false
      }
    },
    {
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": {
        "name": "Hasta Luego y Gracias por Todo el Pescado",
        "slug": "hasta-luego-y-gracias",
        "featured": false
      }
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp LocalizedItems
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift LocalizedItems
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": [
        "name": "Ne Paniquez Pas",
        "slug": "ne-paniquez-pas",
        "featured": false
      ]
    ],
    [
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": [
        "name": "No Entrar en Pánico",
        "slug": "no-entrar-en-panico",
        "featured": false
      ]
    ],
    [
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": [
        "name": "Au Revoir et Merci pour Tous les Poissons",
        "slug": "au-revoir-et-merci",
        "featured": false
      ]
    ],
    [
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": [
        "name": "Hasta Luego y Gracias por Todo el Pescado",
        "slug": "hasta-luego-y-gracias",
        "featured": false
      ]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python MultipleItems
from webflow import (
    CollectionItemWithIdInput,
    CollectionItemWithIdInputFieldData,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.update_items_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        CollectionItemWithIdInput(
            id="580e64008c9a982ac9b8b754",
            is_archived=False,
            is_draft=False,
            field_data=CollectionItemWithIdInputFieldData(
                name="Senior Data Analyst",
                slug="senior-data-analyst",
            ),
        ),
        CollectionItemWithIdInput(
            id="580e64008c9a982ac9b8b754",
            is_archived=False,
            is_draft=False,
            field_data=CollectionItemWithIdInputFieldData(
                name="Product Manager",
                slug="product-manager",
            ),
        ),
    ],
)

```

```typescript MultipleItems
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.updateItemsLive("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "580e64008c9a982ac9b8b754",
            isArchived: false,
            isDraft: false,
            fieldData: {
                name: "Senior Data Analyst",
                slug: "senior-data-analyst"
            }
        }, {
            id: "580e64008c9a982ac9b8b754",
            isArchived: false,
            isDraft: false,
            fieldData: {
                name: "Product Manager",
                slug: "product-manager"
            }
        }]
});

```

```go MultipleItems
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}")

	req, _ := http.NewRequest("PATCH", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby MultipleItems
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java MultipleItems
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}")
  .asString();
```

```php MultipleItems
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true', [
  'body' => '{
  "items": [
    {
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": {
        "name": "Senior Data Analyst",
        "slug": "senior-data-analyst",
        "url": "https://boards.greenhouse.io/webflow/jobs/26567701",
        "department": "Data"
      }
    },
    {
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": {
        "name": "Product Manager",
        "slug": "product-manager",
        "url": "https://boards.greenhouse.io/webflow/jobs/31234567",
        "department": "Product"
      }
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp MultipleItems
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift MultipleItems
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": [
        "name": "Senior Data Analyst",
        "slug": "senior-data-analyst",
        "url": "https://boards.greenhouse.io/webflow/jobs/26567701",
        "department": "Data"
      ]
    ],
    [
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": [
        "name": "Product Manager",
        "slug": "product-manager",
        "url": "https://boards.greenhouse.io/webflow/jobs/31234567",
        "department": "Product"
      ]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Unpublish Live Items

DELETE https://api.webflow.com/v2/collections/{collection_id}/items/live
Content-Type: application/json

Unpublish up to 100 items from the live site and set the `isDraft` property to `true`.

<Tip title="Localization Tip">Items will only be unpublished in the primary locale unless a `cmsLocaleId` is included in the request.</Tip>

Required scope | `CMS:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-items-live

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Unpublish Live Collection Items
  version: endpoint_collections/items.delete-items-live
paths:
  /collections/{collection_id}/items/live:
    delete:
      operationId: delete-items-live
      summary: Unpublish Live Collection Items
      description: >
        Unpublish up to 100 items from the live site and set the `isDraft`
        property to `true`.


        <Tip title="Localization Tip">Items will only be unpublished in the
        primary locale unless a `cmsLocaleId` is included in the request.</Tip>


        Required scope | `CMS:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_delete-items-live_Response_204
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: Details of the live items to delete
        content:
          application/json:
            schema:
              type: object
              properties:
                items:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/CollectionsCollectionIdItemsLiveDeleteRequestBodyContentApplicationJsonSchemaItemsItems
              required:
                - items
components:
  schemas:
    CollectionsCollectionIdItemsLiveDeleteRequestBodyContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleIds:
          type: array
          items:
            type: string
      required:
        - id
    collections_items_delete-items-live_Response_204:
      type: object
      properties: {}

```

## SDK Code Examples

```python
from webflow import Webflow
from webflow.resources.collections.resources.items import (
    ItemsDeleteItemsLiveRequestItemsItem,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.delete_items_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        ItemsDeleteItemsLiveRequestItemsItem(
            id="580e64008c9a982ac9b8b754",
        )
    ],
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.deleteItemsLive("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "580e64008c9a982ac9b8b754"
        }]
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}")

	req, _ := http.NewRequest("DELETE", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.delete("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('DELETE', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live', [
  'body' => '{
  "items": [
    {
      "id": "580e64008c9a982ac9b8b754"
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live");
var request = new RestRequest(Method.DELETE);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [["id": "580e64008c9a982ac9b8b754"]]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "DELETE"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```
