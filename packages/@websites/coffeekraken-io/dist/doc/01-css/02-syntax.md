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
* @name            Pleasant syntax
* @namespace       doc.css
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / CSS           /doc/css/pleasant-syntax
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Pleasant syntax

Pleasant syntax is a way to write your classes into your HTML that let you apply complex behaviors with minimal classes names like so:

```html
<!-- this statement -->
<div
  class="s-font s-font--20 s-font--bold s-font--italic s-p s-p--40 s-typo s-typo--h2 s-typo___tablet s-typo--h5___tablet"
>
  Hello world
</div>
<!-- will be transformed into -->
<div
  class="s-font s-font--20 s-font--bold s-font--italic s-p s-p--40 s-typo s-typo--h2 s-typo--h5___tablet"
>
  Hello world
</div>

```

## Preprocessors

In order for this transformation to happen, you'll need to use one of these transformers:

#### Node / Js

**expandPleasantCssClassnames**: This will take your classes string and expand theme:

```js
import __expandPleasantCssClassnames from '@coffeekraken/sugar/shared/html/__expandPleasantCssClassnames';
__expandPleasantCssClassnames('...');

```

#### Js

**expandPleasantCssClassnamesLive**: This will monitor your app and transform classes live when they appears into the HTML.

```js
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/__expandPleasantCssClassnamesLive';
__expandPleasantCssClassnamesLive();

```

> This behavior is builted-in the [@coffeekraken/s-sugar-feature](/package/@coffeekraken/s-sugar-feature/doc/readme) feature with other convinient stuffs...

#### PHP

**\Sugar\html\expandPleasantCssClassnames**: This will transform all the classes from the HTML string passed.

```php

$processed = \Sugar\html\expandPleasantCssClassnames('...');

```

#### Specifications

Here's the specification that a transformer MUST integrate in order to be considered as a valid one:

1. Transform `:` with `--`
2. Repeat base class like so:
    - From: `s-font:bold:italic`
    - To: `s-font s-font--bold s-font--italic`
3. Support the `@mediaName` syntax like so:
    - From: `s-font:bold @mobile s-font:italic`
    - To: `s-font s-font--bold s-font--italic___mobile`


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
