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

## SConfig

This package expose a simple `SConfig` class that can be used to create configuration systems like the [@coffeekraken/s-sugar-config](/package/@coffeekraken/s-sugar-config) package.

## Features

-   Support resolvers like `[config.storage.package.src.jsDir]` or `[theme.padding.10]`
-   Support for adapters to load configs
-   Provide simple methods like `toJson` or `toObject` to export your config easily
-   Cache support
-   And more...

## Usage

Here's a simple example how to use the SConfig class:

```js
import __SConfig from '@coffeekraken/s-config';
import __SConfigInlineAdapter from '@coffeekraken/s-config-inline-adapter';
const myConfig = new __SConfig(
    'my-config',
    new __SConfigInlineAdapter({
        hello: 'world',
        plop: '[config.hello]', // world
    }),
);
```

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-config.shared.SConfig)

{{/ layout-readme }}
