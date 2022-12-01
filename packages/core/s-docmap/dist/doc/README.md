<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-docmap

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-docmap?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-docmap)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-docmap?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-docmap)
[![license](https://shields.io/npm/l/@coffeekraken/s-docmap?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Powerful class that let you generate and read docmap.json file. A docmap.json file is a &quot;directory&quot; that lists all the documentation found in your code using docblocks and the &quot;@namespace&quot; tag.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-docmap

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

## SDocmap

This package expose a simple `SDocmap` class that let you read and generate a `docmap.json` file

## What is a docmap

A docmap is nothing more that a **json file that lists all of the documentation you can have** inside your project.

When we say "**documentation**", it means meanly "**docblocks**" that you may have written in your source files.

## Features

-   Search for files that have a `@namespace` docblock tag to list them into the generated `docmap.json` file
-   Allows you to read your `docmap.json` file
    -   It will flatten the standard `docmap.json` structure to expose only `map` and `menu` properties
    -   It will merge the extended docmaps
        -   Extended docmaps are dependencies packages with a `docmap.json` at his root
-   Use through the `sugar` CLI
-   And more...

## Usage

Here's a simple example how to use the SDocmap class:

```js
import __SDocmap from '@coffeekraken/s-docmap';
const docmap = new __SDocmap();
await docmap.build();

```

And here's how to use the docmap through the `sugar` CLI:

```shell
# generate a docmap
sugar docmap.build
# read the docmap
sugar docmap.read

```

## Settings

<span class="s-typo s-typo--code">
SDocmapSettingsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
customMenu             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify some custom menu to generate for the docmap.</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
tagsProxy             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify some proxy by tags. A proxy is a function that will be called with the corresponding tag data and return new data for the docmap.json file.</p>
</dt>
</dl>

## Build parameters

<span class="s-typo s-typo--code">
SDocmapBuildParamsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
globs             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify some globs to use to search docblocks to use in docmap generation</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
exclude             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify some regexp used to exclude files from resulting docMap</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
tags             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify which docblock tags you want in your final docmap.json file</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
filters             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify some properties and regex to use to filter docblocks</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
noExtends             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to avoid searching for docmap.json files in the dependency packages</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
excludePackages             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify some package(s) name(s) (glob) to exclude</p>
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
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to save the generated file under the ```outPath

``` path</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                outPath             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <div class="s-pi s-pi--30 s-mbs s-mbs--40">
            <div class="s-typo s-typo--code">/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/core/s-docmap/docmap.json</div>
        </div>
                <p class="s-typo s-typo--p s-p s-p--30">Specify where you want to save the builded file. Usually saved in package root with the name docmap.json</p>
    </dt>
    </dl>

## Read parameters

<span class="s-typo s-typo--code">
    SDocmapReadParamsInterface
</span>

<dl>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                input             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <div class="s-pi s-pi--30 s-mbs s-mbs--40">
            <div class="s-typo s-typo--code">/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/core/s-docmap/docmap.json</div>
        </div>
                <p class="s-typo s-typo--p s-p s-p--30">Specify the input path to the docmap.json file to read</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                sort             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <div class="s-pi s-pi--30 s-mbs s-mbs--40">
            <div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
        </div>
                <p class="s-typo s-typo--p s-p s-p--30">Specify which of the docmap entries has to be sorted alphabetically.</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                sortDeep             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <div class="s-pi s-pi--30 s-mbs s-mbs--40">
            <div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
        </div>
                <p class="s-typo s-typo--p s-p s-p--30">Specify which of the docmap entries has to be sorted alphabetically AND deeply.</p>
    </dt>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                excludePackages             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <div class="s-pi s-pi--30 s-mbs s-mbs--40">
            <div class="s-typo s-typo--code">
Warning: Array to string conversion in /Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/tools/sugar/vendor/twig/twig/src/Environment.php(358) : eval()'d code on line 75
Array</div>
        </div>
                <p class="s-typo s-typo--p s-p s-p--30">Specify some package(s) name(s) (glob) to exclude</p>
    </dt>
    </dl>

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-docmap.node.SDocmap)


    <!-- license -->    
    ### License

    Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

    <!-- contact -->
    ### Contact

    Here's all the ways you can contact us listed:

        [![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
        [![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
    