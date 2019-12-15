# Coffeekraken Compile Server <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/compile-server?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/compile-server?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/compile-server?style=flat-square)

Provide a simple rest API for compiling js, coffee, sass, scss, etc... files through a node server

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Settings](#readme-settings)
4. [Documentation](doc/src/js)
5. [Coffeekraken](#readme-coffeekraken)

<a name="readme-install"></a>
## Install

```
npm install @coffeekraken/compile-server --save-dev
```

<a name="readme-get-started"></a>
## Get Started

Define a script inside your `package.json` to launch the compile server.
```json
{
	"scripts": {
		"compile-server": "coffeekraken-compile-server [options]"
	}
}
```

Launch your compile server:
```sh
npm run compile-server
```

Import the API into your javascript file like so:

```js
import compileServer from '@coffeekraken/compile-server'

// make a js compilation
const myCoolJsCode = `
	console.log("hello world")
`
compileServer.compile(myCoolJsCode, 'js').then((compiledCode) => {
 	// do something here...
});

// make a scss compilation
const myCoolScssCode = `
	.hello {
		.world {
			background: red;
		}
	}
`
compileServer.compile(myCoolScssCode, 'scss').then((compiledCode) => {
 	// do something here...
});
```

<a name="readme-settings"></a>
# Settings

To set the settings of your compile server, simply create a `compile-server.config.js` file at the root of your project like so:

```js
module.exports = {

	// server port
	port : 4000,

	// secret used to decrypt paths etc... sended by the client
	secret : null

}
```

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
