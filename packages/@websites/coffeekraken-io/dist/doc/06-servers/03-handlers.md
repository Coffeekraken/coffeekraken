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
* @name            Handlers
* @namespace       doc.servers
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Servers           /doc/servers/handlers
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# SFrontendServer handlers

Handlers are `controllers` for specific routes. This mean that when you call for example the route `/something/cool`, you must have an handler registered to take care of this request.

## Registering your own handler

To register your own handler, the easiest way is to register it through a module.

> To check how to register a module, check the [modules documentation page](/doc/servers/modules).

```js
export default function myModule(express, settings, config) {
  // register your handler
  config.handlers.myHandler = {
    path: `/absolute/path/to/my/handler`,
  };

  // register some routes that will use this handler
  config.routes['/myHandler/*'] = {
    handler: 'myHandler',
  };
}
```

## Handler scaffold

Here's some base code that you can use for your handler:

```js
export default function myHandler(req, res, settings = {}) {
  return new Promise(async (resolve, reject) => {
    // do something neat for your handler...

    // send result to the client
    res.status(200);
    res.type('text/html');
    res.send(pageHtml.value);
    resolve(pageHtml.value);
  });
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
