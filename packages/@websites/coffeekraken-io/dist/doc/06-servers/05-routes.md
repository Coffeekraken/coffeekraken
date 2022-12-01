<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


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
* @name            Routes
* @namespace       doc.servers
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Servers           /doc/servers/routes
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Servers routes

Routes are patterns (or simple path string) that are telling express how to handle a particular request.

You can check the [express routing documentation](https://expressjs.com/en/guide/routing.html) for more information about valid routes patterns, etc...

## Handlers

Each registered routes have to be linked to a particular [handler](/doc/servers/handlers). I let you check the documentation to register and create new handlers.

## Registering a new route

To register your own route(e), the easiest way is to register it through a module.

> To check how to register a module, check the [modules documentation page](/doc/servers/modules).

```js
export default function myModule(express, settings, config) {
  // registering a new route to use the "styleguide" handler
  config.routes['/my/route'] = {
    handler: 'styleguide',
  };
  // you can as well register route with some "glob" patterns like so:
  config.routes['/something/*'] = {
    handler: 'view',
  };
  // etc...
}

```


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
