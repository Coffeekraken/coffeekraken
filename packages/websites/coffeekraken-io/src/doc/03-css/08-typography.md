<!--
/**
 * @name            Typography
 * @namespace       doc.css
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / CSS           /doc/css/typography
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Typography

We call typography all the "inline" elements like `h1`, `h2`, `p`, `a`, `bold`, etc...
These elements styling are defined in your theme configuration file under the `typo` property like so:

```js
{
    themePath...: {
        typo: {
            h1: {
                'font-size': 40,
                'line-height': 1.2,
                // etc...
            }
        }
    }
}
```

Each typo elements like `h1`, `h2`, etc... are just simple javascript object that will be converted to css automatically behind the scene.

## Special properties treatment

Some properties in these objects will be proxied by the toolkit to allows internal theme value usage like `font-size` in the example above that has the value `40`. This value will be taken from the `font.size` theme configuration.

This behavior will happen to all properties supported by the [postcssSugarPlugin](/api/@coffeekraken/postcss-sugar-plugin/node/utils/jsObjectToCssProperties).

## Classes

Some classes will be generated from your theme configuration like these:

{{#each typos}}

-   **s-typo:{{@key}}**
    {{/each}}

{{/layout-doc }}
