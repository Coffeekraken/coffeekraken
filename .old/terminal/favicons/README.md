# Coffeekraken favicons <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/imagemin?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/imagemin?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/imagemin?style=flat-square)

Simply and quickly generate all your favicons using the amazing [favicons](https://www.npmjs.com/package/favicons) npm package.

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [CLI Options](#readme-cli-options)
4. [Coffeekraken](#readme-coffeekraken)

<a name="readme-install"></a>

## Install

```
npm install @coffeekraken/favicons --save-dev
```

<a name="readme-get-started"></a>

## Get Started

Use the CLI as follow:

```
coffeekraken-favicons --source src/img/favicon.png --output public/dist/favicons --html-output public/dist/favicons/favicons.html --path '/public/dist/favicons' --theme '#fff' --background '#fff'
```

<a name="readme-cli-options"></a>

## CLI Options

Here's all the CLI options available:

### `-s|--source`

Source file for favicon

- default : `src/img/favicon.png`

### `-o|--output`

Output folder for generated images paths

- default : `dist/favicons`

### `-h|--html-output`

File path in which to output the icons HTML

- default : `null`

### `-t|--theme`

Theme color for browser chrome

- default : `#fff`

### `-b|--background`

Background color for flattened icons

- default : `#fff`

### `-p|--path`

Path for overriding default icons path

- default : `dist/favicons`

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
