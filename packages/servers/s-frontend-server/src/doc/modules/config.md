<!--
/**
 * @name            Config
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Modules           /doc/modules/config
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# Config module

This docmap module is responsible of:

1. Expose the `config` property into the views
2. Expose the `configFiles` property into the views
3. Expose the `requestedConfig` property into the views when the route point to a `something.config.js` file

### What is a config?

When we talk about configs, we talk about configuration files that are accessible through the [SSugarConfig](/api/@coffeekraken.s-sugar-config.node.SSugarConfig) class.

A lot a configuration files are built-in the Coffeekraken ecosystem but you can override any config and create you own as well...

[More on SSugarConfig](/@coffeekraken/s-sugar-config/doc/readme)

{{/layout-doc }}
