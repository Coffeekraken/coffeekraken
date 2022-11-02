<!--
/**
 * @name            Frontspec
 * @namespace       doc.specFiles
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Spec files           /doc/specfiles/frontspec
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# `frontspec.json`

> Spec version **1.0.0-alpha.0**

The `frontspec.json` has to live in your project root. It has as goal to describe what your project has to offers (css, js, typos, etc...), and where to find them.

This file is separated by purpose in an global object like so:

{{#each (config 'frontspec.build.sources') }} - **{{this.title}}**: {{this.description}}
{{/each}}

```js
{
    {{#each (config 'frontspec.build.sources') }}
        "{{@key}}": {},
    {{/each}}
}
```

{{#each (config 'frontspec.build.sources') }}

## {{this.title}}

{{this.description}}

```js
{{jsonStringify (frontspec @key)}}
```

{{/each}}

{{/layout-doc }}
