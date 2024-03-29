<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-clipboard-copy-component

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-clipboard-copy-component?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-clipboard-copy-component)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-clipboard-copy-component?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-clipboard-copy-component)
[![license](https://shields.io/npm/l/@coffeekraken/s-clipboard-copy-component?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Simple copy to clipboard component that let you specify with ease a target to use for copy like an input, textarea, etc...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-clipboard-copy-component

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

## SClipboardCopyComponent

This package expose a simple `SClipboardCopyComponent` custom element that you can define and use in your pages easily.

## Features

-   Framework agnostic. Simply webcomponent.
-   Set a "from" target that will be copied in the clipboard on click
-   Default icons for "copy", "copied", and "error"
-   Responsive props [see more](/doc/components/responsive)
-   And more...

## Usage

First, simply import and define the component in your js/ts file:

```js
import { define } from '@coffeekraken/s-clipboard-copy-component';
define();

```

Make use of it in your pages:

```html
<input type="text" value="Hello world" id="my-input" />
<s-clipboard-copy from="my-input"></s-clipboard-copy>

```

## Attributes

<span class="s-typo s-typo--code">
SClipboardCopyComponentInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
from             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify the element you want to copy from with a simple css selector. Try to get "value" first, then "innerHTML"</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
successTimeout             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1500</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify the duration for displaying the "success" icon</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
errorTimeout             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">3000</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify the duration for displaying the "error" icon</p>
</dt>
</dl>

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-clipboard-copy-component.js.SClipboardCopyComponent)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
