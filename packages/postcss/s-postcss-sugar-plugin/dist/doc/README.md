<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-postcss-sugar-plugin

[MIT](https://github.com/Coffeekraken/coffeekraken/tree/master/packages/postcss/s-postcss-sugar-plugin "@coffeekraken/s-postcss-sugar-plugin license") 2.0.0-beta.1 - [Git repository](https://github.com/Coffeekraken/coffeekraken/tree/master/packages/postcss/s-postcss-sugar-plugin "@coffeekraken/s-postcss-sugar-plugin repository")

<!-- shields -->
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-postcss-sugar-plugin?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-postcss-sugar-plugin "@coffeekraken/s-postcss-sugar-plugin downloads")
[![license](https://shields.io/npm/l/@coffeekraken/s-postcss-sugar-plugin?style=for-the-badge)](./LICENSE "@coffeekraken/s-postcss-sugar-plugin license")
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ "@coffeekraken/s-postcss-sugar-plugin discord")


<!-- description -->
Postcss Coffeekraken plugin that gives you access to a ton of sugar like &quot;@sugar.when.dark&quot;, &quot;@sugar.classes&quot;, etc... mixins as well as functions like &quot;sugar.padding&quot;, &quot;sugar.color&quot;, etc... All of these makes uses of your theme configuration defined using the @coffeekraken/s-sugar-config system.

<!-- install -->
## Install

```shell

    npm i @coffeekraken/s-postcss-sugar-plugin
    
```

<!-- body -->

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


<!-- license -->
## License

Distributed under the **MIT** License. See **[LICENSE](https://github.com/Coffeekraken/coffeekraken/tree/master/packages/postcss/s-postcss-sugar-plugin "@coffeekraken/s-postcss-sugar-plugin license")** for more information.

<!-- contact -->
## Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ "discord")
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com "email")
