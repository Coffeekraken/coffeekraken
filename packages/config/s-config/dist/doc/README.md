<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-config

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-config?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-config)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-config?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-config)
[![license](https://shields.io/npm/l/@coffeekraken/s-config?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Simple and powerful config loading|management|access class. Support adapters like @coffeekraken/s-config-folder-adapter, and more...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-config

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

## SConfig

This package expose a simple `SConfig` class that can be used to create configuration systems like the [@coffeekraken/s-sugar-config](/package/@coffeekraken/s-sugar-config) package.

## Features

-   Support resolvers like `[config.storage.package.src.jsDir]` or `[theme.padding.10]`
-   Support for adapters to load configs
-   Provide simple methods like `toJson` or `toObject` to export your config easily
-   Cache support
-   And more...

## Usage

Here's a simple example how to use the SConfig class:

```js
import __SConfig from '@coffeekraken/s-config';
import __SConfigInlineAdapter from '@coffeekraken/s-config-inline-adapter';
const myConfig = new __SConfig(
  'my-config',
  new __SConfigInlineAdapter({
    hello: 'world',
    plop: '[config.hello]', // world
  })
);

```

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-config.shared.SConfig)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
