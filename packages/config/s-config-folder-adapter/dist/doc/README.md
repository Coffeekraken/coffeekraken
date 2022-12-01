<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-config-folder-adapter

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-config-folder-adapter?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-config-folder-adapter)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-config-folder-adapter?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-config-folder-adapter)
[![license](https://shields.io/npm/l/@coffeekraken/s-config-folder-adapter?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Config folder adapter that allows you to load .config.(j|t)s files from multiple folders. This is used in the @coffeekraken/s-sugar-config package.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-config-folder-adapter

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

## SConfigFolderAdapter

This package expose a simple `SConfigFolderAdapter` class that let you load some configuration from folders that you set.
This adapter is used in the [@coffeekraken/s-sugar-config](/package/@coffeekraken/s-sugar-config/doc/readme) package.

## Features

-   Let you specify your own folders
-   Support for "scopes" in your folders
    -   Allows you to specify your folders in different scopes:
        -   `default`: Used for default configs
        -   `module`: Used for configs that came from an imported module
        -   `repo`: Used for root repo configs. In a monorepo, this will be the monorepo root
        -   `package`: `Used for root package config.
        -   `user`: Used for user configuration
    -   Each of these levels will be overrided by the level bellow it. The `user` configs will be the most strong ones
-   Let you specify a `fileName` pattern like `%name.config.js`
    -   The `%name` token will represent `storage` in the file named `storage.config.js` and will be used as config property name.
-   Let you specify a `folderName` like `sugar` that you can then use in your scopes folders paths like `/my/cool/folder/%folderName`.
-   And more...

## Usage

Here's a simple example how to use the SConfigFolderAdapter class:

```js
import __SConfigFolderAdapter from '@coffeekraken/s-config-folder-adapter';

const myFolderAdapter = new __SConfigFolderAdapter({
  configAdapter: {
    name: 'my-folder-adapter',
  },
  configFolderAdapter: {
    folderName: '.my-configs',
    fileName: '%name.config.js',
    scopes: {
      // obviously some paths here will be relative to your project...
      default: ['/where/to/find/my/default/configs/%folderName'],
      module: ['/where/to/find/my/module/configs/%folderName'],
      repo: ['/where/to/find/my/repo/configs/%folderName'],
      package: ['/where/to/find/my/package/configs/%folderName'],
      user: ['/where/to/find/my/user/configs/%folderName'],
    },
  },
});
const myConfig = new __SConfig('my-config', myFolderAdapter);

```

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-config-folder-adapter.shared.SConfigFolderAdapter)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
