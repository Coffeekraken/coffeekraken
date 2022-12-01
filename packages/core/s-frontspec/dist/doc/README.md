<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-frontspec

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-frontspec?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-frontspec)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-frontspec?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-frontspec)
[![license](https://shields.io/npm/l/@coffeekraken/s-frontspec?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
A simple class to handle (read) frontspec.json files. A frontspec.json file is a list of things (css, js, styles, etc...) that your frontend project expose and can be used by a backend like wordpress for example...

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-frontspec

```

<!-- body -->

<!--
/**
* @name            README
* @namespace       doc
* @type            Markdown
* @platform        md
* @status          wip
* @menu            Documentation           /doc/readme
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

## SFrontspec

This package expose a simple `SFrontspec` class that allows you to represent the `frontspec.json` file at the root of your project.

## Features

-   Read the `frontspec.json` file
-   Apply en `env` to get the adapted frontspec result
-   Add a default `frontspec.json` file to your project
-   And more...

## What is a frontspec?

A frontspec is a simple file that describe what your frontend has to offer like the assets (js, css, etc...), the typography styles available (h1, h2, h3, etc...), and more.

> Note that for now this is a work un progress specification. More information will be available later...

## Anatomy of a `frontspec.json`

Here's an example of `frontspec.json`:

```js
export default {
  metas: {
    lang: 'en',
    title: 'Coffeekraken',
    description: 'Hello world',
    themeColor: '#FFBB00',
    author: {
      name: 'Olivier Bossel',
      email: 'olivier.bossel@gmail.com',
      url: 'https://olivierbossel.com',
    },
    og: {
      title: 'Coffeekraken',
      description: 'wiufhweiufh wiuehfiuwehf',
      type: 'website',
      url: 'https://olivierbossel.com',
      image: '/cool-image.jpg',
    },
  },
  assets: {
    js: {
      dev: {
        id: 'dev',
        type: 'module',
        defer: true,
        src: '/src/js/index.ts',
        env: 'development',
      },
      module: {
        id: 'module',
        type: 'module',
        defer: true,
        src: '/dist/js/module.es.js',
        env: 'production',
      },
      main: {
        id: 'main',
        nomodule: true,
        defer: true,
        src: '/dist/js/index.iife.js',
        env: 'production',
      },
    },
    css: {
      main: {
        id: 'main',
        defer: true,
        src: '/dist/css/index.css',
      },
    },
    html: {
      manifest: {
        id: 'manifest',
        src: './dist/favicon/favicon.html',
      },
    },
  },
  head: {},
};

```

## Usage

Here's a simple example how to use the SFrontspec class:

```js
import __SFrontspec from '@coffeekraken/s-frontspec';
const frontspec = new __SFrontspec();
const result = await frontspec.read();

```

Or Using the `sugar` CLI:

```shell
# read the frontspec
sugar frontspec.read
# add default frontspec to your project
sugar frontspec.add

```

## Read parameters

<span class="s-typo s-typo--code">
SFrontspecReadParamsInterface
</span>

<dl>
<dt class="s-font s-font--40 s-mbe s-mbe--30">
<header class="s-flex s-bg s-bg--main-surface s-radius">
<div class="s-flex-item s-flex-item--grow s-tc s-tc--accent s-p s-p--30 s-typo s-typo--strong">
env             </div>
<div class="s-typo s-typo--bold s-p s-p--30 s-tc s-tc--info"></div>
</header>
<p class="s-typo s-typo--p s-p s-p--30">Specify the environment for which to read the frontspec for</p>
</dt>
</dl>

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-frontspec.node.SFrontspec)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
