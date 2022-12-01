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
* @name            Data
* @namespace       doc.routing
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Routing           /doc/routing/data
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Data

To render a view, you certainly need some data. This is handled by the `%viewName.data.js` files.

#### Supported data file types

For now, your can use these formats:

- `filename.data.json`
- `filename.data.js`
- `filename.data.php`

> These data files are handled under the hood by the [@coffeekraken/s-data-handler-generic](/package/@coffeekraken/s-data-handler-generic/doc/readme) package.

## Simple example

Assume that you have a view stored here: `src/views/hello/hello.blade.php` (it can be a twig as well).

Let's create a new `src/views/hello/hello.data.js` file with this content:

```js
export default async function ({ req, res, pageConfig }) {
  // return variables to our view
  return {
    hello: 'world',
  };
}

```

This will provide the `hello` variable to your view. You can use it like so:

```html
<h1>&lcub;&lcub; $hello &rcub;&rcub;</h1>

```

## Passing parameters

To access your parameters from your `.data.js` file, assume we have this page configuration:

```js
export default {
  params: {
    something: true, // required param
    else: false, // optional param
  },
  views: ['hello.hello'],
};

```

Assume we access our page with this url: `/hello/coco/world`

In your newly created `src/views/hello/hello.data.js` data file, access your parameters like so:

```js
export default async function ({ req, res, pageConfig }) {
  // log our parameters
  console.log(res.params); // { something: 'coco', else: 'world' }
  // return variables to our view
  return {
    hello: req.params.something,
  };
}

```

From this point, you can handle pretty much all your data needs.

- **Async functions** are supported as well

> Data files can be in `.data.js` as well as `.data.json` and `.data.php` formats.


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
