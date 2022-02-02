<!--
/**
 * @name            View
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Modules           /doc/modules/view
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# View module

The view module is responsible of:

1. Listen for requests on `/view/...` route
2. Render the requested view using the `view` handler

### What is a view

A view is a file (blade, twig) that will need to be rendered using the proper template engine with a bunch of data provided to is.

Here's a small example to help you understand this concept:

> Note that this uses the default configurations like `config.views.rootDirs`, etc...

- Request: `/view/something/cool`
- Searched view file: `[config.views.rootDir]/something/cool.(twig|blade.php)`

### The view handler

The `view` handler is responsible of rendering the view to serve to the user.

It will do this by rendering the `something.cool` (just an example) view using the [/api/@coffeekraken.s-view-renderer.node.SViewRenderer](SViewRenderer) class.

{{/layout-doc }}
