<!--
/**
 * @name            Styleguide
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Modules           /doc/modules/styleguide
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Styleguide module

The styleguide module is responsible of:

1. Register the `styleguide` handler in the configuration
2. Register styleguide routes using the `styleguide` defined custom menu
    - See the [SDocmap](/api/@coffeekraken.s-docmap.node.SDocmap) API for custom menu
3. Render these routes using the `styleguide` handler

### What is a styleguide docmap item

A styleguide docmap item is simpy a file that has been documented using the `docblock` syntax and that has:

1. A `@name` tag
2. A `@namespace` tag
3. A `@menu` width a url starting with `/styleguide`
    - Or: A `@styleguide` tag

Here's a small example of a docmap file that will be in the custom styleguide menu:

```js
/**
 * @name        MyClass
 * @namespace   js.something
 * @menu        Styleguide / Helpers       /styleguide/helpers
 * etc...
 */
```

### The styleguide handler

The `styleguide` handler is responsible of rendering the styleguide view to serve to the user.

It will do this by rendering the `pages.styleguide.styleguide` view using the [/api/@coffeekraken.s-view-renderer.node.SViewRenderer](SViewRenderer) class.

Make sure your current project has this view available to render it correctly...

{{/layout-doc }}
