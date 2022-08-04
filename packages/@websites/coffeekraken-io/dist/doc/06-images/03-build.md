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

<!-- image -->

<!-- header -->
##### @coffeekraken/coffeekraken-io



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

# Config partial

## `@coffeekraken/s-images-builder` package

You can as well make use of our `@coffeekraken/s-images-builder` package that expose a simple builder class that you can make use of like so:

```shell
npm i @coffeekraken/s-images-builder --save-dev

```


```js
import SImagesBuilder from &#x27;@coffeekraken/s-image-builder&#x27;;
const builder &#x3D; new SImagesBuilder({
     imagesBuilder: {
         // some settings...
     }
});
await builder.build(&#x27;src /.jpg&#x27;);

```


