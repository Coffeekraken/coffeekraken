<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-theme

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-theme?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-theme)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-theme?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-theme)
[![license](https://shields.io/npm/l/@coffeekraken/s-theme?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Central class to handle your theme in the Coffeekraken toolchain. It allows you to switch theme|variant, list available themes, etc...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-theme

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

## STheme

This class allows you to access and manipulate all theme things like accessing configurations, override some, changing theme, etc...

## Usage

Here's how to use our implementation:

```js
import __STheme from '@coffeekraken/s-theme';

// Get the current theme
const theme = __STheme.getCurrentTheme();

// apply a theme variant
__STheme.setThemeVariant('dark'); // apply dark mode

// Override a color (DOM only)
__STheme.setColor('accent', '#ff0000');

// Access a color
const color = __STheme.getColor('complementary');

// Get the current theme hash
const hash = __STheme.hash();

// remapping a color to another and get back the css vars
const vars = __STheme.remapCssColor('accent', 'error');

// loop on all the theme colors
__STheme.loopOnColors((colorObj) => {
  console.log(colorObj);
  // {
  //      name: ...
  //      schema: ...
  //      value: {}
  // }
});

// and more...

```

## API's

This package has two distinct API. One for the `browser` platform, and the other for the `node` one.

-   Check out [this doc](/api/@coffeekraken.s-theme.js.STheme) for `browser` integration
-   Check out [this doc](/api/@coffeekraken.s-theme.node.STheme) for `node` integration
-   Check out [this doc](/api/@coffeekraken.s-theme.shared.SThemeBase) for `shared` integration

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-component-utils.js.SComponentUtils)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
