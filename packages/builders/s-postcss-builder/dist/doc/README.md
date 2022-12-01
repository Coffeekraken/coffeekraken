<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-postcss-builder

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-postcss-builder?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-postcss-builder)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-postcss-builder?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-postcss-builder)
[![license](https://shields.io/npm/l/@coffeekraken/s-postcss-builder?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Postcss builder that allows you to compile your css using the AMAZING postcss compiler with ease.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-postcss-builder

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
* @see         https://www.npmjs.com/package/favicons
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

## SPostcssBuilder

This package expose a simple `SPostcssBuilder` class that lets you build your postcss sources easily.

## Features

This builder class gives you some features like:

-   Build your postcss sources with all the power of the [@coffeekraken/s-postcss-sugar-plugin](/package/@coffeekraken/s-postcss-suger-plugin) plugin.
-   Build using the JS api
-   Build using the sugar CLI
-   And more...

## Usage

To make use of this builder, you have two choices:

#### Using the `sugar` CLI

Simply call this command:

```shell
sugar postcss.build [arguments]

```

For arguments documentation, simple use:

```shell
sugar postcss.build -h

```

#### Using the API

Here's a simple usage example

```js
import __SPostcssBuilder from '@coffeekraken/s-postcss-builder';
const builder = new __SPostcssBuilder();
await builder.build({
  input: '/absolute/path/to/your/css/file.css',
  output: '/absolute/path/to/your/output/css/file.css',
  // etc...
});

```

#### Build Parameters


<span class="s-typo s-typo--code">
SPostcssBuilderBuildParamsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
input  *             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/builders/s-postcss-builder/src/css/index.css</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify the input css file for your build</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
output             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/builders/s-postcss-builder/dist/css/index.css</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify the output file path you want to save your build</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
prod             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Shorthand to set a production ready build</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
minify             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to minify your output css</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
purge             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to purge your output css. See the config.purgecss configuration file for more control</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
saveDev             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to save a .dev.css file that will not be purged or minified</p>
</dt>
</dl>

#### Settings

<span class="s-typo s-typo--code">

</span>

<dl>
</dl>

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-postcss-builder.node.SPostcssBuilder)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
