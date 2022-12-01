<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-event-emitter

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-event-emitter?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-event-emitter)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-event-emitter?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-event-emitter)
[![license](https://shields.io/npm/l/@coffeekraken/s-event-emitter?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Powerful event system for node that let you dispatch events, pipe them upper or to different emitters as well as subscribe to them with glob like support.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-event-emitter

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

## Simple and powerful event system for node

This package gives you access to a simple and powerful **events system** class. This events system gives you features like:

-   **Emit** events
-   **Subscribe** to events
-   **Filter** events
-   **Inter process events** using [node-ipc](https://www.npmjs.com/package/node-ipc)
-   **Pipe** events to another emitter capable instance
-   **Miniatch** event name subscription
-   And more...

## Usage

Here's how to use our implementation:

```js
import __SEventEmitter from '@coffeekraken/s-event-emitter';

const emitter1 = new __SEventEmitter();
const emitter2 = new __SEventEmitter();

// subscribe
emitter1.on('something', (data, metas) => {
    console.log(`Hello ${data} from emitter 1`);
});
emitter2.on('something', (data, metas) => {
    console.log(`Hello ${data} from emitter 2`);
});

// emit
emitter1.emit('something', 'world'); // Hello world from emitter 1

// pipe
emitter2.pipeTo(emitter1);

// emit again
emitter2.emit('something', 'else');
// Hello else from emitter 1
// Hello else from emitter 2

// minimatch event name
emitter1.on('something.*', (data, metas) => {
    console.log(`Minimatch ${data}`);
});
emitter1.emit('something.else', 'Hello'); // Minimatch Hello
emitter1.emit('other.thing', 'Plop');
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-event-emitter.shared.SInterface)

#### Settings

<span class="s-typo s-typo--code">
SEventEmitterSettingsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
asyncStart             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to start the event emitting process by yourself using the `start()` method</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
bufferTimeout             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1000</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify how many ms to wait when the emitter is started to emit the buffered events</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
defaults             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify some default object values for events. The property define the event name (of minimatch pattern) and the value is the default that will be applied at each emit</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
castByEvent             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify a class by event name in which the value will be casted automatically. For example, the "log" event value is casted into an SLog instance</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
bind             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify another object that will be used as the event emitter in the events metas. This do the same as using the `emitter.bind(...)` method</p>
</dt>
</dl>

#### Pipe settings

<span class="s-typo s-typo--code">
SEventEmitterPipeSettingsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
events             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">*</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify some events to pipe. Default it pipe everything using `*`</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
overrideEmitter             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if the emitter of the event that will be piped has to be overrided by the instance that pipe the event</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
processor             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify a function that will be called before piping the event value. If you return only 1 value, it will set the value only, otherwise you can return an object with `value` and `metas` property to update also the metas</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
exclude             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify some event(s) to not pipe at all like `resolve`, `reject`, etc...</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
filter             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify a function that will receive the value and the metas object and MUST return `true` or `false` to tell if you want to pipe this current event</p>
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
