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

{{#> layout-readme }}

## SFaviconBuilder

This package expose a simple `SFaviconBuilder` class that lets you build all the needed favicon stuffs using the AMAZING [favicons](https://www.npmjs.com/package/favicons) package under the hood.

## Features

This builder class gives you some features like:

-   Generate all favicon images using a single source image
-   Take informations from your `package.json` for the `manifest.json` file generation

## Usage

To make use of this builder, you have two choices:

#### Using the `sugar` CLI

Simply call this command:

```shell
sugar favicon.build [arguments]
```

For arguments documentation, simple use:

```shell
sugar favicon.build -h
```

#### Using the API

Here's a simple usage example

```js
import __SFaviconBuilder from '@coffeekraken/s-favicon-builder';
const builder = new __SFaviconBuilder();
await builder.build({});
```

#### Parameters

{{> interface namespace='@coffeekraken.s-favicon-builder.node.interface.SFaviconBuilderBuildParamsInterface' }}

{{/ layout-readme }}
