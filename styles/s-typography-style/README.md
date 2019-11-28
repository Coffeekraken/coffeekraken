# Coffeekraken s-typography-style <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/s-typography-style?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/s-typography-style?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/s-typography-style?style=flat-square)

Full stack typography styling for your website including titles, paragraphs, lists, inline styles, blockquotes, etc...

## Table of content

1. [Features](#readme-features)
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [SASS API](doc/sass)
5. [The `tf` and `vr` classes](#readme-tf-vr-classes)

<a name="readme-features"></a>

## Features

1. Title styling `h1 h2 h3 h4 h5 h6`
2. Paragraphs styling `p p.lead`
3. Lists styling `ul ol li dl dt dd`
4. Inline text styling `mark del s ins u small strong em`
5. Caption and figcaption styling `caption figcaption`
6. Quote styling `quote blockquote cite`

<a name="readme-install"></a>

## Install

```
npm install @coffeekraken/s-typography-style --save
```

<a name="readme-get-started"></a>

## Get Started

First, [import and init sugar](https://github.com/Coffeekraken/coffeekraken/tree/master/utils/sugar) into your project.

Then, import the component into your scss file like so:

```scss
@import "node_modules/@coffeekraken/s-typography-style/index";
```

Then simply generate the classes using the component mixin like so:

```scss
@include s-typography-classes($color: primary);
```

And finally use the classes inside your html

```html
<!-- directly with tags in scoped tf (text format) class -->
<!-- applying vertical rhythm using the vr class -->
<div class="tf vr">
  <h1>Hello world</h1>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
    vehicula, lorem accumsan semper tincidunt, metus diam porta tellus.
  </p>
  <ul>
    <li>List item #1</li>
    <li>List item #2</li>
    <li>List item #3</li>
  </ul>
</div>

<!-- by applying style implicitely with classes -->
<h1 class="h2">Hello world</h1>
<p class="p">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula,
  lorem accumsan semper tincidunt, metus diam porta tellus.
</p>
<ul class="ul">
  <li class="li">List item #1</li>
  <li class="li">List item #2</li>
  <li class="li">List item #3</li>
</ul>
```

<a id="readme-tf-vr-classes"></a>

## The `tf` and `vr` classes

The `tf` class is for "text format". It allows you to apply typography styling on the tags that are scoped inside it like so:

```html
<div class="tf">
  <h1>I will be styled like an h1</h1>
</div>
<h1>I will not bein styled like an h1</h1>
<h1 class="h1">I will be styled like an h1</h1>
```

The `vr` class is for "vertical rhythm". It allows you to apply margins between typography styled elements on the tags that are scoped inside it like so:

```html
<div class="tf vr">
  <h1>I will be styled like an h1 and have a margin bottom if needed</h1>
  <p>I will be styled like a paragraph and have a margin bottom if needed</p>
</div>
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
