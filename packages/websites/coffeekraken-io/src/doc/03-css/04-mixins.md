<!--
/**
 * @name            Mixins
 * @namespace       doc.css
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / CSS           /doc/css/mixins
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Mixins

The `postcssSugarPlugin` gives you access to a tone of useful mixins that can help you stay more coherent and clean in your css files. Here's a list of available mixins:

### Available Mixins

> Note that each mixin has his own documentation accessible by clicking or it...

{{#each mixins}}

-   [`@sugar.{{this.dotPath}}(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.{{this.dotPath}})
    {{/each}}

{{/layout-doc }}
