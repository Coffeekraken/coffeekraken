<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-env

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-env?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-env)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-env?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-env)
[![license](https://shields.io/npm/l/@coffeekraken/s-env?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Simple class that let you access your environment variables with ease in node as well as in the browser (window.env)

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-env

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

## SEnv

This package expose a simple `SEnv` class that let you access environment variables with ease on `node` and `js` (browser).

## Features

-   Access the `ENV` variable that describe if you are in `development`, `production`, `test`, etc...
    -   On `node` it will reflect the `process.env.NODE_ENV` variable
    -   In `browser` it will take the `document.env.ENV` variable
-   Check if the current env is `...` with the `SEnv.is('production')` static method
-   And more...

## Usage

Here's a simple example how to use the SEnv class:

```js
import __SEnv from '@coffeekraken/s-env';
__SEnv.is('production'); // false

```

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-env.shared.SEnv)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
