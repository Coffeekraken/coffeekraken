# Coffeekraken icon webcomponent <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/icon-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/icon-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/icon-webcomponent?style=flat-square)

Easily integrate icons using various driver like "img", "fonticon", "svg", "fontawesome", "material" and "foundation"

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Drivers](#readme-drivers)
4. [Global configuration](#readme-global-configuration)
5. [Javascript API](doc/src/js)
6. [Coffeekraken](#readme-coffeekraken)

<a name="readme-install"></a>

## Install

```
npm install @coffeekraken/icon-webcomponent --save
```

<a name="readme-get-started"></a>

## Get Started

First, import the component into your javascript file like so:

```js
import IconWebcomponent from "@coffeekraken/icon-webcomponent"
```

Then simply use it inside your html like so:

```html
<ck-icon icon="address-book" driver="fontawesome"></ck-icon>
<ck-icon icon="my-cool-icon" driver="svg" icons-path="/icons"></ck-icon>
```

<a name="readme-drivers"></a>

## Drivers

Here the list of drivers available and how they work:

1. `fonticon` : This driver assume that you have a fonticon in yout project.

- Generate a `<i>` with class of `icon-{icon}`

2. `img` : This driver create an `<img>` tag and load your svg icon inside it

- Depend on the `iconsPath` property
- Generate an `<img>` tag with the source `{iconsPath}/{icon}.svg`

3. `svg` : This driver load the svg and put it inline in the page

- Depend on the `iconsPath` property
- Inline the svg loaded from `{iconsPath}/{icon}.svg`

4. `fontawesome` : Load [fontawesome](https://fontawesome.com/) and generate an `<i>` tag with the proper fontawesome class
5. `material` : Load [material icons](https://material.io/tools/icons/?style=baseline) and generate an `<i>` tag with the proper material class
6. `foundation` : Load [foundation icons](https://zurb.com/playground/foundation-icon-fonts-3) and generate an `<i>` tag with the proper foundation class

<a name="readme-global-configuration"></a>

## Global configuration

In order to avoid writing each time `driver="fontawesome"` etc, you can configure your component globally one time then use it quicker. Here how to do that:

```js
import IconWebcomponent from "@coffeekraken/icon-webcomponent/js/class"
IconWebcomponent.define('ck-icon', IconWebcomponent, null, {
  driver: 'foundation'
});
```

You can then use your component with ease like so:

```html
<ck-icon icon="my-cool-icon"></ck-icon>
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
