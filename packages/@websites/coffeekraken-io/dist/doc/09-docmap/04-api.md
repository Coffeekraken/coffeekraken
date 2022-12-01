<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @website/coffeekraken-io

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![downloads](https://shields.io/npm/dm/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![license](https://shields.io/npm/l/@website/coffeekraken-io?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
The frontend toolkit that works for everyone. Experts, professionals and new-comers

<!-- install -->
### Install

```shell
npm i @website/coffeekraken-io

```

<!-- body -->

<!--
/**
* @name            API
* @namespace       doc.docmap
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Docmap           /doc/docmap/api
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# SDocmap API

To access your generated docmap, you have to use the `@coffeekraken/s-docmap` package. Reading the `docmap.json` file by yourself is not a good idea cause you won't have the complete documentation directory like the dependencies documentation, etc...

Don't worry, using the `SDocmap` api is pretty straightforward.

## Reading your docmap

To read your `docmap.json` file, simply use this code:

```js
import __SDocmap from '@coffeekraken/s-docmap';
(async () => {
  const docmapInstance = new __SDocmap();
  const docmap = await docmapInstance.read();
  // do something with your docmap...
})();

```

## Read docmap structure

From the `read` method of the `SDocmap` class, you will get back an object that is structured like so:

```js
export default {
  map: {
    '@coffeekraken.sugar.js.dom.query.querySelectorLive': {
      // all the docblock tags for this item
    },
    // all the documentation items...
  },
  menu: {
    packages: {}, // same as "tree" but for every dependencies (packages)
    tree: {}, // menu items organized by tree
    slug: {}, // menu items listed by slug
    custom: {}, // custom menu. See the @coffeekraken/s-docmap package documentation for more infos
  },
};

```


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
