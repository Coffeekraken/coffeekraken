# Coffeekraken dialog webcomponent <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/dialog-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/dialog-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/dialog-webcomponent?style=flat-square)

Powerful, fully featured and easy to use dialog component

## Features

1. Fully customizable
2. Support multiple content source (inline content / DOM element / Ajax request)
3. Support modal option
4. And more...

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Dialog types](#readme-dialog-types)
4. [Javascript API](doc/src/js)
5. [Styling classes](doc/classes.md)
6. [Coffeekraken](readme-coffeekraken)

<a name="readme-install"></a>
## Install

```
npm install @coffeekraken/dialog-webcomponent --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import DialogWebcomponent from '@coffeekraken/dialog-webcomponent'
```

Then simply use it inside your html like so:

```html
<!-- inline content -->
<ck-dialog id="my-cool-dialog">
	<template><!-- optional template tag -->
		<h1>Hello World</h1>
		<p>Phasellus nec dictum arcu, finibus semper tellus. Aliquam mattis dictum.</p>
	</template>
</ck-dialog>
<a href="#my-cool-dialog">Click to open the dialog</a>

<!-- automatically opened dialog -->
<ck-dialog opened content="data/my-cool-dialog.html"></ck-dialog>
```

<a id="readme-dialog-types"></a>

## Dialog types

This webcomponent offers you multiple way to instanciate a dialog. Here's the list:

### Dom component

Open a dialog using a dom component present in the page.
This dom element can be a `template` tag too.

```html
<a href="#my-cool-dialog" class="btn btn--primary">Open dialog</a>
<div class="hidden">
    <ck-dialog id="my-cool-dialog">
        <h1 class="h1 m-b">
            My cool dialog
        </h1>
        <p class="p">
            Vivamus vestibulum ultrices eros nec bibendum. In sit amet ultrices mi. Etiam nunc ante, efficitur ac aliquam eget, iaculis quis massa. Duis quis molestie orci. Sed ultricies sem ante, in.
        </p>
    </ck-dialog>
</div>
```

### Iframe

Open a content inside an iframe. Usefull to load for example youtube/vimeo/etc... content

```html
<ck-dialog iframe>
    <a class="btn btn--primary" href="/data/iframe-demo.html">
        Open my content in an iframe dialog
    </a>
</ck-dialog>

```

### Modal

Open a dialog in modal mode. This mean that the user cannot close the dialog by clicking outside or by the escape key and your in full control of it's state

```html
<a href="#my-cool-dialog" class="btn btn--primary">Open dialog</a>
<div class="hidden">
    <ck-dialog id="my-cool-dialog" modal>
        <h1 class="h1 m-b">
            Hello world
        </h1>
        <p class="p m-b">
            Vivamus vestibulum ultrices eros nec bibendum. In sit amet ultrices mi. Etiam nunc ante, efficitur ac aliquam eget, iaculis quis massa. Duis quis molestie orci. Sed ultricies sem ante, in.
        </p>
        <a class="btn btn--secondary" ck-dialog-ok>
            Close dialog
        </a>
    </ck-dialog>
</div>

```

### Ajax content

Open a dialog and load his content through an ajax request

```html
<ck-dialog>
    <a href="/data/ajax-demo.html" class="btn btn--primary">Open ajax dialog</a>
</ck-dialog>
```

### Programatical dialog

Open a dialog fully programatically

```js
import strToHtml from '@coffeekraken/sugar/js/string/strToHtml'
import DialogWebcomponent from '@coffeekraken/dialog-webcomponent'
const myDialog = DialogWebcomponent.open(strToHtml('<p>Hello World</p>'), {
	modal: true
})
setTimeout(() => {
	myDialog.close()
}, 5000)

```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
