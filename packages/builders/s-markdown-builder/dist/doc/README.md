<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


    <!-- header -->
    # @coffeekraken/s-markdown-builder

    ###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

            <!-- shields -->
                [![size](https://shields.io/bundlephobia/min/@coffeekraken/s-markdown-builder?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-markdown-builder)
                [![downloads](https://shields.io/npm/dm/@coffeekraken/s-markdown-builder?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-markdown-builder)
                [![license](https://shields.io/npm/l/@coffeekraken/s-markdown-builder?style=for-the-badge)](./LICENSE)
                [![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)
            
    <!-- description -->
    Markdown builder that let you use the AMAZING handlebars.js syntax to generate your final markdown files.

    <!-- install -->
    ### Install

    ```shell
    npm i @coffeekraken/s-markdown-builder
    ```

<!-- body -->

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
    inRaw: '# Hello @coffeekraken/s-markdown-builder',
    outPath: '/my/cool/build.md',
});
```

## API

For more information about the API of this class, please check [our API documentation](/api/@coffeekraken.s-markdown-builder.node.SMarkdownBuilder)

#### Build parameters

<span class="s-typo s-typo--code">
    SMarkdownBuilderBuildParamsInterface
</span>

<dl>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                glob  *             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <div class="s-pi s-pi--30 s-mbs s-mbs--40">
            <div class="s-typo s-typo--code">**/+(README|LICENSE|*.md)</div>
        </div>
                <p class="s-typo s-typo--p s-p s-p--30">Specify a glob pattern to target all the markdown files you want to build. This is relative the the "inDir" parameter</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                inDir  *             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <div class="s-pi s-pi--30 s-mbs s-mbs--40">
            <div class="s-typo s-typo--code">/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/builders/s-markdown-builder/src</div>
        </div>
                <p class="s-typo s-typo--p s-p s-p--30">Specify the input directory where your source files are standing</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                inPath             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <p class="s-typo s-typo--p s-p s-p--30">Specify a direct path to a markdown file to build</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                inRaw             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <p class="s-typo s-typo--p s-p s-p--30">Specify a raw markkdown string to build</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                outDir             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <div class="s-pi s-pi--30 s-mbs s-mbs--40">
            <div class="s-typo s-typo--code">/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/builders/s-markdown-builder/dist</div>
        </div>
                <p class="s-typo s-typo--p s-p s-p--30">Specify the directory where you want to save your builded files</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                outPath             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <p class="s-typo s-typo--p s-p s-p--30">Specify a path to the output file when you make use of the "inPath" parameter</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                data             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <p class="s-typo s-typo--p s-p s-p--30">Pass some data to be used in the view</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                save             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <div class="s-pi s-pi--30 s-mbs s-mbs--40">
            <div class="s-typo s-typo--code">1</div>
        </div>
                <p class="s-typo s-typo--p s-p s-p--30">Specify if you want to save the builded files or not</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                target             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <div class="s-pi s-pi--30 s-mbs s-mbs--40">
            <div class="s-typo s-typo--code">markdown</div>
        </div>
                <p class="s-typo s-typo--p s-p s-p--30">Specify the target format of the build. Supported values are "html" and "markdown"</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                preset             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <p class="s-typo s-typo--p s-p s-p--30">Specify some preset(s) to use for your build. Presets are defined in the config.markdownBuilder.presets configuration path</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                protectedTags             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <div class="s-pi s-pi--30 s-mbs s-mbs--40">
            <div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
        </div>
                <p class="s-typo s-typo--p s-p s-p--30">Specify some tags that should be protected from the markdown transformations like "template" or "code"...</p>
    </dt>
    </dl>


    <!-- license -->    
    ### License

    Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

    <!-- contact -->
    ### Contact

    Here's all the ways you can contact us listed:

        [![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
        [![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
    