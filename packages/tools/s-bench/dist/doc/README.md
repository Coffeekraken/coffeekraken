<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-bench

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-bench?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-bench)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-bench?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-bench)
[![license](https://shields.io/npm/l/@coffeekraken/s-bench?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Simple and pretty convinient class to make simple benches like a process duration, etc...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-bench

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

## SBench

This `SBench` class allows you to know how many time take a certain part of your processes, with a concept of "steps" to split this even more when needed. Here's the features availables:

-   Track the time used by a portion of script
-   Display a summary of tracked times
-   Split your tracked portion into "steps" for more precision
-   Let the `SBench` related statements into your code and filter out which bench(s) you want to be active and which not

## Usage

Here's how to use our implementation:

```js
import __SBench from '@coffeekraken/s-bench';
const bench = new __SBench('myCoolProcess');
// something...
bench.step('afterSomething');
// something else...
bench.end().log();

```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-bench.shared.SBench)

#### Settings

<span class="s-typo s-typo--code">
SBenchSettingsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
title             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify a title for your bench that will be used in the log</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
body             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify a body for your bench that will be used in the log</p>
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
