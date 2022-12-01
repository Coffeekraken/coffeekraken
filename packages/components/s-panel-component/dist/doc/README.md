<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-panel-component

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-panel-component?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-panel-component)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-panel-component?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-panel-component)
[![license](https://shields.io/npm/l/@coffeekraken/s-panel-component?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Create easily nice and clean panels (modals) with this component. Support all 4 sides as well as the centered modal one, and a lot more...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-panel-component

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

## SPanelComponent

This package expose a simple `SPanelComponent` custom element that you can define and use in your pages easily.

## Features

-   Framework agnostic. Simply webcomponent.
-   Fully customizable
-   Support sides `top`, `right`, `bottom` and `left` as well as `modal`
-   Responsive props [see more](/doc/components/responsive)
-   And more...

## Usage

First, simply import and define the component in your js/ts file:

```js
import { define } from '@coffeekraken/s-panel-component';
define();

```

Make use of it in your pages:

```html
<s-panel position="top" id="simple-top-panel-open" backdrop>
  <div class="s-p s-p--50">
    <h1 class="s-typo s-typo--h1 s-mbe s-mbe--30">Hello world</h1>
    <p class="s-typo s-typo--p s-mbe s-mbe--30">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet
      lectus magna. Ut vehicula eros a sapien egestas, sed ultricies orci
      lacinia. In hac habitasse platea dictumst. Nulla metus elit, mollis at
      ante id, varius faucibus nulla. Praesent aliquam justo vel justo accumsan,
      non dictum lorem porta. Donec varius magna id semper pulvinar. Nunc
      ultrices pellentesque mollis. Mauris vestibulum justo in facilisis tempor.
      Nunc gravida dictum ex ut condimentum. Aenean sagittis dignissim semper.
    </p>
    <button
      class="s-btn s-color s-color--accent s-mie s-mie--10"
      s-panel-close="simple-top-panel-open"
    >
      Close panel
    </button>
    or click outside or use the escape key...
  </div>
</s-panel>
<button
  class="s-btn s-color s-color--complementary"
  s-panel-open="simple-top-panel-open"
>
  Open top panel
</button>

```

## Attributes

<span class="s-typo s-typo--code">
SPanelComponentInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
position             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">modal</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify the side where to display the panel. Can be "top","left","bottom" or "right"</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
active             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify the panel initial state</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
backdrop             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want an "backdrop" between the panel and your content</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
triggerer             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify a css selector that targets the elements in your UI you want to open the panel on click</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
closeOn             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify which "action(s)" close the panel. Valid values are "click" or/and "escape" or/and "event:%eventName</p>
</dt>
</dl>

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-panel-component.js.SPanelComponent)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
