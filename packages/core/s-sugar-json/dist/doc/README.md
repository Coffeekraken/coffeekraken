<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-sugar-json

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-sugar-json?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-sugar-json)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-sugar-json?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-sugar-json)
[![license](https://shields.io/npm/l/@coffeekraken/s-sugar-json?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Simple class that let you list and read sugar.json files. A sugar.json file is more or less the configuration you want to apply in your project regarding the Coffeekraken toolchain...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-sugar-json

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

## Work with `sugar.json` files

This package allows you to access to `sugar.json` file(s) with ease.

## Usage

Here's how to use our implementation:

```js
import __SSugarJson from '@coffeekraken/s-sugar-json';
const sugarJson = new __SSugarJson({});
const filesContents = await sugarJson.read();
const current = await sugarJson.current();
const files = await sugarJson.search();

```

## Settings

<span class="s-typo s-typo--code">
SSugarJsonSettingsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
packages             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify an array of packages names in which to search for sugar.json file</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
includePackage             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify if the current package has to be included in the search</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
includeModules             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify if the current package "node_modules" folder has to be included in the search</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
includeGlobal             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify if the global "node_modules" folder has to be included in the search</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
includeTop             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify if the root package folder in case of a mono-repo has to be included in the search</p>
</dt>
</dl>

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-sugar-json.node.SSugarJson)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
