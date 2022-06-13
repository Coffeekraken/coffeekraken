<!--
/**
 * @name            README
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          wip
 * @menu            Documentation           /doc/readme
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-readme }}

## s-postcss-sugar-plugin

This package expose a simple postcss plugin that gives you access to `mixins` and `functions` to handle things like "color management", "spaces management", "easy layout generation" and a lot more...

## Features

-   A set of `functions` and `mixins` to handle things like:
    -   **Color** management
    -   **Space** management
    -   **Fonts** management
    -   **Icons** management
    -   And a lot more... Search for `postcss` un the search input above for more.
-   Helper classes for things like:
    -   **Colors**
    -   **Spaces**
    -   **Font** size/family, etc...
    -   **Layout**
    -   **Flex**
    -   And a lot more... Search for `postcss` un the search input above for more.
-   Built-in UI elements like:
    -   **Avatar**
    -   **Badge**
    -   **Blockquote**
    -   **Button**
    -   **Dropdown**
    -   **Form**: checkbox, switch, radio, input, etc...
    -   **List**
    -   **Loader**
    -   **Tabs**
    -   **Tooltips**
    -   And a lot more... Check the **Styleguide** section for more.

## Usage

Here's how to import and make use of this plugin:

Create a `postcss.config.js` file at your project root:

> Note that is only required if you don't make use of our development stack in which all is already setup for your...

```js
module.exports = {
    plugins: [
        // make sure to add the sugar plugin at first...
        require('@coffeekraken/s-postcss-sugar-plugin'),
        require('autoprefixer'),
        require('postcss-nested'),
    ],
};
```

## Mixins

Here's the list of all the available mixins:

{{#each mixins}}

-   [`@sugar.{{this.dotCall}}(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.{{this.dotPath}})
    {{/each}}

## Functions

Here's the list of all the available functions:

{{#each functions}}

-   [`sugar.{{this.dotCall}}(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.function.{{this.dotPath}})
    {{/each}}

{{/ layout-readme }}
