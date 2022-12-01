<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-stdio

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-stdio?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-stdio)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-stdio?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-stdio)
[![license](https://shields.io/npm/l/@coffeekraken/s-stdio?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Clean and extensible Stdio system that make use of the @coffeekraken/s-event-emitter event system to listen to &quot;log&quot; or &quot;ask&quot; events and display them nicely with our built-in terminal implementation or anywhere else if you extends it.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-stdio

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

## Easy and powerful IO interface

This package allows you to display processes/webpages logs with ease.
Here's some of the features available:

-   `SBasicStdio`: Nice IO interface for terminal
-   **Event** based log system
-   **Filtrable output** depending on log `type`
-   **Extensible** IO system for things like websockets, etc...
-   And more...

## Usage

Here's how to use our implementation:

```js
import __SStdio from '@coffeekraken/s-stdio';
import spawn from '@coffeekraken/sugar/node/process/spawn';
const proc = spawn('ls -la');
__SStdio.new(__SStdio.UI_BASIC, proc);

```

## How it works

The `SStdio` class will listen for some events `log` and `ask`. Once one of these events is triggered, the IO will either display a log, or the asked question using different implementations depending on the `SStdio` instanciated type.

The event are listened using the [SEventEmitter](/@coffeekraken/s-event-emitter/doc/readme) class.

Here's an example of emitting a log event that will be handled by the `SStdio` instance:

```js
import __SPromise from '@coffeekraken/s-promise';
import __SLog from '@coffeekraken/s-log';

export default function myProcess() {
  return new __SPromise(({ resolve, reject, emit }) => {
    // do something...
    emit('log', {
      type: __SLog.TYPE_INFO,
      value: 'Hello world from my cool process',
    });
    // do something...
    resolve();
  });
}

```

> Note that the `SPromise` class extends the `SEventEmitter` one.

## Settings

<span class="s-typo s-typo--code">
SStdioSettingsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
filter             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify a function that will be used to filter the logs. It will take the log object as parameter and MUST return a boolean.</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
processor             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify a function that will be used to process the logs. It will take the log object and MUST return it, updated or not...</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
defaultLogObj             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify a default log object that will be used as base for each received logs</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
defaultAskObj             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify a default ask object that will be used as base for each received questions (ask)</p>
</dt>
</dl>

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-stdio.shared.SStdio)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
