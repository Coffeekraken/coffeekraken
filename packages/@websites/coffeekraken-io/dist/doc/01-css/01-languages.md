
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
* @name            Languages
* @namespace       doc.css
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / CSS           /doc/css/languages
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Supported languages

Out of the box, the coffeekraken development stack support these languages:

1. `CSS`: Plain old css
2. `PostCss`: PostCss with some plugins that are:
- [@coffeekraken/s-postcss-sugar-plugin](/@coffeekraken/s-postcss-sugar-plugin/doc/readme)
- [postcss-nested](https://github.com/postcss/postcss-nested)
- [postcss-atroot](https://www.npmjs.com/package/postcss-atroot)
- [postcss-extend-rule](https://github.com/csstools/postcss-extend-rule)
- [postcss-property-lookup](https://github.com/simonsmith/postcss-property-lookup)
- [autoprefixer](https://github.com/postcss/autoprefixer)

## @coffeekraken/s-postcss-sugar-plugin

The sugar plugin for PostCss gives you a lot of features like:

1. Access theme configuration properties like `margins`, `colors`, `paddings`, etc... using some `sugar` functions like so:
- `color: sugar.color(main)`: Apply the main color to the text
- `padding: sugar.padding(30)`: Apply the `30` padding
- etc...
2. Utilities through some mixins like:
- `@sugar.depth(30)`: Apply the depthj `30`
- `@sugar.icon.classes(...)`: Define some icons to be used in your HTML
- `@sugat.layout(1 2 3)`: Build some complex layouts using `css grid`.
- etc...
3. Theming support using these mixins:
- `@sugar.theme(dark)`: Apply the dark theme to any HTMLElement and his childs
- `@sugar.init`: Apply some resets as well as printing the variables needed for theming
- etc...

> More information on theming [here](/doc/css/theming).


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
