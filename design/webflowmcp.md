---
title: MCP server and AI tools
description: Webflow's MCP server and AI tools for building with Webflow APIs
hidden: null
slug: docs/ai-tools
max-toc-depth: 2
subtitle: Work with Webflow's APIs using our official MCP server and AI tools
'og:title': Webflow's official MCP server & AI tools
'og:description': Webflow's MCP server and AI tools for building with Webflow APIs
---

<Frame>
    <img src="file:bb8a181e-a0b3-4fbb-9530-b796eab86995" alt="MCP Hero Image" />
</Frame>

The Model Context Protocol (MCP) server connects your AI tools directly to your Webflow projects. Prompt an AI agent to update designs, manage site data, and work with the CMS from your preferred AI environment.

For developers using AI-powered tools like [Cursor](https://www.cursor.com/) or [Claude Desktop](https://claude.ai/download), the MCP server enhances an agent’s understanding of your Webflow projects. It's built on Webflow’s APIs, exposing them as tools your AI agent can use to create elements, styles, and variables on the canvas, as well as manage collections, custom code, assets, and other site data.

See the full list of available tools in the [MCP server documentation](https://www.npmjs.com/package/webflow-mcp-server).

## Installation

Get started by installing Webflow's remote MCP server, which uses OAuth to authenticate with your Webflow sites, and a companion app that syncs your live canvas with your AI agent.

For local installation, please refer to the instruction in the [NPM package documentation](https://www.npmjs.com/package/webflow-mcp-server).

### Requirements

Node.js version **22.3.0** or higher.

<Warning title="Node.js Version Management">
  Currently, the MCP server only supports Node.js version **22.3.0** or higher. See the [Node.js compatibility](#nodejs-compatibility) section for more information on troubleshooting Node.js issues.
</Warning>

<br/>

    <Tabs>

      <Tab title="Claude Desktop">
        <Steps>
          <Step title="Enable developer mode">
          In the menu bar, click `Help` -> `Troubleshooting` -> `Enable Developer Mode`
          </Step>
          <Step title="Open the developer tools">
            In the menu bar, click `File` -> `Settings`. Then in the Claude Desktop window, select `Developer`

            From here click `Get Started` or `Edit Config` to open the configuration file in your code editor.
          <Frame>
            <img src="file:cfa4cbea-f670-416a-bf12-90c92bc57cfa" alt="Claude Desktop MCP" />
          </Frame>
          </Step>
          <Step title="Add the MCP server to the configuration">
            Open the `claude_desktop_config.json` file in a code editor and paste the following configuration (or add the `webflow` part to your existing configuration):
            <CodeBlock title="claude_desktop_config.json">
              ```json
              {
                "mcpServers": {
                  "webflow": {
                    "command": "npx",
                    "args": ["mcp-remote", "https://mcp.webflow.com/sse"]
                  }
                }
              }
              ```
            </CodeBlock>
          </Step>
          <Step title="Save and restart Claude Desktop">
            Save the file and restart Claude Desktop `(command/ctrl + R)`.
          </Step>
          <Step title="Authorize the MCP server and app">
          When Claude restarts, it will automatically open a new browser window showing an OAuth login page where you can authorize the Webflow sites you want the MCP server to access and install the [companion app](#designer-companion-app).

            <Tip title="Limit authorized sites">
              Limit the number of sites for security and performance. To refresh your OAuth token, run:
              ```bash
              rm -rf ~/.mcp-auth
              ```
            </Tip>
          </Step>
          <Step title="Open the Webflow Designer">
            Open your site in the Webflow Designer.

            Or, type this prompt in your AI chat window:

            ```
            Give me a link to open <MY_SITE_NAME> in the Webflow Designer
            ```
          </Step>
          <Step title="Open the MCP Webflow App">
            1. In the designer, open the Apps panel by pressing the `E` key.
            2. Launch the "Webflow MCP Bridge App". This app was automatically installed during the OAuth authorization process.
            3. Wait for the companion app to connect to the MCP Server
          </Step>
          <Step title="Write your first prompt">
            Start interacting with the MCP server in your AI agent's chat window. Try prompts like:
            ```
            Analyze my last 5 blog posts and suggest 3 new topic ideas with SEO keywords
            ```
            ```
            Find older blog posts that mention similar topics and add internal links to my latest post
            ```
            ```
            Create a hero section card on my home page with a CTA button and responsive design
            ```
          </Step>
        </Steps>
      </Tab>


      <Tab title="Cursor">
        <Steps>
          <Step title="Install the MCP server on Cursor">
            1. Go to `Settings → Cursor Settings → MCP & Integrations`
            2. Under MCP Tools, click `+ New MCP Server`/`Add Custom MCP`
            3. Paste the following configuration into `.cursor/mcp.json` (or add the `webflow` part to your existing configuration):

                <CodeBlock title=".cursor/mcp.json">
                ```json
                {
                  "mcpServers": {
                    "webflow": {
                      "url": "https://mcp.webflow.com/sse"
                    }
                  }
                }
                ```
                </CodeBlock>

                <Tip title="Use project-specific MCP configuration to avoid repeated auth prompts">
                  Configure `mcp.json` [per project](https://docs.cursor.com/en/context/mcp#configuration-locations) instead of using Cursor's global settings. This prevents repeated authentication prompts when opening multiple Cursor windows without being authenticated.
                </Tip>
            4. Save and close the file
          </Step>
          <Step title="Authorize the MCP server and app">
            1. Go to `Settings → Cursor Settings → MCP & Integrations`
            2. Authorize Webflow MCP by clicking the Connect button
            3. Cursor automatically opens an OAuth login page where you authorize the Webflow sites you want to access and install the [companion app](#designer-companion-app).
            4. Once authorization is complete, the Webflow MCP indicator should turn green.
            <Tip title="Limit authorized sites">
              Limit the number of sites for security and performance. To reauthorize, simply click **Logout** by expanding Webflow MCP.
            </Tip>
          </Step>
          <Step title="Open the Webflow Designer">
            Open your site in the Webflow Designer.

            Or, type this prompt in your AI chat window:

            ```
            Give me a link to open <MY_SITE_NAME> in the Webflow Designer
            ```
          </Step>
          <Step title="Open the MCP Webflow App">
            1. In the designer, open the Apps panel by pressing the `E` key.
            2. Launch the "Webflow MCP Bridge App". This app was automatically installed during the OAuth authorization process.
            3. Wait for the companion app to connect to the MCP Server
          </Step>
          <Step title="Write your first prompt">
            Start interacting with the MCP server in your AI agent's chat window. Try prompts like:
            ```
            Analyze my last 5 blog posts and suggest 3 new topic ideas with SEO keywords
            ```
            ```
            Find older blog posts that mention similar topics and add internal links to my latest post
            ```
            ```
            Create a hero section card on my home page with a CTA button and responsive design
            ```
          </Step>
        </Steps>

        <Tip title="Start with a fresh project for better MCP performance">
          MCP servers perform more efficiently with smaller codebases. In Cursor, create a new project when using the MCP server to reduce tool call overhead and improve response times.
        </Tip>

      </Tab>





      <Tab title="Windsurf">
        <Steps>
          <Step title="Add the MCP server to the configuration">
            1. Navigate to `Windsurf → Settings → Windsurf Settings`
            2. Scroll down to the `Cascade` section → `MCP Servers` → `Manage MCPs`
            3. Click the "View raw config" button
            4. Paste the following configuration (or add the `webflow` part to your existing configuration):

                ```json mcp_config.json
                {
                  "mcpServers": {
                    "webflow": {
                      "serverUrl": "https://mcp.webflow.com/sse"
                    }
                  }
                }
                ```

                ```
              4. Save and close the file
          </Step>
          <Step title="Authorize the MCP server">
            1. Click the "Refresh" button in the settings page
            2. Windsurf will automatically open a new browser window showing an OAuth login page.
            3. Authorize the Webflow sites you want the MCP server to access. This will also automatically install the [companion app](#designer-companion-app) to any sites you authorize.

            <Tip title="Limit authorized sites">
              Limit the number of sites for security and performance.
            </Tip>
          </Step>
          <Step title="Open the Webflow Designer">
            Open your site in the Webflow Designer.

            Or, type this prompt in your AI chat window:

            ```
            Give me a link to open <MY_SITE_NAME> in the Webflow Designer
            ```
          </Step>
          <Step title="Open the MCP Webflow App">
            1. In the designer, open the Apps panel by pressing the `E` key.
            2. Launch the "Webflow MCP Bridge App". This app was automatically installed during the OAuth authorization process.
            3. Wait for the companion app to connect to the MCP Server
          </Step>
          <Step title="Write your first prompt">
            Start interacting with the MCP server in your AI agent's chat window. Try prompts like:
            ```
            Analyze my last 5 blog posts and suggest 3 new topic ideas with SEO keywords
            ```
            ```
            Find older blog posts that mention similar topics and add internal links to my latest post
            ```
            ```
            Create a hero section card on my home page with a CTA button and responsive design
            ```
          </Step>
        </Steps>
      </Tab>
    </Tabs>



**Resetting your OAuth token**

If you need to reset your authorization, you can run the following command before restarting your MCP client.

<Tabs>
  <Tab title="Claude Desktop">
  Please run following command and then restart your Claude Desktop.
    ```bash
    rm -rf ~/.mcp-auth
    ```
  </Tab>
  <Tab title="Cursor">
   Go to the MCP Settings panel and click the "Logout" button.
  </Tab>
  <Tab title="Windsurf">
    Go to the MCP Configuration page and click the "Refresh" button.
  </Tab>
</Tabs>

### Node.js compatibility

Currently, the MCP server only supports Node.js version **22.3.0** or higher. If you encounter issues with Node.js you can try the below approaches to troubleshoot:

<Accordion title="Use version **22.3.0** as your default Node.js version">
To use version **22.3.0** as your default Node.js version, follow these steps:

<Steps>
<Step title="Install NVM">
    If you don't have `nvm` installed, you can install it with the following command (or download from [`nvm` releases](https://github.com/nvm-sh/nvm/releases)).
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

</Step>
<Step title="Restart your terminal">
    Restart your terminal or run:
   ```bash
   source ~/.bashrc
   ```

</Step>
<Step title="Install Node.js 22.3.0">
   Run the following command to install Node.js 22.3.0:
   ```bash
   nvm install 22.3.0
   ```

</Step>
<Step title="Set **22.3.0** as the default Node.js version">
   Run the following command in your terminal to set **22.3.0** as the default Node.js version:
   ```bash
   nvm use 22.3.0
   nvm alias default 22.3.0
   ```

</Step>
<Step title="Clear your `npx` cache">
    Run the following command to clear your `npx` cache:
   ```bash
   rm -rf ~/.npm/_npx
   ```

</Step>
<Step title="Verify installation">
    Run the following command to verify your Node.js installation:
   ```bash
    node --version
    npm --version
    ```
</Step>
<Step title="Restart your AI Client">
    Restart your AI client and verify the MCP server is working.
</Step>
</Steps>

</Accordion>
<Accordion title="Use Node Version Switcher">

To use [Node Version Switcher](https://github.com/jasongin/nvs) (`nvs`) with the MCP server, follow these steps:

<Steps>
<Step title="Install `nvs`">
    Install Node Version Switcher using one of these methods:

    <Tabs>
      <Tab title="macOS/Linux">
        ```bash
        git clone https://github.com/jasongin/nvs ~/.nvs && ~/.nvs/nvs.sh install
        ```
      </Tab>
      <Tab title="Windows">
        ```bash
        choco install nvs
        ```
      </Tab>
    </Tabs>
    </Step>

<Step title="Install Node.js 22.3.0">
    Install the required Node.js version with `nvs` by running the following command in your terminal:

    ```bash
    nvs add 22.3.0
    ```
</Step>

<Step title="Use version **22.3.0** ">
    Use the version **22.3.0** with `nvs` by running the following command in your terminal:

    ```bash
    nvs use 22.3.0
    ```
</Step>

<Step title="Install mcp-remote">
    Install the MCP remote package using `nvm` with Node.js 22.3.0:
    ```bash
    nvm use 22.3.0
    npm install -g mcp-remote
    ```
</Step>

<Step title="Get required paths">
    Get the paths needed for your MCP configuration:

    **Node.js path:**
    ```bash
    nvs which 22.3.0
    ```

    **mcp-remote path:**
    ```bash
    which mcp-remote
    ```
</Step>

<Step title="Configure MCP server">
    Add this configuration to your AI client's MCP settings, replacing the paths with your actual paths:

    ```json
    {
      "mcpServers": {
        "webflow": {
          "command": "/path/to/your/nvs/node/22.3.0/bin/node",
          "args": [
            "/path/to/your/mcp-remote",
            "https://mcp.webflow-sai.com/sse"
          ]
        }
      }
    }
    ```
</Step>

<Step title="Verify installation">
    Restart your AI client and verify the MCP server is working.
</Step>
</Steps>

<Note >
  Many thanks to [@jessehouwing](https://jessehouwing.net/vscode-running-mcp-using-node-version/) for the inspiration and guidance on using `nvs` with the MCP server.
</Note>
</Accordion>

---

## How the MCP server works

The Webflow MCP server implements [Anthropic's Model Context Protocol specification](https://docs.anthropic.com/en/docs/model-context-protocol-mcp) to standardize communication between AI agents and Webflow's APIs.

### Architecture

The server acts as a translation layer that exposes Webflow's APIs as MCP tools. Built as an [open-source package](https://github.com/webflow/mcp-server), it wraps Webflow's REST and Designer APIs into a format that any MCP-compatible AI agent can understand and execute.

### Remote deployment

The server runs remotely to enable OAuth authentication, allowing you to:
- Authorize multiple Webflow sites without storing API keys locally
- Maintain secure, token-based access to your projects

This architecture eliminates the need to manage API credentials in your local environment while providing secure access to your Webflow projects.

<Warning title="Remote authorization is currently experimental">
  Remote authorization relies on the [`mcp-remote` npm package](https://www.npmjs.com/package/mcp-remote), which is currently considered experimental.
</Warning>

### Available tools

The MCP server exposes Data and Designer APIs as MCP tools. See the complete list of available tools and their parameters in the [MCP server repository](https://github.com/webflow/mcp-server/tree/main/src/tools).

<Tabs>
 <Tab title="Designer API tools">

    [**Designer API**](/designer/reference/introduction) tools enable real-time canvas manipulation:
    - **Visual design**: Create and modify elements, styles, and components
    - **Layout control**: Manage responsive breakpoints and positioning
    - **Design system**: Work with variables, classes, and component instances
    - **Live preview**: See changes instantly in the Designer interface

     #### Designer companion app

     Designer API calls are executed through a companion app that automatically installs to your authorized sites after OAuth authorization. **The companion app must remain open in the Webflow Designer** for Designer API tools to function. However, you can minimize it once connected.

    <div style={{ maxWidth: "50%", margin: "0 auto" }}>
    <Frame>
        <img src="file:d5a82bd2-c47f-4116-a786-48a0c628bdc4" alt="MCP Bridge App" />
    </Frame>
    </div>
  </Tab>
  <Tab title="Data API tools">
  [**Data API**](/data/reference/rest-introduction) tools access your site's content and structure for bulk operations and content synchronization:
  - **CMS operations**: Create, read, update, and delete collection items
  - **Asset management**: Upload, organize, and manage media files
  - **Site metadata**: Access site settings, domains, and configuration

  </Tab>

</Tabs>

## LLMS.txt documentation

With Webflow's LLMS.txt file, you can access Webflow's documentation in your AI client without needing to load the webpage in your browser. This optimized structure helps LLMs respond with accurate code snippets and multi-step sequences.

    - **LLMS.txt** <br/>
      Use [`https://developers.webflow.com/llms.txt`](https://developers.webflow.com/llms.txt) to access the LLM-readable documentation.
    - **Markdown docs**<br/>
    Additionally, you can access markdown versions of any page on the docs site to provide a more structured and context-rich experience for LLMs. To access the markdown version of a page, add `.md` to the end of the URL. For example, this current doc is available as a markdown file at [`https://developers.webflow.com/data/docs/ai-tools.md`](https://developers.webflow.com/data/docs/ai-tools.md).

**Using LLMS.txt docs with Cursor**
    <Steps>
      <Step>In the chat, click the `@` button</Step>
      <Step>Find the "Docs" option</Step>
      <Step>Click "Add new doc"</Step>
      <Step>Paste in the following link: <code>https://developers.webflow.com/llms.txt</code></Step>
    </Steps>

    Once configured, reference Webflow's documentation by typing `@Docs` in your chat window and selecting "Webflow" from the list.

---

## FAQs and troubleshooting

### Installation and authentication
<Accordion title="Why is my MCP server not appearing in my AI client?">
  After installing the MCP server, you may need to restart your AI client to see the new server. Additionally, check to see that your client (for example, Cursor, Claude Desktop) is updated to the latest version.
</Accordion>
<Accordion title="How can I authenticate a different Webflow site?">
  To authenticate a different Webflow site, you'll need to remove the existing authentication token by running the following command in your terminal:
  ```bash
  rm -rf ~/.mcp-auth
  ```
  After executing the command, a new authentication screen should appear, allowing you to select the site you want to authenticate with.
</Accordion>
<Accordion title="I'm getting an error when loading the remote MCP server">
  You may receive an `500` error when loading the remote MCP server.


  1. Try refreshing your OAuth token with the following command and then restart your AI client:
      ```bash
      rm -rf ~/.mcp-auth
      ```

  2. Check your current Node.js version to ensure you're using version **22.3.0** or higher:

      ```bash
      node --version
      ```

      If you can't use **versions 22.3.0** or higher as your default Node.js version, follow the [Node.js compatibility](#nodejs-compatibility) section to troubleshoot compatibility issues.
</Accordion>
<Accordion title="Troubleshooting Node.js and NPM issues">
  **Ensure Node.js and NPM are properly installed**
  1. Verify Node.js and NPM installation by running:
     ```bash
     node -v
     npm -v
     ```
  2. If you encounter issues with `npx`, try clearing your NPM cache:
     ```bash
     npm cache clean --force
     ```
  3. If `npm -v` only works with `sudo`, you may need to fix NPM global package permissions. See the [official NPM docs](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) for more information.

  If the issue persists, see the [Node.js compatibility](#nodejs-compatibility) section above for version requirements.

  <Note>
    If you make changes to your shell configuration, you may need to restart your shell for changes to take effect.
  </Note>
</Accordion>
<Accordion title="The sites I want to authorized are greyed out on the authorization page">
  Currently, only site owners and admins can authorize the MCP server and app. If you aren't a site owner or admin, you can't authorize the MCP server and app.
</Accordion>

### Tools and prompts

<Accordion title="The MCP Server can't connect to the Webflow Designer">
  To use the MCP server with the Webflow Designer, open the "MCP Bridge App" from the Apps panel. Once open, the app will automatically connect to the MCP server.

  **You must keep the companion app open in the Webflow Designer for the MCP server to connect.**

</Accordion>
<Accordion title="What tools are available?">
  The open-source MCP server package includes tools for AI agents. View the complete list in the [GitHub repository](https://github.com/webflow/mcp-server/tree/main/src/tools).
</Accordion>
<Accordion title="Can I use all available API endpoints and Methods with the MCP server?">

  Currently, the MCP server supports a limited set of tools for the Data and Designer APIs.

  If you have specific endpoints and methods you would like to see supported, please [open an issue](https://github.com/webflow/mcp-server/issues) or contact the Developer Relations team at [developers@webflow.com](mailto:developers@webflow.com).
</Accordion>
<Accordion title="Does Webflow need to be open to use the MCP server?">
  If you're only using the Data API tools, you can use the MCP server to update content even if Webflow isn't open in the browser.

  If you're using the Designer API tools, you need to keep the [companion app](#designer-companion-app) open in the Webflow Designer for the MCP server to work.
</Accordion>
<Accordion title="Can I localize content with the MCP server?">
  Currently, the MCP server supports localizing static content, and updating existing localized CMS items. **However, the MCP server doesn't support creating new localized CMS items.**

  If you have specific endpoints and methods you would like to see supported, please [open an issue](https://github.com/webflow/mcp-server/issues) or contact the Developer Relations team at [developers@webflow.com](mailto:developers@webflow.com).
</Accordion>
