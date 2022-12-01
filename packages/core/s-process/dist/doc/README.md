<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-process

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-process?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-process)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-process?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-process)
[![license](https://shields.io/npm/l/@coffeekraken/s-process?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Powerful and easy to use class to generate &quot;process&quot; from a function, a command, a filepath that exports a function, etc... These &quot;process&quot; are promise based and can be executed in child process if wanted.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-process

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

## SProcess

This package expose a simple `SProcess` class that allows you execute processes either in the same process, or as child one.

## Features

-   Generate a process from `file`, `command`, `function` or `SPromise`
    -   `__SProcess.from('/my/cool/file.js')`
-   States `idle`, `ready`, `running`, `killed`, `error` and `success`
-   Inter process communication (IPC)
    -   Use the [@coffeekraken/s-promise](/package/@coffeekraken/s-promise/doc/readme) event emitter capability
-   And more...

## Usage

Here's how to generate some processes and run them easily:

###### From a function

```js
import __SProcess from '@coffeekraken/s-process';

// from a simple function
const fnProcess = __SProcess.from((params) => {
  return new Promise((resolve) => {
    // do something...
    resolve();
  });
});
const result = await fnProcess.run();

```

###### From a file

```js
// /my/cool/file.js
export default function (params) {
  return new Promise((resolve) => {
    // do something
    resolve();
  });
}

import __SProcess from '@coffeekraken/s-process';
const fileProcess = __SProcess.from('/my/cool/file.js');
const result = await fileProcess.run(
  {},
  {
    runAsChild: true,
  }
);

```

###### From a command

```js
import __SProcess from '@coffeekraken/s-process';
const commandProcess = __SProcess.from('ls -la');
const result = await commandProcess.run();

```

###### From an SPromise

```js
// /my/cool/file.js
import __SPromise from '@coffeekraken/s-promise';
export default function (params) {
  return new __SPromise(({ resolve, emit }) => {
    // do something
    emit('log', {
      value: 'Hello world',
    });
    resolve();
  });
}

import __SProcess from '@coffeekraken/s-process';
const sPromiseProcess = __SProcess.from('/my/cool/file.js');
const promise = sPromiseProcess.run(
  {},
  {
    runAsChild: true,
  }
);
promise.on('log', (value) => {
  console.log('Log', value); // { value: 'Hello world' }
});
const result = await promise;

```

## Settings

<span class="s-typo s-typo--code">
SProcessSettingsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
killOnError             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to kill the process when an error occurs</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
stdio             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">inherit</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify the stdio to use for your process</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
collectStdout             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to collect the stdout of the process</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
collectStderr             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to collect the stderr of the process</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
throw             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to throw error when an error occurs</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
exitAtEnd             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to kill the process at his end</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
runAsChild             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to run your process as a child one</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
processPath             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify a path to a process file that exports a process supported type like an SProcess based class, a function, etc...</p>
</dt>
</dl>

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-process.node.SProcess)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
