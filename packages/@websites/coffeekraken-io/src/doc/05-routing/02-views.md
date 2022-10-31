<!--
/**
 * @name            Views
 * @namespace       doc.routing
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Routing           /doc/routing/views
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Views

For now, our [@coffeekraken/s-frontend-server](/package/@coffeekraken/s-frontend-server/doc/readme) support these two views engines through the [@coffeekraken/s-view-renderer](/package/@coffeekraken/s-view-renderer/doc/readme) package:

## `blade`

Blade is the simple, yet powerful templating engine that is included with Laravel. Unlike some PHP templating engines, Blade does not restrict you from using plain PHP code in your templates. In fact, all Blade templates are compiled into plain PHP code and cached until they are modified, meaning Blade adds essentially zero overhead to your application

[More on blade](https://laravel.com/docs/9.x/blade)

## `twig`

- **Fast**: Twig compiles templates down to plain optimized PHP code. The overhead compared to regular PHP code was reduced to the very minimum.
- **Secure**: Twig has a sandbox mode to evaluate untrusted template code. This allows Twig to be used as a template language for applications where users may modify the template design.
- **Flexible**: Twig is powered by a flexible lexer and parser. This allows the developer to define its own custom tags and filters, and create its own DSL.

[More on twig](https://twig.symfony.com/)

> For more information about the [@coffeekraken/s-view-renderer](/package/@coffeekraken/s-view-renderer/doc/readme), please check his own documentation.

{{/layout-doc }}
