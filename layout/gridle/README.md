![Gridle](.resources/gridle-head.png)

# Gridle

Gridle is a simple but powerful and convenient grid that make use of the CSS grid model. It has been rewritten from the ground up to be more simple to use without loosing his principle goals that are the flexibility and his responsive capabilities.

## Table of content

1. [Install](#install)
2. [Get started](doc/00.get-started.md)
3. [Settings](doc/02.settings.md)
4. [States](doc/02.states.md)
5. [Classes](doc/03.classes.md)
6. [Functions](doc/04.functions.md)
7. [Mixins](doc/05.mixins.md)

<a id="readme-install"></a>
## Install

Gridle is available through NPM. To install it, just launch this command line:

```
npm i @coffeekraken/gridle --save
```

## Quick start

Importing gridle

```scss
import 'node_modules/@coffeekraken/gridle/index';
```

Configure your grid :

```scss
@include g-setup((
	columns: 12,
	column-width: 60, // unitless value
	width: 1200, // unitless value
	container-width: 85vw, // absolute value
	container-max-width: 1440px
));
```

Register states (media queries) (optional) :

```scss
@include g-register-state(tablet, (
	min-width : 640px
));
@include g-register-state(desktop, (
	min-width : 992px
));

// even with full custom queries :
@include g-register-state (landscape, (
	query : "(orientation : landscape)"
));
```

Generate all classes :

```scss
@include g-classes();
```

Use your grid in html :

```html
<div class="gr">
	<div class="col col--12 hide@tablet">
		Header
	</div>
	<div class="col col--12 col--4@tablet">
		Content
	</div>
	<div class="col col--12 col--4@tablet">
		Sidebar
	</div>
</div>
```

Customize your content look and feel with Gridle mixins

```scss
#sidebar {
	background : red;

	@include g-state(tablet) {
		background : green;
	}
}
```

## Generate custom classes

Gridle allows you to generate custom classes that will be available for each of your states. Here's an exemple

```scss
@include g-custom-class('center') {
	text-align : center;
}
```

This will produce the classes : center, center@tablet, center@desktop and center@landscape automatically

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
