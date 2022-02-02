<!--
/**
 * @name            Docmap
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Modules           /doc/modules/docmap
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# Docmap module

This docmap module is responsible of:

1. Expose all the `@menu   ...` docmap items and 
2. Export the `docmap` property to the views data
3. Render the docmap items using the `markdown` handler

> Note that you need to build your docmap.json file using the `sugar docmap.build` command in order to have your file take in consideration...

### What is a docmap item ?

A docmap item is simply a file that has been documented using the `docblock` syntax and that has:

1. A `@name` tag
2. A `@namespace` tag
3. A `@menu` tag
4. And other optional tags like `author`, `type`, etc...

Here's a small example of a docmap file that will be in:

```js
/**
 * @name        MyClass
 * @namespace   js.something
 * @menu        Documentation / Helpers       /doc/helpers/myClass
 * etc...
 */
```

### Markdown handler

The `markdown` handler is responsible to render the docmap items by transforming them into markdown, then into proper html that is sent back to the user.

[More on the markdown handler](/@coffeekraken/s-frontend-server/doc/handlers/markdown)

{{/layout-doc }}
