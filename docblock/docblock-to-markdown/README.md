# Coffeekraken Docblock to Markdown <img src=".resources/coffeekraken-logo.jpg" height="25px" />

<p>
	<a href="https://travis-ci.org/Coffeekraken/docblock-to-markdown">
		<img src="https://img.shields.io/travis/Coffeekraken/docblock-to-markdown.svg?style=flat-square" />
	</a>
	<a href="https://www.npmjs.com/package/coffeekraken-docblock-to-markdown">
		<img src="https://img.shields.io/npm/v/coffeekraken-docblock-to-markdown.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/docblock-to-markdown/blob/master/LICENSE.txt">
		<img src="https://img.shields.io/npm/l/coffeekraken-docblock-to-markdown.svg?style=flat-square" />
	</a>
	<!-- <a href="https://github.com/coffeekraken/docblock-to-markdown">
		<img src="https://img.shields.io/npm/dt/coffeekraken-docblock-to-markdown.svg?style=flat-square" />
	</a> 
	<a href="https://github.com/coffeekraken/docblock-to-markdown">
		<img src="https://img.shields.io/github/forks/coffeekraken/docblock-to-markdown.svg?style=social&label=Fork&style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/docblock-to-markdown">
		<img src="https://img.shields.io/github/stars/coffeekraken/docblock-to-markdown.svg?style=social&label=Star&style=flat-square" />
	</a> -->
	<a href="https://twitter.com/coffeekrakenio">
		<img src="https://img.shields.io/twitter/url/http/coffeekrakenio.svg?style=social&style=flat-square" />
	</a>
	<a href="http://coffeekraken.io">
		<img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=flat-square&label=coffeekraken.io&colorB=f2bc2b&style=flat-square" />
	</a>
</p>

<p class="lead">This package gives you the ability to parse a file of any languages and return a markdown version of it.</p>

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Configuration](#readme-configuration)
4. [CLI](#readme-cli)
5. [Contribute](#readme-contribute)
6. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
7. [Licence](#readme-license)

<a name="readme-install"></a>

## Install

```
npm install coffeekraken-docblock-to-markdown --save-dev
```

<a name="readme-get-started"></a>

## Get Started

First, require the package in your javascript node file like so:

```js
const docblockParserToMarkdown = require("coffeekraken-docblock-to-markdown");
// parse files
docblockParserToMarkdown(config).filesToMarkdown("src/**/*.js");
// parse string
const markdown = docblockParserToMarkdown(config).stringToMarkdown(
  stringToParse
);
```

<a id="readme-configuration"></a>

## Configuration

Here's the configuration available for this package

```js
config = {
  // destination folder in case of files transforming
  destination: "doc",
  // Part of each files path to remove before saving to destination
  removePath: "",
  // coffeekraken-docblock-parser configuration object
  docblockParser: {},
  // coffeekraken-docblock-to-markdown configuration object
  docblockJsonToMarkdown: {}
};
```

> **[coffeekraken-docblock-parser](https://github.com/coffeekraken/docblock-parser)** : Docblock parser package
> **[coffeekraken-docblock-to-markdown](https://github.com/coffeekraken/docblock-to-markdown)** : Docblock JSON to markdown package

<a id="readme-cli"></a>

## CLI

You can process your files through an small CLI like so:

#### Transform files

```
coffeekraken-docblock-to-markdown -f 'js/**/*.js' -d doc
```

#### Arguments

- -f (--files) : Files to process (glob pattern)
- -s (--string) : String to process
- -d (--destination) : Destination folder in case of files transforming
- -c (--config) : Js config file to load
- --remove-path : Part of each files path to remove before saving to destination

<a id="readme-contribute"></a>

## Contribute

This is an open source project and will ever be! You are more that welcomed to contribute to his development and make it more awesome every day.
To do so, you have several possibilities:

1. [Share the love ❤️](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-share-the-love)
2. [Declare issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-declare-issues)
3. [Fix issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-fix-issues)
4. [Add features](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-add-features)
5. [Build web component](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-build-web-component)

<a id="readme-who-are-coffeekraken"></a>

## Who are Coffeekraken

We try to be **some cool guys** that build **some cool tools** to make our (and yours hopefully) **every day life better**.

#### [More on who we are](https://github.com/Coffeekraken/coffeekraken/blob/master/who-are-we.md)

<a id="readme-license"></a>

## License

The code is available under the [MIT license](LICENSE.txt). This mean that you can use, modify, or do whatever you want with it. This mean also that it is shipped to you for free, so don't be a hater and if you find some issues, etc... feel free to [contribute](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md) instead of sharing your frustrations on social networks like an asshole...
