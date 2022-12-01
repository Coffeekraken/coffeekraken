<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-duration

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-duration?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-duration)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-duration?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-duration)
[![license](https://shields.io/npm/l/@coffeekraken/s-duration?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Simple class to handle duration like execute something and print out how many times it has takes.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-duration

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

## SDuration

This `SDuration` class allows you to calculate and display for example a process duration with ease. Here's some features

-   Calculate with ease durations
-   Display formated duration like `2m33s`

## Usage

Here's how to use our implementation:

```js
import __SDuration from '@coffeekraken/s-duration';

const duration = new __SDuration();

// do something here...

console.log(`This process has taken ${duration.end().formatedDuration}`);
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-duration.node.SDuration)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
