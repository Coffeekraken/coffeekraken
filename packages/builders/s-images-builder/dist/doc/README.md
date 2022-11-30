<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


    <!-- header -->
    # @coffeekraken/s-images-builder

    ###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

            <!-- shields -->
                [![size](https://shields.io/bundlephobia/min/@coffeekraken/s-images-builder?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-images-builder)
                [![downloads](https://shields.io/npm/dm/@coffeekraken/s-images-builder?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-images-builder)
                [![license](https://shields.io/npm/l/@coffeekraken/s-images-builder?style=for-the-badge)](./LICENSE)
                [![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)
            
    <!-- description -->
    Images builder that let you compress and create multiple versions of your images with ease. Support webp generation.

    <!-- install -->
    ### Install

    ```shell
    npm i @coffeekraken/s-images-builder
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
 * @see         https://www.npmjs.com/package/favicons
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

## SImagesBuilder

This package expose a simple `SImagesBuilder` class that lets you build, compress, resize, etc... your images.

## Features

This builder class gives you some features like:

-   Set a target **quality**
-   Specify max **width** and **height**
-   Generate `.webp` version of each images
-   Specify multiple resolutions like `[1,2,3]` that will generate multiple files for each images
-   Specify specific parameters for somr sub-directory, etc...
-   And more...

## Usage

To make use of this builder, you have two choices:

#### Using the `sugar` CLI

Simply call this command:

```shell
sugar images.build [arguments]
```

For arguments documentation, simple use:

```shell
sugar images.build -h
```

#### Using the API

Here's a simple usage example

```js
import __SImagesBuilder from '@coffeekraken/s-images-builder';
const builder = new __SImagesBuilder();
await builder.build({});
```

#### Build parameters

#### Settings

<span class="s-typo s-typo--code">
    SImagesBuilderSettingsInterface
</span>

<dl>
        <dt class="s-font s-font--40 s-mbe s-mbe--30">
        <header class="s-flex s-bg s-bg--main-surface s-radius">
            <div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
                resolveGlob             </div>
            <div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
        </header>
                <p class="s-typo s-typo--p s-p s-p--30">Specify some settings to use for the [resolveGlob function](/api/@coffeekraken.sugar.node.glob.resolveGlob)</p>
    </dt>
    </dl>

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-images-builder.node.SImagesBuilder)


    <!-- license -->    
    ### License

    Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

    <!-- contact -->
    ### Contact

    Here's all the ways you can contact us listed:

        [![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
        [![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
    