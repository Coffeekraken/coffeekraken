<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


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
* @name            Build
* @namespace       doc.css
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / CSS           /doc/css/build
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# CSS build process

The toolkit make use of the AWESOME [PostCSS](https://postcss.org/) compiler that allows us to enhance CSS using our familiar JS language.
It's fast, reliable and pleasant to work with.

## Compilation

To compile your CSS, you can simply run one of these commands in your terminal at the root of your project:

```shell
# Compile only the CSS
sugar postcss.build
# Launch the development environment with local server, CSS compilation, JS compilation, etc...
sugar dev

```

> Note that you can make use of the [@coffeekraken/s-postcss-sugar-plugin](/package/@coffeekraken/s-postcss-sugar-plugin/doc/readme) postcss plugin to use all the Coffeekraken power in standelone mode...

By default, the compiler will take the `src/css/index.css` file as input and will save the builded one to:

- `dist/css/index.css`: Production ready css
- `dist/css/index.dev.css`: Development css with docblocks, etc...

All of these configurations are specified inside the `postcssBuilder.config.ts` config file that you can override as all the others settings following the [configuration documentation](/doc/config/overview).

## Configuration

The configuration used by the `SPostcssBuilder` are these ones:

- `postcssBuilder.config.ts`: Direct builder configuration like input, output, etc...
- `postcss.config.ts`: [PostCSS](https://postcss.org) under the hood configurations
- `purgecss.config.ts`: [PurgeCSS](https://purgecss.com/) under the hood configurations


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
