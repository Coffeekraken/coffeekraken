<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-interface

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-interface?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-interface)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-interface?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-interface)
[![license](https://shields.io/npm/l/@coffeekraken/s-interface?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Simple but powerful class that allowa you to define a schema that an object has to follow with default values, types, etc... You can then apply this interface on your objects and get back a complient result.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-interface

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

## Define and use interfaces with ease

This package allows you to define interfaces for your objects by specifying the type you want, a description for documentation, some accepted values, if the value is required, etc...

With all of that, you will be able to make things like:

-   **Apply your interface on a simple object** and get back the final mixed values
-   Check that the passed **data are correct**
-   Get back an object with all the **default values**
-   and more...

## Usage

Here's how to use our implementation:

```js
import __SInterface from '@coffeekraken/s-interface';

class MyInterface extends __SInterface {
  static get _definition() {
    return {
      property1: {
        description: 'My cool property',
        type: 'Boolean',
        required: true,
      },
      property2: {
        description: 'My cool property',
        type: 'String',
        default: 'Hello world',
      },
    };
  }
}

// get the default values object
const defaults = MyInterface.defaults();

// apply the interface on a custom object
const finalValues = MyInterface.apply({
  property1: true,
}); // => { property1: true, property2: 'Hello world' }

// throw an error
MyInterface.apply({
  property1: 'hello',
});

```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-interface.shared.SInterface)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
