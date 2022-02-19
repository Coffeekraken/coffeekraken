<!--
/**
 * @name            Built-in configs
 * @namespace       doc.config
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Configuration           /doc/config/built-in
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# Built-in configurations

Coffeekraken packages are coming each with their configurations that you can access, override, etc...
The easiest way to discover configurations is to take a look at the [configuration explorer](/config/explorer).

Here's some of the main available configurations just for the example:

| File                  | Dotpath                  |  Description                                           |
| --------------------- | ------------------------ | ------------------------------------------------------ |
| storage.config.js     | storage.package.rootDir  |  The current package root path                         |
|                       | storage.src.jsDir        |  The path to the javascript sources directory          |
|                       | storage.src.cssDir          |  The path to the css sources directory                 |
|                       | storage.src.imgDir       |  The path to the images sources directory              |
|                       | storage.dist.jsDir       |  The path to the javascript distribution directory     |
|                       | ...                      |  Some other configs...                                 |
| packageJson.config.js | packageJson.name         |  The package name getted from the package.json file    |
|                       | packageJson.version      |  The package version getted from the package.json file |
|                       | ...                      |  Some other configs...                                 |

> All of these configurations are accessible from your JS as well as in your CSS through the [PostCss Sugar plugin](/@coffeekraken/s-postcss-sugar-plugin/doc/readme). This plugin is directly integrated into our development tools but can be installed manually as all standard [PostCss plugins](https://github.com/postcss/postcss)

{{/layout-doc }}
