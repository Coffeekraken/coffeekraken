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

## SPostcssBuilder

This package expose a simple `SPostcssBuilder` class that lets you build your postcss sources easily.

## Features

This builder class gives you some features like:

-   Build your postcss sources with all the power of the [@coffeekraken/s-postcss-sugar-plugin](/package/@coffeekraken/s-postcss-suger-plugin) plugin.
-   Build using the JS api
-   Build using the sugar CLI
-   And more...

## Usage

To make use of this builder, you have two choices:

#### Using the `sugar` CLI

Simply call this command:

```shell
sugar postcss.build [arguments]
```

For arguments documentation, simple use:

```shell
sugar postcss.build -h
```

#### Using the API

Here's a simple usage example

```js
import __SPostcssBuilder from '@coffeekraken/s-postcss-builder';
const builder = new __SPostcssBuilder();
await builder.build({
    input: '/absolute/path/to/your/css/file.css',
    output: '/absolute/path/to/your/output/css/file.css',
    // etc...
});
```

#### Build Parameters

{{> interface namespace='@coffeekraken.s-postcss-builder.node.interface.SPostcssBuilderBuildParamsInterface' }}

#### Settings

{{> interface namespace='@coffeekraken.s-postcss-builder.node.interface.SPostcssBuilderSettingsInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-postcss-builder.node.SPostcssBuilder)

{{/ layout-readme }}
