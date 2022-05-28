<!--
/**
 * @name            README
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation           /doc/readme
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-readme }}

## Build markdown files using Handlebars

This `SMarkdownBuilder` package allows you to easily build markdown files using the nice [handlebars](https://handlebarsjs.com/) template engine.

-   Access some useful data like:
    -   `config`: The entire [SSugarConfig](/package/@coffeekraken/s-sugar-config) configuration object
    -   `flatConfig`: Same as `config` but flatten
    -   `settings`: The markdown builder settings used to build your markdown file
    -   `params`: The markdown builder `build` parameters
    -   `packageJson`: The package.json object
    -   `docmap`: The [SDocmap](/package/@coffeekraken/s-docmap) object
    -   `ck`: The coffeekraken metas grabed using the [getCoffeekrakenMetas](/api/@coffeekraken.sugar.node.coffeekraken.getCoffeekrakenMetas) function
    -   `time`: A simple time object with `year`, `month` and `day` values
-   Access to all the [@coffeekraken/s-handlebars](/packages/@coffeekraken/s-handlebars) helpers
-   And more...

## Usage

Here's how to use our implementation:

```js
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
const builder = new __SMarkdownBuilder();

// Using globs
await builder.build({
    glob: '**/*.md',
    inDir: '/my/cool/inputDirectory',
    outDir: '/my/cool/outputDirectory',
});

// A specific file
await builder.build({
    inPath: '/my/cool/file.md',
    outPath: '/my/cool/build.md',
});

// Raw value
await builder.build({
    inRaw: '# Hello {{packageJson.name}}',
    outPath: '/my/cool/build.md',
});
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-markdown-builder.node.SMarkdownBuilder)

#### Build parameters

{{> interface namespace='@coffeekraken.s-markdown-builder.node.interface.SMarkdownBuilderBuildParamsInterface' }}

{{/ layout-readme }}
