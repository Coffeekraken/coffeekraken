# Coffeekraken s-form-style <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/s-form-style?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/s-form-style?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/s-form-style?style=flat-square)

Full stack form styling with support of form-input, form-textarea, form-select, form-group and form-addon as well as colored versions of them...

## Table of content

1. [Features](#readme-features)
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [SASS API](doc/scss)

<a name="readme-features"></a>

## Features

1. Styling for `input`, `textarea` and `select`
2. `.form-group` support to display multiple inputs on the same line
3. `.form-addon` to display addons aside a form input
4. Colored version of each `input`, `textarea` and `select` available

<a name="readme-install"></a>

## Install

```
npm install @coffeekraken/form-style --save
```

<a name="readme-get-started"></a>

## Get Started

First, [import and init sugar](https://github.com/Coffeekraken/coffeekraken/tree/master/util/sugar) into your project.

Then, import the component into your scss file like so:

```scss
@use "node_modules/@coffeekraken/form-style/index" as form-style;
```

Then generate the classes using the provided mixins like so:

```scss
@include form-style.classes($colors: default primary secondary);
```

Then simply use it inside your html like so:

```html
<div class="form-group m-b">
  <input
    type="text"
    name="firstname"
    class="form-input"
    placeholder="Firstname"
  />
</div>
<div class="form-group m-b">
  <textarea
    class="form-textarea"
    name="message"
    placeholder="Your message here..."
  ></textarea>
</div>
<div class="form-group m-b">
  <select class="form-select" name="gender">
    <option value="">Choose a gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
</div>
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
