<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-typescript-builder

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-typescript-builder?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-typescript-builder)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-typescript-builder?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-typescript-builder)
[![license](https://shields.io/npm/l/@coffeekraken/s-typescript-builder?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Typescript builder that let you transpile your .ts files with ease. It allows to generate multiple formats (esm,cjs) at once if needed.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-typescript-builder

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

## STypescriptBuilder

This package expose a simple `STypescriptBuilder` class that lets you build your typescript files easily.

## Features

This builder class gives you some features like:

-   Compile to multiple formats at once (esm|cjs)
-   Watch your files to compile them at save
-   Custom settings for some files/folders
-   And more...

## Usage

To make use of this builder, you have two choices:

#### Using the `sugar` CLI

Simply call this command:

```shell
sugar typescript.build [arguments]

```

For arguments documentation, simple use:

```shell
sugar typescript.build -h

```

#### Using the API

Here's a simple usage example

```js
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
const builder = new __STypescriptBuilder();
await builder.build({
  glob: '**/*.ts',
  inDir: '/absolute/path/to/the/input/directory',
  outDir: '/absolute/path/to/the/output/directory',
});

```

> Note that the `outDir` parameter supports the `%moduleSystem` and `%platform` tokens to use like `/absolute/path/%moduleSystem`.

#### Build parameters

<span class="s-typo s-typo--code">

</span>

<dl>
</dl>

#### Settings

<span class="s-typo s-typo--code">
STypescriptBuilderSettingsInterface
</span>

<dl>
</dl>

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-typescript-builder.node.STypescriptBuilder)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
