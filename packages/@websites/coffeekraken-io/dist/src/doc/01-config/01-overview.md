<!--
/**
 * @name            Overview
 * @namespace       doc.config
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Configuration           /doc/config/overview
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Configuration overview

All the Coffeekraken ecosystem is build on the same simple and efficient configuration principle.

> The package that correspond to this system is [@coffeekraken/s-sugar-config]/@coffeekraken/s-sugar-config/doc/readme)

This configuration system has as it's center principles these points:

#### Different "level" of configuration:

-   **default**: Configuration defined by default
-   **module**: Configuration defined by "node_modules" modules
-   **repo**: Configuration defined at the root of your repo (essentially for monorepos)
-   **package**: Configuration defined at the root of your current package
-   **user**: Configuration defined for the user only

#### Each level override the one above itself

-   The **package** level override the ones above like **repo**, **module** and **default**
-   The **user** level override the **package** level, etc...
-   I think you got the point...

#### Each configurations are simple js files:

-   Depending on the `level`, the storage path is different:
    -   **default**: `src/config/*.config.js`
    -   **module**: `node_modules/*/src/config/*.config.js`
    -   **repo/package**: `.sugar/*.config.js`
    -   **user**: `.local/.sugar/*.config.js`
-   Each file is a simple `.js` file that export a configuration object

> The configurations are accessible through the `@coffeekraken/s-sugar-config` package

## Simple package structure sample

Here's a simple package structure that integrate the configurations files.

-   Some packages defines the somePackage.config.js
    -   `node_modules`
-   User only override.
    -   `.local/.sugar/somePackage.config.js`
-   Package level override
    -   `.sugar/somePackage.config.js`

## Access your configurations

To access your configuration, simply install the `@coffeekraken/s-sugar-config` package like so:

```bash
# Using npm
npm i @coffeekraken/s-sugar-config
# Using yarn
yarn add @coffeekraken/s-sugar-config
```

Then, here's an example to access the "storage" configurations. (more on built-in configurations on the [@coffeekraken/s-sugar-config](https:/www.npmjs.com/package/@coffeekraken/s-sugar-config) package page)

```js
// import the package
import __SSugarConfig from '@coffeekraken/s-sugar-config';
// load your config (only once at start)
await __SSugarConfig.load();
// access your configurations using dot pathes like:
__SSugarConfig.get('storage.package.rootDir');
__SSugarConfig.get('storage.src.jsDir');
// etc...
```

{{/layout-doc }}
