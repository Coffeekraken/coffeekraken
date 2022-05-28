<!--
/**
 * @name            README
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation           /doc/readme
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-readme }}

## SDashboard

This package expose a simple `SDashboard` class that allows you to access a simple but powerfull dashboard on top of your website by using the `CTRL + s` shortcut.

This dashboard is not meant to stay on your production product but is very usefull in development process.

## Features

Here's some features that our dashboard gives you:

-   **Pages** (sitemap.xml).
    -   Search through your pages (urls, title)
    -   Quick switch from pages to pages using the `CTRL + p` shortcul
    -   And more...
-   **Google**
    -   Check and display the installed GTM id
-   **Core vitals**
    -   Execute the principal core vitals checks (LCP, FID, CLS, FCP, TTFG)
    -   Display results clearly
-   **Frontend checker**
    -   Execute some tests on you current page like:
        -   Missing metas
        -   Missing charset
        -   Duplicate ids
        -   Images alt attributes
        -   And a lot more to discover [@coffeekraken/s-frontend-checker](/package/@coffeekraken/s-frontend-checker/doc/readme)
-   **Responsive**
    -   Display the configured responsive breakpoints
-   **Project**
    -   Display all the environments on which your project runs
    -   Display links to all your env and service (admin, etc...)
    -   For each env, display the branch on which it is bound
    -   For the current env, display the last commit id and time
    -   These requires simple configurations shown bellow
-   **Quick links to browserstack**
    -   List 10 last versions by browsers

## Usage

Here's how to instanciate the dashboard on your project:

```js
import __SDashboard from '@coffeekraken/s-dashboard';
new __SDashboard();
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-dashboard.js.SDashboard)

#### Settings

{{> interface namespace='@coffeekraken.s-dashboard.js.interface.SDashboardSettingsInterface' }}

{{/ layout-readme }}
