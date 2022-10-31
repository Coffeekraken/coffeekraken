<!--
/**
 * @name            Languages
 * @namespace       doc.css
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / CSS           /doc/css/languages
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Supported languages

Out of the box, the coffeekraken development stack support these languages:

1. `CSS`: Plain old css
2. `PostCss`: PostCss with some plugins that are:
    - [@coffeekraken/s-postcss-sugar-plugin](/@coffeekraken/s-postcss-sugar-plugin/doc/readme)
    - [postcss-nested](https://github.com/postcss/postcss-nested)
    - [postcss-atroot](https://www.npmjs.com/package/postcss-atroot)
    - [postcss-extend-rule](https://github.com/csstools/postcss-extend-rule)
    - [postcss-property-lookup](https://github.com/simonsmith/postcss-property-lookup)
    - [autoprefixer](https://github.com/postcss/autoprefixer)

## @coffeekraken/s-postcss-sugar-plugin

The sugar plugin for PostCss gives you a lot of features like:

1. Access theme configuration properties like `margins`, `colors`, `paddings`, etc... using some `sugar` functions like so:
    - `color: sugar.color(main)`: Apply the main color to the text
    - `padding: sugar.padding(30)`: Apply the `30` padding
    - etc...
2. Utilities through some mixins like:
    - `@sugar.depth(30)`: Apply the depthj `30`
    - `@sugar.icon.classes(...)`: Define some icons to be used in your HTML
    - `@sugat.layout(1 2 3)`: Build some complex layouts using `css grid`.
    - etc...
3. Theming support using these mixins:
    - `@sugar.theme(dark)`: Apply the dark theme to any HTMLElement and his childs
    - `@sugar.init`: Apply some resets as well as printing the variables needed for theming
    - etc...

> More information on theming [here](/doc/css/theming).

{{/layout-doc }}
