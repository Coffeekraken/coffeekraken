<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-data-file-generic

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-data-file-generic?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-data-file-generic)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-data-file-generic?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-data-file-generic)
[![license](https://shields.io/npm/l/@coffeekraken/s-data-file-generic?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Nice and easy to use class to load data from different file types like &quot;JSON&quot;, &quot;JS&quot; or even &quot;PHP&quot;.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-data-file-generic

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

## SDataFileGeneric

This package expose a simple `SDataFileGeneric` class that allows you to load data from different file types like `js`, `json`, `php`, etc...

## Features

-   Regroup multiple data handlers to load a wide variety of file types
-   Supported file types:
    -   `.js`: A js file that export a function or directly some data
    -   `.json`: Simple json file
    -   `.php`: A php file that return some data
    -   More to come depending on needs...
-   And more...

## Usage

Here's a simple example how to use the SDataFileGeneric class:

```js
import __SDataFileGeneric from '@coffeekraken/s-data-file-generic';
const dataFromJson = await __SDataFileGeneric.load('/my/cool/file.json');
const dataFromPhp = await __SDataFileGeneric.load('/my/cool/file.php');

```

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-data-file-generic.node.SDataFileGeneric)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
