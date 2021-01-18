![Sugar](.resources/doc-header.jpg)

<!-- @name   Something cool -->

# Coffeekraken Sugar <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/sugar?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/sugar?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/sugar?style=flat-square)

Sugar gives you a lot of cool stuff to enhance your codebase.
It basically does nothing by default but let you grab what you want from it. It can be the colors management feature, as well as the spaces management, helper classes, etc...

We like to think about this toolkit as

> A little (but powerful) sugar in your codebase

## Table of content

1. [Goals](#readme-goals)
2. [Install](#readme-install)
3. [Quick start](#readme-quick-start)
4. [Sass features](#readme-sass-features)
5. [JS features](#readme-js-features)
6. [What sugar does not](#readme-does-not)

<a id="readme-goals"></a>

## Goals

The primary goal of this toolkit is to cover these needs:

1. Give you a way to **organize your codebase (colors, fonts, etc...)**
   - Sugar **does not tells you how your folders need to be layed out**
   - Help you to stay organized inside your code - [Colors](doc/scss/colors.md) - [Fonts](doc/scss/fonts.md) - [Etc...](doc/scss)
   - **Help a lot when you need to work in team**
2. Give you access to a large number of useful mixins like:
   - [font](doc/src/scss/core/mixin/_font.md) : Apply font property quickly
   - [clearfix](doc/src/scss/mixin/_clearfix.md) : Apply any clearfix (standard, overflow, float, etc...) type quickly
   - [placeholder](doc/src/scss/mixin/_placeholder.md) : Apply the input placeholder styling
   - [list-bullet](doc/src/scss/mixin/_list-bullet.md) : Create fully customized list bullets (icons, images, decimal, etc...)
   - [vertical-rhythme](doc/src/scss/core/mixins/_vertical-rhythme.md) : Set your vertical rhythme rules
   - [truncate-text](doc/src/scss/mixins/_truncate-text.md) : Truncate a text when to wide
   - [And many many more...](doc/src/scss)
3. Give you access to some cool effects that you can tweak like:
   - [depth](doc/src/scss/effect/_depth.md) : Material design depth shadows
   - [bubble](doc/src/scss/effect/_bubble.md) : Customizable speach bubbles
   - [side-lined](doc/src/scss/effect/_side-lined.md) : Simple side lines to apply on titles or whatever
   - [long-shadow](doc/src/scss/effect/_long-shadow.md) : Create a nice long shadow effect
   - Fully customizable one div loaders
   - [And many more...](doc/src/scss/effect)
4. Provide some useful daily use javascript functions like:
   - [closest](doc/src/js/dom/closest.md) : Equivalent of the jQuery **closest** functions
   - [whenInViewport](doc/src/js/dom/whenInViewport.md) : Let you know when an element enter the viewport the first time
   - [whenAttribute](doc/src/js/dom/whenAttribute.md) : Let you know when an element has a specifiy attribute (or that an attribute is a string, etc...)
   - [scrollTo](doc/src/js/dom/scrollTo.md) : Animate the scroll to a certain element in the page
   - [domReady](doc/src/js/dom/domReady.md) : Equivalent to the jQuery **ready** function
   - [getAnimationProperties](doc/src/js/dom/getAnimationProperties.md) : Return an object with the css animations properties
   - [And many, many, many more...](doc/src/js)
5. Provide some powerful javascript classes like:
   - [SWebComponent](doc/src/js/core/SWebComponentMixin.md) : Base class to create webcomponent based on **react** methods naming (componentWillMount, componentMount, etc...)
   - [SBinder](doc/src/js/class/SBinder.md) : Allows you to bind object properties to another object
   - [SWatcher](doc/src/js/class/SWatcher.md) : Allows you to monitor object properties
   - [STimer](doc/src/js/class/SBinder.md) : Nice little class to handle timers (start, stop, pause, onTick, etc...)
   - [And many more...](doc/src/js/class)
6. Plenty web components based on the `SWebComponent` class
   - These web components are separated into outside packages
   - Official sugar web components are published on the [Coffeekraken NPM organisation](http://npmjs.org/org/coffeekraken)
   - Well tested components

<a id="readme-install"></a>

## Install

```
npm install @coffeekraken/sugar --save
```

Release the kraken !!! 🦑

<a id="readme-quick-start"></a>

## Quick start

Here's how to get started quickly:

#### SASS (scss)

```scss
// import sugar
@use "node_modules/@coffeekraken/sugar/index" as sugar;

// configure your sugar
@include sugar.setup((// configuration here...));

// init (required to be just after sugar.setup calls)
@include sugar.init();

// generate the classes if you want
@include sugar.classes();
```

#### JS

In javascript, you just need to import what you want from the toolkit like so:

```js
import STimer from "@coffeekraken/sugar/js/class/STimer";
// etc...
```

<a id="readme-sass-features"></a>

## Sass features

Here's a list of features that the toolkit will offer you. **Don't worry**, it seems like a lot, but you don't need to use all of them to start. Just pick what you need and let the rest aside...

- **[Colors](doc/scss/colors.md)** : Manage, organize and use colors easily - Named colors - Easy modifiers - Helper classes (optional) - [And more...](doc/scss/colors.md)
- **[Fonts](doc/scss/fonts.md)** : Keep your fonts really organized - Names fonts - Helper mixins - Helper classes (optional) - [And more...](doc/scss/fonts.md)
- **[Typography](doc/scss/typography.md)** : Full stack typography management - Helper mixins - Helper classes (optional) (lowercase, uppercase, aligns, etc...) - [And more...](doc/scss/typography.md)
- **[Sizes](doc/scss/sizes.md)** : Manage sizes ratios to keep consistent margins, etc... - Named sizes (smaller, small, default, etc...) - Fully customizable - Ratio based - [And more...](doc/scss/sizes.md)
- **[Spaces](doc/scss/spaces.md)** : Full stack spaces management - Named spaces (share sizes names) - Helper classes (optional) - `.m-b-small` : Margin bottom small - `.m-t-big` : Margin top big - `.p-l` : Padding left (default) - Etc... - Helper mixins - [And more...](doc/scss/spaces.md)
- **[Look and feel](doc/scss/look-and-feel.md)** : Handle how your components (atoms) looks across your site - **em** unit based - Helper mixins - Ensure a consistent feel across your website - [And more...](doc/scss/look-and-feel.md)
- **[Filters](doc/scss/filters.md)** : Manage and keep your filters organized - Named filters - Helper mixins - Helper classes (optional) - [And more...](doc/scss/filters.md)
- **[Transitions](doc/scss/transitions.md)** : Manage and keep your transitions organized - Named transitions - Helper mixins - Helper classes (optional) - [And more...](doc/scss/transitions.md)
- And many more cool stuffs like: - A bunch of cool mixins to discover - Utils functions like : - [convert](doc/src/scss/core/function/_convert.md) : Convert from a unit to another - [is](doc/src/scss/core/function/_is.md) : Easily advanced variables type checking - And more... - We let you discover the rest by yourself...

<a id="readme-js-features"></a>

## JS features

Sugar provide a lot of cool functions and classes that you can use inside your project.
The main goal sugar try to achieve is to give you some cool tools that you can or not use. It's your choice and sugar will never force you in any way.

All the javascript capabilities of sugar are well structured and splited inside the repository so **you will be able to grab only what you want from it**. Here's some examples of functions and classes you might load in your project:

```js
import whenAttribute from "@coffeekraken/sugar/js/dom/whenAttribute";
import closest from "@coffeekraken/sugar/js/dom/closest";
import whenInViewport from "@coffeekraken/sugar/js/dom/whenInViewport";
import whenAttribute from "@coffeekraken/sugar/js/dom/whenAttribute";
import closestNotVisible from "@coffeekraken/sugar/js/dom/closestNotVisible";
import SColor from "@coffeekraken/sugar/js/class/SColor";
import STimer from "@coffeekraken/sugar/js/class/STimer";
import SWebComponent from "@coffeekraken/sugar/js/core/SWebComponent";
// etc...
```

- **[Classes](doc/js/class.md)** : Set of useful classes like: - [STimer](doc/src/js/class/STimer.md) : Handle times with nice control like start, stop, pause, etc... - [SColor](doc/src/js/class/SColor.md) : Manipulate colors and access your sass registered colors - [And more...](doc/js/class.md)
- **[DOM Helpers](doc/js/dom.md)** : Set of useful DOM related functions like: - [closest](doc/src/js/dom/closest.md) : Equivalent of the jQuery **closest** functions - [whenInViewport](doc/src/js/dom/whenInViewport.md) : Let you know when an element enter the viewport the first time - [whenAttribute](doc/src/js/dom/whenAttribute.md) : Let you know when an element has a specifiy attribute (or that an attribute is a string, etc...) - [scrollTo](doc/src/js/dom/scrollTo.md) : Animate the scroll to a certain element in the page - [And more](doc/js/dom.md)
- **[Easings](doc/src/js/easing)** : Set of easings functions
- **[Filters](doc/js/filter.md)** : Cool js filters like: - [SGooeySvgFilter](doc/src/js/filter/SGooeySvgFilter.md) : Make a gooey effect like in [this demo](https://tympanus.net/Development/CreativeGooeyEffects) - [SGradientSvgFilter](doc/src/js/filter/SGradientSvgFilter.md) : Apply an SVG gradient filter on top of any HTMLElement - [SMotionblurSvgFilter](doc/src/js/filter/SMotionblurSvgFilter.md) : Monitor an HTMLElement movement and apply a nice motion blur accordingly
- **[Features](doc/js/feature.md)** : Additional auto-applied DOM behaviors
- **[Utils](doc/src/js/util)** : Utils function for strings, colors, objects, etc... like: - [throttle](doc/src/js/util/functions/throttle.md) : Throttle a function call - [isColor](doc/src/js/util/is/color.md) : Check if is a valid color - [isEmail](doc/src/js/util/is/email.md) : Check if is a valid email - [whenProperty](doc/src/js/util/objects/whenProperty.md) : Be notified when a property exist or match a certain check function - [And more...](doc/src/js/util)

<a id="readme-does-not"></a>

## What Sugar does not

Sugar has some goals it try to achieve, and have also **some things that it does intentionally not** like:

1. Vendor prefixing your CSS
   - They are plenty of tools to make that like [autoprefixer](https://github.com/postcss/autoprefixer)
2. Implement polyfills like webcomponent.js, etc...
   - You will need to integrate them yourself when you need to...
3. Force you to use his features
   - Grab what you want from the toolkit, keep the rest aside...

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
