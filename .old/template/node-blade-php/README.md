![Node Blade PHP](.resources/doc-header.jpg)

# Coffeekraken Node Blade PHP <img src="/.resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/node-blade-php?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/node-blade-php?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/node-blade-php?style=flat-square)

Blade PHP engine exposed to node using exec-php

## Table of content

1. [Install](#readme-install)
2. [Usage](#readme-usage)
3. [Coffeekraken](#readme-coffeekraken)

<a id="readme-install"></a>
## Install

```sh
npm install @coffeekraken/node-blade-php --save
```

<a id="readme-usage"></a>
## Usage

```js
const bladePhp = require('@coffeekraken/node-blade-php');
bladePhp.setViewsFolder(process.cwd() + '/views');
bladePhp.compile('my-cool-view', {
    hello: 'world'
}).then((result) => {
    console.log(result)
});
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
