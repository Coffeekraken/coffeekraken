# Coffeekraken button style <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/button-style?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/button-style?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/button-style?style=flat-square)

Full stack button styling for your website with buttons like outline, link, etc...

## Table of content

1. [Features](#readme-features)
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [SCSS API](doc/src/scss)
5. [Coffeekraken](#readme-coffeekraken)

<a name="readme-features"></a>
## Features

1. Full button stack with styles
	- Normal buttons
	- Outlined buttons
	- "Links" style buttons
	- `disabled` buttons
	- Colored buttons

<a name="readme-install"></a>
## Install

```
npm install @coffeekraken/button-style --save
```

<a name="readme-get-started"></a>
## Get Started

First, [import and init sugar](https://github.com/coffeekraken/coffeekraken/tree/master/util/sugar) into your project.

Then, import the component into your scss file like so:

```scss
@use '@coffeekraken/button-style/index' as button-style;
```

Then simply use it using the mixins like so to generate the classes:

```scss
@include button-style.classes(
	$colors: default primary secondary
);
```

And use your buttons like so:

```html
<a class="btn" href="#" title="...">Hello world</a>
<a class="btn btn--primary" href="#" title="...">Hello world</a>
<a class="btn btn--outline" href="#" title="...">Hello world</a>
<a class="btn btn" href="#" title="...">Hello world</a>
<button class="btn" disabled>Hello world</button>
<!-- etc... -->
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
