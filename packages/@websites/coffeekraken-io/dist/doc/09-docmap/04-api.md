<!--
/**
 * @name            API
 * @namespace       doc.docmap
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Docmap           /doc/docmap/api
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# SDocmap API

To access your generated docmap, you have to use the `@coffeekraken/s-docmap` package. Reading the `docmap.json` file by yourself is not a good idea cause you won't have the complete documentation directory like the dependencies documentation, etc...

Don't worry, using the `SDocmap` api is pretty straightforward.

## Reading your docmap

To read your `docmap.json` file, simply use this code:

```js
import __SDocmap from "@coffeekraken/s-docmap";
(async () => {
  const docmapInstance = new __SDocmap();
  const docmap = await docmapInstance.read();
  // do something with your docmap...
})();
```

## Read docmap structure

From the `read` method of the `SDocmap` class, you will get back an object that is structured like so:

```js
{
    map: {
        '@coffeekraken.sugar.js.dom.query.querySelectorLive': {
            // all the docblock tags for this item
        },
        // all the documentation items...
    },
    menu: {
        packages: {}, // same as "tree" but for every dependencies (packages)
        tree: {}, // menu items organized by tree
        slug: {}, // menu items listed by slug
        custom: {} // custom menu. See the @coffeekraken/s-docmap package documentation for more infos
    }
}
```

{{/layout-doc }}
