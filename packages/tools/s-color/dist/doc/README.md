<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-color

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-color?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-color)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-color?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-color)
[![license](https://shields.io/npm/l/@coffeekraken/s-color?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Clean and powerful class to handle colors. You can convert your color in and formats, manipulate it by desaturate it or whatever as well as access each properties of the color like &quot;h&quot;, &quot;s&quot;, &quot;l&quot;, etc...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-color

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

## SColor

This `SColor` class allows you to manipulate and convert colors with ease. Here's some of the features supported:

-   Instanciate a color with any of these formats: **hex**, **hsl(a)** and **rgb(a)**
-   Get color values like **r**, **g**, **b**, **a**, **h**, **s** and **l**
-   Convert your color from and to any of these formats listed above.
-   Get back your color in any format using the `toRgbaString`, `toHexString`, etc...
-   Manipulate your color using these methods:
    -   `apply`: Apply some modifiers like "--darken 30 --alpha 0.2"
    -   `desaturate`: Desaturate your color by **x** [0,100]
    -   `saturate`: Saturate your color by **x** [0,100]
    -   `greyscale`: Transform your color to greyscale
    -   `spin`: Update the **hue** by **x** [-100,100]
    -   `darken`: Darken your color by **x** [0,100]
    -   `lighten`: Lighten your color by **x** [0,100]
    -   `invert`: Invert your color

## Usage

Here's how to use our implementation:

```js
import __SConductor from '@coffeekraken/s-color';
const color = new __SColor('#ff0000').darken(20).invert();
console.log(color.toHexString());
console.log(color.toHslString());

```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-color.shared.SColor)

#### Settings

<span class="s-typo s-typo--code">
SColorSettingsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
returnNewInstance             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if the methods returns by default a new SColor instance or the same</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
defaultFormat             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">hex</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify the default format of the color</p>
</dt>
</dl>


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
