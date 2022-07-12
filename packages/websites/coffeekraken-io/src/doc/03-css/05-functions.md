<!--
/**
 * @name            Functions
 * @namespace       doc.css
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / CSS           /doc/css/functions
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Function

Coffeekraken gives your access to a lot of nice postcss functions to use across your codebase.

It can be to access theme values like `padding`, `margin`, etc... as well as colors, etc...

### Available functions

> Note that each mixin has his own documentation accessible by clicking or it...

{{#each functions}}

- [`sugar.{{this.dotCall}}(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.function.{{this.dotPath}})
  {{/each}}

{{/layout-doc }}
