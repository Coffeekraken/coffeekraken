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

{{#> layout-doc }}

# Routing overview

> Note that this documentation is related to the [@coffeekraken/s-frontend-server](/package/@coffeekraken/s-frontend-server/doc/README) and [@coffeekraken/s-view-renderer](/package/@coffeekraken/s-view-renderer) packages.

Coffeekraken uses simple routing strategy.

- Create a `hello.ts` file into the `src/pages/hello` folder
- Fill your file like so:

```js
export default {
  views: [
    {
      path: "hello.hello",
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
  slugs: ["/my-cool-page"],
  views: [
    {
      path: "hello.hello",
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

{{/layout-doc }}
