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
* @name            Responsive
* @namespace       doc.components
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Components           /doc/components/responsive
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Responsive

Our components are based on the [SLitComponent](/package/@coffeekraken/s-lit-component/doc/readme) class which nake uses of the [SComponentUtils](/package/@coffeekraken/s-component-utils/doc/readme) one that gives you the ability to set some **responsive properties**.

## Usage

Use with the `themeMedia.queries` configuration:

> By default, the available queries are `mobile`, `tablet`, `desktop`, `wide` and `dwarf`.

```html
<!-- using the <responsive> special tag -->
<my-cool-component title="hello">
  <responsive media="tablet" title="world"></responsive>
</my-cool-component>
<!-- passing a json with the "responsive" attribute -->
<my-cool-component
  title="hello"
  responsive='{"tablet":{"title":"world"}}'
></my-cool-component>

```

You can also specify directly a media query like this:

```html
<my-cool-component title="hello">
  <responsive media="screen and (max-width:1280px)" title="world"></responsive>
</my-cool-component>

```


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
