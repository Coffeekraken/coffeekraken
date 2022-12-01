<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-log

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-log?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-log)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-log?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-log)
[![license](https://shields.io/npm/l/@coffeekraken/s-log?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Simple base log class that mainly specify what a log object has to have like a &quot;type&quot; property. It also export a lot of static constants to make use in your code like the __SLog.TYPE_INFO, and more...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-log

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

## SLog

This package expose a simple `SLog` class that represent a log message.

## Features

-   Well defined properties like `value`, `type`, `active`, `decorators`, `time`, `timestamp`, etc...
-   Filter capabilities that specify the `active` property of each logs
-   Presets for filter like `__SLog.PRESET_ERROR`, etc...
-   And more...

## Usage

Here's a simple example how to use the SLog class:

```js
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';

// create a log instance
const log = new __SLog({
    type: __SLog.TYPE_WARN,
    value: 'Something weird happend...',
});

// or through the `SPromise` emit method
new __SPromise(({ resolve, reject, emit }) => {
    emit('log', {
        type: __SLog.TYPE_ERROR,
        value: 'Something goes wrong...',
    });
});
```

## Structure of an SLog object

```ts
export default interface ISLog {
  hash?: string;
  decorators?: boolean;
  time?: boolean;
  clear?: boolean;
  temp?: boolean;
  timestamp?: number;
  group?: string;
  margin?: Partial<ISLogMargin>;
  type?: ISLogType;
  as?: string;
  value: any;
  active?: boolean;
}

```

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-log.shared.SLog)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
