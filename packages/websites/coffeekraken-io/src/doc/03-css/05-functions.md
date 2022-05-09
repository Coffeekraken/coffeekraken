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

{{#each functions}}

-   `sugar.{{this.dotPath}}(...);`
    {{/each}}

{{/layout-doc }}
