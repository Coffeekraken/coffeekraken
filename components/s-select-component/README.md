# Coffeekraken s-select-component <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/s-select-component?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/s-select-component?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/s-select-component?style=flat-square)

Provide a nice and fully customizable select webcomponent that use a real select as source of truth

## Table of content

2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [Javascript API](doc/api/js/SSelectComponent.md)
5. [SASS API](doc/api/scss)
6. [Sugar Web Components Documentation](https://github.com/Coffeekraken/coffeekraken/blob/master/utils/sugar/doc/js/webcomponents.md)

<a name="readme-install"></a>

## Install

```
npm install @coffeekraken/s-select-component --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import SSelectComponent from "@coffeekraken/s-select-component";
```

Then simply use it inside your html like so:

```html
<select is="s-select">
  <option value="value1">Hello</option>
  <option value="value2">World</option>
  <optgroup label="My Cool Group">
    <option value="value3">My Cool Option</option>
  </optgroup>
</select>
```

If you need some styling to start with, you can generate it like so:

```scss
@import "node_modules/@coffeekraken/s-select-component/index";
// only a base bare styling
@include s-select-classes-bare();
// ...and optionally the visual styles
@include s-select-classes-style($colors: default primary secondary);
// ...or generate directly the bare and style classes
@include s-select-classes($colors: default primary secondary);
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
