
<!-- header -->
# @website/coffeekraken-io

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![downloads](https://shields.io/npm/dm/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![license](https://shields.io/npm/l/@website/coffeekraken-io?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
The frontend toolkit that works for everyone. Experts, professionals and new-comers

<!-- install -->
### Install

```shell
npm i @website/coffeekraken-io
```

<!-- body -->

<!--
/**
* @name            Theming
* @namespace       doc.css
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / CSS           /doc/css/theming
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

> Make sure to be confortable with the [configuration systen](/doc/config/overview) before reading this.

# Theming

Theming in Coffeekraken is a central part to help you decline your websites into themes like `dark`, `light`, and whatever you want.

## Existing themes

Some theme(s) are available out of the box. These themes (parts) are useful to avoid starting from scratch but you can of course override everything you want during your development process.

-   `theme.config.ts`: Main theme file where all the available themes are listed as well as which theme is active.
-   `themeBase.config.ts`: Main configuration file that can be used as a base for your theme to avoid rewriting everything.
-   `themeDefault.config.ts`: Define the `default` theme
-   `themeDefaultLight.config.ts`: Extends the `themeBase.config.ts` configuration and define some settings fot the default light theme.
-   `themeDefaultDark.config.ts`: Extends the `themeBase.config.ts` configuration and define some settings fot the default dark theme.

## Main entry point

Everything about theming starts with some configuration files.

The main one is the `theme.config.ts` file that looks something like this:

```js
export default function (env, config) {
return {
// Specify the theme name to use by default
theme: 'default',
// Specify the theme variant to use by default
variant: 'light',
};
}
```

This configuration assume that the theme `default` exists and has a `light` variant defined.

> Note that this `default` theme is the one used out of the box.

## Make your own

The simpliest way to theme your app/website, etc, is to update the `default-(light|dark)` theme by overriding configurations like so:

#### Updating the colors

Create a file call `.sugar/themeColor.config.ts` and update the colors like so:

```js
export default (env, config) => {
return {
// supported syntax: hex/hexa/hsl/hsla
base: '...',
main: '...',
accent: '...',
complementary: '...',
success: '...',
info: '...',
warning: '...',
error: '...',
};
};
```

#### Updating the color schemas

Create a file called `.sugar/themeColorSchema(Light|Dark).config.ts` and update the schemas like so:

```js
export default (env, config) => {
return {
text: {
darken: 20,
},
surface: {
lighten: 40,
},
};
};
```

## Defining a new theme

To define a new theme, simply create a new configuration file under `.sugar/myTheme.config.ts` with a content like so:

```js
export default function (env, config) {
return {
// specify the theme name that you will use to active it for your website
themeName: 'mytheme',
// specify some variants like dark, light, etc...
variants: {
dark: {
// specify that your theme is based on the themeDarkBase (optional)
extends: 'themeDarkBase'
// specify the transitions you want for your theme
transition: {
slow: 'all .6s easeInOut',
default: 'all .3s easeInOut',
fast: 'all .1s easeInOut',
},
// ...all the others configuration you want to override from themeDarkBase
},
light: {
// ...theme light configurations
}
},
};
}
```

> Note that the theming system is based on the [@coffeekraken/s-sugar-config](/package/@coffeekraken/s-sugar-config/doc/readme) package used across the entire echosystem...


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
