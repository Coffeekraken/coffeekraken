<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-conductor

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-conductor?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-conductor)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-conductor?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-conductor)
[![license](https://shields.io/npm/l/@coffeekraken/s-conductor?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Class that let you register things to do at a certain point in time. It can be &quot;inViewport&quot;, &quot;nearViewport&quot;, &quot;visible&quot;, and more...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-conductor

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

## SConductor

This `SConductor` class allows you to execute code only when some "events" occurs on a particular HTMLElement or more widely like when stylesheet(s) are loaded, etc...
Here's some of the features available:

-   **direct**: Execute directly the task
-   **inViewport**: Execute when the element **enter the viewport**
-   **nearViewport**: Execute when the element is **near the viewport**
-   **outOfViewport**: Execute when the element go **out of the viewport**
-   **interact**: Execute when the user has interact with the element like **mouseover**, **mouseout**, **click**, **focus**, etc...
-   **domReady**: Execute when the dom is ready
-   **stylesheetsReady**: Execute when all the stylesheets are ready or a stylesheet in particular
-   **idle**: Execute when no other task is running

## Usage

Here's how to use our implementation:

```js
import __SConductor from '@coffeekraken/s-conductor';
// setup the conductor
__SConductor.setup({
  log: true, // log a small analyze of your SConductor execution
});
// using promises
await __SConductor.when($myElement, 'inViewport');
// Global "event"
await __SConductor.when(null, 'domReady');

```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-conductor.js.SConductor)

#### Settings

<span class="s-typo s-typo--code">
SConductorSettingsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
idleTimeout             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">5000</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify after how many milliseconds of inactity the SConductor has to be considered as idle </p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
logTimeout             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">2000</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify after how many milliseconds of inactity the SConductor has to log the small analysis</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
log             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to log the small analysis when the SConductor is idle</p>
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
