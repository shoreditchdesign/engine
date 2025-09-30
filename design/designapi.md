---
title: Introduction
slug: designer/reference/introduction
description: >-
  Webflow's Designer APIs let you build apps that programmatically control the
  Webflow Designer.
hidden: false
layout: overview
hide-toc: true
'og:title': Webflow's Designer APIs
'og:description': >-
  Webflow's Designer APIs let you build apps that programmatically control the
  Webflow Designer.
'og:keywords': Webflow API
---
<video autoplay loop muted style="width:100%;">  <source src="https://dhygzobemt712.cloudfront.net/Web/developers/videos/24005_API%20Documentation_Introduction_v3_24fps.webm" type="video/webm" />  Your browser does not support HTML video.</video>

Webflow's Designer APIs let you build apps that programmatically control the Webflow Designer. With these APIs, developers can create tools that automatically add elements to pages, apply styles, manage components, and streamline design workflows.

<br/>
## Getting started
To start using the Designer APIs, [register a Webflow App](/data/docs/getting-started-apps) and create a [Designer Extension](/designer/docs/getting-started-designer-extensions) using the [Webflow CLI.](/designer/reference/webflow-cli) Once you have your Designer Extension running locally on a Webflow project, you can start using the Designer APIs to create elements, styles, components, and more.

<CardGroup>
    <Card
    title="Create your first extension"
    iconPosition="left"
    iconSize="12"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/App.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/App.svg" alt="" className="block dark:hidden" />
        </>
    }
    href="/designer/docs/getting-started-designer-extensions"
    >
        Follow our step-by-step guide to build and deploy your first Designer Extension<br/><br/>
        <a href="/designer/docs/getting-started-designer-extensions">
            <button class="cc-primary">Create a Designer Extension</button>
        </a>
    </Card>
    <Card
    title="Try the interactive playground"
    iconPosition="left"
    iconSize="12"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/PublishDesigner.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/PublishDesigner.svg" alt="" className="block dark:hidden" />
        </>
    }
    href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
    >
        Experiment with live API calls in our interactive playground environment<br/><br/>
            <button class="cc-primary">Test the API playground</button>
    </Card>
</CardGroup>

<br/>
## Working with the Designer APIs
The Designer APIs provide several objects and methods that give Apps control over the Webflow Designer. Each object serves a specific purpose and contains methods to help you design automated workflows for Designers, Content Managers, and other teams working in Webflow.

<CardGroup>
<Card
    title="Elements"
    href="/designer/reference/elements-overview"
    iconPosition="left"
    iconSize="12"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Grid.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Grid.svg" alt="" className="block dark:hidden" />
        </>
    }>
    Create and manipulate elements on the canvas, including their properties, content, and styles.
</Card>
<Card
    title="Styles"
    href="/designer/reference/styles-overview"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Styles.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Styles.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconPosition="left"
    iconSize="12">
    Manage reusable CSS classes to control the visual appearance of elements across your site.
</Card>
<Card
    title="Components"
    href="/designer/reference/components-overview"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Components.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Components.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconPosition="left"
    iconSize="12">
    Create and modify reusable element groups to maintain consistency across your designs.
</Card>
<Card
    title="Variables"
    href="/designer/reference/variables-overview"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Variable.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Variable.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconPosition="left"
    iconSize="12">
    Define and manage global values for numbers, percentages, sizes, colors, and fonts.
</Card>
<Card
    title="Pages"
    href="/designer/reference/pages-overview"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/PageBuilding.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/PageBuilding.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconPosition="left"
    iconSize="12">
    Manage page properties, SEO settings, and site structure.
</Card>
<Card
    title="Extension Utilities"
    href="/designer/reference/extension-utilities"
    iconPosition="left"
    iconSize="12"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/ToolNut.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/ToolNut.svg" alt="" className="block dark:hidden" />
        </>
    }>
    Utility methods to manage your extension's behavior and interaction with the Designer.
</Card>
</CardGroup>

<br/>
## How the Designer APIs work in Webflow
Designer APIs are client-side JavaScript APIs that execute in the browser via an iframe. They interact with Webflow just as a user would - creating elements, applying styles, and modifying properties. This client-side approach allows your apps to directly manipulate the Designer interface in real-time, creating a seamless integration between your code and the Webflow environment.

To work with objects in your Webflow project, you'll need to reference the object using an appropriate method, and then make changes using the available methods.

<Tabs>
<Tab title="Referencing objects">
- **Existing Objects:** Get an existing object using an appropriate **GET** method. For example, to get the currently selected element, you can use the [`webflow.getSelectedElement()`](/designer/reference/get-selected-element) method. You can see all the methods available for retrieving objects in the [Designer API Reference](/designer/reference/elements-overview).

- **New Objects:** Create a new object using an appropriate **CREATE** method. When you create a new object, Webflow will always return a reference to the new object. For example, to create a new element, you can use the [`element.after()`](/designer/reference/insert-element-after) method. You can see all the methods available for creating objects in the [Designer API Reference](/designer/reference/elements-overview).

<div style={{maxWidth: "80%", margin: "0 auto", display: "flex", justifyContent: "center"}}>
<Frame
    background="subtle"
    caption="`webflow.getSelectedElement()` returns a reference to the currently selected element."
>
<img src="file:0ded73e5-d5a7-4780-9291-d41dad822168" alt="Getting a reference to a resource" />
</Frame>
</div>
</Tab>

<Tab title="Modifying objects">
Once you've referenced an object, you can start manipulating it using the available methods on that object. Each object has its own set of methods, so be sure to refer to the [Designer API Reference](/designer/reference/elements-overview) for the object you're working with.

In the example below, we're using the [`element.setCustomAttribute()`](/designer/reference/custom-attributes/setCustomAttribute) method to set a custom attribute on the element. When the custom attribute is set, the element will be updated in the Webflow Designer, and the information about the updated object will be returned to the Designer Extension.

<div style={{maxWidth: "80%", margin: "0 auto", display: "flex", justifyContent: "center"}}>
<Frame
    background="subtle"
    caption="`element.setCustomAttribute()` sets a custom attribute on the element, then sends the updated object back to the Designer Extension."
>
<img src="file:67f463fc-6a80-4c29-b6f8-4d4934773aa3" alt="Saving changes to an element" />
</Frame>
</div>
</Tab>
</Tabs>

---
title: Create your first Designer Extension
hidden: false
description: >-
  A quick guide to help you set up a Designer Extension and start creating Apps
  that work directly in the designer
layout: overview
hide-toc: true
'og:title': 'Getting Started with Webflow Apps: Designer Extensions'
'og:description': >-
  A quick guide to help you set up a Designer Extension and start creating Apps
  that work directly in the designer
---

<img src='file:52ebb66a-6ffe-41db-978c-7724abbadc2f' />


In this tutorial, you'll learn how to create and run a [Designer Extension](/data/docs/designer-extensions) that updates text on elements within the Designer. This guide is intended for developers who want to build custom functionality directly into the Webflow design environment.

By the end of this tutorial, you will be able to:
  - **Install and configure** the [Webflow CLI](/designer/reference/webflow-cli)
  - **Scaffold** a new Designer Extension project
  - **Run your extension locally** in the Webflow Designer
  - **Programmatically update elements** on a page
  - **Use the [Designer APIs](/designer/reference/introduction)** to extend your extension’s capabilities

  ---

### Prerequisites

Before you begin, make sure you have:
  - Node.js 16.20 or later
  - Access to a Webflow site for development and testing
  - A registered Webflow App installed on your test site

If you haven’t set up an app yet, follow the [creating an App guide.](/data/docs/register-an-app)

## Set up your development environment
<Steps>
<Step title="Install the Webflow CLI">
Webflow’s CLI lets you create, manage, and locally run Designer Extensions from the command line.

To install the CLI globally, run:

```shell
npm i -g @webflow/webflow-cli
```
</Step>

<Step title="Create a Designer Extension project">
Use the CLI to scaffold a new Designer Extension with the recommended structure and settings. You can also use templates for frameworks like React and TypeScript. After creating your project, you'll need to navigate to the project directory and install the dependencies.

Replace my-extension-name with your desired project name:

```shell
webflow extension init my-extension-name react
cd my-extension-name
npm install
```

</Step>

<Step title="Review the project structure">
Your new project folder will look like this. For a detailed explanation of each file and folder, see [App Structure](/designer/reference/app-structure) and [App Settings](/designer/reference/app-settings).

    ```
    my_example_extension/
    ├── node_modules/
    ├── public/             # Contains all the files to serve your designer extension
    │   ├── index.html      # Required:This file serves as the initial point of entry for your single page app.
    │   ├── index.js        # This file adds interactivity and dynamic behavior to your web app.
    │   └── styles.css      # Defines the visual appearance of your App
    ├── src/                # Contains the source code for your designer extension
    │   └── index.ts
    ├── package-lock.json
    ├── package.json
    ├── webflow.json        # Contains the settings for your designer extension
    ├── README.md
    └── tsconfig.json       # Contains the TypeScript configuration for your designer extension
    ```


</Step>
</Steps>

## Run your Designer Extension locally
Before you can test your extension in Webflow, you’ll want to run it locally to enable live development and preview changes as you make them.

<Steps>
  <Step title="Start the development server">
  Navigate to your project directory and run the following command to start the development server:

  ```shell
  npm run dev
  ```

  This command serves your Designer Extension on port 1337 using the CLI’s `webflow extension serve` command and runs webpack in watch mode with `npm run watch-webpack` concurrently. This setup enables live updates as you develop.

  <Note>
    While you can load your extension in a browser at `http://localhost:1337`, your app will only be able to interact with the Designer fully when loaded within the Webflow Designer.
  </Note>

  </Step>

  <Step title="Install your extension to your test site">
  In your Workspace Settings, navigate to the "Apps & Integrations" > "Develop" section. Find your App and select the "..." button. Click "Install" and follow the instructions to install your extension to your test site.
  <Frame>
      <img src='file:3e1d057d-e396-4509-9c6d-9119787c57ed' />
    </Frame>

  </Step>

  <Step title="Open App the Webflow Designer">
  Open your test site in the Webflow Designer, and press the "E" key to open the app panel. Find your app and click "Launch development app" to see your extension running in the Webflow Designer.

  <Frame>
    <img src='file:c31ca87f-cc13-4d22-86d1-c60932ef756e' />
  </Frame>

  <Note>
    If you don't see your extension in the apps panel, you may need to refresh the page.
  </Note>

  </Step>

</Steps>


## Modify elements with the Designer APIs
The starter project you created already includes a basic example of using the Designer APIs: when you select a text element in the Webflow Designer and click the "Lorem Ipsum" button in your extension, the selected element’s text is replaced with placeholder content.

However, if you select a non-text element, the extension will not be able to update the text content. **Let’s improve this experience by adding user feedback for error cases.**

<Steps>
<Step title="Understand the starter functionality">
Your extension’s UI includes a "Lorem Ipsum" button. When clicked, the extension:

- [Gets the currently selected element](/designer/reference/get-selected-element) in the Designer
- [Replaces the text](/designer/reference/set-text-content) of the selected element with placeholder text

This code is found in `src/index.ts`.

```ts title="src/index.ts" {3-7}
document.getElementById("lorem").onsubmit = async (event) => {
  event.preventDefault();
  const el = await webflow.getSelectedElement();
  if (el && el.textContent) {
    el.setTextContent(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );
  }
};
```

</Step>

<Step title="Improve the user experience with notifications">
Currently, if no element is selected or the selected element doesn’t support text, nothing happens. Let’s add a notification to guide the user in these cases. To do this, we'll add an `else` clause to the `if` statement in `index.ts` and use the [`webflow.notify()`](/designer/reference/notify-user) method to notify a user that they should choose a supported element.

Update your code as follows:

```ts title="index.ts" {16-18}
    document.getElementById("lorem").onsubmit = async (event) => {

      // Prevent the default form submission behavior, which would reload the page
      event.preventDefault()

      // Get the currently selected element in the Designer
      const el = await webflow.getSelectedElement()

      // Check if an element was returned, and the element can contain text content
      if (el && el.textContent) {
        // If we found the element and it has the ability to update the text content,
        // replace it with some placeholder text
        el.setTextContent(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do " +
          "eiusmod tempor incididunt ut labore et dolore magna aliqua."
        )
      } else { // If an element isn't selected, or an element doesn't have text content, notify the user
        await webflow.notify({ type: 'Error', message: "Please select an element that contains text." })
      }
    }
```

Now, if the user clicks the button without selecting a valid text element, they’ll see a clear error notification in the Designer.

</Step>
<Step title="Test your extension">
Refresh your extension by clicking the <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle" }}> <path d="M10.2949 6C10.2949 6.79113 10.0603 7.56448 9.6208 8.22228C9.18128 8.88008 8.55656 9.39277 7.82566 9.69552C7.09475 9.99827 6.29049 10.0775 5.51456 9.92314C4.73864 9.7688 4.02591 9.38784 3.4665 8.82843C2.90709 8.26902 2.52612 7.55629 2.37178 6.78036C2.21744 6.00444 2.29665 5.20017 2.59941 4.46927C2.90216 3.73836 3.41485 3.11365 4.07264 2.67412C4.73044 2.2346 5.5038 2 6.29492 2V3C5.70158 3 5.12156 3.17595 4.62821 3.50559C4.13487 3.83524 3.75035 4.30377 3.52328 4.85195C3.29622 5.40013 3.23681 6.00333 3.35257 6.58527C3.46832 7.16721 3.75405 7.70176 4.1736 8.12132C4.59316 8.54088 5.12771 8.8266 5.70965 8.94236C6.2916 9.05811 6.8948 8.9987 7.44297 8.77164C7.99115 8.54458 8.45969 8.16006 8.78933 7.66671C9.11898 7.17336 9.29492 6.59334 9.29492 6H10.2949Z" fill="#000"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.29492 0L9.29492 2.5L6.29492 5V0Z" fill="#000"/> </svg> icon in the top right of your Designer Extension.

- Select a text element and click the button: the text should update.
- Select a non-text element (like an image) and click the button: you should see an error notification.

If both behaviors work as described, you’ve successfully improved your extension.

<Frame>
  ![Notify user](file:a380764a-5193-4217-90e5-9cba1213c69e)
</Frame>

</Step>
</Steps>


### Next steps
Congratulations! You’ve built and run your first Designer Extension.

To continue your journey and unlock more advanced capabilities, explore the following resources:

- **Learn more about the [Designer APIs](/designer/reference/introduction)**<br/>
Dive deeper into what’s possible with the [Designer API reference.](/designer/reference/introduction)

- **Build and publish your extension**<br/>
Follow our guide on [building and deploying](/designer/docs/publishing-your-app) Designer Extensions to prepare your app for the [Marketplace](https://webflow.com/marketplace).

- **Submit your App to the Webflow Marketplace**<br/>
Share your extension with the community by [submitting your app.](https://developers.webflow.com/submit)

- **Troubleshoot and get help**<br/>
Visit our [developer forums](https://discourse.webflow.com/c/publishing-help/api/29) for support, tips, and to connect with other Webflow extension developers.

---
title: Webflow CLI
slug: designer/reference/webflow-cli
description: ''
hidden: false
'og:title': Webflow CLI
'og:description': >-
  The Webflow CLI streamlines the development process for creating Webflow
  Designer Extensions.
---

The Webflow CLI streamlines the development process for creating Webflow Designer Extensions. Regularly check for updates to the CLI and the [Designer Extension Type Definitions](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code) to ensure compatibility and take advantage of the latest features.

## Prerequisites

Before installing the Webflow CLI, please be sure to have Node.js and npm installed.

## Installation

To install the Webflow CLI, use the following npm command:

```bash
npm install -g @webflow/webflow-cli
```

🔗 [npm package](https://www.npmjs.com/package/@webflow/webflow-cli)

## Commands Overview

There are the three primary commands you'll use:

| Command                    | Description                                                                                                                     |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `webflow extension init`   | Initializes a new Designer Extension project.                                                                                   |
| `webflow extension serve`  | Serves your Designer Extension locally, allowing interaction with Webflow's Designer APIs within the Webflow Designer.          |
| `webflow extension bundle` | Prepares `bundle.zip` file for your extension, which is used to upload your file to Webflow for publication to the marketplace. |

## Starting Your Project

**Strongly recommended.** Always start your project with `webflow extension init`.

This command will create a foundation tailored for Webflow Designer Extensions, and also ensures all necessary dependencies and configurations are installed correctly.

If you choose not to initialize your project with the above command, be sure to save the [Designer Extension type definitions](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code) as a development dependency to take advantage of type checking and the autocomplete functionality of your IDE:

```bash
npm i --save-dev @webflow/designer-extension-typings
```

🔗 [Typings npm package](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)

### Designer Extension Templates

The CLI also supports initializing a Designer Extension to work with specific libraries and languages via a template, including React and TypeScript. To view all available templates, enter the following command:

```
$ webflow extension list

// Returns
> Your available templates are: default, react, typescript-alt
> 💡 Syntax: "webflow extension init projectName templateName"
> 🌟 Example: "webflow extension init my-first-extension react"

// Initialize project with React Template
$ webflow extension init my-new-react-extension react
```

After the project folder is created, navigate into the folder and run `npm install` to install all dependencies needed for your template.

## Running your Designer Extension Locally

Before you can publish your extension, you need to build it with the Webflow CLI. This process compiles your code into a format that can be executed by the browser. Building your extension will create a file named bundle.zip, which contains the built version of your extension.
If you've built your project using the webflow extension init command, you can build your code using npm:

```
npm run build
```

Otherwise, navigate to your project folder and use the following CLI command:

```
webflow extension bundle
```

<Note title="Working with Frameworks">


 For frameworks that generate browser-ready file structures (i.e. Next.js), build using the framework first. Then, process the output using webflow extension bundle. Consider adding this as a script in your package.json file. See our guide for more information on successfully working with frameworks.
</Note>

Now that you’ve built your Designer Extension, it’s time to share it! [Refer to our guide on uploading your Designer Extension, and publishing to the Webflow Marketplace.](/designer/docs/publishing-your-app)

---
title: App Structure
slug: designer/reference/app-structure
description: ''
hidden: false
'og:title': Webflow App Structure
'og:description': Key files and folders to include in your Webflow Designer Extension.
---
## Key Files

After running the `init` command in your project folder, your project should resemble the following file structure. The `public` folder should contain all the files to serve your Designer Extension.

| Files | Description |
| :-- | :-- |
| `/src/index.ts` | The file where you can call Webflow's Designer APIs using the CLI's Objects and Methods. Webflow will compile any TypeScript into the `index.js` file to serve in the browser. |
| `/public/index.html` | An HTML file that serves as the main interface for the Extension. This file should include just the contents of the `<body>` tag, and not include any `<head>` tags. |
| `/public/index.js` | The file where you can call Webflow's Designer APIs using the CLI's Objects and Methods. This generated when the /src/index.ts file is compiled by running `webflow extension serve`. |
| `/public/styles.css` | Provides the visual styling for the Extension, including the layout, colors, and fonts. |
| `webflow.json` | The App manifest file that is used to configure a Webflow App and define various parameters that control its behavior including the folder where the App is served from, aka its `publicDirectory`. [See more on this file in it's documentation.](/designer/reference/app-settings) |
| `bundle.zip` | After running `webflow extension bundle` , the CLI will bundle and create a `bundle.zip` containing your Extension. You can upload this file to Webflow to share your app with others. |


## Referencing assets in `index.html`

When adding links to scripting and styling files in your `index.html` file, it's crucial to use relative paths rather than absolute paths. This ensures that your application can correctly locate and load these assets regardless of the environment it's running in.

### Relative paths

Relative paths start with the name of the next directory in the path, or with ./ to represent the current directory. For example:

- **scripts/app.js:** This path points to the `app.js` file in the scripts directory, which is a subdirectory of the current directory.
- **./styles/main.css:** This path points to the `main.css` file in the styles directory, which is a subdirectory of the current directory.

### Avoid absolute paths

Absolute paths, which start with a /, should be avoided. These paths are resolved from the root directory, not the current directory. For example:

- **/scripts/app.js:** This path points to the `app.js` file in the scripts directory at the root of your file system, not in a subdirectory of the current directory.

Using absolute paths can lead to issues if your application is not located at the root of your file system, which is common when using frameworks like Next.js or React. To ensure your assets are always correctly located and loaded, always use relative paths in your index.html

## Building your Extension

The scaffold for your Extension includes a foundational TypeScript file located at `src/index.ts`. Use this file to add to your interact with the Designer APIs and start building your Extension.

### The build process

When you're ready to create a build of your Extension, you can use the `npm run build` command. This command triggers the build script defined in your `package.json` file. The build script uses the TypeScript compiler (`tsc`) to transpile your TypeScript code into JavaScript.

### Output

The compiled JavaScript is stored in the `/public/index.js file`. It's important to note that you do not modify the `/public/index.js` file directly, as it gets overwritten every time you run the build command. Instead, all your development should be done in the `src/index.ts` file or other TypeScript files in your `src` directory.

## Publishing your Extension

If you'd like to learn more about publishing your Extension on the Marketplace, read our [Marketplace app guidelines](/data/docs/marketplace-guidelines) our [App publishing guide](/designer/docs/publishing-your-app) and, our [submission guidelines.](https://developers.webflow.com/data/docs/submitting-your-app)

---
title: App Settings
slug: designer/reference/app-settings
description: ''
hidden: false
'og:title': App Configuration
'og:description': Configure your App to run in the Webflow Designer.
---
The `webflow.json` file houses configuration for a Webflow Designer Extension app and defines parameters that control its behavior. Developers should use this file to include important details such as the app's name, size, and public directory.

## Properties
<div id="app-settings-parameters">
<div id="/data/reference/custom-code/custom-code/register-hosted#request.body.hostedLocation" class="scroll-mt-content-padded fern-api-property">
  <div class="fern-api-property-header">
    <span class="fern-api-property-key" data-state="closed">name</span>
    <span class="fern-api-property-meta"><span>string</span><span class="t-danger">Required</span></span>
  </div>
  <div class="prose dark:prose-invert max-w-none break-words prose-sm dark:prose-invert-sm"><p>Specifies the name of the Webflow App. It should be a descriptive and unique name that helps identify the app.</p></div>
</div>
<div class="bg-border-default h-px"></div>
<div id="/data/reference/custom-code/custom-code/register-hosted#request.body.hostedLocation" class="scroll-mt-content-padded fern-api-property">
  <div class="fern-api-property-header">
    <span class="fern-api-property-key" data-state="closed">apiVersion</span>
    <span class="fern-api-property-meta"><span>string</span><span>Optional</span></span>
  </div>
  <div class="prose dark:prose-invert max-w-none break-words prose-sm dark:prose-invert-sm"><p>The version of the Designer APIs your app is using. It's highly recommended to set this value to `"2"`</p></div>
</div>
<div class="bg-border-default h-px"></div>
<div id="/data/reference/custom-code/custom-code/register-hosted#request.body.hostedLocation" class="scroll-mt-content-padded fern-api-property">
  <div class="fern-api-property-header">
    <span class="fern-api-property-key" data-state="closed">size</span>
    <span class="fern-api-property-meta"><span>string</span><span>Optional</span></span>
  </div>
  <div class="prose dark:prose-invert max-w-none break-words prose-sm dark:prose-invert-sm">
    Defines the size of the Designer Extension window. Available sizes include:

    - `default`: 240px by 360px - Great for simple apps that don’t require much real estate
    - `comfortable`: 320px by 460px - For apps like form submissions that may require a bit more room
    - `large`: 800px by 600px - For apps that require in-depth work flows, previews, or in depth control

    If a size is not declared in the `webflow.json` file, the Designer Extension window will open to the default size of 240px by 360px. To be explicit about this behavior, you can add `{"size": "default"}` to your manifest file. Note that you can also dynamically change the size of the window using the `webflow.setExtensionSize()` [API](/designer/reference/resize-extension).
  </div>
</div>
<div class="bg-border-default h-px"></div>
<div id="/data/reference/custom-code/custom-code/register-hosted#request.body.hostedLocation" class="scroll-mt-content-padded fern-api-property">
  <div class="fern-api-property-header">
    <span class="fern-api-property-key" data-state="closed">publicDir</span>
    <span class="fern-api-property-meta"><span>string</span><span>Optional</span></span>
  </div>
  <div class="prose dark:prose-invert max-w-none break-words prose-sm dark:prose-invert-sm">
    Determines the directory to build and serve the app from when bundling your Designer Extension. By defining a custom `publicDir`, you can have more control over the organization and structure of your app's static files.

    If a `publicDir` is not declared in the `webflow.json` file, the Designer Extension will expect to load the designer extension from the `/public` directory. To be explicit about this behavior, you can add `{ "publicDir": "public" }` to your manifest file.
  </div>
</div>
<div class="bg-border-default h-px"></div>
<div id="/data/reference/custom-code/custom-code/register-hosted#request.body.hostedLocation" class="scroll-mt-content-padded fern-api-property">
  <div class="fern-api-property-header">
    <span class="fern-api-property-key" data-state="closed">appIntents</span>
    <span class="fern-api-property-meta"><span>string</span><span>Optional</span></span>
  </div>
  <div class="prose dark:prose-invert max-w-none break-words prose-sm dark:prose-invert-sm">
    Use the `appIntents` parameter to define the element types that can create connections to your App. [See the documentation on App Intents for more details.](/designer/reference/app-intents-and-connections)
  </div>
</div>
<div class="bg-border-default h-px"></div>
<div id="/data/reference/custom-code/custom-code/register-hosted#request.body.hostedLocation" class="scroll-mt-content-padded fern-api-property">
  <div class="fern-api-property-header">
    <span class="fern-api-property-key" data-state="closed">appConnections</span>
    <span class="fern-api-property-meta"><span>string</span><span>Optional</span></span>
  </div>
  <div class="prose dark:prose-invert max-w-none break-words prose-sm dark:prose-invert-sm">
    Include the `appConnections` parameter with an array of unique identifiers that can be use to establish connections between your app and elements on the canvas. [See the documentation on App Connections for more details.](/designer/reference/app-intents-and-connections)
  </div>
</div>
</div>
<Aside>
```json title="webflow.json"
{
  "name": "My Webflow App",
  "apiVersion": "2",
  "size": "comfortable",
  "publicDir": "dist",
  "appIntents": {
    "image": ["manage"],
    "form": ["manage"]
  },
  "appConnections": [
    "myAppImageConnection",
    "myAppFormConnection"
  ]
}
```
</Aside>

---
title: Migrating to v2
slug: designer/reference/migrating-to-v2
description: ''
hidden: false
'og:title': Migrating to v2 of the Webflow Designer API
'og:description': Migrate to the latest version of the Webflow Designer API
---
We're excited to introduce the new version of Webflow's Designer APIs, featuring enhanced functionality and more efficient methods for interacting with the Designer. To ensure your app remains compatible, please follow the simple steps provided for updating your app's configuration and codebase. [Check the details below.](#app-configuration-updates)

## Notable Changes

### Simplified edit semantics

We have removed the `.save()` method from many of our objects.  Rather than staging “local changes” and explicitly synchronizing via `element.save()`, we’re now making changes as they’re invoked.

### Accessing native Elements

Through the introduction of the [Element Presets Object](/designer/reference/element-presets), the API now allows Apps to insert [native Elements](https://university.webflow.com/lesson/add-elements-panel?topics=elements) onto the canvas.

### Inserting Elements

We’re **introducing** new helper methods that make it easier to insert elements into a hierarchy

- `element.append() `
- `element.prepend() `
- `element.before()`
- `element.after()`

We've **removed** element-specific methods for adding an element to a canvas including

- `createDOM()`
- `createString()`
- `createHeading()`

### Direct editing of Components

This API allows a more streamlined way to edit Component Objects, by[ accessing the root element of a Component Object.](/designer/reference/get-root-element)

### Clear and consistent naming

We've made minor changes to clarify Designer API functionality

- _“Folders” → “PageFolders”_ to disambiguate versus other Page resources (e.g. Asset pages)
- _“og-” -> “openGraph-”_ prefix for Open Graph Page Fields

### Clear and consistent return objects

- Most methods that aren't meant to return a value now return a Promise that resolves to `null`  instead of `undefined`
- Element IDs are now identified by their component and element ids, e.g. `id: {component: '63486e4622e33733b9002e9c', element: 'cafe0045-d304-79d9-8f68-af3adaed06e8'}`

***

## App configuration Updates

1. Install the latest version of the Webflow CLI
2. Install the latest type definitions for the Designer APIs

```bash
npm i @webflow/designer-extension-typings@0.2.0-beta.3
```

3. Update `webflow.json` to include the new `apiVersion` parameter.

```json webflow.json
{
  "name": "My Webflow App",
  "publicDir": "dist",
  "apiVersion": "2"
}
```

4. Start your development server.

***

## Code Adjustments

Remove any references to `.save()`

```typescript
// v1
await myElement.setStyles([styles])
await myElement.save()

// v2
await myElement.setStyles([styles])
```

Adjust logic to access Element IDs

```typescript
// v1
const selectedElement = await webflow.getSelectedElement()
console.log(selectedElement)
// Prints: 'cafe0045-d304-79d9-8f68-af3adaed06e8'

// v2
const selectedElement = await webflow.getSelectedElement()
console.log(selectedElement)
// Prints id: {component: '63486e4622e33733b9002e9c', element: 'cafe0045-d304-79d9-8f68-af3adaed06e8'}\`

const elementID = selectedElement?.id.element
// Returns: 'cafe0045-d304-79d9-8f68-af3adaed06e8'
```

Adjust logic for element insertion

```typescript
// v1
const newDiv = await webflow.createDOM('div')

// v2
const selectedElement = await webflow.getSelectedElement()
const newDiv = await selectedElement?.before(webflow.elementPresets.DivBlock)
```

---
title: Error Handling
slug: designer/reference/error-handling
description: ''
hidden: false
---
This page outlines error patterns, debugging tips, and all possible errors for quick troubleshooting to aid developers in building resilient applications. API errors in Webflow may be a result of a number of scenarios including but not limited to insufficient Webflow entitlements, user role abilities, and more.


## Error patterns

The Designer API employs a structured format for exceptions, ensuring you have clear and actionable information at your disposal. Here's what you can expect in the event of an error:

```
Cause Tag: ResourceRemovalFailed
Message: "Failed to remove style. Ensure there are no usages of this style."
```

**Cause Tag** `(err.cause.tag)`: Accompanying each error message is a consistent, unchanging cause tag. These tags describe a unique error type for the purpose of programmatically distinguishing between different error scenarios and responding accordingly.

**Message** `(err.message)`: A descriptive sentence designed to provide insight into what went wrong. The wording of this message may change over time to clarify or reflect updated functionality within the Designer API.

## List of errors

This section provides a detailed list of error cause tags you might encounter while interacting with the Designer API.

| Cause Tag               | Description                                                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DuplicateValue          | Indicates a value was duplicated where it should be unique.                                                                                                    |
| Forbidden               | Indicates that a User and/or app doesn't have the permission to take a specific action. For more on this error see documentation on [App Modes](/designer/reference/app-modes) |
| InternalError           | An error occurred within the system or process.                                                                                                                |
| InvalidElementPlacement | An element was placed in an invalid location or context.                                                                                                       |
| InvalidRequest          | A request is invalid based on the designer's current ability                                                                                                   |
| InvalidStyle            | The specified style is invalid or not recognized.                                                                                                              |
| InvalidStyleName        | The specified style name doesn't exist or is incorrect.                                                                                                       |
| InvalidStyleProperty    | The property of the style is invalid or not applicable.                                                                                                        |
| InvalidStyleVariant     | The variant of the style specified is invalid or not recognized.                                                                                               |
| InvalidTargetElement    | The target element for the operation is invalid.                                                                                                               |
| PageCreateFailed        | Failed to create a page due to an unspecified error.                                                                                                           |
| ResourceCreationFailed  | Failed to create a resource due to an unspecified error.                                                                                                       |
| ResourceMissing         | The requested resource is missing or unavailable.                                                                                                              |
| VariableInvalid         | A variable's value is invalid or not within the expected range.                                                                                                |

## How to handle errors

Apps need to manage errors gracefully to maintain a seamless user experience. See the approaches below for a few patterns on how to handle errors if they arise when working with Designer APIs.

### Using try/catch for error handling

The try/catch block is seamlessly integrated with async/await syntax, offering a straightforward way to catch exceptions as demonstrated:

```typescript
try {
  const element = await webflow.getSelectedElement();
  await element.remove();
  // Attempting further operations on the removed element will throw an error
  const styles = await element.getStyles();
} catch (err) {
  console.error(`Cause:${err.cause.tag}`);
  console.error(`Message:${err.message}`);
}
```

### Notifying users of an error

By utilizing the [`webflow.notify`](/designer/reference/notify-user) method, you can send a notification directly to the user within Webflow that acknowledges the error and also, when feasible, provide guidance on resolving it. This proactive approach helps maintain trust and ensures users aren't left in the dark, improving their overall experience and satisfaction with your application.

<video autoplay loop muted style="width:100%;">  <source src="https://dhygzobemt712.cloudfront.net/Web/developers/videos/24005_API%20Documentation_User%20Events.webm" type="video/webm" />  Your browser doesn't support HTML video.</video>


```typescript
function handleErrors(err) {
  switch (err.cause.tag) {
    case 'ResourceMissing':
      webflow.notify({ type: 'Error', message: 'The element no longer exists. Select a different element' });
      break;
    case 'InvalidElementPlacement':
      // Handle specific error
      webflow.notify({  type: 'Error', message: 'The element cannot be placed here. Try another location' });
      break;
    // Additional error cases
    default:
      webflow.notify({ type: 'Error', message: 'An error occurred. Please try again later' });
  }
}
```
---
title: App Modes
slug: designer/reference/app-modes
description: ''
hidden: false
'og:title': 'Webflow Designer API: App Modes'
'og:description': Documentation on App Modes for Webflow Apps.
---
## Modes in the Webflow Designer

The Webflow Designer is a powerful collaborative tool for teams to design and build websites quickly and at scale. To support collaboration, the Designer offers various modes to support different aspects of the design process:

- **[Designing and Building](https://university.webflow.com/lesson/collaborate-in-the-webflow-designer?topics=layout-design):** Designers can create and refine the website’s layout and appearance in the Webflow Designer, while marketers and content writers manage and update content in build mode.
- **[Page Branching](https://university.webflow.com/lesson/page-branching?topics=collaboration):** Multiple designers can work on different pages of the same site at the same time, allowing for parallel development and reducing bottlenecks.
- **[Localization](https://arc.net/l/quote/cjoktvxx)**: Global teams can create customized experiences for different languages or regions, enabling global reach and tailored content for diverse audiences.

Through these features and modes, the Webflow Designer determines the specific actions a user can take to ensure teams make the right updates at the right time.

## Modes in Webflow Apps

Designer Extensions extend the user’s capabilities while respecting the mode the Designer is in. Each method in the Designer API offers distinct functionality, aligning with the actions feasible  in each mode. By understanding the various modes in the Designer, and how Designer APIs interact  with them, you can ensure your App functions correctly across different contexts within the Webflow Designer, thus providing a seamless user experience.

## Understanding modes and API methods

Each API method’s documentation includes an “App Modes” section that outlines where and how the API can be used, as well as any limitations.

Here’s an example from the “[Remove Element](https://developers.webflow.com/designer/reference/remove-element)” method:

| **Ability**                   | **Locale**                                                                       | **Branch**                                                                     | **Workflow**                                                                                        | **Sitemode**                                                 |
| ----------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| _Name of the current ability_ | Site uses Localization, and the user is working in a primary or secondary locale | Site uses Page Branching, and the users working in a primary or branched paged | Determines whether the user is actively working on the canvas, or viewing the site in preview mode. | Determines whether the user is in design mode, or build mode. |
| **canDesign**                 | `primary`                                                                        | `main`                                                                         | `canvas`                                                                                            | `design`                                                     |

In this example, the “Remove Element” method can only be successfully called if the user is in design sitemode, working on the canvas in a primary locale on the main branch. If the user is in any other mode, the API will throw a “Forbidden” error.

See below for a complete table of abilities, which defines where and how an API method can be used.

| **Name**                  | **Locale** | **Branch** | **Workflow** | **Sitemode** |
| ------------------------- | ---------- | ---------- | ------------ | ------------ |
| **canManageAssets**       | Any        | Any        | Any          | Any          |
| **canAccessAssets**       | Any        | Any        | Any          | Any          |
| **canAccessCanvas**       | Any        | Any        | Any          | Any          |
| **canDesign**             | primary    | main       | canvas       | design       |
| **canEdit**               | Any        | Any        | canvas       | Any          |
| **canCreateComponents**   | primary    | Any        | canvas       | Any          |
| **canModifyComponents**   | Any        | Any        | canvas       | design       |
| **canCreateStyles**       | primary    | Any        | canvas       | design       |
| **canModifyStyles**       | Any        | Any        | canvas       | design       |
| **canCreatePage**         | Any        | Any        | Any          | design       |
| **canReadPageSettings**   | Any        | Any        | Any          | Any          |
| **canManagePageSettings** | Any        | Any        | Any          | Any          |
| **canReadVariables**      | Any        | Any        | Any          | Any          |
| **canModifyVariables**    | Any        | main       | canvas       | design       |
| **canModifyImageElement** | Any        | main       | canvas       | Any          |

<br />

## Checking for App modes with `webflow.canForAppMode`

To ensure your app functions correctly in the different modes of the Webflow Designer, you can leverage the [`webflow.canForAppMode`](https://developers.webflow.com/designer/reference/get-users-designer-capabilities)  method. This method allows you to check whether a specific action is allowed in the user's current mode before executing it, helping to prevent errors and improve the user experience.

#### Example Usage

The `webflow.canForAppMode` method returns a Boolean indicating whether the specified action is permitted based on the current mode of the Designer. Here’s a basic example:

```javascript
const capabilities = await webflow.canForAppMode([webflow.appModes.canDesign, webflow.appModes.canEdit
]);

if (capabilities.canDesign) {
  // Proceed with the action
  const el = await webflow.getSelectedElement();
  await el.append(webflow.elementPresets.DOM);
} else {
  // Provide feedback to the user
  await webflow.notify({
    type: 'Error',
    message: 'This action cannot be performed right now. Ensure you are working in the Primary Locale, on the Main Branch, and in design mode.',
  });
}
```

### When to Use `webflow.canForAppMode`

Use `webflow.canForAppMode` before any critical action that depends on the mode the user is in, such as:

- Adding or modifying elements in the Designer.
- Creating or editing styles that are only permitted in specific locales or branches.
- Managing components that might be restricted based on the current workflow.

[See the documentation for `webflow.canForAppMode` for more details.](https://developers.webflow.com/designer/reference/get-users-designer-capabilities)

## Error handling for App modes

When an API call is made in an incorrect mode, a “Forbidden” error will be thrown. To manage this, implement error handling to guide users back to the appropriate mode. For more guidance on errors, see our guide on [understanding and handling API errors.](https://developers.webflow.com/designer/reference/error-handling)

To help you implement robust error handling for App Modes, we have included a list of API abilities along with the accepted modes for each ability and example error messages to direct users back to the correct mode:

<br />

| **Name**                  | **Example Error Message**                                                                                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **canManageAssets**       | This action cannot be performed right now. Please ensure you have the correct permissions to manage assets.                                                             |
| **canAccessAssets**       | This action cannot be performed right now. Please ensure you have the correct permissions to view assets.                                                               |
| **canAccessCanvas**       | This action cannot be performed right now. Please ensure you are working in the correct mode to access the canvas.                                                      |
| **canDesign**             | This action cannot be performed right now. Ensure you are working in the Primary Locale and the Main Branch, and in design mode.                                        |
| **canCreateComponents**   | This action cannot be performed right now. Ensure you have the correct permissions to create components, and are working in the Primary Locale.                         |
| **canModifyComponents**   | This action cannot be performed right now. Ensure you have the correct permissions to modify components.                                                                |
| **canCreateStyleBlocks**  | This action cannot be performed right now. To create Styles, ensure you are working in the Primary Locale and in design mode.                                           |
| **canModifyStyleBlocks**  | This action cannot be performed right now. Make sure you are in design mode to modify Styles.                                                                           |
| **canCreatePage**         | This action cannot be performed right now. Ensure you have the correct plan and/or permissions to create additional pages. Additionally, ensure you are in design mode. |
| **canReadPageSettings**   | This action cannot be performed right now. Please ensure you have the correct permissions to view Page Settings.                                                        |
| **canManagePageSettings** | This action cannot be performed right now. Please ensure you have the correct permissions to manage Page Settings.                                                      |
| **canReadVariables**      | This action cannot be performed right now. Please ensure you have the correct permissions to view Variables.                                                            |
| **canModifyVariables**    | This action cannot be performed right now. Please ensure you have the correct permissions to manage Variables.                                                          |

As an example, see the below snippets on guidance for how to catch the new `Forbidden` error and surface appropriate user messaging.

**Before App Modes**

```javascript
const el = await webflow.getSelectedElement();
// Assumes a user can create elements
await el.append(webflow.elementPresets.DOM);
```

**After App Modes**

```javascript
try {
  // The element is able to be selected
  const el = await webflow.getSelectedElement();
  // However, appending an element is disallowed in a secondary locale
  await el.append(webflow.elementPresets.DOM);
} catch (error) {
  if (error.cause.tag === 'Forbidden') {
    // It is up to the developer to craft an error message to the user.
    // below is an example of what they could do:
    await webflow.notify({
      type: 'Error',
      message: 'This action cannot be performed right now. Ensure you are working in the Primary Locale and the Main Branch, and  in design mode.',
    })
  }
}
```

## Testing with App Modes

To test out how your Designer Extension will function with Expanded App Modes, you can opt-in to the feature with your `webflow.json` manifest file.

```json
// webflow.json manifest file
{
  "name": "my app",
  "apiVersion": "2",
  "featureFlags": {
    "expandedAppModes": true
  }
}
```

Now, if you launch your Designer Extension from the Apps Panel as you normally would today, you can switch to Build mode, as an example, and your App should remain open. If you take an action via your App that a user shouldn't be able to in that mode, you will see a `Forbidden` error thrown, and you can catch the error appropriately to surface relevant user messaging.

## Opt Out

We recognize that for some Apps, it may take more time to incorporate code changes to add extra error handling, UI considerations, etc. with expanded App Modes. To opt-out, set the `expandedAppModes` feature flag to false in your `webflow.json` manifest file (see below). Then, simply create a new updated app bundle with this change and submit it for review.

```json
// webflow.json manifest file
{
  "name": "my app",
  "apiVersion": "2",
  "featureFlags": {
    "expandedAppModes": false
  }
}
```

### Deciding to Opt Out

Opting-out of this feature means your App will only be able to be launched under the existing conditions; end-users who are Designing in the primary locale and main branch. Additionally, your App will not be launched from the Apps panel of the Designer by users who don’t meet those conditions (i.e,. in build mode).

## Designer v1 APIs

If you have an App using Designer v1 APIs, your app will not be able to be launched in other modes around the Designer, and will continue to only be launched when Designing in the canvas in the primary locale and main branch.

---
title: Creating & Retrieving Elements
slug: designer/reference/creating-retrieving-elements
description: >-
  Learn how to create, select, and manipulate elements in the Webflow Designer
  using the Designer API
hidden: false
hide-nav-links: true
'og:title': 'Webflow Designer API: Creating & Retrieving Elements'
'og:description': >-
  Methods for creating, selecting, and manipulating elements in the Webflow
  Designer canvas
---

Managing elements is a core aspect of working with the Webflow Designer API. This section covers methods for creating new elements, selecting existing ones, and managing their placement in the element hierarchy.

<video autoplay loop muted style="width:100%;">  <source src="https://dhygzobemt712.cloudfront.net/Web/developers/videos/24005_API%20Documentation_Get%20Selected%20Element.webm" type="video/webm" />  Your browser doesn't support HTML video.</video>

## Element selection

Before manipulating elements on the canvas, you typically need to select them. The Designer API provides methods to get references to existing elements:

```typescript
// Get the currently selected element
const selectedElement = await webflow.getSelectedElement();

// Get all elements on the page
const allElements = await webflow.getAllElements();

// Programmatically select an element
await webflow.setSelectedElement(elementToSelect);

// Get element children and select the first child
if (selectedElement?.children) {
  const children = await selectedElement.children;
  await webflow.setSelectedElement(children[0]);
}
```

## Adding elements to the Canvas

When adding elements to your design, you need to consider their placement within the [element hierarchy](https://university.webflow.com/lesson/element-hierarchy?topics=getting-started). The Designer API provides several methods for inserting elements precisely where you need them.

### Element Presets

The Designer API uses Element Presets to specify which type of element to create. Each preset corresponds to a unique element type in Webflow. Some [element types include their own properties and methods](/designer/reference/element-types-methods).

For a complete list of available presets, refer to the [Element Presets](/designer/reference/element-presets) documentation. These presets can be used with any of the element creation methods shown below.

### Inserting elements next to existing elements

To position an element alongside existing elements:

```typescript
// Get Selected Element
const selectedElement = await webflow.getSelectedElement();

if (selectedElement) {
  // Insert a div after the selected element
  const newDivAfter = await selectedElement.after(webflow.elementPresets.DivBlock);

  // Insert a div before the selected element
  const newDivBefore = await selectedElement.before(webflow.elementPresets.DivBlock);
}
```
<Note title="Parent elements">
If the selected element has a parent element, the new element created using `before()` or `after()` will also be a child element of the same parent.
</Note>

### Nesting elements within parent elements

To create parent-child relationships by nesting elements:

```typescript
// Get Selected Element
const parentElement = await webflow.getSelectedElement();

// Check if element supports child elements
if (parentElement?.children) {
  // Add element as first child (prepend)
  const firstChild = await parentElement.prepend(webflow.elementPresets.DivBlock);

  // Add element as last child (append)
  const lastChild = await parentElement.append(webflow.elementPresets.Paragraph);
}
```

### Bulk adding elements

For more complex structures, you can create multiple elements at once using [element builder](/designer/reference/bulk-add-elements):

```typescript maxLines=10
// Create an element structure using elementBuilder
const selectedElement = await webflow.getSelectedElement();

// Create a section element as the root
const section = webflow.elementBuilder(webflow.elementPresets.DOM);
section.setTag('section');

// Add a container child element
const container = section.append(webflow.elementPresets.DOM);
container.setTag('div');
container.setAttribute('class', 'container');

// Add heading and paragraph to the container
const heading = container.append(webflow.elementPresets.DOM);
heading.setTag('h2');

const paragraph = container.append(webflow.elementPresets.DOM);
paragraph.setTag('p');

// Add the entire structure to the canvas in one operation
if (selectedElement?.children) {
  await selectedElement.append(section);

  // After adding to canvas, find elements and set text content
  const elements = await webflow.getAllElements();

  // Find the heading and paragraph elements by their IDs
  const headingEl = elements.find(el => el.id.element === heading.id);
  const paragraphEl = elements.find(el => el.id.element === paragraph.id);

  // Set text content on the elements
  if (headingEl) await headingEl.setTextContent('Hello World');
  if (paragraphEl) await paragraphEl.setTextContent('Created with element builder');
}
```

## Removing elements

To remove an element from the canvas:

```typescript
// Get Selected Element
const elementToRemove = await webflow.getSelectedElement();

if (elementToRemove) {
  // Remove the element
  await elementToRemove.remove();
}
```

## Methods

The Elements API offers the following methods for element creation and manipulation:

<CardGroup>
  <Card title="Get selected element" href="/designer/reference/get-selected-element">
    Retrieve the currently selected element in the Designer.
  </Card>
  <Card title="Set selected element" href="/designer/reference/set-selected-element">
    Programmatically select an element in the Designer.
  </Card>
  <Card title="Get all elements" href="/designer/reference/get-all-elements">
    Retrieve all elements on the current page.
  </Card>
  <Card title="Insert element before" href="/designer/reference/insert-element-before">
    Insert a new element before the target element.
  </Card>
  <Card title="Insert element after" href="/designer/reference/insert-element-after">
    Insert a new element after the target element.
  </Card>
  <Card title="Prepend" href="/designer/reference/prepend">
    Insert a new element as the first child of the target element.
  </Card>
  <Card title="Append" href="/designer/reference/append">
    Insert a new element as the last child of the target element.
  </Card>
  <Card title="Bulk add elements" href="/designer/reference/bulk-add-elements">
    Add multiple elements at once with a hierarchical structure.
  </Card>
  <Card title="Remove element" href="/designer/reference/remove-element">
    Remove an element from the canvas.
  </Card>
</CardGroup>

---
title: Get selected element
slug: designer/reference/get-selected-element
description: ''
hidden: false
'og:title': 'Webflow Designer API: Get selected element'
'og:description': Retrieve the element that the user has selected in the Webflow Designer.
---
## `webflow.getSelectedElement()`

Retrieve the [element](https://university.webflow.com/courses/web-elements-course) that the user has selected in the Webflow Designer.

The returned element object provides access to all element properties (like `type`, `id`, and `styles`) and exposes methods such as `getChildren()`, `getStyles()`, and `getCustomAttributes()` for working with the element programmatically.

### Syntax

```typescript
webflow.getSelectedElement(): Promise<null | AnyElement>
```

### Returns

*Promise\<`AnyElement` \| `null`>*

A Promise that resolves to one of the following:


- `AnyElement`: An object that represents the various element types available in a Webflow project. See a full list of supported element types in the [Designer Extension type definitions.](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)
- `null`: If an element is not currently selected in the Designer



### Example
```typescript
// Get Selected Element
const element = await webflow.getSelectedElement();

// Print element info
if (element) {
  console.log(`Selected Element ID: ${element.id}`);
  console.log(`Element type: ${element.type}`);

  // If the element has children, print the child elements
  if(element.children){
    const children = await element.getChildren();
    console.log(`Child elements: ${children}`);
  }

} else {
  console.log("No element is currently selected.");
}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | An       |


---
title: Set selected element
slug: designer/reference/set-selected-element
description: ''
hidden: false
---
## `webflow.setSelectedElement()`

Set the selected element on the current page, or on the current component when the Designer is [entered into a component.](/designer/reference/enter-component)

The returned element object can be further queried using [element-level properties](/designer/reference/elements/children) (e.g. type, styles)  and methods (e.g. `getChildren()`)


### Syntax

```typescript
webflow.setSelectedElement(element: AnyElement): Promise<AnyElement>
```

### Parameters

- **Element**:  _AnyElement_ - Any element that is on the current canvas, or is with the current component when the designer is [entered into a component.](/designer/reference/enter-component)

### Returns

*Promise\<_AnyElement_>*

A Promise that resolves to `AnyElement`.

### Example
```typescript
// Get the Root Element
const rootElement = await webflow.getRootElement();

if (rootElement) {

  // Select the root element
  const selectedElement = await webflow.setSelectedElement(rootElement);

  if (selectedElement?.children) {

    // Start building elements on the selected element
    await selectedElement?.append(webflow.elementPresets.DOM)

  }
}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | Any      |

---
title: Get all elements
slug: designer/reference/get-all-elements
description: ''
hidden: false
'og:title': 'Webflow Designer API: Get all elements'
'og:description': Retrieve all elements present on the current page of the Designer.
---
## `webflow.getAllElements()`

Retrieve all elements present on the current page of the Designer.

If the Designer is editing a component, the elements returned are those present in that Component.


### Syntax

```typescript
webflow.getAllElements(): Promise<Array<AnyElement>>
```

### Returns

**Promise\<_AnyElement_>**

A Promise that resolves to an array of `AnyElement` objects.

`AnyElement` represents the various element types available in a Webflow project. See a full list of supported element types in the [Designer Extension type definitions.](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)


### Example

```typescript
// Retrieve all elements in the current context
const allElements = await webflow.getAllElements();

// Print element list
if (allElements.length > 0) {
  console.log("List of all elements:");

  allElements.forEach((element, index) => {
    console.log(`${index + 1}. Element ID: ${element.id}, Element Type: ${element.type}`);
  });
} else {
  console.log("No elements found in the current context.");
}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | Any      |

---
title: Insert element before target element
slug: designer/reference/insert-element-before
description: ''
hidden: false
'og:title': 'Webflow Designer API: Insert a new element before target element.'
'og:description': Insert a new element onto the page before the target element.
---
## `element.before(newElement)`

Insert a new element onto the page before the target element.


### Syntax

```typescript
element.before(newElement: ElementPreset | Component): Promise<<AnyElement>
```

### Parameters

- **newElement**:  _webflow.elementPresets.\<preset\>_ - The new element to be inserted into the hierarchy. This element is derived from the `webflow.elementPresets` object, which contains all Webflow elements that can be inserted onto the canvas.

### Returns

**Promise\<_AnyElement_>**

A Promise that resolves to an `AnyElement` object.

`AnyElement` represents the various element types available in a Webflow project. See a full list of supported element types in our [Designer Extension type definitions.](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)


### Example

```typescript
// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement) {

  // Insert DIV before selected Element
  const newDiv = await selectedElement.before(webflow.elementPresets.DivBlock)

  // Print element details
  console.log(`${JSON.stringify(newDiv)}`)

}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### App Mode

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canDesign**    | Primary | Main   | Canvas   | Design   |

---
title: Insert element after target element
slug: designer/reference/insert-element-after
description: ''
hidden: false
'og:title': 'Webflow Designer API: Insert element after target element'
'og:description': Insert a new element onto the page after the target element.
---
## `element.after(newElement)`

Insert a new element onto the page after the target element.


### Syntax

```typescript
element.after(newElement: ElementPreset | Component): Promise<<AnyElement>
```

### Parameters

- **newElement**:  _webflow.elementPresets.\<preset\>_ - The new element to be inserted into the hierarchy. This element is derived from the `webflow.elementPresets` object, which contains all Webflow elements that can be inserted onto the canvas.

### Returns

**Promise\<_AnyElement_>**

A Promise that resolves to an `AnyElement` object.

`AnyElement` represents the various element types available in a Webflow project. See a full list of supported element types in our [Designer Extension type definitions.](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)


### Example

```typescript
// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement) {

  // Insert DIV after selected Element
  const newDiv = await selectedElement.after(webflow.elementPresets.DivBlock)

  // Print element details
  console.log(`${JSON.stringify(newDiv)}`)

}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canDesign**    | Primary | Main   | Canvas   | Design   |

---
title: Nest element as first child
slug: designer/reference/prepend
description: ''
hidden: false
'og:title': 'Webflow Designer API: Nest element as first child'
'og:description': Insert a new element onto the page as the first child of the target element.
---
## `element.prepend(newElement)`

Insert a new element onto the page as the first child of the target element.


### Syntax

```typescript
element.prepend(newElement: ElementPreset | Component): Promise<<AnyElement>
```

### Parameters

- **newElement**:  _webflow.elementPresets.\<preset\>_ - The new element to be inserted into the hierarchy. This element is derived from the `webflow.elementPresets` object, which contains all Webflow elements that can be inserted onto the canvas.

### Returns

**Promise\<_AnyElement_>**

A Promise that resolves to an `AnyElement` object.

`AnyElement` represents the various element types available in a Webflow project. See a full list of supported element types in our [Designer Extension type definitions.](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)


### Example

```typescript
// Get Selected Element
const el = await webflow.getSelectedElement();


// Check if element supports child elements
if (el?.children) {

  // Prepend newElement as a child to of the selected element
  const newElement = await el?.prepend(webflow.elementPresets.DivBlock)

  // Print element Details
  console.log(JSON.stringify(newElement))

}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canDesign**    | Primary | Main   | Canvas   | Design   |

---
title: Nest element as last child
slug: designer/reference/append
description: ''
hidden: false
'og:title': 'Webflow Designer API: Nest element as last child'
'og:description': Insert a new element onto the page as the last child of the target element.
---
## `element.append(newElement)`

Insert a new element onto the page as the last child of the target element.


### Syntax

```typescript
element.append(newElement: ElementPreset | Component ): Promise<AnyElement>
```

### Parameters

- **newElement**:  _webflow.elementPresets.\<preset\>_ - The new element to be inserted into the hierarchy. This element is derived from the `webflow.elementPresets` object, which contains all Webflow elements that can be inserted onto the canvas.

### Returns

**Promise\<_AnyElement_>**

A Promise that resolves to an `AnyElement` object.

`AnyElement` represents the various element types available in a Webflow project. See a full list of supported element types in our [Designer Extension type definitions.](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)


### Example

```typescript
// Get Selected Element
const el = await webflow.getSelectedElement();

// Check if element supports child elements
if (el?.children) {

  // Append newElement as a child to of the selected element
  const newElement = await el?.append(webflow.elementPresets.DivBlock)

  // Print element Details
  console.log(JSON.stringify(newElement))

}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canDesign**    | Primary | Main   | Canvas   | Design   |

---
title: Bulk Add Elements
slug: designer/reference/bulk-add-elements
description: Create complex element structures efficiently with the element builder API
hidden: false
'og:title': 'Webflow Designer API: Bulk Add Elements'
'og:description': >-
  Learn how to create complex element structures efficiently with the element
  builder API
---

## `webflow.elementBuilder(preset)`

Construct complex element structures before adding them to a page. This method is optimized for bulk creation of elements, and is particularly useful when working with SVG graphics or nested element groups like a navigation menu. This approach is more efficient than creating and adding elements one at a time, especially for complex designs.

<Warning title="Current Limitations">
Currently, only DOM elements can be created with the element builder.
</Warning>

### Syntax

```typescript
webflow.elementBuilder(elementPreset: webflow.elementPresets.DOM): BuilderElement
```

### Parameters

- **preset**: The DOM element preset from the Webflow presets. Currently, only DOM elements are supported.

### Returns

**BuilderElement**

A builder element object designed for creating and manipulating hierarchical structures. This object has these methods:
- `append()`: Add a child element to this builder element
- `setTag()`: Set the HTML tag for this DOM element
- `setAttribute()`: Set an attribute on this DOM element
- `setTextContent()`: Set the text within this DOM element
- `setStyles()`: Set styles on this DOM element

## How to use the element builder
<Steps>
<Step>
  **Get the parent element** <br/>
  Use `webflow.getSelectedElement()` to select the parent element. This is where your new structure will be added.
</Step>
<Step>
  **Create a builder element** <br/>
  Use `webflow.elementBuilder(webflow.elementPresets.DOM)` to create a builder element.
</Step>
<Step>
  **Configure the builder element** <br/>
  Use the builder element to configure the tags, attributes, and styles of the new structure.
</Step>
<Step>
  **Add child elements** <br/>
  Use `append()` to add child elements to the builder element. Configure them with tags, attributes, and styles.
</Step>
<Step>
  **Add the complete structure to your page** <br/>
  Use `append()` on the parent element to add the complete structure to your page.
</Step>
</Steps>

### Examples

<Tabs>
 <Tab title="Create a navigation menu">
  This example shows how to use element builder to create a navigation menu:

    <CodeBlock>
      ```typescript
      async function createNavMenu() {
        // Start by creating some styles that will be applied to the nav container.
        const navStyle = await webflow.createStyle('navContainer');
        await navStyle.setProperties({
          'display': 'flex',
          'row-gap': '20px',
          'padding-left': '15px',
          'padding-right': '15px',
          'padding-top': '15px',
          'padding-bottom': '15px',
          'background-color': '#f5f5f5',
          'border-radius': '8px'
        });

        const navItemStyle = await webflow.createStyle('navItem');
        await navItemStyle.setProperties({
          'color': '#333',
          'text-decoration': 'none',
          'padding-left': '12px',
          'padding-right': '12px',
          'padding-top': '8px',
          'padding-bottom': '8px',
          'border-radius': '4px',
          'font-weight': '500'
        });

        // Get the selected element as the container
        const selectedElement = await webflow.getSelectedElement();

        // Create a nav container
        const navMenu = webflow.elementBuilder(webflow.elementPresets.DOM);
        navMenu.setTag('nav');
        navMenu.setStyles([navStyle]);

        // Menu items to add
        const menuItems = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

        // Create all menu items at once and store references for later
        const menuItemRefs = [];
        menuItems.forEach(itemText => {
          const item = navMenu.append(webflow.elementPresets.DOM);
          item.setTag('a');
          item.setAttribute('href', '#');
          item.setTextContent(itemText);
          item.setStyles([navItemStyle]);
          // Store reference to set text later
          menuItemRefs.push(item);
        });

        // Add the entire menu to the canvas in one operation
        if (selectedElement?.children) {
          await selectedElement.append(navMenu);
          console.log('Navigation structure with 5 items created in one operation');
        }
      }
      ```
    </CodeBlock>
  </Tab>
<Tab title="SVG with multiple paths">
  This example shows how to create a nested SVG structure:

    <CodeBlock>
      ```typescript
      async function webflowRainbow() {
        // Get the selected element as the container
        const selectedElement = await webflow.getSelectedElement();

        // Create an SVG builder element
        const svgBuilder = webflow.elementBuilder(webflow.elementPresets.DOM);
        svgBuilder.setTag('svg');
        svgBuilder.setAttribute('viewBox', '0 0 100 100');
        svgBuilder.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgBuilder.setAttribute('width', '200');
        svgBuilder.setAttribute('height', '200');

        // Create rainbow circular background with multiple circles
        const backgroundElements = [];
        const rainbowColors = [
          'hsl(0, 90%, 55%)',    // Red
          'hsl(30, 90%, 55%)',   // Orange
          'hsl(60, 90%, 55%)',   // Yellow
          'hsl(120, 90%, 55%)',  // Green
          'hsl(240, 90%, 55%)',  // Blue
          'hsl(270, 90%, 55%)',  // Indigo
          'hsl(300, 90%, 55%)'   // Violet
        ];

        for (let i = 0; i < 7; i++) {
          const circle = svgBuilder.append(webflow.elementPresets.DOM);
          circle.setTag('circle');
          circle.setAttribute('cx', '50');
          circle.setAttribute('cy', '50');
          circle.setAttribute('r', `${46 - (i * 3)}`);
          circle.setAttribute('fill', 'none');
          circle.setAttribute('stroke', rainbowColors[i]);
          circle.setAttribute('stroke-width', '2.5');
          circle.setAttribute('opacity', '0.9');
          backgroundElements.push(circle);
        }

        // Create the central background circle
        const centralCircle = svgBuilder.append(webflow.elementPresets.DOM);
        centralCircle.setTag('circle');
        centralCircle.setAttribute('cx', '50');
        centralCircle.setAttribute('cy', '50');
        centralCircle.setAttribute('r', '32');
        centralCircle.setAttribute('fill', 'white');

        // Create the "Webflow" logo
        const logoPath = svgBuilder.append(webflow.elementPresets.DOM);
        logoPath.setTag('path');
        logoPath.setAttribute('d', 'M61.3811 14L43.0716 49.7933H25.8737L33.5362 34.959H33.1924C26.8709 43.1653 17.439 48.5674 4 49.7933V35.1643C4 35.1643 12.5972 34.6565 17.6513 29.3429H4V14.0003H19.3426V26.6194L19.687 26.6179L25.9565 14.0003H37.5597V26.5393L37.9041 26.5388L44.4089 14H61.3811Z');
        logoPath.setAttribute('fill', '#146EF5');
        logoPath.setAttribute('fill-rule', 'evenodd');
        logoPath.setAttribute('clip-rule', 'evenodd');
        logoPath.setAttribute('transform', 'translate(30.5, 30.5) scale(0.7)');

        // Add the entire SVG structure to the canvas in one operation
        if (selectedElement?.children) {
          await selectedElement.append(svgBuilder);
          console.log('webflow logo created successfully');
        }
      }
      ```
    </CodeBlock>
  </Tab>

</Tabs>

## When to use element builder

The element builder is particularly useful for:

- **Complex Element Structures**: When creating hierarchies with many nested elements
- **SVG Creation**: Perfect for building SVG graphics with many path, circle, or other elements
- **Repeating Patterns**: When you need to create many similar elements
- **Performance**: More efficient than adding elements one-by-one to the canvas

## Best practices

- **Build Complete Structures**: Create your entire element structure before adding it to the canvas
- **Set Properties**: Configure tags, attributes, styles, and text content on builder elements before appending
- **Track References**: If you need to modify elements after adding to canvas, store references to them
- **Batch Operations**: Use `Promise.all` for batch operations when modifying multiple elements

---
title: Remove element
slug: designer/reference/remove-element
description: ''
hidden: false
'og:title': 'Webflow Designer API: Remove element'
'og:description': Remove element from the canvas.
---
## `element.remove()`

Remove element from the canvas.


### Syntax

```typescript
element.remove(): Promise<null>
```

### Returns

**Promise\<`null`>**

A Promise that resolves to `null` when the Element is removed from the canvas.


### Example

```typescript
// Get Selected Element
const el = await webflow.getSelectedElement();

// Remove the selected element
await el?.remove();
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canDesign**    | Primary | Main   | Canvas   | Design   |

---
title: Element properties & methods
slug: designer/reference/element-properties-methods
description: >-
  Learn about element properties and their related methods in the Webflow
  Designer API
hidden: false
'og:title': 'Webflow Designer API: Element Properties & Methods'
'og:description': >-
  Elements have properties that determine what functionality they support. Learn
  how to use property-based methods to manipulate elements.
---

Elements in Webflow have properties that determine what functionality they support. These properties are boolean flags that indicate whether an element can have certain features like children, styles, or text content. Each property unlocks a set of related methods that you can use to manipulate the element.

## Core element properties

All elements have a set of core properties that determine what actions you can perform on them:

| Property           | Description                                             | Examples of Elements with Property |
| :----------------- | :------------------------------------------------------ | :--------------------------------- |
| `children`         | Whether the element can contain child elements          | `DivBlock`, `Section`, `Container` |
| `customAttributes` | Whether the element can have custom HTML attributes     | Most elements                      |
| `styles`           | Whether the element can have styles applied             | Most elements                      |
| `textContent`      | Whether the element can contain direct text content     | `Paragraph`, `Heading`             |
| `appConnections`   | Whether the element can connect with external apps      | `Image`, `FormForm`                |

## Checking element properties

Before using property-based methods, you should always check if the element has the required property:

```typescript
const element = await Webflow.getSelectedElement();

// Check if element can have children
if (element?.children) {
  // Safe to use children-related methods
  await element.append(Webflow.elementPresets.Paragraph);
}

// Check if element can have styles
if (element?.styles) {
  // Safe to use style-related methods
  await element.setStyles([myStyle]);
}
```

## Property-based methods

Each element property unlocks specific functionality that you can use in your Designer Extension:

<CardGroup>
  <Card
    title="Children"
    href="/designer/reference/elements/children"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Scalability.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Scalability.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconSize="12"
    iconPosition="left"
  >
    Methods for adding, retrieving, and managing child elements.
  </Card>
  <Card
    title="Styles"
    href="/designer/reference/elements/styles"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Styles.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Styles.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconSize="12"
    iconPosition="left"
  >
    Methods for applying and managing styles on elements.
  </Card>
  <Card
    title="Text Content"
    href="/designer/reference/elements/text-content"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Typography.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Typography.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconSize="12"
    iconPosition="left"
  >
    Methods for setting and manipulating text content.
  </Card>
  <Card
    title="Custom Attributes"
    href="/designer/reference/elements/custom-attributes"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/CodeBrackets.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/CodeBrackets.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconSize="12"
    iconPosition="left"
  >
    Methods for working with custom HTML attributes.
  </Card>
  <Card
    title="App Connections"
    href="/designer/reference/app-intents-and-connections"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Sync.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Sync.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconSize="12"
    iconPosition="left"
  >
    Methods for connecting elements with external apps.
  </Card>
</CardGroup>

## Best practices

1. **Always check properties before using methods**:
   ```typescript
   if (element?.styles) {
     // Now it's safe to use style methods
     await element.setStyles([myStyle]);
   }
   ```

2. **Combine property and type checks when needed**:
   ```typescript
   if (element.type === "Paragraph" && element.textContent) {
     await element.setTextContent("New paragraph text");
   }
   ```

3. **Handle missing properties gracefully**:
   ```typescript
   try {
     if (!element.children) {
       console.log("This element doesn't support child elements");
       return;
     }

     await element.append(Webflow.elementPresets.Paragraph);
   } catch (error) {
     console.error("Error adding child element:", error);
   }
   ```
   ---
   title: Children
   slug: designer/reference/elements/children
   description: >-
     Retrieve and insert child elements, offering programmatic ways to change page
     structure.
   hidden: false
   'og:title': 'Webflow Designer APIs: Element children'
   'og:description': >-
     Retrieve and insert child elements, offering programmatic ways to change page
     structure.
   ---
   Correctly handling an element's child elements is crucial for keeping the [element hierarchy](https://university.webflow.com/lesson/element-hierarchy?topics=getting-started) organized. These Element methods let you retrieve and insert child elements, offering programmatic ways to change page structure.

   To effectively use these methods, check if an element has its `Children` property set to `true`. This property is read-only, so it's important to use elements that have this attribute. Using these methods with elements that don't have this property will return an error.

   <video autoplay loop muted style="width:100%;">  <source src="https://dhygzobemt712.cloudfront.net/Web/developers/videos/24005_API%20Documentation_Children.webm" type="video/webm" />  Your browser does not support HTML video.</video>

   ## Methods

   The Children property supports the following methods:

   <CardGroup>
     <Card title="Get children" href="/designer/reference/element-children/getChildren">
       Get child elements from a parent element in the element hierarchy.
     </Card>
     <Card title="Prepend" href="/designer/reference/element-children/prepend">
       Insert a new element onto the page as the first child of the target element.
     </Card>
     <Card title="Append" href="/designer/reference/element-children/append">
       Insert a new element onto the page as the last child of the target element.
     </Card>
   </CardGroup>
   ---
   title: Get Children
   slug: designer/reference/element-children/getChildren
   description: Get child elements from a parent element in the element hierarchy.
   hidden: false
   'og:title': 'Webflow Designer API: Get Children'
   'og:description': Get child elements from a parent element in the element hierarchy.
   ---
   ## `element.getChildren()`

   Get child elements from a parent element in the [element hierarchy.](https://university.webflow.com/lesson/element-hierarchy?topics=getting-started)

   ## Syntax

   ```typescript
   element.getChildren(): Promise<Array<AnyElement>>
   ```

   ## Returns

   **Promise\<Array\<_AnyElement_>>**

   A Promise that resolves to an array of `AnyElement` objects.

   `AnyElement` represents the various element types available in a Webflow project. See a full list of supported element types in our [Designer Extension type definitions.](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)

   ## Example

   ```typescript
   // Get Selected Element
   const selectedElement = await webflow.getSelectedElement();

   if (selectedElement?.children) {

     // Get Children
     const children = await selectedElement.getChildren();

     // Get Children Details
     const childrenDetailsPromises = children.map(async (child) => {


       // Get style details of children (This is the name of the element in the Designer)
       let styleDetails = null;
       let childStyles = child.styles ? await child.getStyles() : null;

       if (childStyles) {
         const styleNamesPromises = childStyles.map(style => style.getName());
         styleDetails = await Promise.all(styleNamesPromises);
       }

       return {
         styleDetails,
       };
     });

     // Print details of child elements
     const childrenDetails = await Promise.all(childrenDetailsPromises);
     console.log(childrenDetails); // This will now log the array of child details
   }
   ```

   ## Designer Ability

   Checks for authorization only

   | Designer Ability    | Locale | Branch | Workflow | Sitemode |
   | :------------------ | :----- | :----- | :------- | :------- |
   | **canAccessCanvas** | Any    | Any    | Any      | Any      |
   ```
   ---
   title: Prepend
   slug: designer/reference/element-children/prepend
   description: Insert a new element onto the page as the first child of the target element.
   hidden: false
   'og:title': 'Webflow Designer API: Prepend'
   'og:description': Insert a new element onto the page as the first child of the target element.
   ---
   ## `element.prepend(newElement)`

   Insert a new element onto the page as the first child of the target element.

   ## Syntax

   ```typescript
   element.prepend(newElement: ElementPreset | Component): Promise<AnyElement>
   ```

   ## Parameters

   - **newElement**:  _Webflow.elementPresets.\<preset\>_ - The new element to be inserted into the hierarchy. This element is derived from the `Webflow.elementPresets` object, which contains all Webflow elements that can be inserted onto the canvas.

   ## Returns

   **Promise\<_AnyElement_>**

   A Promise that resolves to an `AnyElement` object. `AnyElement` represents the various element types available in a Webflow project. See a full list of supported element types in our [Designer Extension type definitions.](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)

   ## Example

   ```typescript
   // Get Selected Element
   const el = await webflow.getSelectedElement();


   // Check if element supports child elements
   if (el?.children) {

     // Prepend newElement as a child to of the selected element
     const newElement = await el?.prepend(webflow.elementPresets.DivBlock)

     // Print element Details
     console.log(JSON.stringify(newElement))

   }
   ```

   ## Designer Ability

   | Designer Ability | Locale  | Branch | Workflow | Sitemode |
   | :--------------- | :------ | :----- | :------- | :------- |
   | **canDesign**    | Primary | Main   | Canvas   | Design   |
   ```
   ---
   title: Append
   slug: designer/reference/element-children/append
   description: Insert a new element onto the page as the last child of the target element.
   hidden: false
   'og:title': 'Webflow Designer API: Append'
   'og:description': Insert a new element onto the page as the last child of the target element.
   ---
   ## `element.append(newElement)`
   Insert a new element onto the page as the last child of the target element.

   ## Syntax

   ```typescript
   element.append(newElement: ElementPreset | Component): Promise<AnyElement>
   ```

   ## Parameters

   - **newElement**:  _Webflow.elementPresets.\<preset\>_ - The new element to be inserted into the hierarchy. This element is derived from the `Webflow.elementPresets` object, which contains all Webflow elements that can be inserted onto the canvas.

   ## Returns

   **Promise\<_AnyElement_>**

   A Promise that resolves to an `AnyElement` object. `AnyElement` represents the various element types available in a Webflow project. See a full list of supported element types in our [Designer Extension type definitions.](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)

   ## Example

   ```typescript
   // Get Selected Element
   const el = await webflow.getSelectedElement();

   // Check if element supports child elements
   if (el?.children) {

     // Append newElement as a child to of the selected element
     const newElement = await el?.append(webflow.elementPresets.DivBlock)

     // Print element Details
     console.log(JSON.stringify(newElement))

   }
   ```

   ## Designer Ability

   | Designer Ability | Locale  | Branch | Workflow | Sitemode |
   | :--------------- | :------ | :----- | :------- | :------- |
   | **canDesign**    | Primary | Main   | Canvas   | Design   |
   ```
   ---
   title: Custom Attributes
   slug: designer/reference/elements/custom-attributes
   description: 'Attach additional, specialized data to elements with custom attributes.'
   hidden: false
   'og:title': 'Webflow Designer API: Custom Attributes'
   'og:description': 'Attach additional, specialized data to elements with custom attributes.'
   ---
   In Webflow, you can use native elements, styles, and settings to create standard HTML attributes like `href`, `class`, and `id`.

   However, [Custom Attributes](https://university.webflow.com/lesson/custom-attributes?topics=elements) extend this capability. Custom attributes allow developers to attach additional, specialized data to elements, helping broaden the scope of a site's functionality and interactivity. In Webflow,  they are especially useful for enriching custom code, [particularly when integrated with CMS data.](https://university.webflow.com/lesson/custom-attributes?topics=elements#how-to-use-cms-data-in-custom-attributes)

   To use the methods below, choose an element with a `CustomAttributes` property of `true`. Using these methods with elements that don't have this property will return an error.

   ## Methods

   <CardGroup>
       <Card title="Get All Custom Attributes" href="/designer/reference/custom-attributes/getAllCustomAttributes">
           Get all custom attributes for an element.
       </Card>
       <Card title="Get Custom Attribute" href="/designer/reference/custom-attributes/getCustomAttribute">
           Get a custom attribute for an element by name.
       </Card>
       <Card title="Set Custom Attribute" href="/designer/reference/custom-attributes/setCustomAttribute">
           Set a custom attribute for an element.
       </Card>
       <Card title="Remove Custom Attribute" href="/designer/reference/custom-attributes/removeCustomAttribute">
           Remove a custom attribute from an element.
       </Card>
   </CardGroup>
   ---
   title: Get All Custom Attributes
   slug: designer/reference/custom-attributes/getAllCustomAttributes
   description: ''
   hidden: null
   'og:title': 'Webflow Designer API: Get All Custom Attributes'
   'og:description': ''
   ---
   ## **`element.getAllCustomAttributes()`**

   Get all [custom HTML attributes](https://university.webflow.com/lesson/custom-attributes?topics=elements) from an element.


   ### Syntax

   ```typescript
   element.getAllCustomAttributes():Promise<Array<NamedValue>>
   ```

   ### Returns

   **Promise\<Array\<_NamedValue_>>** - `[{name: string, value: string}]`

   A Promise that resolves to an array of _NamedValue_  custom attribute objects.


   ### Example

   ```typescript
   // Get Selected Element
   const selectedElement = await webflow.getSelectedElement()

   if (selectedElement?.customAttributes) {

     // Get All Custom Attributes
     const customAttributes = await selectedElement.getAllCustomAttributes()
     console.log(customAttributes)

   }
   ```

   <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
     <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
        className="button cc-primary"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
       Try this example
     </a>
   </div>

   ### Designer Ability

   Checks for authorization only

   | Designer Ability    | Locale | Branch | Workflow | Sitemode |
   | :------------------ | :----- | :----- | :------- | :------- |
   | **canAccessCanvas** | Any    | Any    | Any      | Any      |
   ---
   title: Get Custom Attribute
   slug: designer/reference/custom-attributes/getCustomAttribute
   description: ''
   hidden: null
   'og:title': 'Webflow Designer API: Get Custom Attribute'
   'og:description': ''
   ---
   ## `element.getCustomAttribute(name)`

   Get [custom HTML attributes](https://university.webflow.com/lesson/custom-attributes?topics=elements) for an element by name.

   ### Syntax

   ```typescript
   element.getCustomAttribute(name: string):Promise<null | string>
   ```

   ### Parameters

   - **`name`** :   _String_ - The name of the custom attribute.

   ### Returns

   **Promise\<_String_>**

   A Promise that resolves to the value of the named custom attribute.


   ### Example

   ```typescript
   // Get Selected Element
   const selectedElement = await webflow.getSelectedElement()

   if (selectedElement?.customAttributes) {

     // Get Custom Attribute by Name
     const customAttribute = await selectedElement.getCustomAttribute('tooltip')
     console.log(customAttribute)

   }
   ```

   <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
     <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
        className="button cc-primary"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
       Try this example
     </a>
   </div>

   ### Designer Ability

   Checks for authorization only

   | Designer Ability    | Locale | Branch | Workflow | Sitemode |
   | :------------------ | :----- | :----- | :------- | :------- |
   | **canAccessCanvas** | Any    | Any    | Any      | Any      |

   ---
   title: Set Custom Attribute
   slug: designer/reference/custom-attributes/setCustomAttribute
   description: ''
   hidden: null
   'og:title': 'Webflow Designer API: Set Custom Attribute'
   'og:description': ''
   ---
   ## **`element.setCustomAttribute(name, value)`**

   Set a [custom HTML attribute](https://university.webflow.com/lesson/custom-attributes?topics=elements) for an element.

   ### Syntax

   ```typescript
   element.setCustomAttribute(name: string, value: string): Promise<null>
   ```

   ### Parameters

   - **`name`** :   _String_ - The name of the custom attribute.
   - **`value`** :   _String_ - The value of the custom attribute

   The value of the named custom attribute.

   ### Returns

   **Promise\<`null`>**

   A promise that resolves to `null`


   ### Example

   ```typescript
   // Get Selected Element
   const selectedElement = await webflow.getSelectedElement()

   if (selectedElement?.customAttributes) {

     // Set Custom Attribute
     await selectedElement.setCustomAttribute("tooltip", "my tooltip value")

   }
   ```

   <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
     <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
        className="button cc-primary"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
       Try this example
     </a>
   </div>

   ### Designer Ability

   | Designer Ability | Locale  | Branch | Workflow | Sitemode |
   | :--------------- | :------ | :----- | :------- | :------- |
   | **canDesign**    | Primary | Main   | Canvas   | Design   |

---
title: Remove Custom Attribute
slug: designer/reference/custom-attributes/removeCustomAttribute
description: ''
hidden: null
'og:title': 'Webflow Designer API: Remove Custom Attribute'
'og:description': ''
---
## `element.removeCustomAttribute(name)`

Remove a [custom HTML attribute](https://university.webflow.com/lesson/custom-attributes?topics=elements) from an element.

### Syntax

```typescript
element.removeCustomAttribute(name: string): Promise<null>
```

### Parameters

- **`name`** :   _String_ - The name of the custom attribute.

### Returns

**Promise\<`null`>**

A Promise that resolves to `null`


### Example

```typescript
// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.customAttributes) {

  // Remove Custom Attribute
  await selectedElement.removeCustomAttribute("tooltip")

}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canDesign**    | Primary | Main   | Canvas   | Design   |
---
title: Styles
slug: designer/reference/elements/styles
description: ''
hidden: false
'og:title': 'Webflow Designer API: Styling Elements'
'og:description': >-
  The methods described below give you direct control over which styles are
  applied to elements, letting you change a page's appearance and layout as
  needed. To directly manage CSS properties within a Style Object, use the Style
  Methods.
---
Styles are key to creating dynamic and responsive designs in Webflow.

Styles are managed through [Classes](https://university.webflow.com/lesson/style-panel-overview?topics=layout-design#classes-overview) in the Designer interface. When working with the API, these Classes are represented as [Style Objects](/designer/reference/styles-overview) that contain CSS properties. The methods in this section allow you to programmatically control which styles are applied to elements.

<Card
  title="Style Objects"
  href="/designer/reference/styles-overview"
  icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Styles.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Styles.svg" alt="" className="block dark:hidden" />
        </>
    }
  iconPosition="left"
>
    Learn more about managing CSS properties with [Style Methods](/designer/reference/styles-overview)
</Card>


## Methods

The Styles property supports the following methods:

<CardGroup>
  <Card title="Get styles" href="/designer/reference/element-styles/getStyles">
    Retrieve the current style properties of the element for analysis or changes.
  </Card>
  <Card title="Set styles" href="/designer/reference/element-styles/setStyles">
    Set styles on an element.
  </Card>
</CardGroup>

---
title: Get Styles
slug: designer/reference/element-styles/getStyles
description: Retrieve the current style properties of the element for analysis or changes.
hidden: false
'og:title': 'Webflow Designer API: Get Styles'
'og:description': Retrieve the current style properties of the element for analysis or changes.
---
## `element.getStyles()`

Retrieve the current style properties of the element for analysis or changes.

## Syntax

```typescript
element.getStyles(): Promise<Array<Style>>
```

## Returns

**Promise\<_Style_>**

A Promise that resolves to an array of [Style Objects](/designer/reference/styles-overview).

## Example

```javascript
// Get Selected Element
const selectedElement = await Webflow.getSelectedElement()

if (selectedElement?.styles) {

  // Get Styles
  const styles = await selectedElement.getStyles()

  // Get Style Details
  const styleDetails = styles.map(async style => {

    const styleName = await style.getName()
    const styleProperties = await style.getProperties()

    return {
      Name: styleName,
      Properties: styleProperties,
      ID: style.id,
    }

  })

  // Print Style Details
  console.log(await Promise.all(styleDetails))
}
```

## Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | Any      |
```

---
title: Set Styles
slug: designer/reference/element-styles/setStyles
description: Set styles on an element.
hidden: false
'og:title': 'Webflow Designer API: Set Styles'
'og:description': Set styles on an element.
---
## `element.setStyles(styles)`

Set styles on an element.

## Syntax

```typescript
element.setStyles(styles: Array<Style>): Promise<null>>
```

## Parameters

- **`Styles`**: _Array_ of [Style Objects](/designer/reference/styles-overview) - The array of styles to set.

## Returns

**Promise\<`null`>**

A Promise that resolves to `null`.

## Example

```javascript
// Get Selected Element
const selectedElement = await Webflow.getSelectedElement()

if (selectedElement?.styles) {

  // Create a new style
  const newStyle = await Webflow.createStyle("MyCustomStyle");

  // Set properties for the style
  newStyle.setProperties({
    'background-color': "blue",
    'font-size': "32px",
    'font-weight': "bold",
  });

  // Set style on selected element
  selectedElement.setStyles([newStyle])

}
```

---
title: Text Content
slug: designer/reference/elements/text-content
description: Manage an element's text content.
hidden: false
'og:title': 'Webflow Designer API: Text Content'
'og:description': Manage an element's text content.
---
Managing text content is essential for keeping content fresh and relevant. These methods let you handle an element's text, ensuring it's always up-to-date.

To effectively use the methods, choose an element that already has its `textContent` property set to `true`. This property is read-only, so it's important to select elements that have this attribute. Using these methods with elements that don't have this property will return an error.

## Methods

The Text Content property supports the following methods:

<CardGroup>
  <Card title="Get text content" href="/designer/reference/get-text-content">
    Get text content from an element.
  </Card>
  <Card title="Set text content" href="/designer/reference/set-text-content">
    Get text content from an element.
  </Card>
</CardGroup>

---
title: Set Text Content
slug: designer/reference/set-text-content
description: Set text content for an element.
hidden: false
'og:title': 'Webflow Designer API: Set Text Content'
'og:description': Set text content for an element.
---
## `element.setTextContent(content)`

Set text content for an element that supports text content.

## Syntax

```typescript
element.setTextContent(content: string): Promise<null>>
```

## Parameters

- **`content`**: `string` - Text to add to the element

## Returns

**Promise\<`null`>**

A Promise that resolves to `null`.

## Example

```typescript
// Get Selected Element
const selectedElement = await Webflow.getSelectedElement()

if (selectedElement?.textContent) {

  // Set and print text content
  const text = await selectedElement.setTextContent("Lorem Ipsum")
  console.log(selectedElement.textContent)

}
```

## Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| :--------------- | :----- | :----- | :------- | :------- |
| **canEdit**      | Any    | Any    | Canvas   | Any      |
```

---
title: Get Text Content
slug: designer/reference/get-text-content
description: Get text content from an element.
hidden: false
'og:title': 'Webflow Designer API: Get Text Content'
'og:description': Get text content from an element.
---
The text content of an element is automatically created as a child `StringElement` of that element. To retrieve the text content from an element, you'll need to retrieve the child `StringElement` of your target element. Once you've retrieved the `StringElement` you can use the [`getText()`](/designer/reference/string-element/getText) method to get the text content of your element.

## Example

```typescript
// Get Selected Element
const selectedElement = await Webflow.getSelectedElement();

if (selectedElement?.textContent && selectedElement?.children) {

  // Get Child Elements
  const children = await selectedElement.getChildren();

  // Filter string elements from children
  const strings = children.filter(child => child.type === "String");

  // Initialize an array to hold text content
  let textContent = [];

  // Loop over string elements to get text
  for (const myString of strings) {
    if (myString.type === "String") {
      const text = await myString.getText();
      textContent.push(text);
    }
  }

  // Print text
  console.log(textContent);
}
```

---
title: Element Types & Methods
slug: designer/reference/element-types-methods
description: >-
  Learn about different element types and their specific methods in the Webflow
  Designer API
hidden: false
'og:title': 'Webflow Designer API: Element Types & Methods'
'og:description': >-
  Each element type in Webflow has specific methods based on its functionality.
  Learn how to use type-specific methods to manipulate different elements.
---

Each element in Webflow has a specific type that determines its functionality and available methods. While all elements share some [common properties](/designer/reference/element-properties-methods), each element type also has specialized methods that allow you to manipulate that element's unique characteristics.

## Identifying element types

You can identify an element's type using the `element.type` property:

```typescript
const element = await Webflow.getSelectedElement();
console.log(element.type); // "DOM", "String", "Image", etc.
```

## Element presets

To add a specific element type to the canvas, you can use the [`webflow.elementPresets` object](/designer/reference/element-presets), which contains a set of presets for different element types available in the designer.

```typescript
const element = await webflow.elementPresets.DOM;
await webflow.addElement(element);
```

## Element type methods

Different element types have unique methods tailored to their functionality. Always check an element's type before applying type-specific methods.

<CardGroup>
  <Card
    title="DOM Elements"
    href="/designer/reference/dom-element"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/CodeBrackets.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/CodeBrackets.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconSize="12"
    iconPosition="left"
  >
    Customize HTML elements with methods for HTML tags and attributes.
  </Card>
  <Card
    title="Strings"
    href="/designer/reference/string-element"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Typography.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Typography.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconSize="12"
    iconPosition="left"
  >
    Work with text content and manipulate their text values.
  </Card>
  <Card
    title="Images"
    href="/designer/reference/image-element"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Image.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Image.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconSize="12"
    iconPosition="left"
  >
    Manage images and alt text.
  </Card>
  <Card
    title="Headings"
    href="/designer/reference/heading-element"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/TypographyDetails.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/TypographyDetails.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconSize="12"
    iconPosition="left"
  >
    Modify heading levels and heading content.
  </Card>
  <Card
    title="Links"
    href="/designer/reference/link-element"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/SiteWWW.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/SiteWWW.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconSize="12"
    iconPosition="left"
  >
    Configure links with methods for URLs, targets, and link settings.
  </Card>
  <Card
    title="Forms"
    href="/designer/reference/forms"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Test.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Test.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconSize="12"
    iconPosition="left"
  >
    Create and configure forms and form field settings.
  </Card>
  <Card
    title="Components"
    href="/designer/reference/component-element"
    icon={
        <>
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Components.svg" alt="" className="hidden dark:block" />
        <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Components.svg" alt="" className="block dark:hidden" />
        </>
    }
    iconSize="12"
    iconPosition="left"
  >
    Get components definitions from a component instance.
  </Card>
</CardGroup>

## Best Practices for Element Type Methods

1. **Always check element type before applying type-specific methods**:
   ```typescript
   if (element.type === "Image") {
     // Now it's safe to use Image methods
     await element.setAltText("Description");
   }
   ```

2. **Handle multiple element types with type guards**:
   ```typescript
   function handleElement(element) {
     switch(element.type) {
       case "String":
         return element.getText();
       case "Image":
         return element.getAsset();
       default:
         return null;
     }
   }
   ```

3. **Combine property and type checks for maximum safety**:
   ```typescript
   if (element.type === "DOM" && element.children) {
     // Safe to use DOM methods and children methods
     await element.setTag("div");
     await element.append(Webflow.elementPresets.Paragraph);
   }
   ```

---
title: Element Presets
slug: designer/reference/element-presets
description: ''
hidden: false
'og:title': 'Webflow Designer API: Element Presets'
'og:description': >-
  The Element Presets object specifies all the element types available in the
  designer. Using the Element Presets object, Apps can select native Webflow
  elements to insert onto a page with element creation methods.
---
The Element Presets object specifies all the element types available in the designer. Using the Element Presets object, Apps can select native Webflow elements to insert onto a page with the [element creation methods.](/designer/reference/insert-element-before)

Each preset corresponds to a unique element type, complete with its own properties and methods. For a deeper understanding of how to manipulate these element properties and methods, consult the [Designer Extension type definitions](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code) and documentation on [element properties and methods.](/designer/reference/elements-overview)

This list outlines all presets that can be used with `webflow.elementPresets.<preset>`.

| Preset                                       | Element Type                                        |
| -------------------------------------------- | --------------------------------------------------- |
| Animation                                    | AnyElement                                          |
| BackgroundVideoWrapper                       | BackgroundVideoWrapperElement                       |
| BlockContainer                               | BlockContainerElement                               |
| Blockquote                                   | BlockquoteElement                                   |
| Button                                       | LinkElement                                         |
| CodeBlock                                    | CodeBlockElement                                    |
| CommerceAddToCartWrapper                     | AnyElement                                          |
| CommerceCartQuickCheckoutActions             | CommerceCartQuickCheckoutActionsElement             |
| CommerceCartWrapper                          | AnyElement                                          |
| CommerceCheckoutAdditionalInfoSummaryWrapper | CommerceCheckoutAdditionalInfoSummaryWrapperElement |
| CommerceCheckoutAdditionalInputsContainer    | AnyElement                                          |
| CommerceCheckoutCustomerInfoSummaryWrapper   | AnyElement                                          |
| CommerceCheckoutDiscounts                    | AnyElement                                          |
| CommerceCheckoutFormContainer                | AnyElement                                          |
| CommerceCheckoutOrderItemsWrapper            | AnyElement                                          |
| CommerceCheckoutOrderSummaryWrapper          | AnyElement                                          |
| CommerceCheckoutPaymentSummaryWrapper        | CommerceCheckoutPaymentSummaryWrapperElement        |
| CommerceCheckoutShippingSummaryWrapper       | AnyElement                                          |
| CommerceDownloadsWrapper                     | CommerceDownloadsWrapperElement                     |
| CommerceOrderConfirmationContainer           | AnyElement                                          |
| CommercePayPalCheckoutButton                 | CommercePayPalCheckoutButtonElement                 |
| CommercePaypalCheckoutFormContainer          | AnyElement                                          |
| DivBlock                                     | BlockElement                                        |
| DOM                                          | DOMElement                                          |
| DropdownWrapper                              | DropdownWrapperElement                              |
| DynamoWrapper                                | DynamoWrapperElement                                |
| Facebook                                     | FacebookElement                                     |
| FormBlockLabel                               | FormBlockLabelElement                               |
| FormButton                                   | FormButtonElement                                   |
| FormCheckboxInput                            | AnyElement                                          |
| FormFileUploadWrapper                        | AnyElement                                          |
| FormForm                                     | AnyElement                                          |
| FormRadioInput                               | AnyElement                                          |
| FormReCaptcha                                | FormReCaptchaElement                                |
| FormSelect                                   | AnyElement                                          |
| FormTextarea                                 | AnyElement                                          |
| FormTextInput                                | AnyElement                                          |
| Grid                                         | GridElement                                         |
| Heading                                      | HeadingElement                                      |
| HFlex                                        | HFlexElement                                        |
| HtmlEmbed                                    | HtmlEmbedElement                                    |
| Image                                        | AnyElement                                          |
| IX2InstanceFactoryOnClass                    | BlockElement                                        |
| IX2InstanceFactoryOnElement                  | LinkElement                                         |
| LayoutFeaturesList                           | SectionElement                                      |
| LayoutFeaturesMetrics                        | SectionElement                                      |
| LayoutFeaturesTable                          | SectionElement                                      |
| LayoutFooterDark                             | SectionElement                                      |
| LayoutFooterLight                            | SectionElement                                      |
| LayoutFooterSubscribe                        | SectionElement                                      |
| LayoutGalleryOverview                        | SectionElement                                      |
| LayoutGalleryScroll                          | SectionElement                                      |
| LayoutGallerySlider                          | SectionElement                                      |
| LayoutHeroHeadingCenter                      | SectionElement                                      |
| LayoutHeroHeadingLeft                        | SectionElement                                      |
| LayoutHeroHeadingRight                       | SectionElement                                      |
| LayoutHeroStack                              | SectionElement                                      |
| LayoutHeroSubscribeLeft                      | SectionElement                                      |
| LayoutHeroSubscribeRight                     | SectionElement                                      |
| LayoutHeroWithoutImage                       | SectionElement                                      |
| LayoutLogosQuoteBlock                        | SectionElement                                      |
| LayoutLogosQuoteDivider                      | SectionElement                                      |
| LayoutLogosTitleLarge                        | SectionElement                                      |
| LayoutLogosTitleSmall                        | SectionElement                                      |
| LayoutLogosWithoutTitle                      | SectionElement                                      |
| LayoutNavbarLogoCenter                       | SectionElement                                      |
| LayoutNavbarLogoLeft                         | SectionElement                                      |
| LayoutNavbarNoShadow                         | SectionElement                                      |
| LayoutPricingComparison                      | SectionElement                                      |
| LayoutPricingItems                           | SectionElement                                      |
| LayoutPricingOverview                        | SectionElement                                      |
| LayoutTeamCircles                            | SectionElement                                      |
| LayoutTeamSlider                             | SectionElement                                      |
| LayoutTestimonialColumnDark                  | SectionElement                                      |
| LayoutTestimonialColumnLight                 | SectionElement                                      |
| LayoutTestimonialImageLeft                   | SectionElement                                      |
| LayoutTestimonialSliderLarge                 | SectionElement                                      |
| LayoutTestimonialSliderSmall                 | SectionElement                                      |
| LayoutTestimonialStack                       | SectionElement                                      |
| LightboxWrapper                              | LightboxWrapperElement                              |
| LinkBlock                                    | LinkElement                                         |
| List                                         | ListElement                                         |
| ListItem                                     | ListItemElement                                     |
| LogIn                                        | UserLogInFormWrapperElement                         |
| MapWidget                                    | MapWidgetElement                                    |
| NavbarWrapper                                | NavbarWrapperElement                                |
| Pagination                                   | PaginationElement                                   |
| Paragraph                                    | ParagraphElement                                    |
| QuickStack                                   | LayoutElement                                       |
| ResetPassword                                | UserResetPasswordFormWrapperElement                 |
| RichText                                     | RichTextElement                                     |
| Row                                          | RowElement                                          |
| SearchForm                                   | AnyElement                                          |
| Section                                      | SectionElement                                      |
| SignUp                                       | UserSignUpFormWrapperElement                        |
| SliderWrapper                                | SliderWrapperElement                                |
| Spline                                       | AnyElement                                          |
| StructureLayoutQuickStack1plus2              | SectionElement                                      |
| StructureLayoutQuickStack1x1                 | SectionElement                                      |
| StructureLayoutQuickStack2plus1              | SectionElement                                      |
| StructureLayoutQuickStack2x1                 | SectionElement                                      |
| StructureLayoutQuickStack2x2                 | SectionElement                                      |
| StructureLayoutQuickStack3x1                 | SectionElement                                      |
| StructureLayoutQuickStack4x1                 | SectionElement                                      |
| StructureLayoutQuickStackMasonry             | SectionElement                                      |
| TabsWrapper                                  | TabsWrapperElement                                  |
| TextBlock                                    | BlockElement                                        |
| TextLink                                     | LinkElement                                         |
| Twitter                                      | TwitterElement                                      |
| UpdatePassword                               | UserUpdatePasswordFormWrapperElement                |
| UserAccount                                  | UserAccountWrapperElement                           |
| UserAccountSubscriptionList                  | UserAccountSubscriptionListWrapperElement           |
| UserLogOutLogIn                              | UserLogOutLogInElement                              |
| VFlex                                        | VFlexElement                                        |
| Video                                        | VideoElement                                        |
| YouTubeVideo                                 | YouTubeVideoElement                                 |


---
title: DOM Element
slug: designer/reference/dom-element
description: >-
  The custom element, also known as the DOM Element, is a placeholder element
  that you can add any HTML custom attribute, tag, or text to — thereby
  “creating” that element on the canvas.
hidden: false
'og:title': 'Webflow Designer API: DOM Element'
'og:description': >-
  The custom element, also known as the DOM Element, is a placeholder element
  that you can add any HTML custom attribute, tag, or text to — thereby
  “creating” that element on the canvas.
---

The [custom element](https://university.webflow.com/lesson/custom-element?topics=elements), also known as the DOM Element, is a placeholder element that you can add any HTML custom attribute, tag, or text to — thereby "creating" that element on the canvas. This is useful for adding HTML elements to the canvas that aren't available as native Webflow elements.

Once you add the custom element to the canvas, you're able to use the below methods, which are only available to the DOM element, as well as the more general element methods to manage children, styles, and text content.

## Methods

The DOM Element supports the following specific methods:

<CardGroup>
  <Card title="Get HTML Tag" href="/designer/reference/dom-element/getTag">
    Retrieve the HTML tag of the element.
  </Card>
  <Card title="Set HTML Tag" href="/designer/reference/dom-element/setTag">
    Set the value of the specified HTML tag of the DOMElement.
  </Card>
  <Card title="Get All Attributes" href="/designer/reference/dom-element/getAllAttributes">
    Retrieve all HTML attributes for the DOMElement.
  </Card>
  <Card title="Get Attribute" href="/designer/reference/dom-element/getAttribute">
    Retrieve the value of the named HTML attribute of the DOMElement.
  </Card>
  <Card title="Set Attribute" href="/designer/reference/dom-element/setAttribute">
    Set the value of the specified HTML attribute of the DOMElement.
  </Card>
  <Card title="Remove Attribute" href="/designer/reference/dom-element/removeAttribute">
    Remove the specified HTML attribute from the DOMElement.
  </Card>
</CardGroup>

## Properties

| Property           | Description                                                                                       | Type      | Example                                                 |
| :----------------- | :------------------------------------------------------------------------------------------------ | :-------- | :------------------------------------------------------ |
| `id`               | Unique identifier for the element composed of two identifiers, the `component `and the `element`. | `object`  | `{component: "64c813...", element: "5edf8e59-71f9..."}` |
| `type`             | Specifies the type of the element.                                                                | `string`  | "DOM"                                                   |
| `styles`           | Indicates whether the element can contain styles.                                                 | `boolean` | `true`                                                  |
| `children`         | Indicates whether an element can contain child elements.                                          | `boolean` | `true`                                                  |
| `textContent`      | Indicates whether an element can contain text content.                                            | `boolean` | `true`                                                  |
| `customAttributes` | Indicates whether an element can contain custom attributes.                                       | `boolean` | `false`                                                 |


---
title: Get Tag
slug: designer/reference/dom-element/getTag
description: Retrieve the HTML tag of the element.
hidden: false
'og:title': 'Webflow Designer API: DOM Element - getTag()'
'og:description': Retrieve the HTML tag of the element.
---
## `element.getTag()`
Retrieve the [HTML tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) of the element.

## Syntax

```typescript
element.getTag(): Promise<null | string>
```

## Returns

- **Promise\<_String_>** : If the element has a tag, a promise that resolves to the tag value.
- **Promise\<`null`>**: If the element does not have a tag, a promise that resolves to `null`

## Example

```typescript
// Get All Elements and find first DOM Element
const elements = await webflow.getAllElements()
const DOMElement = elements.find(element => element.type === "DOM")

if (DOMElement?.type === "DOM") {

  // Get DOM Element's Tag
  const tag = await DOMElement.getTag()
  console.log(tag)

} else {
  console.log('No DOM Element Found')
}
```

## Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | Any      |
```

---
title: Set Tag
slug: designer/reference/dom-element/setTag
description: Set the value of the specified HTML tag of the DOMElement.
hidden: false
'og:title': 'Webflow Designer API: DOM Element - setTag()'
'og:description': Set the value of the specified HTML tag of the DOMElement.
---
## `element.setTag(tag)`

Set the value of the specified [HTML tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) of the DOMElement.

## Syntax

```typescript
element.setTag(tag: string): Promise<null>
```

## Parameters

- tag : `string` - The [HTML tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) to set for the element

## Returns

**Promise\<`null`>**

A promise that resolves to `null`

## Example

```typescript
// Get Selected Element
const selectedElement = await webflow.getSelectedElement();

if (selectedElement?.children) {

  // Create and append DOM Element
  const DOMElement = await selectedElement.append(webflow.elementPresets.DOM);
  console.log(DOMElement)

  // Set Tag
  await DOMElement?.setTag('img');
  const tag = await DOMElement.getTag()
  }
```

## Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canDesign**    | Primary | Main   | Canvas   | Design   |
```

---
title: Get All Attributes
slug: designer/reference/dom-element/getAllAttributes
description: Retrieve all HTML attributes for the DOMElement.
hidden: false
'og:title': 'Webflow Designer API: DOM Element - getAllAttributes()'
'og:description': Retrieve all HTML attributes for the DOMElement.
---
## `element.getAllAttributes()`

Retrieve all [HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) for the DOMElement. Use this method instead of the 'Custom Attribute' methods.

## Syntax

```typescript
element.getAllAttributes(): Promise<Array<NamedValue>>
```

## Returns

**Promise\<Array\<_NamedValue_>>** - `[{name: string, value:string }]`

A promise that resolves to an array of, `NamedValue` attribute objects.

## Example

```typescript
// Get Selected Element
const selectedElement = await webflow.getSelectedElement();

if (selectedElement?.type === "DOM") {

  const customAttributes = await selectedElement.getAllAttributes()
  console.log(customAttributes)
}
```

## Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | Any      |
```

---
title: Get Attribute
slug: designer/reference/dom-element/getAttribute
description: Retrieve the value of the named HTML attribute of the DOMElement.
hidden: false
'og:title': 'Webflow Designer API: DOM Element - getAttribute()'
'og:description': Retrieve the value of the named HTML attribute of the DOMElement.
---
## `element.getAttribute(name)`

Retrieve the value of the named [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) of the DOMElement. Use this method instead of the 'Custom Attribute' methods.

## Syntax

```typescript
element.getAttribute(name: string): Promise<null | string>
```

## Parameters

- name : `string` - The name of the attribute

## Returns

- **Promise\<_String_>**:  A promise that resolves to the value of the named HTML attribute for the DOMElement.
- **Promise\<`null`>**: If the attribute doesn't exist, this method will return `null`.

## Example

```typescript
// Get All Elements and find first DOM Element
const elements = await webflow.getAllElements()
const DOMElement = elements.find(element => element.type === "DOM")

if (DOMElement?.type === "DOM") {

  // Get DOM Element's Attribute by Name
  const attribute = await DOMElement.getAttribute("MyAttribute")
  console.log(attribute)

} else {
  console.log('No DOM Element Found')
}
```

## Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | Any      |
```

---
title: Set Attribute
slug: designer/reference/dom-element/setAttribute
description: Set the value of the specified HTML attribute of the DOMElement.
hidden: false
'og:title': 'Webflow Designer API: DOM Element - setAttribute()'
'og:description': Set the value of the specified HTML attribute of the DOMElement.
---
## `element.setAttribute(name, value)`

Set the value of the specified [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) of the DOMElement. Use this method instead of the 'Custom Attribute' methods.

## Syntax

```typescript
element.setAttribute(name: string, value: string): Promise<null>
```

## Parameters

- name : `string` - The name of the attribute to set
- value : `string` - The value of the attribute to set

## Returns

**Promise\<`null`>**

A promise that resolves to `null`

## Example

```typescript
// Get Selected Element
const selectedElement = await webflow.getSelectedElement();

if (selectedElement?.children) {

  // Create and append DOM Element
  const DOMElement = await selectedElement.append(webflow.elementPresets.DOM);

  if (DOMElement?.type === "DOM") {
    // Set Tag
    await DOMElement.setTag('img');

    // Set HTML Attribute
    await DOMElement.setAttribute('src', 'https://example.com/image.jpg');
    await DOMElement.setAttribute('alt', 'Example image');
    await DOMElement.setAttribute('width', '300');

    // Get all attributes to verify
    const attributes = await DOMElement.getAllAttributes();
    console.log(attributes);
  }
}
```

## Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canDesign**    | Primary | Main   | Canvas   | Design   |
```

---
title: Remove Attribute
slug: designer/reference/dom-element/removeAttribute
description: Remove the specified HTML attribute from the DOMElement.
hidden: false
'og:title': 'Webflow Designer API: DOM Element - removeAttribute()'
'og:description': Remove the specified HTML attribute from the DOMElement.
---
## `element.removeAttribute(name)`

Remove the specified [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) from the DOMElement. Use this method instead of the 'Custom Attribute' methods.

## Syntax

```typescript
element.removeAttribute(name: string): Promise<null>
```

## Parameters

- name : `string` - The name of the attribute to remove

## Returns

**Promise\<`null`>**

A promise that resolves to `null`

## Example

```typescript
// Get Selected Element
const selectedElement = await webflow.getSelectedElement();

if (selectedElement?.type === "DOM") {
  // Get current attributes
  const beforeAttributes = await selectedElement.getAllAttributes();
  console.log('Before removal:', beforeAttributes);

  // Remove an attribute
  await selectedElement.removeAttribute('width');

  // Get attributes after removal to verify
  const afterAttributes = await selectedElement.getAllAttributes();
  console.log('After removal:', afterAttributes);
}
```

## Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canDesign**    | Primary | Main   | Canvas   | Design   |
```

---
title: Component Instances
slug: designer/reference/component-element
description: ''
hidden: false
'og:title': 'Webflow Designer API: Component Element'
'og:description': >-
  The Component element represents a component instance within the Webflow
  Designer.
---

The component element represents a [component instance](/designer/reference/components-overview#component-instance) within the Webflow Designer.

## Methods
You can get the associated component definition of a component instance using the following method:

<Card title="Get Component" href="/designer/reference/component-element/getComponent">
  Retrieves the associated component definition of the component instance.
</Card>
<Card
  title="Creating & managing components"
  href="/designer/reference/components-overview"
  icon={
    <>
    <img src="https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Components.svg" alt="" className="hidden dark:block" />
    <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Components.svg" alt="" className="block dark:hidden" />
    </>
  }
  iconPosition="left"
  iconSize="12"
>
  Learn more about creating and managing component definitions in the [Components Overview](/designer/reference/components-overview).
</Card>
## Properties

| Property           | Description                                                                                       | Type      | Example                                                 |
| :----------------- | :------------------------------------------------------------------------------------------------ | :-------- | :------------------------------------------------------ |
| `id`               | Unique identifier for the element composed of two identifiers, the `component `and the `element`. | `object`  | `{component: "64c813...", element: "5edf8e59-71f9..."}` |
| `type`             | Specifies the type of the element.                                                                | `string`  | "ComponentInstance"                                     |
| `children`         | Indicates whether the element can contain child elements.                                         | `boolean` | `false`                                                 |
| `customAttributes` | Indicates whether the element can have custom attributes.                                         | `boolean` | `false`                                                 |
| `styles`           | Indicates whether the element can contain styles.                                                 | `boolean` | `false`                                                 |
| `textContent`      | Indicates whether the element can contain text content                                            | `boolean` | `false`                                                 |

---
title: Get Component
slug: designer/reference/component-element/getComponent
description: Retrieves the associated component of the element.
hidden: false
'og:title': 'Webflow Designer API: Component Element - getComponent()'
'og:description': Retrieves the associated component definition of the component instance.
---
## `element.getComponent()`

Retrieves the associated [component definition](/designer/reference/components-overview#component-definition) of the component instance.

## Syntax

```typescript
element.getComponent(): Promise<Component>
```

## Returns

**Promise\<_Component_>**

A Promise that resolves to a [Component Object](/designer/reference/components-overview)

## Example

```typescript
// Select Component Element on Page
const elements = await webflow.getAllElements()
const componentInstance = elements.find(el => el.type === 'ComponentInstance')

if (componentInstance?.type === "ComponentInstance") {

  // Get Component object from instance
  const component = await componentInstance?.getComponent()
  const componentName = await component.getName()
  console.log(componentName)
} else {
  console.log("No component element found")
}
```

## Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | Any      |
```

---
title: Get all styles
slug: designer/reference/get-all-styles
description: ''
hidden: false
'og:title': 'Webflow Designer API: Get all styles'
'og:description': 'Retrieve all Styles, also known as Classes, present on the Webflow site.'
---
## **`webflow.getAllStyles()`**

[Retrieve all Styles, also known as Classes](https://university.webflow.com/lesson/web-styling-using-classes?topics=layout-design), present on the Webflow site.


### Syntax

```typescript
webflow.getAllStyles(): Promise<Array<Style>>
```

### Returns

**Promise\<Array\<_Style_>>**

A Promise that resolves to an array of _Style_ objects representing all the styles present on the current site.


### Example

```typescript
// Get all Styles
const allStyles = await webflow.getAllStyles();

// List Styles
if (allStyles.length > 0) {

  console.log("List of all styles:");

  allStyles.forEach(async (style, index) => {

    // Print style names and ids
    console.log(`${index + 1}. Style Name: ${await style.getName()}, Style ID: ${style.id}`);
  });
} else {
  console.log("No styles found in the current context.");
}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | Any      |


---
title: Get style by name
slug: designer/reference/get-style-by-name
description: ''
hidden: false
'og:title': 'Webflow Designer API: Get style by name'
'og:description': Retrieve a Style by its name.
---
## **`webflow.getStyleByName(name)`**

Retrieve a Style by its name.


### Syntax

```typescript
webflow.getStyleByName(name: string): Promise<Style | null>
```

### Parameters

- **`name`**: _string_ - The name of the style to retrieve.


### Returns

**Promise\<_`Style`_ \| `null`>**

A Promise that resolves to a style object, or `null` if the named style doesn't exist.


### Example

```typescript
getStyleByName: async (styleName: string) => {
  // Retrieve the style by name
  const retrievedStyle = await webflow.getStyleByName(styleName);

  if (retrievedStyle) {
    // Get and print properties of the retrieved style
    const styleProperties = await retrievedStyle.getProperties();
    console.log("Style properties:", styleProperties);
  } else {
    console.log(`Style ${styleName} not found.`);
  }
}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | Any      |


---
title: Create style
slug: designer/reference/create-style
description: ''
hidden: false
'og:title': 'Webflow Designer API: Create style'
'og:description': Create a new Style with a provided name.
---
## **`webflow.createStyle(name)`**

Create a new style with a provided name. Provide a parent style to create a [combo class](https://help.webflow.com/hc/en-us/articles/33961311094419-Classes#how-to-create-a-combo-class).


### Syntax

```typescript
webflow.createStyle(name: string, options?: {parent?: Style}): Promise<Style>
```

### Parameters

- **`name`**: _String_ - The name of the style.
- **`options`**: _Object_ - An object containing the following properties:
    - **`parent`**: _Style_ - A style object that will be the parent of the combo class style.


### Returns

**Promise\<_Style_>**

A Promise that resolves to a Style object.


### Example

```typescript
// Create new style
const newStyle = await webflow.createStyle(styleName);

// Set properties for the style
newStyle.setProperties({
  "background-color": "blue",
  "font-size": "16px",
  "font-weight": "bold",
});

// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.styles) {

  // Apply style to selected element
  await selectedElement.setStyles([newStyle])

} else {
  console.log("No element selected")
}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer ability

| Designer ability         | Locale  | Branch | Workflow | Sitemode |
| :----------------------- | :------ | :----- | :------- | :------- |
| **canCreateStyleBlocks** | Primary | Any    | Canvas   | Design   |


---
title: Remove style
slug: designer/reference/remove-style
description: ''
hidden: false
---
## **`webflow.removeStyle(Style)`**

Remove an unused style from a site. In order to remove the style, it must not be used by any elements throughout the site.


### Syntax

```typescript
webflow.removeStyle(style: Style): Promise<void>
```

### Parameters

- **`Style`**: _StyleObject_ - The style to remove.


### Returns

**Promise\<void>**

A Promise that resolves to `undefined`.


### Example

```typescript
// Retrieve the style by name
const retrievedStyle = await webflow.getStyleByName(styleName)

if (retrievedStyle) {

  // Remove Style
  await webflow.removeStyle(retrievedStyle)
  console.log(`Style: ${styleName} was removed`)

} else {
  console.log(`Style ${styleName} not found.`)
}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability         | Locale | Branch | Workflow | Sitemode |
| :----------------------- | :----- | :----- | :------- | :------- |
| **canModifyStyleBlocks** | Any    | Any    | Canvas   | Design   |


---
title: Check if a style is a combo class
slug: designer/reference/style/is-combo-class
description: Check if a style is a combo class
hidden: null
'og:title': Check if a style is a combo class
'og:description': Check if a style is a combo class
---

## `style.isComboClass()`

Check if a style is a combo class.

#

### Syntax

```typescript
style.isComboClass(): Promise<boolean>
```


### Returns

**Promise\<boolean\>**

A Promise that resolves to a boolean value.

#

### Example

```typescript
// Check if a style is a combo class
const isComboClass = await style.isComboClass()
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canAccessCanvas**    | Any | Any   | Any   | Any   |


---
title: Style Properties
slug: designer/reference/style-properties
description: Reference guide for CSS style properties supported by the Webflow Designer API
hidden: false
'og:title': 'Webflow Designer API: Style Properties'
'og:description': Reference guide for CSS style properties supported by the Webflow Designer API
---

Style properties define the visual appearance and layout of web page elements. Using the Webflow Designer API, you can programmatically set these CSS properties to control design aspects like colors, typography, spacing, and positioning.

## How to use style properties

The Designer API accepts style properties as a `PropertyMap` object. A `PropertyMap` is a key-value collection where keys are CSS property names and values are their corresponding settings.

```typescript title="PropertyMap Example"
{
    "color": "#ff5733",
    "font-size": "16px",
    "font-weight": "bold",
    "text-align": "center",
    "background-color": "#e0e0e0",
    "border-radius": "5px",
    "border-color": "#000000",
}
```

<Note title="Property naming">
Use the long-form CSS property names when setting styles. For example, use `grid-row-gap` instead of `row-gap`. See the [MDN CSS Properties reference](https://developer.mozilla.org/en-US/docs/Web/CSS) for complete property names.
</Note>

## Supported properties

The following properties are organized by functional category for reference. Each property accepts either a string value or, where noted, a Webflow variable reference.

### Layout & positioning
| Property | Type | Example |
|----------|------|---------|
| `display` | string | `flex` |
| `position` | string | `absolute` |
| `top` | string or SizeVariable | `100px` |
| `right` | string or SizeVariable | `0px` |
| `bottom` | string or SizeVariable | `0` |
| `left` | string or SizeVariable | `50px` |
| `width` | string or SizeVariable | `50%` |
| `height` | string or SizeVariable | `100vh` |
| `min-width` | string or SizeVariable | `60px` |
| `max-width` | string or SizeVariable | `80%` |
| `min-height` | string or SizeVariable | `100px` |
| `max-height` | string or SizeVariable | `200px` |
| `z-index` | string | `10` |

### Flex layout
| Property | Type | Example |
|----------|------|---------|
| `flex-direction` | string | `row` |
| `flex-wrap` | string | `wrap` |
| `flex-basis` | string or SizeVariable | `auto` |
| `flex-grow` | string | `1` |
| `flex-shrink` | string | `1` |
| `justify-content` | string | `space-between` |
| `align-items` | string | `flex-start` |
| `align-content` | string | `center` |
| `align-self` | string | `stretch` |

### Grid
| Property | Type | Example |
|----------|------|---------|
| `grid-template-columns` | string | `50px 100px` |
| `grid-template-rows` | string | `auto` |
| `grid-template-areas` | string | `'header header'` |
| `grid-column-start` | string | `1` |
| `grid-column-end` | string | `span 2` |
| `grid-row-start` | string | `1` |
| `grid-row-end` | string | `3` |
| `grid-column-gap` | string | `10px` |
| `grid-row-gap` | string or SizeVariable | `20px` |
| `grid-auto-flow` | string | `row dense` |

### Typography
| Property | Type | Example |
|----------|------|---------|
| `font-family` | string or FontFamilyVariable | `Arial, sans-serif` |
| `font-size` | string or SizeVariable | `16px` |
| `font-weight` | string | `bold` |
| `font-style` | string | `italic` |
| `line-height` | string or SizeVariable | `1.5` |
| `text-align` | string | `justify` |
| `text-transform` | string | `uppercase` |
| `letter-spacing` | string or SizeVariable | `0.5em` |
| `word-spacing` | string or SizeVariable | `5px` |
| `color` | string or ColorVariable | `#FF9800` |

### Colors & backgrounds
| Property | Type | Example |
|----------|------|---------|
| `background-color` | string or ColorVariable | `#e0e0e0` |
| `background-image` | string | `url('image.jpg')` |
| `background-size` | string | `cover` |
| `background-position` | string | `top right` |
| `background-repeat` | string | `repeat-x` |
| `background-attachment` | string | `fixed` |
| `background-blend-mode` | string | `multiply` |
| `accent-color` | string or ColorVariable | `#ff5733` |
| `caret-color` | string or ColorVariable | `blue` |

### Borders
| Property | Type | Example |
|----------|------|---------|
| `border-top-width` | string or SizeVariable | `2px` |
| `border-top-style` | string | `ridge` |
| `border-top-color` | string or ColorVariable | `#3F51B5` |
| `border-top-left-radius` | string or SizeVariable | `20px` |
| `border-top-right-radius` | string or SizeVariable | `20px` |
| `border-bottom-width` | string or SizeVariable | `1px` |
| `border-bottom-style` | string | `groove` |
| `border-bottom-color` | string or ColorVariable | `#f44336` |
| `border-bottom-left-radius` | string or SizeVariable | `4px` |
| `border-bottom-right-radius` | string or SizeVariable | `4px` |
| `border-left-width` | string or SizeVariable | `2px` |
| `border-left-style` | string | `dashed` |
| `border-left-color` | string or ColorVariable | `#9C27B0` |
| `border-right-width` | string or SizeVariable | `1px` |
| `border-right-style` | string | `double` |
| `border-right-color` | string or ColorVariable | `#FFEB3B` |

### Spacing
| Property | Type | Example |
|----------|------|---------|
| `margin-top` | string or SizeVariable | `10px` |
| `margin-right` | string or SizeVariable | `30px` |
| `margin-bottom` | string or SizeVariable | `20px` |
| `margin-left` | string or SizeVariable | `30px` |
| `padding-top` | string or SizeVariable | `10px` |
| `padding-right` | string or SizeVariable | `10px` |
| `padding-bottom` | string or SizeVariable | `15px` |
| `padding-left` | string or SizeVariable | `10px` |

### Effects & transforms
| Property | Type | Example |
|----------|------|---------|
| `box-shadow` | string | `10px 5px 5px black` |
| `text-shadow` | string | `2px 2px 5px grey` |
| `filter` | string | `blur(2px)` |
| `backdrop-filter` | string | `blur(5px)` |
| `transform` | string | `rotate(45deg)` |
| `transform-origin` | string | `top left` |
| `opacity` | string | `0.5` |
| `mix-blend-mode` | string | `multiply` |

### Transitions & animations
| Property | Type | Example |
|----------|------|---------|
| `transition-property` | string | `opacity` |
| `transition-duration` | string | `300ms` |
| `transition-timing-function` | string | `ease-in-out` |
| `transition-delay` | string | `0.5s` |
| `animation-name` | string | `slidein` |
| `animation-duration` | string | `1s` |
| `animation-timing-function` | string | `ease-in-out` |
| `animation-delay` | string | `2s` |
| `animation-iteration-count` | string | `infinite` |
| `animation-direction` | string | `alternate` |
| `animation-fill-mode` | string | `forwards` |
| `animation-play-state` | string | `paused` |

### Complete property reference

For a comprehensive list of all supported properties, see the [W3Schools CSS Properties reference](https://www.w3schools.com/cssref/index.php).

{/* <!-- vale off --> */}
| Style Property              | Value                        | Example                         |
| --------------------------- | ---------------------------- | ------------------------------- |
| accent-color                | string or ColorVariable      | `#ff5733`                       |
| align-content               | string                       | `center`                        |
| align-items                 | string                       | `flex-start`                    |
| align-self                  | string                       | `stretch`                       |
| animation-delay             | string                       | `2s`                            |
| animation-direction         | string                       | `alternate`                     |
| animation-duration          | string                       | `1s`                            |
| animation-fill-mode         | string                       | `forwards`                      |
| animation-iteration-count   | string                       | `infinite`                      |
| animation-name              | string                       | `slidein`                       |
| animation-play-state        | string                       | `paused`                        |
| animation-timing-function   | string                       | `ease-in-out`                   |
| appearance                  | string                       | `none`                          |
| backdrop-filter             | string                       | `blur(5px)`                     |
| backface-visibility         | string                       | `hidden`                        |
| background-attachment       | string                       | `fixed`                         |
| background-blend-mode       | string                       | `multiply`                      |
| background-clip             | string                       | `border-box`                    |
| background-color            | string or ColorVariable      | `#e0e0e0`                       |
| background-image            | string                       | `url('image.jpg')`              |
| background-origin           | string                       | `padding-box`                   |
| background-position         | string                       | `top right`                     |
| background-position-x       | string or SizeVariable       | `50%`                           |
| background-position-y       | string or SizeVariable       | `50%`                           |
| background-repeat           | string                       | `repeat-x`                      |
| background-size             | string                       | `cover`                         |
| block-size                  | string or SizeVariable       | `100px`                         |
| border-block-end-color      | string or ColorVariable      | `#000000`                       |
| border-block-end-style      | string                       | `dotted`                        |
| border-block-end-width      | string or SizeVariable       | `3px`                           |
| border-block-start-color    | string or ColorVariable      | `#333333`                       |
| border-block-start-style    | string                       | `solid`                         |
| border-block-start-width    | string or SizeVariable       | `2px`                           |
| border-bottom-color         | string or ColorVariable      | `#f44336`                       |
| border-bottom-left-radius   | string or SizeVariable       | `4px`                           |
| border-bottom-right-radius  | string or SizeVariable       | `4px`                           |
| border-bottom-style         | string                       | `groove`                        |
| border-bottom-width         | string or SizeVariable       | `1px`                           |
| border-collapse             | string                       | `collapse`                      |
| border-end-end-radius       | string or SizeVariable       | `10px`                          |
| border-end-start-radius     | string or SizeVariable       | `10px`                          |
| border-image-outset         | string or SizeVariable       | `5px`                           |
| border-image-repeat         | string                       | `stretch`                       |
| border-image-slice          | string                       | `30%`                           |
| border-image-source         | string                       | `url('border.png')`             |
| border-image-width          | string or SizeVariable       | `10px`                          |
| border-inline-end-color     | string or ColorVariable      | `#4CAF50`                       |
| border-inline-end-style     | string                       | `inset`                         |
| border-inline-end-width     | string or SizeVariable       | `4px`                           |
| border-inline-start-color   | string or ColorVariable      | `#2196F3`                       |
| border-inline-start-style   | string                       | `outset`                        |
| border-inline-start-width   | string or SizeVariable       | `3px`                           |
| border-left-color           | string or ColorVariable      | `#9C27B0`                       |
| border-left-style           | string                       | `dashed`                        |
| border-left-width           | string or SizeVariable       | `2px`                           |
| border-right-color          | string or ColorVariable      | `#FFEB3B`                       |
| border-right-style          | string                       | `double`                        |
| border-right-width          | string or SizeVariable       | `1px`                           |
| border-start-end-radius     | string or SizeVariable       | `5px`                           |
| border-start-start-radius   | string or SizeVariable       | `5px`                           |
| border-top-color            | string or ColorVariable      | `#3F51B5`                       |
| border-top-left-radius      | string or SizeVariable       | `20px`                          |
| border-top-right-radius     | string or SizeVariable       | `20px`                          |
| border-top-style            | string                       | `ridge`                         |
| border-top-width            | string or SizeVariable       | `2px`                           |
| bottom                      | string or SizeVariable       | `0`                             |
| box-shadow                  | string                       | `10px 5px 5px black`            |
| box-sizing                  | string                       | `border-box`                    |
| break-after                 | string                       | `auto`                          |
| break-before                | string                       | `always`                        |
| break-inside                | string                       | `avoid`                         |
| caption-side                | string                       | `bottom`                        |
| caret-color                 | string or ColorVariable      | `blue`                          |
| clear                       | string                       | `both`                          |
| clip                        | string                       | `rect(0,0,0,0)`                 |
| clip-path                   | string                       | `circle(50%)`                   |
| clip-rule                   | string                       | `evenodd`                       |
| color                       | string or ColorVariable      | `#FF9800`                       |
| color-interpolation         | string                       | `sRGB`                          |
| color-interpolation-filters | string                       | `linearRGB`                     |
| column-count                | string                       | `3`                             |
| column-gap                  | string or SizeVariable       | `20px`                          |
| column-rule-color           | string or ColorVariable      | `#607D8B`                       |
| column-rule-style           | string                       | `solid`                         |
| column-rule-width           | string or SizeVariable       | `1px`                           |
| column-span                 | string                       | `all`                           |
| column-width                | string or SizeVariable       | `200px`                         |
| content                     | string                       | `'Hello'`                       |
| cursor                      | string                       | `pointer`                       |
| cx                          | string                       | `50`                            |
| cy                          | string                       | `50`                            |
| direction                   | string                       | `ltr`                           |
| display                     | string                       | `flex`                          |
| dominant-baseline           | string                       | `alphabetic`                    |
| empty-cells                 | string                       | `show`                          |
| fill                        | string                       | `#f00`                          |
| fill-opacity                | string                       | `0.5`                           |
| fill-rule                   | string                       | `nonzero`                       |
| filter                      | string                       | `blur(2px)`                     |
| flex-basis                  | string or SizeVariable       | `auto`                          |
| flex-direction              | string                       | `row`                           |
| flex-grow                   | string                       | `1`                             |
| flex-shrink                 | string                       | `1`                             |
| flex-wrap                   | string                       | `wrap`                          |
| float                       | string                       | `right`                         |
| flood-color                 | string or ColorVariable      | `#00BCD4`                       |
| flood-opacity               | string                       | `0.7`                           |
| font-family                 | string or FontFamilyVariable | `Arial, sans-serif`             |
| font-kerning                | string                       | `normal`                        |
| font-optical-sizing         | string                       | `auto`                          |
| font-size                   | string or SizeVariable       | `16px`                          |
| font-stretch                | string                       | `condensed`                     |
| font-style                  | string                       | `italic`                        |
| font-variant-alternates     | string                       | `normal`                        |
| font-variant-caps           | string                       | `small-caps`                    |
| font-variant-east-asian     | string                       | `normal`                        |
| font-variant-ligatures      | string                       | `none`                          |
| font-variant-numeric        | string                       | `ordinal`                       |
| font-weight                 | string                       | `bold`                          |
| grid-auto-columns           | string                       | `minmax(100px, auto)`           |
| grid-auto-flow              | string                       | `row dense`                     |
| grid-auto-rows              | string                       | `auto`                          |
| grid-column-end             | string                       | `span 2`                        |
| grid-column-gap             | string                       | `10px`                          |
| grid-column-start           | string                       | `1`                             |
| grid-row-end                | string                       | `3`                             |
| grid-row-gap                | string or SizeVariable       | `20px`                          |
| grid-row-start              | string                       | `1`                             |
| grid-template-areas         | string                       | `'header header'`               |
| grid-template-columns       | string                       | `50px 100px`                    |
| grid-template-rows          | string                       | `auto`                          |
| height                      | string or SizeVariable       | `100vh`                         |
| image-orientation           | string                       | `90deg`                         |
| image-rendering             | string                       | `auto`                          |
| inline-size                 | string or SizeVariable       | `200px`                         |
| inset-block-end             | string or SizeVariable       | `20px`                          |
| inset-block-start           | string or SizeVariable       | `5px`                           |
| inset-inline-end            | string or SizeVariable       | `10px`                          |
| inset-inline-start          | string or SizeVariable       | `10px`                          |
| isolation                   | string                       | `isolate`                       |
| justify-content             | string                       | `space-between`                 |
| justify-items               | string                       | `stretch`                       |
| justify-self                | string                       | `center`                        |
| left                        | string or SizeVariable       | `50px`                          |
| letter-spacing              | string or SizeVariable       | `0.5em`                         |
| lighting-color              | string or ColorVariable      | `white`                         |
| line-break                  | string                       | `strict`                        |
| line-height                 | string or SizeVariable       | `1.5`                           |
| list-style-image            | string                       | `url('star.png')`               |
| list-style-position         | string                       | `inside`                        |
| list-style-type             | string                       | `disc`                          |
| margin-block-end            | string or SizeVariable       | `15px`                          |
| margin-block-start          | string or SizeVariable       | `15px`                          |
| margin-bottom               | string or SizeVariable       | `20px`                          |
| margin-inline-end           | string or SizeVariable       | `10px`                          |
| margin-inline-start         | string or SizeVariable       | `10px`                          |
| margin-left                 | string or SizeVariable       | `30px`                          |
| margin-right                | string or SizeVariable       | `30px`                          |
| margin-top                  | string or SizeVariable       | `10px`                          |
| marker-end                  | string                       | `url('arrowhead.svg')`          |
| marker-mid                  | string                       | `url('dot.svg')`                |
| marker-start                | string                       | `url('circle.svg')`             |
| mask-type                   | string                       | `luminance`                     |
| max-block-size              | string or SizeVariable       | `100px`                         |
| max-height                  | string or SizeVariable       | `200px`                         |
| max-inline-size             | string or SizeVariable       | `300px`                         |
| max-width                   | string or SizeVariable       | `80%`                           |
| min-block-size              | string or SizeVariable       | `50px`                          |
| min-height                  | string or SizeVariable       | `100px`                         |
| min-inline-size             | string or SizeVariable       | `150px`                         |
| min-width                   | string or SizeVariable       | `60px`                          |
| mix-blend-mode              | string                       | `multiply`                      |
| object-fit                  | string                       | `cover`                         |
| object-position             | string                       | `center top`                    |
| offset-anchor               | string                       | `auto`                          |
| offset-distance             | string or SizeVariable       | `10px`                          |
| offset-path                 | string                       | `path('M10 80 Q 95 10 180 80')` |
| offset-rotate               | string                       | `auto`                          |
| opacity                     | string                       | `0.5`                           |
| order                       | string                       | `2`                             |
| outline-color               | string or ColorVariable      | `#FF5722`                       |
| outline-offset              | string or SizeVariable       | `2px`                           |
| outline-style               | string                       | `dashed`                        |
| outline-width               | string or SizeVariable       | `3px`                           |
| overflow-wrap               | string                       | `break-word`                    |
| overflow-x                  | string                       | `auto`                          |
| overflow-y                  | string                       | `scroll`                        |
| overscroll-behavior-block   | string                       | `contain`                       |
| overscroll-behavior-inline  | string                       | `none`                          |
| padding-block-end           | string or SizeVariable       | `25px`                          |
| padding-block-start         | string or SizeVariable       | `25px`                          |
| padding-bottom              | string or SizeVariable       | `15px`                          |
| padding-inline-end          | string or SizeVariable       | `20px`                          |
| padding-inline-start        | string or SizeVariable       | `20px`                          |
| padding-left                | string or SizeVariable       | `10px`                          |
| padding-right               | string or SizeVariable       | `10px`                          |
| padding-top                 | string or SizeVariable       | `10px`                          |
| paint-order                 | string                       | `fill stroke markers`           |
| perspective                 | string or SizeVariable       | `500px`                         |
| perspective-origin          | string                       | `50% 50%`                       |
| pointer-events              | string                       | `none`                          |
| position                    | string                       | `absolute`                      |
| r                           | string or SizeVariable       | `50px`                          |
| resize                      | string                       | `both`                          |
| right                       | string or SizeVariable       | `0px`                           |
| rotate                      | string                       | `45deg`                         |
| row-gap                     | string or SizeVariable       | `20px`                          |
| rx                          | string or SizeVariable       | `10px`                          |
| ry                          | string or SizeVariable       | `10px`                          |
| scale                       | string                       | `1.2`                           |
| scroll-behavior             | string                       | `smooth`                        |
| scroll-margin-block-end     | string or SizeVariable       | `10px`                          |
| scroll-margin-block-start   | string or SizeVariable       | `10px`                          |
| scroll-margin-inline-end    | string or SizeVariable       | `10px`                          |
| scroll-margin-inline-start  | string or SizeVariable       | `10px`                          |
| scroll-padding-block-end    | string or SizeVariable       | `20px`                          |
| scroll-padding-block-start  | string or SizeVariable       | `20px`                          |
| scroll-padding-inline-end   | string or SizeVariable       | `20px`                          |
| scroll-padding-inline-start | string or SizeVariable       | `20px`                          |
| shape-image-threshold       | string                       | `0.3`                           |
| shape-margin                | string or SizeVariable       | `15px`                          |
| shape-outside               | string                       | `circle(50%)`                   |
| shape-rendering             | string                       | `auto`                          |
| stop-color                  | string or ColorVariable      | `#0D47A1`                       |
| stop-opacity                | string                       | `0.8`                           |
| stroke                      | string or ColorVariable      | `black`                         |
| stroke-dasharray            | string                       | `5, 10`                         |
| stroke-dashoffset           | string or SizeVariable       | `5px`                           |
| stroke-linecap              | string                       | `round`                         |
| stroke-linejoin             | string                       | `bevel`                         |
| stroke-miterlimit           | string                       | `10`                            |
| stroke-opacity              | string                       | `1`                             |
| stroke-width                | string or SizeVariable       | `3px`                           |
| tab-size                    | string or SizeVariable       | `4`                             |
| table-layout                | string                       | `fixed`                         |
| text-align                  | string                       | `justify`                       |
| text-align-last             | string                       | `center`                        |
| text-anchor                 | string                       | `start`                         |
| text-decoration             | string                       | `underline`                     |
| text-decoration-color       | string or ColorVariable      | `red`                           |
| text-decoration-line        | string                       | `overline`                      |
| text-decoration-skip-ink    | string                       | `auto`                          |
| text-decoration-style       | string                       | `dotted`                        |
| text-emphasis-color         | string or ColorVariable      | `green`                         |
| text-emphasis-position      | string                       | `under right`                   |
| text-emphasis-style         | string                       | `filled circle`                 |
| text-indent                 | string or SizeVariable       | `20px`                          |
| text-overflow               | string                       | `ellipsis`                      |
| text-rendering              | string                       | `optimizeLegibility`            |
| text-shadow                 | string                       | `2px 2px 5px grey`              |
| text-transform              | string                       | `uppercase`                     |
| text-underline-position     | string                       | `under`                         |
| top                         | string or SizeVariable       | `100px`                         |
| touch-action                | string                       | `pan-right`                     |
| transform                   | string                       | `rotate(45deg)`                 |
| transform-origin            | string                       | `top left`                      |
| transform-style             | string                       | `preserve-3d`                   |
| transition-delay            | string                       | `0.5s`                          |
| transition-duration         | string                       | `300ms`                         |
| transition-property         | string                       | `opacity`                       |
| transition-timing-function  | string                       | `ease-in-out`                   |
| translate                   | string or SizeVariable       | `10px, 20px`                    |
| unicode-bidi                | string                       | `bidi-override`                 |
| vector-effect               | string                       | `non-scaling-stroke`            |
| vertical-align              | string                       | `middle`                        |
| visibility                  | string                       | `hidden`                        |
| white-space                 | string                       | `nowrap`                        |
| width                       | string or SizeVariable       | `50%`                           |
| will-change                 | string                       | `transform`                     |
| word-break                  | string                       | `break-word`                    |
| word-spacing                | string or SizeVariable       | `5px`                           |
| writing-mode                | string                       | `vertical-rl`                   |
| x                           | string or SizeVariable       | `5px`                           |
| y                           | string or SizeVariable       | `10px`                          |
| z-index                     | string                       | `10`                            |
| -webkit-line-clamp          | string                       | `3`                             |
| -webkit-text-fill-color     | string or ColorVariable      | `#FF5722`                       |
| -webkit-text-stroke-color   | string or ColorVariable      | `#4CAF50`                       |
| -webkit-text-stroke-width   | string or SizeVariable       | `1px`                           |
{/* <!-- vale on --> */}

---
title: Set style properties
slug: designer/reference/set-style-properties
description: ''
hidden: false
'og:title': 'Webflow Designer API: Set style properties'
'og:description': Set multiple style-properties on a style.
---
## **`style.setProperties(props, options?)`**

Set multiple style-properties on a Style object.


### Syntax

```typescript
 style.setProperties( props: PropertyMap, options?: BreakpointAndPseudo): Promise<void>
```

### Parameters

- **`props`**: _PropertyMap_ - The properties to set. See the [Style Properties](/designer/reference/style-properties) reference for a list of supported properties.
- **`options`**: _BreakpointAndPseudo_ (optional)

  An object that lets you filter properties by breakpoint and/or pseudo-state.

  ```typescript
  {
    breakpoint?: BreakpointId
    pseudo?: PseudoStateKey
  }
  ```

  - **`BreakpointId`**: Identifies the responsive breakpoint to get styles for.
    ```typescript
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```

  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to get styles for.
    ```typescript
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" |
      "first-child" | "last-child" | "hover" | "active" | "pressed" |
      "visited" | "focus" | "focus-visible" | "focus-within" |
      "placeholder" | "empty" | "before" | "after"
    ```

### Returns

**Promise\<`null`>**

A Promise that resolves to `null`

### Example

```typescript
// Create a new style
const newStyle = await webflow.createStyle('MyCustomStyle')

const propertyMap : PropertyMap = {
    'background-color': "blue",
    'font-size': "16px",
    'font-weight': "bold",
  }
const myBreakpoint = {breakpoint: "medium"} as BreakpointAndPseudo

// Set and save properties for the style
await newStyle.setProperties(propertyMap, myBreakpoint);
await newStyle.save()
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability         | Locale | Branch | Workflow | Sitemode |
| :----------------------- | :----- | :----- | :------- | :------- |
| **canModifyStyleBlocks** | Any    | Any    | Canvas   | Design   |

---
title: Get style property
slug: designer/reference/get-style-property
description: ''
hidden: false
'og:title': 'Webflow Designer API: Get style property'
'og:description': Retrieve the value of a specific property in a Style.
---
## **`style.getProperty(prop, options?)`**

Retrieve the value of a specific css property in a Style object.


### Syntax

```typescript
style.getProperty(
  prop: StyleProperty,
  options?: BreakpointAndPseudo
): Promise<null | PropertyMap[p]>
```

### Parameters

- **options**: _BreakpointAndPseudo_ (optional)

  An object that lets you filter properties by breakpoint and/or pseudo-state.

  ```typescript
  {
    breakpoint?: BreakpointId
    pseudo?: PseudoStateKey
  }
  ```

  - **`BreakpointId`**: Identifies the responsive breakpoint to get styles for.
    ```typescript
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```

  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to get styles for.
    ```typescript
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" |
      "first-child" | "last-child" | "hover" | "active" | "pressed" |
      "visited" | "focus" | "focus-visible" | "focus-within" |
      "placeholder" | "empty" | "before" | "after"
    ```

### Returns

**Promise\<_PropertyMap[p]_ \| _Variable_ \| `null`>**

Returns a Promise that resolves to:

- _PropertyMap[p]_ - The value of the provided style property, if one exists.
- A [Variable](/designer/reference/variables-overview) representing the value of the provided style property, if a variable is used as the value of the provided style property.
- `null` - If value doesn't exist for the provided style property, this method will return `null`.

### Example

```typescript
// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

// Get Element Styles
if (selectedElement?.styles) {

    const styles = await selectedElement.getStyles()
    const selectedPropertyList = await Promise.all(styles.map(async style => {

      const styleName = await style.getName()
      const property = await style.getProperty(`box-shadow`)
      console.log(`Style Name: ${styleName}, box-shadow: ${property}`)

    }))

  }
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for authorization only

| Designer Ability    | Locale | Branch | Workflow | Sitemode |
| :------------------ | :----- | :----- | :------- | :------- |
| **canAccessCanvas** | Any    | Any    | Any      | An       |

---
title: Set style property
slug: designer/reference/set-style-property
description: ''
hidden: false
'og:title': 'Webflow Designer API: Set style property'
'og:description': >-
  Manage the CSS of a Style by setting a specific style property at the given
  breakpoint and pseudo-state.
---
## **`style.setProperty(prop, value, options?)`**

Manage the CSS of a Style by setting a specific style property at the given breakpoint and pseudo-state.


### Syntax

```typescript
 style.setProperty(prop: StyleProperty, value: String, options?: BreakpointAndPseudo): Promise<void>
```

### Parameters

- **`prop`**: _StyleProperty_ - The property to set. See the [Style Properties](/designer/reference/style-properties) reference for a list of supported properties.
- **`value`**: _String_ | _VariableReference_ - The value to set. You can set the value to a string or a [variable reference](/designer/reference/variables-overview).
- **`options`**: _BreakpointAndPseudo_ (optional)

  An object to set the style property at a specific breakpoint and/or pseudo-state.

  ```typescript
  {
    breakpoint?: BreakpointId
    pseudo?: PseudoStateKey
  }
  ```

  - **`BreakpointId`**: Identifies the responsive breakpoint to set the style property for.
    ```typescript
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```

  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to set the style property for.
    ```typescript
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" |
      "first-child" | "last-child" | "hover" | "active" | "pressed" |
      "visited" | "focus" | "focus-visible" | "focus-within" |
      "placeholder" | "empty" | "before" | "after"
    ```

### Returns

**Promise\<`null`>**

A Promise that resolves to `null`

### Example

```typescript
// Retrieve the style by name
const retrievedStyle = await webflow.getStyleByName(styleName);

// Set Style Properties
const options: BreakpointAndPseudo = { breakpoint: "xl", pseudo: "hover" }
await retrievedStyle?.setProperty('background-color', 'blue', options)
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability         | Locale | Branch | Workflow | Sitemode |
| :----------------------- | :----- | :----- | :------- | :------- |
| **canModifyStyleBlocks** | Any    | Any    | Canvas   | Design   |

---
title: Remove a style property
slug: designer/reference/remove-a-style-property
description: ''
hidden: false
'og:title': 'Webflow Designer API: Remove a style property'
'og:description': Remove a single style-property from a Style object.
---
## **`style.remove(prop, options?)`**

Remove a single style-property from a Style object.


### Syntax

```typescript
style.removeProperty(prop: StyleProperty, options?: BreakpointAndPseudo): Promise<void>
```

### Parameters

- **`prop`**: _StyleProperty_ - The name of the property to remove from the style. See the [Style Properties](/designer/reference/style-properties) reference for a list of supported properties.
- **`options`**: _BreakpointAndPseudo_ (optional)

  An object that lets you filter properties by breakpoint and/or pseudo-state.

  ```typescript
  {
    breakpoint?: BreakpointId
    pseudo?: PseudoStateKey
  }
  ```

  - **`BreakpointId`**: Identifies the responsive breakpoint to get styles for.
    ```typescript
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```

  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to get styles for.
    ```typescript
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" |
      "first-child" | "last-child" | "hover" | "active" | "pressed" |
      "visited" | "focus" | "focus-visible" | "focus-within" |
      "placeholder" | "empty" | "before" | "after"
    ```

### Returns

**Promise\<`void`>**

A Promise that resolves to `undefined`

### Example

```typescript
removeSingleStyleProperty: async (property: StyleProperty) => {

  // Get Selected Element
  const selectedElement = await webflow.getSelectedElement()

  if (selectedElement?.styles) {

    // Get Element Styles
    const styles = await selectedElement.getStyles()
    const primaryStyle = styles[0]
    await primaryStyle.removeProperty(property) // Remove the property from the style

  }
},
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability         | Locale | Branch | Workflow | Sitemode |
| :----------------------- | :----- | :----- | :------- | :------- |
| **canModifyStyleBlocks** | Any    | Any    | Canvas   | Design   |

---
title: Remove style properties
slug: designer/reference/remove-style-properties
description: ''
hidden: false
'og:title': 'Webflow Designer API: Remove style properties'
'og:description': Remove multiple style properties from a Style object.
---
## **`style.removeProperties(props, options?)`**

Remove multiple style properties from a Style object.


### Syntax

```typescript
style.removeProperties(props: Array<StyleProperty>,options?: BreakpointAndPseudo): Promise<void>
```

### Parameters

- **`props`**: _Array\<StyleProperty>_ - The properties to remove from the style. See the [Style Properties](/designer/reference/style-properties) reference for a list of supported properties.

- **`options`**: _BreakpointAndPseudo_ (optional)

  An object that lets you filter properties by breakpoint and/or pseudo-state.

  ```typescript
  {
    breakpoint?: BreakpointId
    pseudo?: PseudoStateKey
  }
  ```

  - **`BreakpointId`**: Identifies the responsive breakpoint to get styles for.
    ```typescript
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```

  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to get styles for.
    ```typescript
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" |
      "first-child" | "last-child" | "hover" | "active" | "pressed" |
      "visited" | "focus" | "focus-visible" | "focus-within" |
      "placeholder" | "empty" | "before" | "after"
    ```

### Returns

**Promise\<`null`>**

A Promise that resolves to `null`

### Example

```typescript
// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.styles) {

  // Get Element Styles
  const styles = await selectedElement.getStyles()
  const primaryStyle = styles[0]
  const properties : StyleProperty[] = ['background-color', 'accent-color',"font-family"]
  await primaryStyle.removeProperties(properties)

}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability         | Locale | Branch | Workflow | Sitemode |
| :----------------------- | :----- | :----- | :------- | :------- |
| **canModifyStyleBlocks** | Any    | Any    | Canvas   | Design   |

---
title: Remove all style properties
slug: designer/reference/clear-all-style-properties
description: ''
hidden: false
'og:title': 'Webflow Designer API: Remove all style properties'
'og:description': Remove all style properties from a Style.
---
## **`style.removeAllProperties()`**

Remove all style properties from a Style.

### Syntax

```typescript
style.removeAllProperties(): Promise<void>
```

### Returns

**Promise\<`null`>**

A promise that resolves to `null`

### Example

```typescript
// Retrieve the style by name
const retrievedStyle = await webflow.getStyleByName(styleName);

// Clear Style Properties
await retrievedStyle?.removeAllProperties()
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability         | Locale | Branch | Workflow | Sitemode |
| :----------------------- | :----- | :----- | :------- | :------- |
| **canModifyStyleBlocks** | Any    | Any    | Canvas   | Design   |

---
title: Create a variable collection
slug: designer/reference/create-variable-collection
description: Learn how to create a variable collection with the Designer API.
hidden: false
'og:title': Create a variable collection
'og:description': Learn how to create a variable collection with the Designer API.
---
## `webflow.createVariableCollection(collectionName)`

Creates a new variable collection with the given name.

#

### Syntax

```typescript
webflow.createVariableCollection(collectionName: string)
```

### Parameters

- **collectionName**: _string_ - The name of the variable collection to create.

### Returns

**Promise\<_VariableCollection_>**

The newly created collection object.

#

### Example

```typescript
const collection = webflow.createVariableCollection("My Collection");

// returns a collection object
// {"id": "collection-4a393cee-14d6-d927-f2af-44169031a25b"}
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canModifyVariables**    | Any | Main   | Canvas   | Design   |

---
title: Get all variable collections
slug: designer/reference/get-all-variable-collections
description: Learn how to get all variable collections with the Designer API.
hidden: false
'og:title': Get all variable collections
'og:description': Learn how to get all variable collections with the Designer API.
---
## `webflow.getAllVariableCollections()`

Retrieves all variable collections for a site.

#

### Syntax

```typescript
webflow.getAllVariableCollections()
```

### Returns

**`Promise<Array<VariableCollection>>`**

A Promise that resolves to an array of variable collection objects.

#

### Example

```typescript
const collections = webflow.getAllVariableCollections();

// returns an array of collection objects
// [
//     {
//         "id": "collection-4a393cee-14d6-d927-f2af-44169031a25b",
//     },
//     {
//         "id": "collection-4a393cee-14d6-d927-f2af-44169031a49c",
//     }
// ]
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canReadVariables**    | Any | Any   | Any   | Any   |

---
title: Get default variable collection
slug: designer/reference/get-default-variable-collection
description: >-
  Retrieves the default variable collection. The default collection is the first
  variable collection created with your site.
hidden: false
'og:title': 'Webflow Designer API: Get default variable collection'
'og:description': >-
  Retrieves the default variable collection. The default collection is the first
  variable collection created with your site.
---
## `webflow.getDefaultVariableCollection()`

Retrieves the default variable collection. The default collection is the first variable collection created with your site.

### Syntax

```typescript
webflow.getDefaultVariableCollection(): Promise<null | VariableCollection>;
```

### Returns

**Promise\<_VariableCollection_>**

A Promise that resolves to the default Variable Collection or null if not found.

### Example

```typescript
// Get Collection
const defaultVariableCollection = await webflow.getDefaultVariableCollection();

// Fetch all variables within the default collection
const variables = await defaultVariableCollection?.getAllVariables();
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for Authorization only

| Designer Ability     | Locale | Branch | Workflow | Sitemode |
| :------------------- | :----- | :----- | :------- | :------- |
| **canReadVariables** | Any    | Any    | Any      | Any      |


---
title: Get a variable collection by ID
slug: designer/reference/get-variable-collection-by-id
description: Learn how to get a variable collection by ID with the Designer API.
hidden: false
'og:title': Get a variable collection by ID
'og:description': Learn how to get a variable collection by ID with the Designer API.
---
## `webflow.getVariableCollectionById(collectionId)`

Retrieves a variable collection by its ID.

#

### Syntax

```typescript
webflow.getVariableCollectionById(collectionId: string)
```

### Parameters

- **collectionId**: _string_ - The ID of the variable collection to retrieve.

### Returns

**Promise\<_VariableCollection_>**

The a promise that resolves to a variable collection object.

#

### Example

```typescript
const collection = webflow.getVariableCollectionById("collection-4a393cee-14d6-d927-f2af-44169031a25b");

// returns a collection object
// {
//     "id": "collection-4a393cee-14d6-d927-f2af-44169031a25b",
// }
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canReadVariables**    | Any | Any   | Any   | Any   |

---
title: Remove a variable collection
slug: designer/reference/remove-variable-collection
description: Learn how to remove a variable collection with the Designer API.
hidden: false
'og:title': Remove a variable collection
'og:description': Learn how to remove a variable collection with the Designer API.
---
## `webflow.removeVariableCollection(collectionId)`

Removes a variable collection by its ID.

#

### Syntax

```typescript
webflow.removeVariableCollection(collectionId: string)
```

### Parameters

- **collectionId**: _string_ - The ID of the variable collection to remove.

### Returns

**`Promise<Boolean>`**

`true` if the variable collection was removed successfully, `false` otherwise.

#

### Example

```typescript
const success = webflow.removeVariableCollection("collection-4a393cee-14d6-d927-f2af-44169031a25b");

// returns true
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canModifyVariables**    | Any | Main   | Canvas   | Design   |

---
title: Get collection name
slug: designer/reference/get-collection-name
description: Get the name of a variable collection using the Webflow Designer API.
hidden: false
'og:title': 'Webflow Designer API: Get collection name'
'og:description': Retrieves the name of the variable collection.
---
## `collection.getName()`

Retrieves the name of the variable collection.


### Syntax

```typescript
collection.getName(): Promise<string>
```

### Returns

**Promise\< `string`>**

A Promise that resolves to a `string` of the Variable Collection's name

### Example

```typescript
// Get Collection
const defaultVariableCollection = await webflow.getDefaultVariableCollection();

// Get Collection Name
const collectionName = await defaultVariableCollection?.getName()
console.log(collectionName)
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for Authorization only

| Designer Ability     | Locale | Branch | Workflow | Sitemode |
| :------------------- | :----- | :----- | :------- | :------- |
| **canReadVariables** | Any    | Any    | Any      | Any      |


---
title: Set a variable collection name
slug: designer/reference/set-variable-collection-name
description: Learn how to set a variable collection name with the Designer API.
hidden: false
'og:title': Set a variable collection name
'og:description': Learn how to set a variable collection name with the Designer API.
---
## `collection.setName(name)`

Sets the name of a variable collection.

#

### Syntax

```typescript
collection.setName(name: string)
```

### Parameters

- **name**: _string_ - The new name for the variable collection.

### Returns

**`null`**

Returns `null` if the name was set successfully.

### Example

```typescript
const collection = webflow.getVariableCollectionById("collection-4a393cee-14d6-d927-f2af-44169031a25b");

collection.setName("My New Collection");

// returns null
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canModifyVariables**    | Any | Main   | Canvas   | Design   |

---
title: Create number variable
slug: designer/reference/create-number-variable
description: Create a number variable with a name and value for the variable.
hidden: false
'og:title': 'Webflow Designer API: Create number variable'
'og:description': Create a number variable with a name and value for the variable.
---
## `collection.createNumberVariable(name, value)`

Create a number variable with a name and value for the variable.


### Syntax

```typescript
collection.createNumberVariable(name: string, value: number | NumberVariable | CustomValue): Promise<NumberVariable>
```

### Parameters

- **name** : _string_ - Name of the variable
- **value**: _number_ | _NumberVariable_ | [_CustomValue_](/designer/reference/variables-detail-overview#custom-values) - Value of the variable.

### Returns

**Promise\<_NumberVariable_>**

A Promise that resolves to a NumberVariable object.

### Example

```typescript
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Create Number Variable of 50
const myNumberVariable = await collection?.createNumberVariable("small", 50)
console.log(myNumberVariable)

// Create a Number Variable with a Custom Value
const myCustomNumberVariable = await collection?.createNumberVariable("h1-font-size", {
  type: "custom",
  value: "clamp(1, 2, 2)",
})
console.log(myCustomNumberVariable)

```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability       | Locale | Branch | Workflow | Sitemode |
| :--------------------- | :----- | :----- | :------- | :------- |
| **canModifyVariables** | Any    | Main   | Canvas   | Design   |

---
title: Create color variable
slug: designer/reference/create-color-variable
description: Create a color variable with a name and value for the variable.
hidden: false
'og:title': 'Webflow Designer API: Create color variable'
'og:description': Create a color variable with a name and value for the variable.
---
## `collection.createColorVariable(name, value)`

Create a color variable with a name and value for the variable.

Once created, you can set color variables for: Text colors, Background colors, Border and text stroke colors, and Gradient color stops


### Syntax

```typescript
collection.createColorVariable(name: string, value: string | ColorVariable | CustomValue): Promise<ColorVariable>
```

### Parameters

- **name** : _string_ - Name of the variable
- **value**: _string_ | _ColorVariable_ | [_CustomValue_](/designer/reference/variables-detail-overview#custom-values) - Value of the variable. Value can be a string in one of four formats:
  - Color Name
  - Color RGB hex value
  - Color RGBA hex value
  - [Custom value](/designer/reference/variables-detail-overview#custom-values)

### Returns

**Promise\<_ColorVariable_>**

A Promise that resolves to a ColorVariable object.

### Example

```typescript
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Create Color Variable with a HEX Codre
const myColorVariable = await collection?.createColorVariable("primary", "#ffcc11")
console.log(myColorVariable)
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability       | Locale | Branch | Workflow | Sitemode |
| :--------------------- | :----- | :----- | :------- | :------- |
| **canModifyVariables** | Any    | Main   | Canvas   | Design   |

---
title: Create font family variable
slug: designer/reference/create-font-family-variable
description: >-
  Create a Font Family variable with a name for the variable, and name for the
  Font Family.
hidden: false
'og:title': 'Webflow Designer API: Create font family variable'
'og:description': >-
  Create a Font Family variable with a name for the variable, and name for the
  Font Family.
---
## `collection.createFontFamilyVariable(name, value)`

Create a Font Family variable with a name for the variable, and name for the Font Family.


### Syntax

```typescript
collection.createFontFamilyVariable(name: string, value: string | FontFamilyVariable | CustomValue): Promise<FontFamilyVariable>
```

### Parameters

- **name** : _string_ - Name of the variable
- **value**: _string_ | FontFamilyVariable | [_CustomValue_](/designer/reference/variables-detail-overview#custom-values) - Font Name


### Returns

**Promise\<_FontFamilyVariable_>**

A Promise that resolves to a FontFamilyVariable object

### Example

```typescript
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Create Font Family Variable with a Font Family Name
const myFontFamilyVariable = await collection?.createFontFamilyVariable("Default Font", "Inter")
console.log(myFontFamilyVariable)
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability       | Locale | Branch | Workflow | Sitemode |
| :--------------------- | :----- | :----- | :------- | :------- |
| **canModifyVariables** | Any    | Main   | Canvas   | Design   |

---
title: Create size variable
slug: designer/reference/create-size-variable
description: 'Create a Size variable with a name for the variable, and size value.'
hidden: false
max-toc-depth: 3
'og:title': 'Webflow Designer API: Create size variable'
'og:description': 'Create a Size variable with a name for the variable, and size value.'
---
## `collection.createSizeVariable(name, value)`

Create a Size variable with a name for the variable, and size value.

Once created, you can set size variables for:

- Margin and padding  — top, bottom, left, right
- Position — top, bottom, left, right
- Column and row gaps for display settings and Quick Stack
- Height and width dimensions (including min and max)
- Grid column and row sizes
- Typography — font size, line height, letter spacing
- Border radius and width
- Filter and backdrop filter blur radius

### Syntax

```typescript
collection.createSizeVariable(name: string, value: SizeValue | SizeVariable | CustomValue): Promise<SizeVariable>
```

<Accordion title="Size Units">
#### Absolute Units
| Unit | Name | Description | Example Usage |
|------|------|-------------|---------------|
| `px` | Pixels | Absolute unit, 1px equals one pixel on the screen | `font-size: 16px;` |

#### Relative Units
| Unit | Name | Description | Example Usage |
|------|------|-------------|---------------|
| `em` | Element-relative Em | Relative to parent element's font size (2em = 2× parent font) | `padding: 1.5em;` |
| `rem` | Root Em | Relative to root element's font size | `margin: 2rem;` |
| `ch` | Character Units | Relative to width of '0' (zero) character | `width: 20ch;` |

#### Viewport-based Units
| Unit | Name | Description | Example Usage |
|------|------|-------------|---------------|
| `vh` | Viewport Height | 1% of viewport height | `height: 50vh;` |
| `vw` | Viewport Width | 1% of viewport width | `width: 80vw;` |
| `vmin` | Viewport Minimum | 1% of viewport's smaller dimension | `margin: 2vmin;` |
| `vmax` | Viewport Maximum | 1% of viewport's larger dimension | `margin: 2vmax;` |

#### Dynamic Viewport Units
| Unit | Name | Description | Example Usage |
|------|------|-------------|---------------|
| `dvh` | Dynamic Viewport Height | Adjusts to viewport height changes (mobile browsers) | `min-height: 100dvh;` |
| `dvw` | Dynamic Viewport Width | Adjusts to viewport width changes | `max-width: 50dvw;` |
| `svh` | Small Viewport Height | Viewport height for small screens | `height: 60svh;` |
| `svw` | Small Viewport Width | Viewport width for small screens | `width: 40svw;` |
| `lvh` | Large Viewport Height | Viewport height for large screens | `height: 75lvh;` |
| `lvw` | Large Viewport Width | Viewport width for large screens | `width: 100lvw;` |
</Accordion>

### Parameters

- **name** : _string_ - Name of the variable
- **value**: _SizeValue_ | _SizeVariable_ | [_CustomValue_](/designer/reference/variables-detail-overview#custom-values) - Object with the unit and value of the size. `{unit: SizeUnit, value: number}` Additionally, you can pass a _SizeVariable_ to create a referenced variable or [_CustomValue_](/designer/reference/variables-detail-overview#custom-values) to create a variable with a custom value.
  - **SizeUnit** : _string_ - Any of the following units `"px" | "em" | "rem" | "vh" | "vw" | "dvh" | "dvw" | "lvh" | "lvw" | "svh" | "svw" | "vmax" | "vmin" | "ch"`


### Returns

**Promise\<_SizeVariable_>**

A Promise that resolves to a SizeVariable object

### Example

```typescript
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Create Size Variable with a Size Value
const mySizeVariable = await collection?.createSizeVariable("Defualt Padding", { unit: "px", value: 50 })
console.log(mySizeVariable)

// Create a Size Variable with a Custom Value
const myCustomSizeVariable = await collection?.createSizeVariable("h1-font-size", {
  type: "custom",
  value: "clamp(1rem, 2vw, 2rem)",
})
console.log(myCustomSizeVariable)


```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability       | Locale | Branch | Workflow | Sitemode |
| :--------------------- | :----- | :----- | :------- | :------- |
| **canModifyVariables** | Any    | Main   | Canvas   | Design   |

---
title: Create percentage variable
slug: designer/reference/create-percentage-variable
description: Create a percentage variable with a name and value for the variable.
hidden: false
'og:title': 'Webflow Designer API: Create percentage variable'
'og:description': Create a percentage variable with a name and value for the variable.
---
## `collection.createPercentageVariable(name, value)`

Create a percentage variable with a name and value for the variable.


### Syntax

```typescript
collection.createPercentageVariable(name: string, value: number | PercentageVariable | CustomValue): Promise<PercentageVariable>
```

### Parameters

- **name** : _string_ - Name of the variable
- **value**: _number_ | _PercentageVariable_ | [_CustomValue_](/designer/reference/variables-detail-overview#custom-values) - Value of the variable.

### Returns

**Promise\<_PercentageVariable_>**

A Promise that resolves to a PercentageVariable object.

### Example

```typescript
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Create Percentage Variable of 50 Percent
const myPercentageVariable = await collection?.createPercentageVariable("50%", 50)
console.log(myPercentageVariable)
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability       | Locale | Branch | Workflow | Sitemode |
| :--------------------- | :----- | :----- | :------- | :------- |
| **canModifyVariables** | Any    | Main   | Canvas   | Design   |

---
title: Get all variables
slug: designer/reference/get-all-variables
description: Get all variables in a collection using the Webflow Designer API.
hidden: false
'og:title': 'Webflow Designer API: Get all variables'
'og:description': Get all variables in a collection
---
## `collection.getAllVariables()`

Get all variables in a collection


### Syntax

```typescript
collection.getAllVariables(): Promise<Array<Variable>>
```

### Returns

**Promise\<_Variable_>**

A Promise that resolves to an array of Variable objects

### Example

```typescript
// Fetch the default variable collection
const defaultVariableCollection = await webflow.getDefaultVariableCollection();

if (defaultVariableCollection) {

  // Print Collection ID
  console.log("Default Variable Collection ID:", defaultVariableCollection.id);

  // Fetch all variables within the default collection
  const variables = await defaultVariableCollection.getAllVariables();

  if (variables.length > 0) {

    console.log("List of Variables in Default Collection:");

    // Print variable details
    for (var i in variables) {
      console.log(`${i}. Variable Name: ${await variables[i].getName()}, Variable ID: ${variables[i].id}`);
    };
  } else {
    console.log("No variables found in the default collection.");
  }
} else {
  console.log("Default Variable Collection not found.");
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for Authorization only

| Designer Ability     | Locale | Branch | Workflow | Sitemode |
| :------------------- | :----- | :----- | :------- | :------- |
| **canReadVariables** | Any    | Any    | Any      | Any      |

---
title: Get variable by name
slug: designer/reference/get-variable-by-name
description: Retrieve a variable by its name with the Webflow Designer API.
hidden: false
'og:title': 'Webflow Designer API: Get variable by name'
'og:description': Retrieve a variable by its name.
---
## `collection.getVariableByName(name)`

Retrieve a variable by its name.


### Syntax

```typescript
collection.getVariableByName(name: string): Promise<null | Variable>>
```

### Parameters

- **name** : _string_ - Name of the variable you'd like to retrieve


### Returns

**Promise\< _Variable_ \| `null`>**

A Promise that resolves to a Variable object, or `null` if not found

### Example

```typescript
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Get Variable by Name
const variableByName = await collection?.getVariableByName('Space Cadet')
console.log(variableByName)
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for Authorization only

| Designer Ability     | Locale | Branch | Workflow | Sitemode |
| :------------------- | :----- | :----- | :------- | :------- |
| **canReadVariables** | Any    | Any    | Any      | Any      |

---
title: Get variable by ID
slug: designer/reference/get-variable
description: Retrieve a variable by its ID with the Webflow Designer API.
hidden: false
'og:title': 'Webflow Designer API: Get variable by ID'
'og:description': Retrieve a variable by its ID.
---
## `collection.getVariable(id)`

Retrieve a variable by its ID.


### Syntax

```typescript
collection.getVariable(id: VariableId): Promise<null | Variable>
```

### Parameters

- **ID** : _string_ - ID of the variable you'd like to retrieve


### Returns

**Promise\<_Variable_ \| `null`>**

A promise that resolves to a Variable object, or `null` if not found

### Example

```typescript
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Get variable by ID
const variableById = await collection?.getVariable('id-123')
console.log(variableById)
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for Authorization only

| Designer Ability     | Locale | Branch | Workflow | Sitemode |
| :------------------- | :----- | :----- | :------- | :------- |
| **canReadVariables** | Any    | Any    | Any      | Any      |

---
title: Get variable name
slug: designer/reference/get-variable-name
description: ''
hidden: false
'og:title': 'Webflow Designer API: Get variable name'
'og:description': Retrieves the name of the variable.
---
## `variable.getName()`

Retrieves the name of the variable.


### Syntax

```typescript
variable.getName(): Promise<string>;
```

### Returns

**Promise\<`string`>**

A Promise that resolves to a `string` with the variable name


### Example

```typescript
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Get All Variables
const variables = await collection.getAllVariables()

// Get Value of first Variable
const variable = variables[0]
const value = await variable.getName()
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

Checks for Authorization only

| Designer Ability     | Locale | Branch | Workflow | Sitemode |
| :------------------- | :----- | :----- | :------- | :------- |
| **canReadVariables** | Any    | Any    | Any      | Any      |

---
title: Get variable value
slug: designer/reference/get-variable-value
description: ''
hidden: false
'og:title': 'Webflow Designer API: Get variable value'
'og:description': Retrieves the value of the variable.
---
## `variable.get(options?)`

Retrieves the value of the variable.


### Syntax

```typescript
variable.get(options?: {mode: VariableMode, customValues: boolean}): Promise< Value: string | Variable | CustomValue >;
```
### Parameters

- **options**: _object_ - An optional parameter to include get specific information.
  - **mode**: _VariableMode_ - The value of the variable in the specified[ variable mode.](/designer/reference/variable-modes)
  - **customValues**: _boolean_ - Indicate whether to return the custom value of the variable. Defaults to false.
        {/* <!-- vale off --> */}
        <Warning>
            Calling `variable.get()` without `customValues: true` will throw an error if the variable has a custom value.
        </Warning>
        {/* <!-- vale on --> */}

### Returns

Returns a Promise that resolves to a value based on the variable type. The return type varies depending on:
- The variable type (Color, Size, Number, etc.)
{/* <!-- vale off --> */}
- Whether the variable is an alias (references another variable)
- Whether custom values are requested (`customValues: true`)
- The specified variable mode (`mode` parameter)
{/* <!-- vale on --> */}
<br/>
<Tabs>
    <Tab title="Color">
        Returns a value in one of these formats:
        - String: e.g. `"red"`, `"#ffcc11"`, `"#fffcc11"`
        - Variable reference: _ColorVariable_
        - Custom value: _CustomValue_

        **Return Type:** Promise\<`string` | _ColorVariable_ | _CustomValue_>
    </Tab>
    <Tab title="Size">
        Returns a value as an object:
        - _SizeValue_
        - Variable reference: _SizeVariable_
        - Custom value: _CustomValue_

        **SizeValue Example**
        ```typescript
        {
            value: number,  // The size value
            unit: "px" | "rem" | "em" | "vw" | "vh" | "svh" | "svw" | "ch"  // The unit type
        }
        ```

        **Return Type:** Promise\<_SizeValue_ | _SizeVariable_ | _CustomValue_>
    </Tab>
    <Tab title="Number & Percentage">
        Returns a numeric value between 0 and 100. Can be either:
        - _Number_: for example `100`
        - Variable reference: _NumberVariable_
        - Custom value: _CustomValue_

        **Number Return Type:** Promise\<`number` | _NumberVariable_ | _CustomValue_>
        **Percentage Return Type:** Promise\<`number` | _PercentageVariable_ | _CustomValue_>
    </Tab>
    <Tab title="FontFamily">
        Returns a font family name in one of these formats:
        - String: for example `"Verdana"`
        - Variable reference: _FontFamilyVariable_
        - Custom value: _CustomValue_

        **Return Type:** Promise\<`string` | _FontFamilyVariable_ | _CustomValue_>
    </Tab>
    {/* <!-- vale off --> */}
    <Tab title="Custom Value">
        Returns a custom value object:
        ```typescript
        {
            type: 'custom',
            value: string  // CSS value, for example 'color-mix(in srgb, var(--blue-500), white 50%)'
        }
        ```

        **Return Type:** Promise\<_CustomValue_>
    </Tab>
    {/* <!-- vale on --> */}
</Tabs>


### Example

```typescript
// Get Collection
const collection = await webflow.getDefaultVariableCollection();

// Get All Variables
const variables = await collection.getAllVariables();

// Get Value of first Variable
const variable = variables[0];
const value = await variable.get()
// value = "#146EF5"

// Get Value of first Variable with custom value
const variable = variables[1];
const value = await variable.get({ customValues: true })
// value = { type: 'custom', value: 'color-mix(in srgb, var(--blue-500), white 50%)' }
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer ability

Checks for Authorization only
{/* <!-- vale off --> */}
| Designer ability     | Locale | Branch | Workflow | Sitemode |
| :------------------- | :----- | :----- | :------- | :------- |
| **canReadVariables** | Any    | Any    | Any      | Any      |

---
title: Remove variable
slug: designer/reference/remove-variable
description: ''
hidden: false
'og:title': 'Webflow Designer API: Remove variable'
'og:description': Delete and remove variable from collection.
---
## `variable.remove()`

Delete and remove variable from collection.


### Syntax

```typescript
variable.remove(): Promise<boolean>
```

### Returns

**Promise\<`boolean`>**

A Promise that resolves to a `boolean` value


### Example

```typescript
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Get All Variables
const variables = await collection.getAllVaraiables

// Remove first variable
const variable = variables[0]
await variable.remove()
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability       | Locale | Branch | Workflow | Sitemode |
| :--------------------- | :----- | :----- | :------- | :------- |
| **canModifyVariables** | Any    | Main   | Canvas   | Design   |

---
title: Set variable name
slug: designer/reference/set-variable-name
description: ''
hidden: false
'og:title': 'Webflow Designer API: Set variable name'
'og:description': Sets the name of the variable.
---
## `variable.setName(name)`

Sets the name of the variable.


### Syntax

```typescript
variable.setName(name: string): Promise<null>;
```

### Parameters

- **name** : _string_   - Name of the variable

### Returns

**Promise\<`null`>**

A Promise that resolves to `null`.


### Example

```typescript
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Get All Variables
const variables = await collection.getAllVariables()

// Get Value of first Variable
const variable = variables[0]
const value = await variable.setName("Primary")
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability       | Locale | Branch | Workflow | Sitemode |
| :--------------------- | :----- | :----- | :------- | :------- |
| **canModifyVariables** | Any    | Main   | Canvas   | Design   |

---
title: Set variable value
slug: designer/reference/set-variable-value
description: ''
hidden: false
'og:title': 'Webflow Designer API: Set variable value'
'og:description': Set the value of the selected variable.
---
## `variable.set(value, options?)`

Set the value of the selected variable.

**General Syntax**

```typescript
variable.set(value: VariableValue | Variable | CustomValue, options?: {mode: VariableMode});
```

### Parameters

- **value**: `VariableValue` | `Variable` | [`CustomValue` | `null`](/designer/reference/variables-detail-overview#custom-values) - The value to set for the variable. The value must match the variable's type (e.g., a color variable requires a color value, a size variable requires a size value). You can also pass a Variable object to create a referenced variable or a [CustomValue](/designer/reference/variables-detail-overview#custom-values) to set a custom value for the variable.
    - **Note:** `null` can only be passed in to reset a mode-specific value back to the default base value. Make sure to pass the mode you want to reset in the `options` parameter.
        <Tabs>
            <Tab title="Color">
                | Accepted Formats for Value | Examples |
                | -------------------------- | -------- |
                | Color name                 | `variable.set("red");` |
                | RGB Hex                    | `variable.set("#ffcc11");` |
                | RGBA Hex                   | `variable.set("#fffcc11");` |
                | null (reset mode-specific value)                       | `variable.set(null, {mode: variableMode});` |
            </Tab>
            <Tab title="Size">
                | Accepted Formats for Value | Examples |
                | -------------------------- | -------- |
                | Pixels - `px` | `variable.set({ unit: "px", value: 50 });` |
                | Root EM - `rem` | `variable.set({ unit: "rem", value: 2 });` |
                | EM Units - `em` | `variable.set({ unit: "em", value: 1.5 });` |
                | Viewport Width - `vw` | `variable.set({ unit: "vw", value: 100 });` |
                | Viewport Height - `vh` | `variable.set({ unit: "vh", value: 100 });` |
                | Small Viewport Height - `svh` | `variable.set({ unit: "svh", value: 100 });` |
                | Small Viewport Width - `svw` | `variable.set({ unit: "svw", value: 100 });` |
                | Character Units - `ch` | `variable.set({ unit: "ch", value: 80 });` |
                | null (reset mode-specific value)                       | `variable.set(null, {mode: variableMode});` |
            </Tab>
            <Tab title="Number & Percentage">
                | Accepted Formats for Value | Examples |
                | -------------------------- | -------- |
                | Number value between 0 and 100 | `variable.set(50);` |
                | null (reset mode-specific value)                       | `variable.set(null, {mode: variableMode});` |
            </Tab>
            <Tab title="FontFamily">
                | Accepted Formats for Value | Examples |
                | -------------------------- | -------- |
                | String of the font family name (e.g., "Verdana") | `variable.set("Verdana");` |
                | null (reset mode-specific value)                       | `variable.set(null, {mode: variableMode});` |
            </Tab>
            <Tab title="CustomValue">
                All variables can be set with a [custom value](/designer/reference/variables-detail-overview#custom-values). To set a custom value, pass an object with `type: "custom"` and a `value` property containing the custom value as a string.

                <Note title="Variable Bindings">
                    When setting a custom value, you can use the [variable binding](/designer/reference/variables-detail-overview#variable-bindings) to reference other variables within the custom value.
                </Note>

                | Accepted Formats for Value | Examples |
                | -------------------------- | -------- |
                | Custom value | `variable.set({ type: "custom", value: "color-mix(in srgb, var(--blue-500), white 50%)" });` |
            </Tab>

        </Tabs>

- **options**: `{mode: VariableMode}` - An optional parameter to set the [mode value](/designer/reference/variable-modes) of the variable.


### Returns

**Promise\<`null`>**

A Promise that resolves to `null`


### Example

```typescript
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Get Variable
const variable = await collection?.getVariableByName("MyColorVariable")

// Check Variable type and set color
if (variable?.type === "Color") await variable.set("#fffcc11");
```

<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem'}}>
  <a href="https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62"
     className="button cc-primary"
     style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    Try this example
  </a>
</div>

### Designer Ability

| Designer Ability       | Locale | Branch | Workflow | Sitemode |
| :--------------------- | :----- | :----- | :------- | :------- |
| **canModifyVariables** | Any    | Main   | Canvas   | Design   |

---
title: Get variable binding
slug: reference/get-variable-binding
description: Get the binding of a variable
hidden: false
'og:title': 'Webflow Designer API: Get variable binding'
'og:description': Get the binding of a variable
---
## `variable.getBinding()`

Returns a binding value for the variable. Use the binding value when creating or updating variables with [custom values.](/designer/reference/variables-detail-overview#custom-values)

### Syntax

```typescript
variable.getBinding(): Promise<string>
```

### Returns

**Promise\<_string_>**

A Promise that resolves to a string representing the variable's name binding.

### Example

```typescript

// Create a variable
const webflowBlue = await collection?.createColorVariable(
'blue-500',
'#146EF5',
)

// Get the binding value for a variable
const binding = await webflowBlue.getBinding()
// binding = "var(--blue-500)"

// Use the binding value to create a variable with a custom value
const webflowBlue400 = await collection.createColorVariable('blue-400', {
    type: 'custom',
    value: `color-mix(in srgb, ${binding}, white 50%)`
})
```

### Designer Ability

| Designer Ability | Locale  | Branch | Workflow | Sitemode |
| :--------------- | :------ | :----- | :------- | :------- |
| **canReadVariables**    | Any | Any   | Any   | Any   |
