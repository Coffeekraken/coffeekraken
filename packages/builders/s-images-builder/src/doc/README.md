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

## SImagesBuilder

This package expose a simple `SImagesBuilder` class that lets you build, compress, resize, etc... your images.

## Features

This builder class gives you some features like:

-   Set a target **quality**
-   Specify max **width** and **height**
-   Generate `.webp` version of each images
-   Specify multiple resolutions like `[1,2,3]` that will generate multiple files for each images
-   Specify specific parameters for somr sub-directory, etc...
-   And more...

## Usage

To make use of this builder, you have two choices:

#### Using the `sugar` CLI

Simply call this command:

```shell
sugar images.build [arguments]
```

For arguments documentation, simple use:

```shell
sugar images.build -h
```

#### Using the API

Here's a simple usage example

```js
import __SImagesBuilder from '@coffeekraken/s-images-builder';
const builder = new __SImagesBuilder();
await builder.build({});
```

#### Build parameters

{{> interface namespace='@coffeekraken.s-images-builder.node.interface.SImagesBuilderBuildParamsInterface' }}

#### Settings

{{> interface namespace='@coffeekraken.s-images-builder.node.interface.SImagesBuilderSettingsInterface' }}

#### API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-images-builder.node.SImagesBuilder)

{{/ layout-readme }}
