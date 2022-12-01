<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @website/coffeekraken-io

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![downloads](https://shields.io/npm/dm/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![license](https://shields.io/npm/l/@website/coffeekraken-io?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
The frontend toolkit that works for everyone. Experts, professionals and new-comers

<!-- install -->
### Install

```shell
npm i @website/coffeekraken-io

```

<!-- body -->

<!--
/**
* @name            Typography
* @namespace       doc.css
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / CSS           /doc/css/typography
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Typography

We call typography all the "inline" elements like `h1`, `h2`, `p`, `a`, `bold`, etc...
These elements styling are defined in your theme configuration file under the `typo` property like so:

```js
export default {
  'themePath...': {
    typo: {
      h1: {
        'font-size': 40,
        'line-height': 1.2,
        // etc...
      },
    },
  },
};

```

Each typo elements like `h1`, `h2`, etc... are just simple javascript object that will be converted to css automatically behind the scene.

## Special properties treatment

Some properties in these objects will be proxied by the toolkit to allows internal theme value usage like `font-size` in the example above that has the value `40`. This value will be taken from the `font.size` theme configuration.

This behavior will happen to all properties supported by the [postcssSugarPlugin](/api/@coffeekraken/postcss-sugar-plugin/node/utils/jsObjectToCssProperties).

## Classes

Some classes will be generated from your theme configuration like these:


-   **s-typo:h1**
    
-   **s-typo:h2**
    
-   **s-typo:h3**
    
-   **s-typo:h4**
    
-   **s-typo:h5**
    
-   **s-typo:h6**
    
-   **s-typo:p**
    
-   **s-typo:lead**
    
-   **s-typo:hr**
    
-   **s-typo:pre:not([class])**
    
-   **s-typo:code:not(pre &gt; code)**
    
-   **s-typo:a**
    
-   **s-typo:quote**
    
-   **s-typo:b**
    
-   **s-typo:bold**
    
-   **s-typo:strong**
    
-   **s-typo:i**
    
-   **s-typo:italic**
    
-   **s-typo:em**
    
-   **s-typo:large**
    
-   **s-typo:larger**
    
-   **s-typo:largest**
    
-   **s-typo:small**
    
-   **s-typo:smaller**
    
-   **s-typo:smallest**
    
-   **s-typo:mark**
    
-   **s-typo:del**
    
-   **s-typo:ins**
    
-   **s-typo:sub**
    
-   **s-typo:sup**
    

<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
