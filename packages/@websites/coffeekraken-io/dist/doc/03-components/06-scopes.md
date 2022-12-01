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
* @name            Scopes
* @namespace       doc.components
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Components           /doc/components/scopes
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Scopes

What are these `scopes`?

To be quick and as descriptive as possible, `scopes` are simply the whole style applied to a `button` (for example) splited into different parts.

Here's the base list of `scopes` that a component **MUST** use:

1. `bare`: This scope named `bare` represent all the structural CSS of the component. For a button, this will contain:
   - `font-size` property
   - `display` property
   - `padding` property(ies)
   - `cursor` property
   - etc...
2. `lnf`: This scope named `lnf` (look and feel) represent all the visual CSS of the component. This can be:
   - `color` property
   - `background` property
   - `border` property
   - `font-family` property
   - etc...

> With these scopes defined, you can choose if you want integrate a component with all his CSS, only the `bare` scope and apply your own visual style to it, or take only the `lnf` scope which it less meaningful alone...


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
