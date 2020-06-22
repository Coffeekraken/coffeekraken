# Coffeekraken scrollbar webcomponent <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/scrollbar-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/scrollbar-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/scrollbar-webcomponent?style=flat-square)

Simple webcomponent that let you skin the scrollbar as you want. It use internally the nice [simplebar](https://github.com/Grsmto/simplebar/tree/v2.5.0) library

## Features

- Easily customize a scrollbar element
- Automatically transfert the paddings apply on the element to the corresponding inner container to avoid visual issues

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [SCSS API](doc/src/scss)
4. [Javascript API](doc/src/js)
5. [Coffeekraken](#readme-coffeekraken)

<a name="readme-install"></a>
## Install

```
npm install @coffeekraken/scrollbar-webcomponent --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import ScrollbarWebcomponent from '@coffeekraken/scrollbar-webcomponent'
```

Then simply use it inside your html like so:

```html
<ck-scrollbar style="height:300px">
	<!-- any content here... -->
</ck-scrollbar>
```

<a name="readme-coffeekraken"></a>
# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
