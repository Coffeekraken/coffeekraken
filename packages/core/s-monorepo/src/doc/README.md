<!--
/**
 * @name            README
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          wip
 * @menu            Documentation           /doc/readme
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-readme }}

## SMonorepo

This package expose a simple `SMonorepo` class that allows you to perform actions on a monorepo.

## Features

-   Execute a command into all the packages of the monorepo at once
-   List all the packages of the monorepo
-   Launch a development stack to transpile `typescript` files automatically
    -   Can produce `esm` and/or `cjs` output
    -   Transpiled files are stored under `dist/pkg/%moduleSystem`
    -   Generate automatically the `exports` key in package.json
        -   For this to work, you must name your export file `exports.ts`
    -   Produce packages compatible with `require` (cjs) AND `import` (esm)
-   And more...

## Usage

You can use these features through the JS API:

```js
import __SMonorepo from '@coffeekraken/s-monorepo';
const monorepo = new __SMonorepo();
const result = await monorepo.list();
```

Or Using the `sugar` CLI:

```shell
# run a command in each repos
sugar monorepo.run "ls -la"
# List all the repos
sugar monorepo.list
```

## Settings

{{> interface namespace='@coffeekraken.s-monorepo.node.interface.SMonorepoSettingsInterface' }}

## Dev parameters

{{> interface namespace='@coffeekraken.s-monorepo.node.interface.SMonorepoDevParamsInterface' }}

## List parameters

{{> interface namespace='@coffeekraken.s-monorepo.node.interface.SMonorepoListParamsInterface' }}

## Run parameters

{{> interface namespace='@coffeekraken.s-monorepo.node.interface.SMonorepoRunParamsInterface' }}

## Upgrade parameters

{{> interface namespace='@coffeekraken.s-monorepo.node.interface.SMonorepoUpgradeParamsInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-monorepo.node.SMonorepo)

{{/ layout-readme }}
