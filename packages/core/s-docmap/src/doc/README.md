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

{{#> layout-readme }}

## SDocmap

This package expose a simple `SDocmap` class that let you read and generate a `docmap.json` file

## What is a docmap

A docmap is nothing more that a **json file that lists all of the documentation you can have** inside your project.

When we say "**documentation**", it means meanly "**docblocks**" that you may have written in your source files.

## Features

-   Search for files that have a `@namespace` docblock tag to list them into the generated `docmap.json` file
-   Allows you to read your `docmap.json` file
    -   It will flatten the standard `docmap.json` structure to expose only `map` and `menu` properties
    -   It will merge the extended docmaps
        -   Extended docmaps are dependencies packages with a `docmap.json` at his root
-   Use through the `sugar` CLI
-   And more...

## Usage

Here's a simple example how to use the SDocmap class:

```js
import __SDocmap from '@coffeekraken/s-docmap';
const docmap = new __SDocmap();
await docmap.build();
```

And here's how to use the docmap through the `sugar` CLI:

```shell
# generate a docmap
sugar docmap.build
# read the docmap
sugar docmap.read
```

## Settings

{{> interface namespace='@coffeekraken.s-docmap.node.interface.SDocmapSettingsInterface' }}

## Build parameters

{{> interface namespace='@coffeekraken.s-docmap.node.interface.SDocmapBuildParamsInterface' }}

## Read parameters

{{> interface namespace='@coffeekraken.s-docmap.node.interface.SDocmapReadParamsInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-docmap.node.SDocmap)

{{/ layout-readme }}
