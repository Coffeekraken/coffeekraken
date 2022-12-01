<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-sugar-config

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-sugar-config?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-sugar-config)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-sugar-config?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-sugar-config)
[![license](https://shields.io/npm/l/@coffeekraken/s-sugar-config?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Powerful config management class that let you access the .config.(j|t)s files stored either at (mono)repo, package (.sugar/*) or user (.local/.sugar/*) level.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-sugar-config

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

## SSugarConfig

This package expose a simple `SSugarConfig` class that let you access the configurations from the sugar packages, as well as your own configs defined in your `.sugar` folder.

## Features

-   Work on node and in the browser
-   Based on the [@coffeekraken/s-config](/package/@coffeekraken/s-config/doc/readme) class
-   And more...

## Node usage

Using it in node is as simple as importing the class, loading the configs and access them:

```js
import __SSugarConfig from '@coffeekraken/s-sugar-config';
// loading the configs (has to be done only once per process)
await __SSugarConfig.load();
// access them
const jsDir = __SSugarConfig.get('storage.package.src.jsDir');

```

> Note that in a sugar CLI based process, the configuration loading is made for your in the CLI itself.

## Browser usage

To use the sugar configs in your browser, you MUST either use the [@coffeekraken/s-vite](/package/@coffeekraken/s-vite) build, or inject the configs by yourself in your bundle [see more](#inject-config).

The sugar config class admit that your configurations are stored under the `window.env.SUGAR.config` object.

```js
import __SSugarConfig from '@coffeekraken/s-sugar-config';
const fontawesomeConfig = __SSugarConfig.get('icons.fontawesome');

```

> Note that you can obviously choose which configurations are exposed in your frontend code. Here's a simple example:

`myConfig.config.ts`

```js
export default function (env, config) {
  if (env.platform !== 'node') return;
  return {
    myConfig: 'hello',
  };
}

```

## Inject config

If you do not use the [@coffeekraken/s-vite](/package/@coffeekraken/s-vite) build, you can inject them like so:

#### Using vite

Make use of the [@coffeekraken/s-vite-sugar-plugin](/package/@coffeekraken/s-vite-sugar-plugin) vite plugin.

#### Injecting the configuration by yourself

The configurations MUST be stored in the `window.env.SUGAR.config` object.

Here's a simple code that you can inject:

```js
if (!window.env) window.env = {};
if (!window.env.SUGAR) window.env.SUGAR = {};
window.env.SUGAR.config = JSON.parse('your configs...');

```

## API

#### Node

For more information about the Node API, please check out [the API documentation](/api/@coffeekraken.s-sugar-config.node.SSugarConfig)

#### JS

For more information about the JS API, please check out [the API documentation](/api/@coffeekraken.s-sugar-config.js.SSugarConfig)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
