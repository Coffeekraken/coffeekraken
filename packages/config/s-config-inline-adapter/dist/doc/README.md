<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-config-inline-adapter

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-config-inline-adapter?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-config-inline-adapter)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-config-inline-adapter?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-config-inline-adapter)
[![license](https://shields.io/npm/l/@coffeekraken/s-config-inline-adapter?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Simple config adapter that let you pass directly an object to use as config.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-config-inline-adapter

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

## SConfigInlineAdapter

This package expose a simple `SConfigInlineAdapter` class that let you load a simple object as config.

## Features

-   Let you load a simple object as configuration.
-   Nothing more, nothing less...

## Usage

Here's a simple example how to use the SConfigInlineAdapter class:

```js
import __SConfigInlineAdapter from '@coffeekraken/s-config-folder-adapter';

const myFolderAdapter = new __SConfigInlineAdapter({
  my: 'config',
});
const myConfig = new __SConfig('my-config', myFolderAdapter);
myConfig.get('my'); // 'config'

```

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-config-inline-adapter.shared.SConfigInlineAdapter)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
