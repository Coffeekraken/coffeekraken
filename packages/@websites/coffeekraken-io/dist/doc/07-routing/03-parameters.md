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

{{#> layout-doc }}

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
  views: ["hello.hello"],
};
```

This will generate an [express route](https://expressjs.com/en/guide/routing.html) like `/:something/:else?`

## Express route notation

You can also use directly the [express route](https://expressjs.com/en/guide/routing.html) notation into your slug(s) like so:

```js
export default {
  slugs: ["/:something/:else?"],
  views: ["hello.hello"],
};
```

This will also generate an [express route](https://expressjs.com/en/guide/routing.html) like `/:something/:else?`

> Note that these parameter(s) will be passed to your `hello.data.js` file. Check the next chapter for more on data files.

{{/layout-doc }}
