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
* @name            Build
* @namespace       doc.images
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Images           /doc/images/build
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Images build process

Our images build process will take care of:

- Resizing your images
- Compressing them depending on your specified configuration
- Generating multiple version depending on your wanted resolutions `[1, 2, 3, ...]`
- Generating a `.webp` version of your images if you want so

## Sugar CLI

You can easily launch your image processing using the sugar CLI like so:

```shell
sugar images.build

```

## Under the hood

To compress, resize, etc... your images, we use the more than awesome [Sharp](https://www.npmjs.com/package/sharp) node package under the hood. We strongly encourage you to check it out if you need to do some images processing, manipulation, etc...

## Default configurations


<dl>
</dl>

## `@coffeekraken/s-images-builder` package

You can as well make use of our `@coffeekraken/s-images-builder` package that expose a simple builder class that you can make use of like so:

```shell
npm i @coffeekraken/s-images-builder --save-dev

```

```js
import SImagesBuilder from '@coffeekraken/s-image-builder';
const builder = new SImagesBuilder({
  imagesBuilder: {
    // some settings...
  },
});
await builder.build('src /.jpg');

```


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
