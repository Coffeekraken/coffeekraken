<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


    <!-- header -->
    # @coffeekraken/s-builder

    ###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

            <!-- shields -->
                [![size](https://shields.io/bundlephobia/min/@coffeekraken/s-builder?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-builder)
                [![downloads](https://shields.io/npm/dm/@coffeekraken/s-builder?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-builder)
                [![license](https://shields.io/npm/l/@coffeekraken/s-builder?style=for-the-badge)](./LICENSE)
                [![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)
            
    <!-- description -->
    Base class to create builders on top of like the @coffeekraken/s-images-builder, etc...

    <!-- install -->
    ### Install

    ```shell
    npm i @coffeekraken/s-builder
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

## SBuilder

This package expose a simple `SBuilder` class that is meant to be extended for each builder you want to create.

For now, this class is the main one used in builders like:

-   [@coffeekraken/s-favicon-builder](/package/@coffeekraken/s-favicon-builder/doc/readme)
-   [@coffeekraken/s-images-builder](/package/@coffeekraken/s-images-builder/doc/readme)
-   [@coffeekraken/s-markdown-builder](/package/@coffeekraken/s-markdown-builder/doc/readme)
-   [@coffeekraken/s-postcss-builder](/package/@coffeekraken/s-postcss-builder/doc/readme)
-   [@coffeekraken/s-sitemap-builder](/package/@coffeekraken/s-sitemap-builder/doc/readme)
-   [@coffeekraken/s-static-builder](/package/@coffeekraken/s-static-builder/doc/readme)
-   [@coffeekraken/s-typescript-builder](/package/@coffeekraken/s-typescript-builder/doc/readme)

## Features

This simple base class gives you some features like:

-   Specify a [@coffeekraken/s-interface](/package/@coffeekraken/s-interface/doc/readme) interface
-   Expose a `build` method that accepts a `params` object which reflect your interface
-   Let you define a `_build` method that will be called with your resolved `params` object

## Usage

Here's a simple example of a custom builder:

```js
import SBuilder from '@coffeekraken/s-builder';
import SPromise from '@coffeekraken/s-promise';
class MyBuilder extends SBuilder {
    constructor(settings = {}) {
        super(settings);
    }
    _build(params, settings) {
        return new SPromise(({ resolve, reject, emit }) => {
            // compilation logic
        });
    }
}
```


    <!-- license -->    
    ### License

    Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

    <!-- contact -->
    ### Contact

    Here's all the ways you can contact us listed:

        [![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
        [![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
    