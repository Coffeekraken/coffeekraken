# Coffeekraken dropdown style <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/dropdown-style?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/dropdown-style?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/dropdown-style?style=flat-square)

Full stack dropdown styling component with dropup, right aligned and colors support. Fully customizable as well.

## Table of content

1. [Features](#readme-features)
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [SCSS API](doc/src/scss)
5. [Coffeekraken](#readme-coffeekraken)

<a name="readme-features"></a>
## Features

1. Fully customizable dropdown menu
2. Colors support
3. Dropup support
4. Right aligned dropdown support

<a name="readme-install"></a>
## Install

```
npm install @coffeekraken/dropdown-style --save
```

<a name="readme-get-started"></a>
## Get Started

First, [import and init sugar](https://github.com/coffeekraken/coffeekraken/tree/master/util/sugar) into your project.

Then, import the component into your scss file like so:

```scss
@use 'node_modules/@coffeekraken/dropdown-style/index' as dropdown-style;
```

Then, generate the classes using the provided mixins like so:

```scss
@include dropdown-style.classes(
	$colors: default primary secondary
);
```

Then simply use it inside your html like so:

```html
<div class="dropdown">
	<a class="btn">Display dropdown</a>
	<ul class="dropdown__menu">
		<li class="dropdown__item">
			<a href="#" title="...">
				Item 1
			</a>
		</li>
		<li class="dropdown__item">
			<a href="#" title="...">
				Item 2
			</a>
		</li>
		<li class="dropdown__item">
			<a href="#" title="...">
				Item 3
			</a>
		</li>
	</ul>
</div>
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
