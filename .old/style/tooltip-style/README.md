# Coffeekraken tooltip style <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/tooltip-style?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/tooltip-style?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/tooltip-style?style=flat-square)

Full stack tooltip styling supporting multiple sides and colors. Fully customizable as well.

## Table of content

1. [Features](#readme-features)
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [SCSS API](doc/src/scss)
5. [Coffeekraken](#readme-coffeekraken)

<a name="readme-features"></a>
## Features

1. Fully customizable
2. Support every sides `tl t tr l r bl b br c`
3. Support colors
4. Default style available if needed

<a name="readme-install"></a>
## Install

```
npm install @coffeekraken/tooltip-style --save
```

<a name="readme-get-started"></a>
## Get Started

First, [import and init sugar](https://github.com/coffeekraken/coffeekraken/tree/master/util/sugar) into your project.

Then, import the component into your scss file like so:

```scss
@use 'node_modules/@coffeekraken/tooltip-style/index' as tooltip-style;
```

Then, generate the classed using the provided mixins like so:

```scss
@include tooltip-style.classes(
	$sides: tr t tl l r bl b br c,
	$colors: default primary secondary
);
```

Then simply use it inside your html like so:

```html
<a class="btn">
	Display a tooltip
	<div class="tooltip">I'm a cool tooltip</div>
</a>
<a class="btn btn--primary">
	Display a top left tooltip
	<div class="tooltip tooltip--tl tooltip--primary">I'm a cool tooltip</div>
</a>
<div>
	Display a top right tooltip
	<div class="tooltip tooltip--tr tooltip--secondary">I'm a cool tooltip</div>
</div>
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
