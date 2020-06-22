# Coffeekraken imagemin <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/imagemin?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/imagemin?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/imagemin?style=flat-square)

Simply and quickly minify your images by passing a source, a destination and a target quality as parameters

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [CLI Options](#readme-cli-options)
4. [Coffeekraken](#readme-coffeekraken)

<a name="readme-install"></a>

## Install

```
npm install @coffeekraken/imagemin --save-dev
```

<a name="readme-get-started"></a>

## Get Started

Use the CLI as follow:

```
coffeekraken-imagemin -s src/img -o dist/img -q 80
```

<a name="readme-cli-options"></a>

## CLI Options

Here's all the CLI options available:

### `-s|--source`

Specify the source folder where to find the images to minify

- default : `src/img`

### `-o|--output`

Specify the output folder where to store the minified images

- default : `dist/img`

### `-q|--quality`

Specify the target quality for minification between 0 and 100

- default : `80`

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
