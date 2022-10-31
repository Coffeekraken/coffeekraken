<!--
/**
 * @name            Built-in actions
 * @namespace       doc.recipes
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Recipes           /doc/recipes/built-in-actions
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Built-in actions

Some common actions are already built-in so you can reference them inside your recipe to avoid duplication. Here's the available actions list:

{{#each config.kitchen.actions}}

-   `{{@key}}`: {{this.title}}
    {{/each}}

{{/layout-doc }}
