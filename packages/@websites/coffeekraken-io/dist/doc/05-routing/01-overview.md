
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
* @name            Overview
* @namespace       doc.routing
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Routing           /doc/routing/overview
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Routing overview

> Note that this documentation is related to the [@coffeekraken/s-frontend-server](/package/@coffeekraken/s-frontend-server/doc/README) and [@coffeekraken/s-view-renderer](/package/@coffeekraken/s-view-renderer) packages.

Coffeekraken uses simple routing strategy.

- Create a `hello.ts` file into the `src/pages/hello` folder
- Fill your file like so:

```js
export default {
views: [
{
path: 'hello.hello',
},
],
// works too:
// views: ['hello.hello']
};
```

- Create your view `hello.blade.php` (twig is also supported) unto the `src/views/hello` folder
- Your page will be available under `/hello` url!

> You can create nested folders to generate nested urls.

## Custom slug

Obviously, you can specify a custom slug for your page. Here's how:

```js
export default {
slugs: ['/my-cool-page'],
views: [
{
path: 'hello.hello',
},
],
// works too:
// views: ['hello.hello']
};
```

## Views

Coffeekraken has a built-in server that support multiple views types like:

- `.blade.php`
- `.twig`
- and more to come...

These views are rendered using native PHP libraries through the `@coffeekraken/s-view-renderer` package.

> For more information about the `@coffeekraken/s-view-renderer`, please check his own documentation.


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
