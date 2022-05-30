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

## SStaticBuilder

This package expose a simple `SStaticBuilder` class that lets you build a static version of your website.
This package is not intended to be used with frameworks like `nextjs`, `nuxt`, etc...

## Features

This builder class gives you some features like:

-   Take your `sitemap.xml` as source of truth
-   Scrap every url's and save the HTML file in nested folders
-   And more...

## Usage

To make use of this builder, you have two choices:

#### Using the `sugar` CLI

Simply call this command:

```shell
sugar static.build [arguments]
```

For arguments documentation, simple use:

```shell
sugar static.build -h
```

#### Using the API

Here's a simple usage example

```js
import __SStaticBuilder from '@coffeekraken/s-static-builder';
const builder = new __SStaticBuilder();
await builder.build({
    input: '/absolute/path/to/your/sitemap.xml',
    outDir: 'static',
});
```

#### Build parameters

{{> interface namespace='@coffeekraken.s-static-builder.node.interface.SStaticBuilderBuildParamsInterface' }}

#### Settings

{{> interface namespace='@coffeekraken.s-static-builder.node.interface.SStaticBuilderSettingsInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-static-builder.node.SStaticBuilder)

{{/ layout-readme }}
