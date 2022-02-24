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

## Build your `sitemap.xml` easily

This package allows you to build your `sitemap.xml` file depending on multiple sources like:

- `docmap`: The `docmap.json` file
- more to come...

## Usage

Here's how to use our implementation:

```js
import __SSitemapBuilder from '@coffeekraken/s-sitemap-builder';
const builder = new __SSitemapBuilder({});
await builder.build();
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-sitemap-builder.node.SSitemapBuilder)

#### Build parameters

{{> interface namespace='@coffeekraken.s-sitemap-builder.node.interface.SSitemapBuilderBuildParamsInterface' }}

#### Settings

{{> interface namespace='@coffeekraken.s-sitemap-builder.node.interface.SSitemapBuilderSettingsInterface' }}

{{/ layout-readme }}