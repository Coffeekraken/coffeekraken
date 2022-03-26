<!--
/**
 * @name            Register new config files
 * @namespace       doc.config
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Configuration           /doc/config/register
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Registering new config files

To register some new configuration files for your package, you just need to create a `sugar.json` file at your package root directory and specify where are stored your configuration files like so:

```json
{
    "config": {
        "folders": [
            {
                "path": "./dist/pkg/%format/config"
            }
        ]
    }
}
```

{{/layout-doc }}
