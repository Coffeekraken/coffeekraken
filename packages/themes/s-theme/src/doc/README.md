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
    //      variant: ...
    //      state: ...
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

{{/ layout-readme }}
