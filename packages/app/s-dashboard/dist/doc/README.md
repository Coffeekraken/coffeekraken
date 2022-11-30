<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


    <!-- header -->
    # @coffeekraken/s-dashboard

    ###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

            <!-- shields -->
                [![size](https://shields.io/bundlephobia/min/@coffeekraken/s-dashboard?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-dashboard)
                [![downloads](https://shields.io/npm/dm/@coffeekraken/s-dashboard?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-dashboard)
                [![license](https://shields.io/npm/l/@coffeekraken/s-dashboard?style=for-the-badge)](./LICENSE)
                [![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)
            
    <!-- description -->
    Enable a nice dashboard on your website that let you check if things like core vitals, best practices, etc... are correct

    <!-- install -->
    ### Install

    ```shell
    npm i @coffeekraken/s-dashboard
    ```

<!-- body -->

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

<span class="s-typo s-typo--code">
    SDashboardSettingsInterface
</span>

<dl>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                layout             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <div class="s-pi s-pi--30 s-mbs s-mbs--40">
            <div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
        </div>
                <p class="s-typo s-typo--p s-p s-p--30">Specify the layout of the dashboard with the components you want to display in which column</p>
    </dt>
    </dl>


    <!-- license -->    
    ### License

    Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

    <!-- contact -->
    ### Contact

    Here's all the ways you can contact us listed:

        [![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
        [![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
    