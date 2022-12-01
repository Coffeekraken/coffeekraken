<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-feature

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-feature?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-feature)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-feature?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-feature)
[![license](https://shields.io/npm/l/@coffeekraken/s-feature?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Base class to use to create features like @coffeekraken/s-activate-feature, etc... It handle properties as well as mounting at a certain point time, default properties and more...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-feature

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

## SFeature

This package expose a simple `SFeature` class that has to be used as base class for your features like `SActivateFeature`, `SFloatingFeature`, etc...

## Features

-   Support for default props
-   Support `SInterface` props definition
-   [@coffeekraken/s-component-utils](/package/@coffeekraken/s-component-utils/doc/readme) availablwe out ob the box
-   Support defered mount using the [@coffeekraken/s-conductor](/package/@coffeekraken/s-conductor/doc/readme) package
-   Support responsive props
-   And more...

## Usage

Here's how to import and make use of this base feature class:

```js
import __SFeature from '@coffeekraken/s-feature';
export default class MyCoolFeature extends __SFeature {
  constructor(name: string, node: HTMLElement, settings?: any) {
    super(name, node, {
      ...(settings ?? {}),
    });
  }
  mount() {
    // start your feature integration here...
  }
}
export function define(
  props: Partial<ISMyCoolFeatureProps> = {},
  name = 'my-cool-feature'
) {
  __SFeature.defineFeature(name, MyCoolFeature, props);
}

```

```js
import { define } from './MyCoolFeature';
define({
  // some default props...
});

```

```html
<div my-cool-feature>Hello world</div>

```

## Properties

<span class="s-typo s-typo--code">
SComponentUtilsDefaultPropsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
id             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify an id for your component</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
status             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">pending</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify the status of the component. Can be "pending", "mounting" or "mounted"</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
mountWhen             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">direct</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify when your component will be mounted</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
adoptStyle             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify if your component adopt the style of the global DOM. This worts only if you are using a shadowRoot element</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
saveState             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to save the state of your component</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
lnf             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">default</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify the lnf (look-and-feel) of your component. This is used by the css to style your component</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
responsive             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify some responsive properties. A "media" property is required and has to be either a media query, or a media query name defined in the config.themeMedia.queries theme setting</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
prefixEvent             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want the emitted events to be prefixed by the name of the feature/component like "s-slider.change" or not</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
verbose             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want this component/feature to log informations about activity or not</p>
</dt>
</dl>

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-feature.js.SFeature)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
