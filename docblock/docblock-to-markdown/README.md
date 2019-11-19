# Coffeekraken docblock parser <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/docblock-to-markdown?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/docblock-to-markdown?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/docblock-to-markdown?style=flat-square)

This package gives you the ability to parse a file of any languages and return a markdown version of it.

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Configuration](#readme-configuration)
4. [CLI](#readme-cli)

<a name="readme-install"></a>

```
npm install @coffeekraken/docblock-to-markdown --save-dev
```

<a name="readme-get-started"></a>

## Get Started

First, require the package in your javascript node file like so:

```js
const docblockParserToMarkdown = require("@coffeekraken/docblock-to-markdown");
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

> **[@coffeekraken/docblock-parser](https://www.npmjs.com/package/@coffeekraken/docblock-parser)** : Docblock parser package

> **[@coffeekraken/docblock-json-to-markdown](https://www.npmjs.com/package/@coffeekraken/docblock-json-to-markdown)** : Docblock JSON to markdown package

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

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
