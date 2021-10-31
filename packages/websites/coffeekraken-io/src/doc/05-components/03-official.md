<!--
/**
 * @name            Official components
 * @namespace       doc.components
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Components           /doc/components/official
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# Official components

Coffeekraken comes with everything you need to create nice and clean UI's. Here's the lists of our CSS ui's components and the list of our `web`components:

## CSS UI's

> For a more visual discovery of our UI's components, please check out our **styleguide**

{{#each docmap.map}}
{{#ifMatch @key 'css.ui'}}
{{#ifEqual (get this 'type') 'Styleguide'}}

-   [**{{this.name}}**]({{this.menu.slug}})
    -   {{this.description}}
    -   {{this.menu.tree}}
        {{/ifEqual}}
        {{/ifMatch}}
        {{/each}}

## `Web`components

> For a more visual discovery of our UI's components, please check out our **styleguide**

{{#each docmap.map}}
{{#ifEqual (get this 'type') 'CustomElement'}}

-   [**{{this.name}}**]({{this.menu.slug}})
    -   {{this.description}}
    -   {{this.menu.tree}}
        {{/ifEqual}}
        {{/each}}

{{/layout-doc }}
