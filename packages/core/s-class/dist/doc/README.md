<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-class

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-class?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-class)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-class?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-class)
[![license](https://shields.io/npm/l/@coffeekraken/s-class?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Base class that can be (and is) used as base class for all your needs. It mainly expose the &quot;settings&quot; property which store your passed settings up from your class.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-class

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

## SClass

This package expose a simple `SClass` class that you can use as base class for yours.

## Features

-   Provide a `settings` internal property to store the one passed in the constructor
-   Provide a `metas` property to store metas informations about the class
-   Provide a `toPlainObject` method to convert you class to json
-   And more...

## Usage

## How to start using it?

Here's a simple example of how to extends the `SClass` class:

```js
import __SClass from '@coffeekraken/s-class';
class MyClass extends __SClass {
  constructor() {
    super({
      hello: 'world',
    });
    console.log(this.settings); // {hello:'world'}
  }
}

```

Alternatively, you can extend an existing class with the `SClass` like so:

```js
import __SClass from '@coffeekraken/s-class';
class MyPromise extends __SClass.extends(Promise) {
  constructor() {
    // etc...
  }
}

```

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-class.shared.SClass)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
