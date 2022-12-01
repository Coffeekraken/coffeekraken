<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-static-builder

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-static-builder?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-static-builder)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-static-builder?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-static-builder)
[![license](https://shields.io/npm/l/@coffeekraken/s-static-builder?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Simple builder that let you specify a sitemap.xml file as source, and generate a static version of the website by scraping each urls.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-static-builder

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

## SStaticBuilder

This package expose a simple `SStaticBuilder` class that lets you build a static version of your website.
This package is not intended to be used with frameworks like `nextjs`, `nuxt`, etc...

## Features

This builder class gives you some features like:

-   Take your `sitemap.xml` as source of truth
-   Scrap every url's and save the HTML file in nested folders
-   And more...

## Usage

To make use of this builder, you have two choices:

#### Using the `sugar` CLI

Simply call this command:

```shell
sugar static.build [arguments]

```

For arguments documentation, simple use:

```shell
sugar static.build -h

```

#### Using the API

Here's a simple usage example

```js
import __SStaticBuilder from '@coffeekraken/s-static-builder';
const builder = new __SStaticBuilder();
await builder.build({
  input: '/absolute/path/to/your/sitemap.xml',
  outDir: 'static',
});

```

#### Build parameters

<span class="s-typo s-typo--code">

</span>

<dl>
</dl>

#### Settings

<span class="s-typo s-typo--code">
SStaticBuilderSettingsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
input  *             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/builders/s-static-builder/src/public/sitemap.xml</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify the path to the input sitemap.xml file</p>
</dt>
</dl>

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-static-builder.node.SStaticBuilder)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
