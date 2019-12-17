# Coffeekraken s-dialog-component <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/button-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/button-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/button-webcomponent?style=flat-square)

Powerful, fully featured and easy to use dialog component

## Features

1. Fully customizable
2. Support multiple content source (inline content / DOM element / Ajax request)
3. Support modal option
4. And more...

## Table of content

1. **[Demo](http://components.coffeekraken.io/app/s-dialog-component)**
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [Dialog types](#readme-dialog-types)
5. [Javascript API](doc/js)
6. [Styling classes](doc/classes.md)
7. [Sugar Web Components Documentation](https://github.com/Coffeekraken/sugar/blob/master/doc/js/webcomponents.md)
8. [Browsers support](#readme-browsers-support)
9. [Contribute](#readme-contribute)
10. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
11. [Licence](#readme-license)

<a name="readme-install"></a>
## Install

```
npm install coffeekraken-s-dialog-component --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import SDialogComponent from 'coffeekraken-s-dialog-component'
```

Then simply use it inside your html like so:

```html
<!-- inline content -->
<s-dialog id="my-cool-dialog">
	<template><!-- optional template tag -->
		<h1>Hello World</h1>
		<p>Phasellus nec dictum arcu, finibus semper tellus. Aliquam mattis dictum.</p>
	</template>
</s-dialog>
<a href="#my-cool-dialog">Click to open the dialog</a>

<!-- automatically opened dialog -->
<s-dialog opened content="data/my-cool-dialog.html"></s-dialog>
```

<a id="readme-dialog-types"></a>

## Dialog types

This webcomponent offers you multiple way to instanciate a dialog. Here's the list:

### Dom component

Open a dialog using a dom component present in the page.
This dom element can be a `template` tag too.

[![View demo](http://components.coffeekraken.io/assets/img/view-demo.png)](http://components.coffeekraken.io/app/s-dialog-component)

### Iframe

Open a content inside an iframe. Usefull to load for example youtube/vimeo/etc... content

[![View demo](http://components.coffeekraken.io/assets/img/view-demo.png)](http://components.coffeekraken.io/app/s-dialog-component?demo=iframe)

### Modal

Open a dialog in modal mode. This mean that the user cannot close the dialog by clicking outside or by the escape key and your in full control of it's state

[![View demo](http://components.coffeekraken.io/assets/img/view-demo.png)](http://components.coffeekraken.io/app/s-dialog-component?demo=modal)

### Ajax content

Open a dialog and load his content through an ajax request

[![View demo](http://components.coffeekraken.io/assets/img/view-demo.png)](http://components.coffeekraken.io/app/s-dialog-component?demo=ajax)

### Programatical dialog

Open a dialog fully programatically

[![View demo](http://components.coffeekraken.io/assets/img/view-demo.png)](http://components.coffeekraken.io/app/s-dialog-component?demo=programatically)

<a id="readme-browsers-support"></a>
## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| --------- | --------- | --------- | --------- |
| IE11+ | last 2 versions| last 2 versions| last 2 versions

> As browsers are automatically updated, we will keep as reference the last two versions of each but this component can work on older ones as well.

> The webcomponent API (custom elements, shadowDOM, etc...) is not supported in some older browsers like IE10, etc... In order to make them work, you will need to integrate the [corresponding polyfill](https://www.webcomponents.org/polyfills).

<a id="readme-contribute"></a>
## Contribute

This is an open source project and will ever be! You are more that welcomed to contribute to his development and make it more awesome every day.
To do so, you have several possibilities:

1. [Share the love ❤️](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-share-the-love)
2. [Declare issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-declare-issues)
3. [Fix issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-fix-issues)
4. [Add features](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-add-features)
5. [Build web component](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-build-web-component)

<a id="readme-who-are-coffeekraken"></a>
## Who are Coffeekraken

We try to be **some cool guys** that build **some cool tools** to make our (and yours hopefully) **every day life better**.  

#### [More on who we are](https://github.com/Coffeekraken/coffeekraken/blob/master/who-are-we.md)

<a id="readme-license"></a>
## License

The code is available under the [MIT license](LICENSE.txt). This mean that you can use, modify, or do whatever you want with it. This mean also that it is shipped to you for free, so don't be a hater and if you find some issues, etc... feel free to [contribute](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md) instead of sharing your frustrations on social networks like an asshole...
