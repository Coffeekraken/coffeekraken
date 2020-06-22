# Coffeekraken interactive demo webcomponent <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/interactive-demo-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/interactive-demo-webcomponent?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/interactive-demo-webcomponent?style=flat-square)

Provide a simple, powerful and nice way to display interactive html/css/js demo

## Features

- Use the [@coffeekraken/codemirror-webcomponent](https://github.com/coffeekraken/coffeekraken/tree/master/webcomponent/codemirror-webcomponent) as editor
- Display a nice preview of the editors results
- Support advanced compilation (sass/less/coffeescript/etc...) through [@coffeekraken/compile-server](https://github.com/coffeekraken/coffeekraken/tree/master/terminal/compile-server)
- Support multiple display layout (top, right, bottom, left, horizontal or vertical)
- And more...

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Javascript API](doc/src/js)
4. [Coffeekraken](#readme-coffeekraken)

<a name="readme-install"></a>
## Install

```
npm install @coffeekraken/interactive-demo-webcomponent --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import InteractiveDemoWebcomponent from '@coffeekraken/interactive-demo-webcomponent'
import CodemirrorWebcomponent from '@coffeekraken/codemirror-webcomponent'
```

Then simply use it inside your html like so:

```html
<ck-interactive-demo layout="right">
	<ck-codemirror language="html">
		<h1 class="h1">
			Hello world
		</h1>
	</ck-codemirror>
	<ck-codemirror language="css">
		.h1 {
			color : red;
		}
	</ck-codemirror>
</ck-interactive-demo>
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
