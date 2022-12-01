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
* @name            Built-in configs
* @namespace       doc.config
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Configuration           /doc/config/built-in
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Built-in configurations

Coffeekraken packages are coming each with their configurations that you can access, override, etc...
The easiest way to discover configurations is to take a look at the [configuration explorer](/config/explorer).

Here's some of the main available configurations just for the example:

| File                  | Dotpath                 | Description                                           |
| --------------------- | ----------------------- | ----------------------------------------------------- |
| storage.config.js     | storage.package.rootDir | The current package root path                         |
|                       | storage.src.jsDir       | The path to the javascript sources directory          |
|                       | storage.src.cssDir      | The path to the css sources directory                 |
|                       | storage.src.imgDir      | The path to the images sources directory              |
|                       | storage.dist.jsDir      | The path to the javascript distribution directory     |
|                       | ...                     | Some other configs...                                 |
| packageJson.config.js | packageJson.name        | The package name getted from the package.json file    |
|                       | packageJson.version     | The package version getted from the package.json file |
|                       | ...                     | Some other configs...                                 |

> All of these configurations are accessible from your JS as well as in your CSS through the [PostCss Sugar plugin](/package/@coffeekraken/s-postcss-sugar-plugin/doc/readme). This plugin is directly integrated into our development tools but can be installed manually as all standard [PostCss plugins](https://github.com/postcss/postcss)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
