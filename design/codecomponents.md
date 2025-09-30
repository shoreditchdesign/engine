---
title: How to import code components into Webflow
description: Import React components into Webflow with DevLink
hidden: false
subtitle: Import React components into Webflow with DevLink
---

In this quickstart guide, we’ll discuss how to import React components from an external codebase into Webflow using DevLink.

**What you'll accomplish:**
- Set up your development environment
- Declare a Webflow code component with props
- Import your component library to Webflow
- Use your component in a Webflow project

## Before you start

Before running this quickstart, make sure you have:

- A Webflow account with either:
    - a Workspace on a Freelancer, Core, Growth, Agency, or Enterprise plan
    - a Webflow site with a CMS, Business, or Enterprise plan
- A Webflow site where you can test components
- Node.js 20+ and npm 10+ installed
- Basic familiarity with React components and TypeScript


## 1. Setup your development environment
Set up your local development environment to create and share React components.

<Steps>
    <Step title="Setup your React project">
    DevLink is compatible with a wide variety of local setups. To get started, create a new React project.

    **If you're working with an existing repository, you can skip this step.**

    ```bash
    npx create-react-app code-components
    cd code-components
    ```

    </Step>

    <Step title="Install the Webflow CLI">
    Install the Webflow CLI and the necessary dependencies to create a code component library.


        ```bash
        npm i --save-dev @webflow/webflow-cli @webflow/data-types @webflow/react

        ```
    </Step>
    <Step title="Create a Webflow configuration file">
    Create a `webflow.json` file in the root of your repository. This file will define the configuration for your code component library.

    ```json title={"webflow.json"}
    {
        "library": {
            "name": "<Your Library Name>",
            "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"]
        }
    }

    ```


    Give your library a name and specify the path to your code component files.

    </Step>
    <Step title="Add an example component to your library">
    In your editor, navigate to your src or components directory. Create a new file called `Badge.tsx`, and paste the following code. In the next step, you'll create a code component definition file to map this component to a Webflow component.

    ```tsx title={"Badge.tsx"}
    import * as React from "react";

    interface BadgeProps {
      text: string;
      variant: 'Light' | 'Dark';
    }

    export const Badge = ({ text, variant }: BadgeProps) => (
      <span
        style={{
          backgroundColor: variant === 'Light' ? '#eee' : '#000',
          borderRadius: '1em',
          color: variant === 'Light' ? '#000' : '#fff',
          display: 'inline-block',
          fontSize: '14px',
          lineHeight: 2,
          padding: '0 1em',
        }}
      >
        {text}
      </span>
    );
    ```

    </Step>
</Steps>

## 2. Define a Webflow code component
Create a code component definition file to map a React component to a Webflow component. In this step, you'll create a `Badge` component with two props mapping to an example `Badge.tsx` component.


<Steps>
    <Step title="Create a code component file">
    In your editor, navigate to the your `src` or components directory where you added your Badge component. Create a new file called `Badge.webflow.tsx`. This file will define how your Badge component appears in Webflow.

    </Step>

    <Step title="Import the React component and Webflow functions">
    Import the necessary dependencies to create your code component: the React component, [prop types](/code-components/reference/prop-types) and the `declareComponent` function.

    ```tsx title={"Badge.webflow.tsx"}
    import { Badge } from './Badge'; // Import your React component here
    import { props } from '@webflow/data-types';
    import { declareComponent } from '@webflow/react';

    ```



    </Step>
    <Step title="Declare the component">
    Declare the code component using the `declareComponent` function.

    ```tsx title={"Badge.webflow.tsx"}
    import { Badge } from './Badge';
    import { props } from '@webflow/data-types';
    import { declareComponent } from '@webflow/react';

    export default declareComponent(Badge, {
        name: 'Badge',
        description: 'A badge with variants',
        group: 'Info',
    });
    ```


    The `declareComponent` function takes two parameters:
    - Your React component (`Badge`)
    - Configuration options:
        - `name`: The name of the component
        - `description?`: A description of the component (optional)
        - `group?`: The group the component belongs to (optional)
        - `props?`: The props of the component, **which we'll define in the next step.** (optional)
        - `options?`: The options of the component, (optional)

    For more information and detailed configuration options for code component imports, see the [component definition reference](/code-components/define-code-component).

    </Step>
    <Step title="Define the component props">
    Add configurable properties that users can edit in the Webflow designer.

    Add a `props` object to the `declareComponent` function. This object defines which properties designers can configure in the Webflow editor, and maps them to appropriate Webflow prop types using the `props` constructor.

    ```tsx title={"Badge.webflow.tsx"}
    import { Badge } from './Badge';
    import { props } from '@webflow/data-types';
    import { declareComponent } from '@webflow/react';

    export default declareComponent(Badge, {
        name: 'Badge',
        description: 'A badge with variants',
        group: 'Info',
        props: {
            text: props.Text({
                name: "Text",
                defaultValue: "Hello World",
            }),
            variant: props.Variant({
                name: "Variant",
                options: ["Light", "Dark"],
                defaultValue: "Light",
            }),
        },
    });
    ```


        This code component defines two props:
        - `text`: A text field for the Badge content
        - `variant`: A dropdown with predefined style options

    </Step>
</Steps>

## 3. Share your library to Webflow

    In your terminal, run the following command to upload your library:

    ```bash
    npx webflow library share
    ```

    The Webflow CLI will:
        - **Authorize your workspace:** The CLI will check for a Workspace authentication token in your `.env` file. If one is not found, the CLI will prompt you to authenticate by opening a browser window to the Workspace authorization page. **Authorize a workspace to continue.**
        - **Bundle your library:** The CLI will bundle your library, and ask you to confirm the components you want to share.
        - **Upload your library to your Workspace**

    For more information and detailed configuration options for bundling and importing React components, see the [bundling and import reference. →](/code-components/bundling-and-import)

## 4. Use the component on your Webflow site
Add your component to the canvas and update the props to customize the component.

<Steps>
    <Step title="Install the library on your Webflow site">
    Install the library on any site in your Workspace to start using your React components.

        1. Open any Webflow site in your workspace.
        2. Open the Libraries panel by pressing "L" or clicking the <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/32px/Resources.png" alt="Resources icon" style={{ display: "inline-block", verticalAlign: "text-bottom", width: 20, height: 20, margin: "0 2px" }} /> icon in the left sidebar.

            <div style={{width:"50%"}}>
                <Frame>
                    <img src="file:cc308e86-894b-457c-aa40-083d13bd0931" alt="Available to install" />
                </Frame>
            </div>

        3. Find your library in the list of available libraries.
        4. Install the library by clicking the **Install** icon next to your library.

    </Step>
    <Step title="Open the Components panel">
    Open the Components panel by pressing "⇧C" or clicking the
    <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/32px/Components.svg" alt="Components icon" style={{ display: "inline-block", verticalAlign: "text-bottom", width: 20, height: 20, margin: "0 2px" }} /> icon in the left sidebar.

    Scroll to the section for the library you just installed. You should see your "Badge" component listed under the "Info" group.

    <Frame  >
        <img src="file:0985b36c-8f0d-4ee0-adf8-0afae53a50b5" alt="Components panel" />
    </Frame>


    </Step>
    <Step title="Add the component to your page">

        Click and drag the Badge component from the components panel onto your page. The component will appear with its default text and styling.
    </Step>

    <Step title="Customize the component">
    Customize your component in the Properties panel on the right. You'll see two configurable properties:

    - **Text**: Change the text content of the Badge
    - **Variant**: Select from Light or Dark styling

    <Frame>
        <img src="file:2816492c-d342-4b19-b349-524dd62646f9" alt="Badge component" />
    </Frame>

    Try changing the text to "Welcome!" and selecting a different variant to see your component update in real-time.

    </Step>
</Steps>


## Congratulations
You've successfully created and shared a code component library for your Webflow projects! You now know how to:

- Set up a development environment for React components
- Declare a Webflow React component with configurable properties
- Share component libraries to Webflow via DevLink
- Use custom components in your Webflow projects


## Next steps

Now that you've created your first code component, explore these resources to build more advanced components:

### Learn the fundamentals
- [**Define a code component**](/code-components/define-code-component)<br/>
    Learn how code components work and their architecture
- [**Explore prop types**](/code-components/reference/prop-types)<br/>
    Explore all available prop types for creating configurable components
- [**Learn about the Webflow CLI**](/code-components/reference/cli)<br/>
    Learn more about the Webflow CLI commands

### Advanced configuration
- [**Installation and setup**](/code-components/installation)<br/>
  Learn how to configure your existing codebase for component import.
- [**Configure code components to work with popular frameworks and libraries**](/code-components/frameworks-and-libraries)<br/>
  Learn how to use CSS frameworks like **Tailwind CSS**, tools like **Shadcn/UI**, and component libraries like **Material UI** with code components.
- [**Configure bundling and import**](/code-components/bundling-and-import)<br/>
  Explore advanced configuration options for bundling and importing React components.


---
title: Component architecture
slug: component-architecture
description: Learn how code components work internally and their architectural constraints
hidden: false
max-toc-depth: 2
subtitle: Understand the runtime behavior of code components
canonical-url: 'https://developers.webflow.com/code-components/component-architecture'
---

**Code components run as isolated React applications.** Each one mounts in its own [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) container with a separate React root, creating a sandboxed environment that prevents conflicts with the main page or other components.

<Frame>
    <>
        <img src="file:a003352b-3a6e-48a7-bac8-6ebdfa64fd59" alt="Component architecture" className="dark-icon" />
        <img src="file:8f58f4ce-6a6e-47df-a360-9751a9881ae8" alt="Component architecture" className="light-icon" />
    </>
</Frame>

Because of this isolation, each imported React component manages its own dependencies, state, and context. When building, it’s important to consider how your components handle state and communicate with each other.

#### Key concepts

- **Shadow DOM isolation** - Styles and DOM elements are contained.
- **Separate React roots** - No shared state or context between components.
- **Server-side rendering** - SSR provides initial HTML
- **Client-side execution** - All interactivity runs in the browser

This architecture affects how you handle state management, component communication, data fetching, and styling. Use the following patterns to manage these constraints when building your React components for import into Webflow.

## Shadow DOM and React roots

Each code component runs in its own Shadow DOM container with a separate React root. This sandboxed environment prevents conflicts with the main page and other components:

- Your component's styles won't leak to the page
- Page styles won't override your component's styles
- You must explicitly import external styles (site variables, tag selectors, etc.)

**Composing components with slots**

When composing code components using slots, parent and child components may not share state through React context. Each child component renders in its own Shadow DOM container, which isolates component state sharing.

Shadow DOM impacts how you style components as well as your ability to use third-party libraries. To learn more about styling components within the Shadow DOM, see the [styling components guide](/code-components/styling-components) and [frameworks and libraries guide](/code-components/frameworks-and-libraries).

## Server-side rendering (SSR)
Webflow supports server-side rendering (SSR) for code components. SSR generates initial HTML for the component on the server, which can improve perceived performance and SEO. After the page loads, Webflow automatically hydrates the component in the browser so that it becomes fully interactive.

Webflow enables SSR by default, but you can disable it by setting `ssr` to `false` in the component's definition file.

```typescript title="Chart.webflow.tsx"
declareComponent(Component, {
  name: "Chart",
  description: "An interactive chart component",
  group: "Data Visualization",
  options: {
    ssr: false
  },
});
```
### When to disable SSR
You’ll want to turn off SSR for code components that rely on client-only behavior or that don’t benefit from server-rendered HTML. Common cases include:

- **Browser APIs:** Components that use window, document, `localStorage`, or other APIs not available during SSR.
- **Dynamic or personalized content:** User-specific dashboards, authenticated views, or components that need client data to render correctly.
- **Heavy or interactive UI:** Charts, 3D scenes, maps, or animation-driven elements that would bloat the server-rendered HTML and be re-rendered anyway.
- **Non-deterministic output:** Anything that renders differently on the server vs. client (for example, random numbers, time-based values).

<Tip>
If the HTML output helps with SEO or improves the first paint, keep SSR on. If the component is purely interactive, client-specific, or browser-dependent, disable SSR.
</Tip>

<Warning title="React Server Components are not supported">
React Server Components aren't supported in code components. All code components must use standard React components.
</Warning>

## Communicating between components
Because each code component runs in its own React root, they can’t share React Context or state directly. Instead, use one of the following patterns to manage state across multiple components.

### Sharing state across components

#### URL parameters
Store state in the URL using `URLSearchParams` for shareable, bookmarkable state. This is useful for search queries, filters, navigation state, or pagination.

```tsx title="Filter.tsx"
// Set state
const url = new URL(window.location.href);
url.searchParams.set('filter', 'active');
window.history.pushState({}, '', url);

// Read state
const params = new URLSearchParams(window.location.search);
const filter = params.get('filter'); // 'active'
```


#### Browser storage
Use `localStorage` for persistent data or `sessionStorage` for session-only data. Only store non-sensitive information since this data is visible to users.

```tsx title="ThemePreference.tsx"
// localStorage - persists across browser sessions
window.localStorage.setItem('userPreferences', JSON.stringify({ theme: 'dark' }));
const prefs = JSON.parse(localStorage.getItem('userPreferences'));

// sessionStorage - cleared when tab closes
window.sessionStorage.setItem('tempData', 'value');
```

Best for: user preferences, form data, temporary state.

#### Nano Stores
[Nano stores](https://github.com/nanostores/nanostores) is a lightweight state management library for cross-component communication, and is a useful alternative to React Context for sharing state between components.

<Accordion title="Using Nano Stores">

<Steps>
<Step title="Install Nano Stores">
  In your React project, install Nano Stores by running the following command in your terminal:

  ```bash
  npm install nanostores @nanostores/react
  ```
</Step>
<Step title="Create a store">
  A store represents is external shared state: any component can access, modify, or subscribe to it. Create a file to create the store. Use Nano Stores' `atom()` to make a shared, reactive variable.

  ```tsx title={"Store.tsx"}
  import { atom } from 'nanostores';

  // Shared state store - any component can read/write to this
  export const $counter = atom(0);
  ```


  **Note:** This example uses an atomic store with a single value. See the [Nano Stores documentation](https://github.com/nanostores/nanostores) for more information on the different types of stores.
</Step>
<Step title="Read a store in a component">
  In your component, subscribe to the store using `useStore()` hook to automatically update when the value changes:

  ```tsx title={"Counter.tsx"}
  import React from 'react';

  import {useStore} from '@nanostores/react';
  import {$counter} from './store';

  // Displays the current count - automatically updates when store changes
  export const Counter = () => {
      const count = useStore($counter); // Subscribe to store changes

      return(
          <div style={{backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px'}}>
              <p>Count: {count}</p>
          </div>
      )
  };
  ```


</Step>
<Step title="Update the store from a separate component">
  In the `Clicker` component, update the store using `set()` to change the value:

  ```tsx title={"Clicker.tsx"}
  import React from 'react';
  import {Button} from './Button';
  import {$counter} from './Store';

  interface ClickerProps {
      text: string;
      variant: 'primary' | 'secondary';
  }

  // Button that increments the shared counter when clicked
  export const Clicker = ({text, variant}: ClickerProps) => {
      const clicked = React.useCallback(() => $counter.set($counter.get() + 1), []); // Update shared state
      return <Button
          text={text}
          variant={variant}
          onClick={clicked}/>;
  };
  ```


  **Note:** This example uses the `useCallback` hook to update the store when the button once it's clicked.
</Step>
</Steps>
</Accordion>

### Custom events
To notify a component of an event or update another component, use [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) to communicate across React components in Webflow:

<CodeBlocks>
  ```tsx title={"ThemeToggle.tsx"}
  import React from 'react';

  // Theme toggle component dispatches events
  export const ThemeToggle = () => {
      const handleClick = () => {
        // Dispatch custom event that other components can listen to
        window.dispatchEvent(new CustomEvent('theme-changed', {
          detail: { theme: 'dark' },
        }));
      };

      return <button onClick={handleClick}>Switch to Dark Mode</button>;
    };

  ```

  ```tsx title={"ThemeDisplay.tsx"}
  import { useState, useEffect } from 'react';

  // Theme display component listens for events
  export const ThemeDisplay = () => {
      const [theme, setTheme] = useState('light');

          useEffect(() => {
        const handleThemeChange = (event: Event) => {
          const customEvent = event as CustomEvent<{ theme: string }>;
          setTheme(customEvent.detail.theme);
        };

        window.addEventListener('theme-changed', handleThemeChange);
        return () => window.removeEventListener('theme-changed', handleThemeChange);
      }, []);

      return <div>Current theme: {theme}</div>;
    };

  ```

</CodeBlocks>


## Data fetching
Code components support client-side data fetching. This means your React component can request live or real-time data from a public API after it renders in the browser.

To fetch data, use React’s `useEffect` hook when the component mounts:

```tsx title={"MyComponent.tsx"}
import React, { useEffect, useState } from "react";

interface ApiResponse {
  message: string;
}

export const MyComponent = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public-data")
      .then((res) => res.json())
      .then((json: ApiResponse) => setData(json))
      .catch((err) => console.error("Fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  return <div>{data.message}</div>;
};

```



### Key considerations
- **Public APIs only:** Never include secrets or sensitive API keys in your component code. All JavaScript runs in the browser and is visible to users.
- **CORS support required:** The API must accept cross-origin requests from your Webflow-hosted site.
- **No environment variables:** `.env` files aren’t supported. If you need to pass configuration values (like endpoint URLs, IDs, or feature flags), provide them as props instead of embedding them directly.

---
title: Styling components
slug: styling-components
description: Learn how to style code components for use in Webflow
hidden: false
max-toc-depth: 2
subtitle: >-
  Style your code components using site variables, inherited properties, and tag
  selectors.
canonical-url: 'https://developers.webflow.com/code-components/styling-components'
---

Imported components support standard React styling approaches, but with important considerations for Shadow DOM isolation.

## How Shadow DOM affects styling

Code components render in [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM), which creates an isolated styling boundary. This means:

- Your component styles won't affect the rest of the page
- Page styles won't affect your component
- You need to explicitly connect to external styles

Rendering components in Shadow DOM prevents style conflicts to ensure your component looks and behaves as expected. However, this also means you need to explicitly connect to external styles like site variables, inherited properties, or tag selectors.

## Adding styles to your code components

To ensure your code components are styled correctly, import your styles directly into your `*.webflow.tsx` file.

```tsx title={"Button.webflow.tsx"}
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';
import { Button } from './Button';
// import '../styles/globals.css'; // Import global styles
```


## CSS capabilities

The following table shows which CSS features work within Shadow DOM:

| Feature | Works in Shadow DOM | How to use |
|---------|-------------------|------------|
| Site variables | ✅ Yes | `var(--background-primary, fallback)` |
| Inherited properties | ✅ Yes | `font-family: inherit` |
| Tag selectors | ✅ Yes | Enable with `applyTagSelectors: true` |
| Site classes | ❌ No | Use component-specific classes |

### Site variables

Reference a site's [variables](https://help.webflow.com/hc/en-us/articles/33961268146323-Variables) in your components:

```css title={"Button.module.css"}
.button {
    color: var(--background-primary, #000);
  }
```


To get the exact variable name, click "Copy CSS" in the three-dot menu next to any variable in the Variables panel.

### Inherited properties

CSS properties set to `inherit` work across Shadow DOM boundaries. Your component inherits styles from the parent HTML element:

```css title={"Button.module.css"}
.button {
    color: var(--background-primary, #000);
    font-family: inherit;
  }
```


For example, if your component is placed inside a `<div>` with `font-family: sans-serif`, setting `font-family: inherit` in your component will use sans-serif.

### Tag selectors

[Tag selectors](https://help.webflow.com/hc/en-us/articles/33961346359699-HTML-tags) (like `h1`, `p`, `button`) defined in your site's CSS can be automatically applied to your component. Enable this with the `applyTagSelectors` option in your component definition file.

```tsx title={"Button.webflow.tsx"}
import { declareComponent } from '@webflow/react';
import { Button } from './Button';
// import '../styles/globals.css'; // Import global styles

export default declareComponent(Button, {
    name: 'Button',
    options: {
        applyTagSelectors: true,
    },
});
```


## Advanced configuration

Code components support modern CSS frameworks and libraries, but some require specific configuration for Shadow DOM compatibility. For guidance on using CSS frameworks and component libraries with code components, see the [frameworks and libraries guide](/code-components/frameworks-and-libraries).

---
title: Installation
slug: installation
description: Learn how to configure your Component Library for code components.
hidden: false
subtitle: Learn how to configure your React project for code components.
canonical-url: 'https://developers.webflow.com/code-components/installation'
---

This reference describes the configuration requirements to setup DevLink in a React project for component imports.


## Setup requirements

### Webflow CLI

Install the Webflow CLI and the necessary dependencies to import React components into Webflow:

```bash
npm i --save-dev @webflow/webflow-cli @webflow/data-types @webflow/react
```

**What you get:**
- `@webflow/webflow-cli` - CLI used to publish components to Webflow
- `@webflow/data-types` - TypeScript definitions for Webflow props
- `@webflow/react` - React utilities for code components

See the [CLI reference](/code-components/reference/cli) for publishing commands.

### `webflow.json`
The `webflow.json` file is used to configure DevLink for component imports. Use this file to define the name of your library and the components that should be included in the library. Additionally, you can specify a custom webpack configuration file to use for [bundling your components.](/code-components/bundling-and-import)

Create or update `webflow.json` in the root of your project with the following configuration:

```json title={"webflow.json"}
{
    "library": {
        "name": "<Your Library Name>",
        "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"],
        "bundleConfig": "./webpack.webflow.js"
    }
}

```


| Field | Description | Required |
|-------|-------------|----------|
| `library.name` | The name of your component library as it appears in Webflow | Yes|
| `library.components` | Glob pattern matching your component files | Yes |
| `library.bundleConfig` | Path to a custom webpack configuration file | No |

## Authentication
When importing your component library to Webflow using the `npx webflow library share` command, the Webflow CLI will prompt you to authenticate with Webflow. Once authenticated, DevLink will save the token to your `.env` file.

### Manual authentication

To manually authenticate with Webflow, run the `webflow library share` command with the `--api-token` option and include a [Workspace API token](#workspace-api-token) in the command. This is useful when sharing your component library to a different workspace.

```bash
npx webflow library share --api-token <your-api-token>
```

### Workspace API token

DevLink publishes your component library to a Webflow workspace. To publish to the correct workspace, you must provide a [workspace API token](/data/reference/authentication/workspace-token) for authentication.

<Warning title="Workspace admin required">
  You must be a Workspace Admin to create a Workspace token.
</Warning>

To get your workspace API token:

1. Open your workspace and navigate to **Apps & Integrations.**
2. In the left sidebar. Click **Manage**
3. Scroll to the bottom section labeled **Workspace API Access**
4. Click **Generate API Token** and copy the token.
5. Add the token to your `.env` file.

<Warning title="Security best practices">
  Never commit your `.env` file to version control. Be sure to add `.env` to your `.gitignore` file.
</Warning>

## Next steps

After configuration, you can:

- [Define a code component](/code-components/define-code-component)
- [Publish your library](/code-components/reference/cli)

## Related topics

- [Getting started with code components](/code-components/introduction/quick-start)
- [Webflow CLI reference](/code-components/reference/cli)
- [Workspace API token](/data/reference/authentication/workspace-token)

---
title: Define a code component
slug: define-code-component
description: Learn about the structure and purpose of code component definition files
hidden: false
max-toc-depth: 3
subtitle: 'Learn how to map React components to Webflow with component definition files. '
canonical-url: 'https://developers.webflow.com/code-components/define-code-component'
---

A code component definition is a file that tells Webflow how to use your React component on the Webflow canvas. It defines which properties designers can configure and how they’ll appear in the designer.

Every code component definition is a `.webflow.tsx` file that uses the `declareComponent` function to define the component.

<CodeBlocks>
```tsx title={"Button.webflow.tsx"}
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Button } from './Button';
// import '../styles/global.css'; // Import global styles

// Declare the component
export default declareComponent(Button, {

  // Component metadata
  name: "Button",
  description: "A button component with a text and a style variant",
  group: "Interactive",

  // Prop definitions
  props: {
    text: props.Text({
        name: "Button Text",
        defaultValue: "Click me"
    }),
    variant: props.Variant({
        name: "Style",
        options: ["primary", "secondary"],
        defaultValue: "primary"
    }),
  },
  // Optional configuration
  options: {
    applyTagSelectors: true,
  },
});
```

```tsx title={"Button.tsx"}
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  variant: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ text, variant }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type="button"
    >
      {text}
    </button>
  );
};
```

</CodeBlocks>
## File structure and naming

Code component definition files follow specific extension and naming patterns:

- **File extension**: `.webflow.tsx` or `.webflow.ts`
- **Naming pattern**: `ComponentName.webflow.tsx` (where `ComponentName` matches your React component)
- **Location**: Typically alongside your React component file

 If you have specific naming needs, you can [configure this pattern in `webflow.json`.](/code-components/installation)  It's recommended to create your code component file alongside your React component, adding `.webflow` to the name. For example, `Button.webflow.tsx` for `Button.tsx`.

<Warning title="File names are the unique identifier of your code component">

Renaming a definition file creates a new component and removes the old one from your library. If designers are already using the old component in their projects, those instances will break and need to be manually replaced.

</Warning>

## Imports
Every code component definition file needs to import your React component, Webflow functions, and any styles you want to apply to the component.

```tsx title={"Button.webflow.tsx"}
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Button } from './Button';
// import '../styles/global.css'; // Import global styles

```


<Note title="Styling components">
Code components render in Shadow DOM, encapsulating them from the rest of the page, which impacts several CSS capabilities.

 [Learn more about styling components →](/code-components/styling-components).
</Note>

## Declare component

The `declareComponent` function is used to create a code component definition. It takes two arguments:

- The React component
- An object with: Component metadata, prop definitions, and optional configuration

### Component metadata

The metadata properties define how your component appears in the Webflow designer:

```tsx title={"Button.webflow.tsx"}
import { declareComponent } from '@webflow/react';
import { Button } from './Button';
// import '../styles/global.css'; // Import global styles

// Declare the component
export default declareComponent(Button, {

  // Component metadata
  name: "Button",
  description: "A button component with a text and a style variant",
  group: "Interactive",
});
```


- **`name`**: The name designers see in the component panel
- **`description?`**: Description to provide context for the component's purpose (optional)
- **`group?`**: Organize components into groups in the component panel (optional)

### Prop definitions
The `props` object defines which properties of your React component a designer can edit in Webflow. Declare a prop for each editable property in your React component and provide metadata that will appear in the designer. To see a list of all available prop types and their configuration options, see the [prop types reference. →](/code-components/reference/prop-types)

The below examples show a React component, its corresponding code component definition file, and how it appears in Webflow.

<Tabs>

<Tab title="React component">
    This React component expects a `buttonText` property, and a `variant` property.

  ```tsx title={"Button.tsx"}
  import React from 'react';
  import styles from './Button.module.css';

  interface ButtonProps {
    text: string;
    variant: 'primary' | 'secondary';
  }

  export const Button: React.FC<ButtonProps> = ({ text, variant }) => {
    return (
      <button
        className={`${styles.button} ${styles[variant]}`}
        type="button"
      >
        {text}
      </button>
    );
  };
  ```

</Tab>

<Tab title="Code component">

  This code component definition file declares a `buttonText` and `variant` prop for the `Button` component.

  ```tsx title={"Button.webflow.tsx"}
  import { declareComponent } from '@webflow/react';
  import { props } from '@webflow/data-types';
  import { Button } from './Button';
  // import '../styles/global.css'; // Import global styles

  // Declare the component
  export default declareComponent(Button, {

    // Component metadata
    name: "Button",
    description: "A button component with a text and a style variant",
    group: "Interactive",

    // Prop definitions
    props: {
      text: props.Text({
          name: "Button Text",
          defaultValue: "Click me"
      }),
      variant: props.Variant({
          name: "Style",
          options: ["primary", "secondary"],
          defaultValue: "primary"
      }),
    },
  });
  ```


</Tab>
    <Tab title="Component in Webflow">

    Once shared with designers, the component will appear in the component panel. And can be added to a page with editable props.
            <div style={{width: "50%", margin: "0 auto"}}>
                <Frame>
                    <img src="file:a23325c6-5996-4649-a3ad-60b3c117e26d" alt="Webflow props" />
                </Frame>
            </div>
    </Tab>
</Tabs>

See more examples in the [prop types reference. →](/code-components/reference/prop-types)

### Options

The `options` object is used to configure the component for more advanced use cases. Options accepts the following properties:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `applyTagSelectors` | boolean | `false` | Whether to apply tag selectors to the component. |
| `ssr` | boolean | `true` | Whether to disable server-side rendering. |

#### Tag selectors
Styles targeting a tag selector (for example, `h1`, `p`, `button`) can be automatically provided to the Shadow DOM with the `applyTagSelectors` option. This is helpful for styling components with CSS selectors.

[See more about styling components in the styling documentation. →](/code-components/styling-components)

#### Server-side rendering (SSR)

By default, Webflow will load your component on the server. This means that the component will be rendered on the server, but the DOM will be hydrated on the client-side. This is helpful for improving the performance of your component.

You can disable this behavior by setting `ssr` to `false`.

## Best practices

<Accordion title="File naming and organization">

- **Use consistent naming**: `ComponentName.webflow.tsx` for all code component definitions
- **Keep code component definitions close**: Place `.webflow.tsx` files next to their React components

</Accordion>
<Accordion title="Component metadata">

- **Use clear names**: Make it obvious what the component does
- **Add descriptions**: Help designers understand the component's purpose
- **Group logically**: Use groups to organize components in the panel

</Accordion>
<Accordion title="Prop definitions">

- **Provide helpful defaults**: Make components work immediately when added
- **Use descriptive names**: The `name` property appears in the designer
- **Group related props**: Consider how props will appear together in the designer

</Accordion>

## Next steps

Now that you understand code component definitions, you can:

- **[Understand styling](/code-components/styling-components)** - Learn about how to style your components.
- **[Explore prop types](/code-components/reference/prop-types)** - Learn about all available prop types
- **[Configure bundling](/code-components/bundling-and-import)** - Set up your build process
- **[Importing your components](/code-components/bundling-and-import)** - Share your components with designers and other developers

---
title: Bundling and Import
slug: bundling-and-import
description: Learn how to bundle and import your React components into Webflow.
hidden: false
max-toc-depth: 2
subtitle: Learn how to bundle and import your React components into Webflow.
canonical-url: 'https://developers.webflow.com/code-components/bundling-and-import'
---

This guide covers bundling your React components and importing them to Webflow. You'll also learn how to customize the build process for your specific needs.

## Import

Import your components to Webflow using DevLink. DevLink bundles your component files and uploads them to your Workspace as a [shared library](https://help.webflow.com/hc/en-us/articles/33961343551763-Libraries).

```bash
npx webflow library share
```

### CI/CD Pipelines

For automated workflows, add the `--no-input` flag to skip interactive prompts:

```bash
npx webflow library share --no-input
```

**Important:** Add change detection to prevent inadvertently removing components:

- Compare current library state with previous import
- Only share when components have actually changed

For more options, see the [Webflow CLI reference. →](/code-components/reference/cli).


## Bundling

Webflow uses Webpack to bundle your component libraries. During this process, the bundler handles TypeScript compilation, resolves all dependencies and imports, optimizes your code for production, and generates bundles ready for import.

The default configuration handles most use cases automatically. Extend it when you need:

- **Custom CSS processing**
- **Specialized file handling** (SVG, images, fonts)
- **Build optimizations** (tree shaking, code splitting)

<Note title="Using CSS frameworks and component libraries">
If you're using a CSS framework or component library, you may need to configure your project to handle the framework's CSS. See the [frameworks and libraries guide](/code-components/frameworks-and-libraries) for more information.
</Note>

### Bundle limits
Maximum bundle size: 50MB

## Customize webpack configuration

Create a `webpack.webflow.js` file to override the default configuration. Then reference it in your `webflow.json`:

```json title={"webflow.json"}
{
    "library": {
      "name": "React Components Library",
      "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"],
      "bundleConfig": "./webpack.webflow.js"
    }
  }

```


### Debugging

#### Disable minification

For better error messages during development, disable minification:

```js title={"webpack.webflow.js"}
module.exports = {
    mode: "development",
  };

```


Or use the `--dev` flag when bundling locally:

```bash
npx webflow library bundle --public-path http://localhost:4000/ --dev
```

**Note:** `--public-path` is required for local bundling.

### CSS modules

CSS Modules scope styles by generating unique class names, preventing conflicts between components.

By default, you must use bracket notation to access CSS classes:

```tsx title={"Button.tsx"}
import * as styles from "./Button.module.css";

export const Button = (text: string) => {
    return (
        <a className={(styles as any)["my-button"]}>
            {text}
        </a>
    );
};

```


To enable dot notation, and to use the default import syntax for CSS modules, update the `css-loader` configuration:

```js title={"webpack.webflow.js"}
module.exports = {
    module: {
      // Override the existing rules to modify CSS processing
      rules: (currentRules) => {
        return currentRules.map((rule) => {
          // Find the rule that handles CSS files
          if (
            rule.test instanceof RegExp &&
            rule.test.test("test.css") &&
            Array.isArray(rule.use)
          ) {

              for (const [index, loader] of rule.use.entries()) {

              // Find the css-loader
              if (typeof loader === "object" && loader?.ident === "css-loader") {

                // Preserve existing options and add a custom configuration
                const options =
                  typeof loader.options === "object" ? loader.options : {};
                rule.use[index] = {
                  ...loader,
                  options: {
                    ...options,
                    modules: {
                      exportLocalsConvention: "as-is", // Use original class names
                      namedExport: false, // ⚠️ Allow dot notation access
                    },
                  },
                };
              }
            }
          }
          return rule;
        });
      },
    },
  };

```


## Bundle locally
To test and debug your React components locally, you can bundle your library using the Webflow CLI command.

```bash
npx webflow library bundle --public-path http://localhost:4000/
```
The public path is the URL where you can serve your bundled library. The CLI will generate a `dist` folder with your bundled library.

To inspect the final configuration being used by webpack, use the `--debug-bundler` option.
