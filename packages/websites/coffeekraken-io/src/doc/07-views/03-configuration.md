<!--
/**
 * @name            Configuration
 * @namespace       doc.views
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Views           /doc/views/configuration
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Views configurations

The views are generated through our `@coffeekraken/s-view-renderer` package and served using our `@coffeekraken/s-frontendServer` package.

This mean that the configurations stands into two configuration files that you can see bellow:

## `viewRenderer.config.js`

{{> config namespace='@coffeekraken.s-view-renderer.config.viewRenderer'}}

## `frontendServer.config.js`

{{> config namespace='@coffeekraken.s-frontend-server.config.frontendServer'}}

{{/layout-doc }}
