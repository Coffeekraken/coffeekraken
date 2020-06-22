# Coffeekraken text-intro <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/text-intro?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/text-intro?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/text-intro?style=flat-square)

Provide some cool animations to display your titles, etc... with style. They are all triggered when the element appear in viewport.

## Table of content

2. [Features](#readme-features)
2. [Install](#readme-install)
3. [Requirements](#readme-requirements)
4. [Get Started](#readme-get-started)
5. [`[intro-activator]`](#readme-intro-activator)
6. [Javascript API](doc/src/js)
7. [SASS API](doc/src/scss)
8. [Coffeekraken](#readme-coffeekraken)

<a name="readme-features"></a>

## Features

1. Multiple cool animations to display your titles, etc... with style
2. Trigger the animation when element is in the viewport
3. Support for [`[intro-activator]`](#readme-intro-activator) feature

<a name="readme-install"></a>

## Install

```
npm install @coffeekraken/text-intro --save
```

<a name="readme-requirements"></a>
## Requirements

In order to make this package work with your settings, you have to add the `node_modules/@coffeekraken` folder in the [load paths](https://sass-lang.com/documentation/at-rules/import#load-paths) of your `sass` installation.

<a name="readme-get-started"></a>
## Get Started

First import the component into your javascript file like so:

```js
import lettersInReveal from '@coffeekraken/text-intro/js/lettersInReveal'
import lettersInRain from '@coffeekraken/text-intro/js/lettersInRain'
import slideIn from '@coffeekraken/text-intro/js/slideIn'
// init listeners
lettersInReveal();
lettersInRain();
slideIn();
```

Then import and generate the classes using the provided mixins like so:

```scss
@use '@coffeekraken/text-intro/index' as text-intro;
@include text-intro.letters-in-reveal-classes();
@include text-intro.letters-in-rain-classes();
@include text-intro.slide-in-classes();
```

Then simply use it inside your html like so:

```html
<h1 intro="letters-in-reveal">
	My cool animated title
</h1>
<h1 intro="letters-in-rain">
	My cool animated title
</h1>
<h2 intro="slide-in-up">
	My cool animated title
</h2>
<h2 intro="slide-in-down">
	My cool animated title
</h2>
<h2 intro="slide-in-left">
	My cool animated title
</h2>
<h2 intro="slide-in-right">
	My cool animated title
</h2>
```

<a name="readme-intro-activator"></a>
## `[intro-activator]`

You can tell you animations to be played depending on the state of one of his parent node. To do that, simply apply the `intro-activator` attribute on the parent you want and handle the animation state on this element directly.

You animation will be played if the `intro-activator` node has the `.active` class or the `[active]` attribute. This is useful for example in a slider if you want each slides to trigger the animations independently.

```html
<!-- here's an example -->
<div intro-activator>
	<h1 intro="slide-in-up">The animation will not been played</h1>
</div>
<div intro-activator class="active">
	<h1 intro="slide-in-up">The animation will been played</h1>
</div>
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
