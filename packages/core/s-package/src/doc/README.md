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

## SPackage

This package expose a simple `SPackage` class that allows you to perform actions on a package.

## Features

-   Generate automatically the `exports` field in the package.json file
    -   For this to work, you MUST name your file that exports things `exports.ts` at each code "root" like `src/js/exports.ts`, `src/node/exports.ts` and `src/shared/exports.ts`
    -   Automatic support for `esm` and `cjs` modules
-   Install dependencies through JS API
-   Check if the used dependencies in your source files are well listed in your package.json
-   Apply a default `package.json` file
-   And more...

## Usage

You can use these features through the JS API:

```js
import __SPackage from '@coffeekraken/s-package';
const package = new __SPackage();
await package.checkDependencies();
```

Or Using the `sugar` CLI:

```shell
# Check dependencies
sugar package.checkDependencies
# generate the "exports" field in package.json
sugar package.exports
# rename the package
sugar package.rename
```

## Settings

{{> interface namespace='@coffeekraken.s-package.node.interface.SPackageSettingsInterface' }}

## Check dependencies parameters

{{> interface namespace='@coffeekraken.s-package.node.interface.SPackageCheckDependenciesParamsInterface' }}

## Exports parameters

{{> interface namespace='@coffeekraken.s-package.node.interface.SPackageExportsParamsInterface' }}

## Install parameters

{{> interface namespace='@coffeekraken.s-package.node.interface.SPackageInstallParamsInterface' }}

## Add readme parameters

{{> interface namespace='@coffeekraken.s-package.node.interface.SPackageAddReadmeParamsInterface' }}

## Apply default package.json parameters

{{> interface namespace='@coffeekraken.s-package.node.interface.SPackageApplyDefaultPackageJsonParamsInterface' }}

## Rename parameters

{{> interface namespace='@coffeekraken.s-package.node.interface.SPackageRenameParamsInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-package.node.SPackage)

{{/ layout-readme }}
