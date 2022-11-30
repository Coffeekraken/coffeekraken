
<!-- header -->
# @website/coffeekraken-io

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![downloads](https://shields.io/npm/dm/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![license](https://shields.io/npm/l/@website/coffeekraken-io?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
The frontend toolkit that works for everyone. Experts, professionals and new-comers

<!-- install -->
### Install

```shell
npm i @website/coffeekraken-io
```

<!-- body -->

<!--
/**
* @name            Modules
* @namespace       doc.servers
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Servers           /doc/servers/modules
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# SFrontendServer modules

The SFrontendServer is based on the AMAZING [ExpressJs](https://expressjs.com/) server. This mean that you can extend it as you want by following these steps described bellow:

## Built-in modules

Our server comes with some built-in modules. Here's the list:


- `404`: This module handle the 404 by rendering either your 404 page configured in the pages or the default 404 page

- `publicDir`: This module allows you to serve files from the public directory

- `upload`: This module allows you to upload files to the tmp/upload directory

- `generic`: This module gives you access to the &quot;generic&quot; handler that renders dynamically views from your page config

- `docmap`: This module gives you access to a &quot;docmap&quot; object in the views

- `carpenter`: This module gives you access to a &quot;carpenter&quot; object in the views

- `redirect`: This module allows you to make redirections depending on requested path

- `config`: This module gives you access to a &quot;config&quot; and a &quot;configFiles&quot; object into the views

- `frontspec`: This module gives you access to a &quot;frontspec&quot; object into the views

## Create your module

First of all, create a file (where you want) `src/node/myModule.ts` that will be the entry point of your module.

Here's the scaffold content that you can copy and past in your file:

```js
export default function myModule(express, settings, config) {
// here you can update the config depending on the needs of your
// module, as well as access the express app instance to register routes, etc...
}
```

## Register your module

To to register your module, simply add it to the `config.frontendServer.modules` by creating a file under `.sugar/frontendServer.config.ts` like this:

```js
export default function (env, config) {
return {
modules: {
myModule: {
path: '/absolute/path/to/your/module',
settings: {},
},
},
};
}
```

> For more information about configuring your server, check out the next doc that talk about `handlers`, `middleware` and `routes`.


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
