<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-docblock

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-docblock?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-docblock)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-docblock?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-docblock)
[![license](https://shields.io/npm/l/@coffeekraken/s-docblock?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Powerful class that let you parse docblocks with some registered tags like &quot;name&quot;, &quot;author&quot;, and a lot more...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-docblock

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

## SDocblock

This package expose a simple `SDocblock` class that let you parse docblocks into a file or a raw string.

## Features

-   Support **80** tags (see the list bellow)
-   Can render markdown in your tag contents
-   Ability to filter blocks with custom filter functions
-   And more...

## Usage

Here's a simple example how to use the SDocblock class:

```js
import __SDocblock from '@coffeekraken/s-docblock';

// parsing a file
const docblock = new __SDocblock('/my/cool/file.js');
const blocks = await docblock.parse();

// parsing inline string
// when using this, some tags that content file path, etc, will
// not be resolved correctly...
// you can specify a "filePath" in the settings to prevent this issue
const stringDocblock = new __SDocblock('...my content to parse...');
const stringBlocks = await docblock.parse();

```

## Supported tags

Here's the list of supported tags. This can be enhanced if needed (documentation coming soon):

-   **@0**
-   **@1**
-   **@2**
-   **@3**
-   **@4**
-   **@5**
-   **@6**
-   **@7**
-   **@8**
-   **@9**
-   **@10**
-   **@11**
-   **@12**
-   **@13**
-   **@14**
-   **@15**
-   **@16**
-   **@17**
-   **@18**
-   **@19**
-   **@20**
-   **@21**
-   **@22**
-   **@23**
-   **@24**
-   **@25**
-   **@26**
-   **@27**
-   **@28**
-   **@29**
-   **@30**
-   **@31**
-   **@32**
-   **@33**
-   **@34**
-   **@35**
-   **@36**
-   **@37**
-   **@38**
-   **@39**
-   **@40**
-   **@41**
-   **@42**
-   **@43**
-   **@44**
-   **@45**
-   **@46**
-   **@47**
-   **@48**
-   **@49**
-   **@50**
-   **@51**
-   **@52**
-   **@53**
-   **@54**
-   **@55**
-   **@56**
-   **@57**
-   **@58**
-   **@59**
-   **@60**
-   **@61**
-   **@62**
-   **@63**
-   **@64**
-   **@65**
-   **@66**
-   **@67**
-   **@68**
-   **@69**
-   **@70**
-   **@71**
-   **@72**
-   **@73**
-   **@74**
-   **@75**
-   **@76**
-   **@77**
-   **@78**
-   **@79**

## Register a new tag

To register a new tag, you just have to call the static `registerTag` method on the `SDocblockBlock` class like so:

```js
import { SDocblockBlock } from '@coffeekraken/s-docblock';
SDocblockBlock.registerTag('myTagName', (data, blockSettings) => {
  // handle your tag logic here...
  // and return what you want as a result
  return {
    something: 'cool',
  };
});

```

## Settings

<span class="s-typo s-typo--code">
SDocblockSettingsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
filePath             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify the file path of the parsed file</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
filter             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify a filter function that will be called on each docblock. If return false, the docblock will be ignored</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
filterByTag             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify a filter function by tag. This mean that this object must have as property the tagname you want to filter by, and a filter function as value</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
renderMarkdown             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<div class="s-pi s-pi--30 s-mbs s-mbs--40">
<div class="s-typo s-typo--code">1</div>
</div>
<p class="s-typo s-typo--p s-p s-p--30">Specify if you want to render the markdown inside the tag contents or not</p>
</dt>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
markedOptions             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify some options for the marked library</p>
</dt>
</dl>

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-config-inline-adapter.shared.SDocblock)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
