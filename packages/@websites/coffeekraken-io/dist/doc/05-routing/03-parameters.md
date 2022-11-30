
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
* @name            Parameters
* @namespace       doc.routing
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Routing           /doc/routing/parameters
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Parameters

Our routing system support parameters as well. In order to use some parameters for your route, follow one of these possibilities:

## `params` object

You can specify a `params` object in your page file like so:

```js
export default {
params: {
something: true, // required param
else: false, // optional param
},
views: ['hello.hello'],
};
```

This will generate an [express route](https://expressjs.com/en/guide/routing.html) like `/:something/:else?`

## Express route notation

You can also use directly the [express route](https://expressjs.com/en/guide/routing.html) notation into your slug(s) like so:

```js
export default {
slugs: ['/:something/:else?'],
views: ['hello.hello'],
};
```

This will also generate an [express route](https://expressjs.com/en/guide/routing.html) like `/:something/:else?`

> Note that these parameter(s) will be passed to your `hello.data.js` file. Check the next chapter for more on data files.


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
