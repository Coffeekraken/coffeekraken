# Coffeekraken notification webcomponent <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/notification-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/notification-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/notification-webcomponent?style=flat-square)

Display nice and fully customizable toast like notification.

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Javascript API](doc/src/js)
4. [SASS API](doc/src/scss)
5. [Coffeekraken](#readme-coffeekraken)

<a name="readme-install"></a>
## Install

```
npm install @coffeekraken/notification-webcomponent --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import NotificationWebcomponent from '@coffeekraken/notification-webcomponent'
```

Then simply use it inside your html like so:

```html
<ck-notification title="Hello World" body="Pellentesque fringilla velit at tempor eleifend. Vestibulum finibus lacus et."></ck-notification>
```

If you need some base styles for your notifications, you can generate them like so:

```scss
@use 'node_modules/@coffeekraken/sugar/index' as sugar;
@use 'node_modules/@coffeekraken/notification-webcomponent' as notification-webcomponent;

@include notification-webcomponent.classes();
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
