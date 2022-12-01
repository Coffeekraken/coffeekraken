<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-config-adapter

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-config-adapter?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-config-adapter)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-config-adapter?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-config-adapter)
[![license](https://shields.io/npm/l/@coffeekraken/s-config-adapter?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Base class to use to create config adapters like the @coffeekraken/s-config-folder-adapter.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-config-adapter

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

## SConfigAdapter

This package expose a simple `SConfigAdapter` class that has to be used as base when creating an [SConfig](/package/@coffeekraken/s-config/doc/readme) adapter.

## Features

-   Provide an `update` method to call when some configs has been changed.
    -   For example, the [SConfigFolderAdapter](/package/@coffeekraken/s-config-folder-adapter) call this method when a configuration file has been updated
-   And more...

## Usage

Here's a simple example how to use the SConfigAdapter class:

```js
import __SConfigAdapter from '@coffeekraken/s-config-adapter';
import type { ISConfigAdapterLoadParams } from '@coffeekraken/s-config-adapter';

class MyConfigAdapter extends __SConfigAdapter {
  constructor() {
    super({
      some: 'settings',
    });
    // listen for configuration change...
    myCoolLiteneingFunction(() => {
      // call the "update" method on the adapter
      this.update();
    });
  }
  async load(params: ISConfigAdapterLoadParams): Promise<any> {
    // load your configuration like you want....
    // return a simple configuration object
    return {
      my: 'config',
    };
  }
}
const myConfig = new __SConfig('my-config', new MyConfigAdapter());
myConfig.get('my'); // config

```

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-config-adapter.shared.SConfigAdapter)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
