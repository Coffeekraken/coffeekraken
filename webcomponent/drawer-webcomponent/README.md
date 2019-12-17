# Coffeekraken s-drawer-component <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/drawer-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/drawer-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/drawer-webcomponent?style=flat-square)

Simple webcomponent to create fully customizable drawers.

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Javascript API](doc/src/js)
4. [SCSS API](doc/src/scss)
5. [Coffeekraken](#readme-coffeekraken)

<a name="readme-install"></a>
## Install

```
npm install @coffeekraken/drawer-webcomponent --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import DrawerWebcomponent from '@coffeekraken/drawer-webcomponent'
```

Then simply use it inside your html like so:

```html
<ck-drawer name="menu">
	<!-- your drawer content -->
</ck-drawer>
<main is="ck-drawer-content">
	<!-- your main website content -->
	<label for="menu">
		Open menu drawer
	</label>
</main>
```

If you need some default styles for your drawer, follow theses steps:

```scss
// import the drawer-webcomponent API
@use 'node_modules/@coffeekraken/drawer-webcomponent' as drawer-webcomponent;

// generate the classes
@include drawer-webcomponent.classes(
	$name: my-cool-drawer
	$side: right
);

// customize the drawer overlay
@include drawer-webcomponent.element(overlay, my-cool-drawer) {
	background-color: red;
}
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
