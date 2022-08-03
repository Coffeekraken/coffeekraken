<!--
/**
 * @name            Packages
 * @namespace       doc.js
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / JS - Node           /doc/js/packages
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Packages

Coffeekraken is structured using packages. Each package has his own purpose and can be used alone if needed.

Here's a none-exhaustive list of our packages:

> For more information about our packages, please read each `README` either on bottom of the side navigation if you are on the website, or in each github repository otherwise...

#### Node

- `@coffeekraken/s-frontstack`: Handle project dev, build, etc...
- `@coffeekraken/s-images-builder`: Build images for production with ease
- `@coffeekraken/s-postcss-builder`: Build your css with ease using postcss and pre-built plugins
- `@coffeekraken/s-postcss-sugar-plugin`: Sugar plugin for postcss that gives you access to a tone of styling features
- `@coffeekraken/s-config`: Easy and versatile configuration (files, etc...) handling
- `@coffeekraken/s-sugar-config`: Easy access to sugar configs in node and in the browser
- `@coffeekraken/s-docblock`: Read and parse docblocks with ease
- `@coffeekraken/s-view-renderer`: Renders views like `BladePHP`, `Twig`, etc... with ease
- `@coffeekraken/s-glob`: Handle and resolve globs with ease
- `@coffeekraken/sugar`: Central toolkit that provide helpers, CLI, etc...
- And more

#### JS (Dom)

- `@coffeekraken/s-date-picker-component`: Nice ans simple date picker using [Pikaday](https://github.com/Pikaday/Pikaday) under the hood
- `@coffeekraken/s-panel-component`: Easy to use (and customizable) panel components like modal, side panel, etc...
- `@coffeekraken/s-form-validate-feature`: Easy, customizable and extendable form validation solution
- And more...

#### Shared (Node/JS)

- `@coffeekraken/s-promise`: Extended `Promise` class that add event emitter capabilities
- `@coffeekraken/s-color`: Manipulate and convert colors with ease
- And more...

{{/layout-doc }}
