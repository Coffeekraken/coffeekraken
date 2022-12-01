<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-package

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-package?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-package)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-package?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-package)
[![license](https://shields.io/npm/l/@coffeekraken/s-package?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Powerful class that let you manage your repository with features like automatically generate your &quot;exports&quot; property of the package.json depending on some &quot;exports.ts&quot; files, check that you don&#039;t have missing dependencies, and more...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-package

```

<!-- body -->

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

<span class="s-typo s-typo--code">
SPackageSettingsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
manager             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">yarn</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify th package manager to use</p>
</dt>
</dl>

## Check dependencies parameters

<span class="s-typo s-typo--code">
SPackageCheckDependenciesParamsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
dirs             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify the directories in which to check for dependencies issues, etc...</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
installMissing             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you would like to install missing dependencies.</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
packagesMap             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify some package name patterns to add in package.json without installin them. Usefull for monorepo with packages that are not published yet.</p>
</dt>
</dl>

## Exports parameters

<span class="s-typo s-typo--code">
SPackageExportsParamsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
glob             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Sppecify some globs relative to the inDir to find the files you want to exports</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
buildInitial             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to process to the export at start even with the "watch" parameter to true</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
folderModuleMap             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify some folders you want to map to a specific package type like "module" or "commonjs"</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
folderPlatformMap             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify some folders you want to map to a specific platform like "node" or "browser", etc...</p>
</dt>
</dl>

## Install parameters

<span class="s-typo s-typo--code">
SPackageInstallParamsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
manager             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">yarn</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify which package manager you want to use to install the dependencies. Can be "npm" or "yarn"</p>
</dt>
</dl>

## Add readme parameters

<span class="s-typo s-typo--code">
SPackageAddReadmeParamsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
path             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/core/s-package/README.md</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify the README.md path where to save it</p>
</dt>
</dl>

## Apply default package.json parameters

<span class="s-typo s-typo--code">
SPackageApplyDefaultPackageJsonParamsInterface
</span>

<dl>
</dl>

## Rename parameters

<span class="s-typo s-typo--code">
SPackageRenameParamsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
name             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify the new name for your package</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
folder             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify if the folder has to be renames as well</p>
</dt>
</dl>

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-package.node.SPackage)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
