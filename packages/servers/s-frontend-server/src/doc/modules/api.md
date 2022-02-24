<!--
/**
 * @name            Api
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Modules           /doc/modules/api
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Api module

This api module is responsible of:

1. Register `/api/{namespace}` routes for all of the `docmap` items
2. Render these routes using the `api` handler

### What is a docmap item ?

A docmap item is simply a file that has been documented using the `docblock` syntax and that has:

1. A `@name` tag
2. A `@namespace` tag
4. And other optional tags like `author`, `type`, etc...

Here's a small example of a docmap file that will be in:

```js
/**
 * @name        MyClass
 * @namespace   js.something
 * etc...
 */
```

### Api handler

The `api` handler is responsible of rendering the docmap items view to serve to the user.

It will do this by rendering the `pages.api.api` view using the [/api/@coffeekraken.s-view-renderer.node.SViewRenderer](SViewRenderer) class.

Make sure your current project has this view available to render it correctly...

{{/layout-doc }}
