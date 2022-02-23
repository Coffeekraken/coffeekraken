<!--
/**
 * @name            Supported languages
 * @namespace       doc.views
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Views           /doc/views/languages
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# Supported languages

For now, our `@coffeekraken/s-frontend-server` support these two languages:

## `blade`

Blade is the simple, yet powerful templating engine that is included with Laravel. Unlike some PHP templating engines, Blade does not restrict you from using plain PHP code in your templates. In fact, all Blade templates are compiled into plain PHP code and cached until they are modified, meaning Blade adds essentially zero overhead to your application

[More on blade](https://laravel.com/docs/9.x/blade)

## `twig`

- **Fast**: Twig compiles templates down to plain optimized PHP code. The overhead compared to regular PHP code was reduced to the very minimum.
- **Secure**: Twig has a sandbox mode to evaluate untrusted template code. This allows Twig to be used as a template language for applications where users may modify the template design.
- **Flexible**: Twig is powered by a flexible lexer and parser. This allows the developer to define its own custom tags and filters, and create its own DSL.

[More on twig](https://twig.symfony.com/)

{{/layout-doc }}
