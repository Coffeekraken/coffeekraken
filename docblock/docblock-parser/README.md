# Coffeekraken Docblock Parser <img src=".resources/coffeekraken-logo.jpg" height="25px" />

<p>
	<!-- <a href="https://travis-ci.org/Coffeekraken/docblock-parser">
		<img src="https://img.shields.io/travis/Coffeekraken/docblock-parser.svg?style=flat-square" />
	</a> -->
	<a href="https://www.npmjs.com/package/coffeekraken-docblock-parser">
		<img src="https://img.shields.io/npm/v/coffeekraken-docblock-parser.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/docblock-parser/blob/master/LICENSE.txt">
		<img src="https://img.shields.io/npm/l/coffeekraken-docblock-parser.svg?style=flat-square" />
	</a>
	<!-- <a href="https://github.com/coffeekraken/docblock-parser">
		<img src="https://img.shields.io/npm/dt/coffeekraken-docblock-parser.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/docblock-parser">
		<img src="https://img.shields.io/github/forks/coffeekraken/docblock-parser.svg?style=social&label=Fork&style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/docblock-parser">
		<img src="https://img.shields.io/github/stars/coffeekraken/docblock-parser.svg?style=social&label=Star&style=flat-square" />
	</a> -->
	<a href="https://twitter.com/coffeekrakenio">
		<img src="https://img.shields.io/twitter/url/http/coffeekrakenio.svg?style=social&style=flat-square" />
	</a>
	<a href="http://coffeekraken.io">
		<img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=flat-square&label=coffeekraken.io&colorB=f2bc2b&style=flat-square" />
	</a>
</p>

<p class="lead">Simple, powerfull and extensible docblock parser that return a JSON representation to work with</p>

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Documentation](#readme-documentation)
4. [Contribute](#readme-contribute)
5. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
6. [Licence](#readme-license)

<a name="readme-install"></a>

## Install

```
npm install coffeekraken-docblock-parser --save-dev
```

<a name="readme-get-started"></a>

## Get Started

First, require the package in your javascript node file like so:

```js
const docblockParser = require("coffeekraken-docblock-parser");
const json = docblockParser(config).parse(myStringToParse);
```

<a id="readme-documentation"></a>

## Documentation

This package mainly expose a `parse` function that take a String and return a JSON object representing the docblocks found. Around that main function, you will find some functions and configurations that you can hook to extend or modify the parsing process.

#### API doc

Here's some API references:

- [Config](doc/core/config.md) : Configuration file reference
- [`parse` function](doc/core/parse.md) : Main package function that parse a String and convert it to JSON
- [Next line analyzer](doc/next-line-analyzer) : Each function that analyze the line just after each docblocks
- [Tags](doc/tags) : Each tags function that sets the data accordingly

#### Supported tags

Here's the list of supported docblock tags out of the box. You can register new tags as well.

- `abstract` : If is an abstract class, etc...
- `attribute` : Specify if is an HTMLElement attribute that we document
- `author` : Specify the author
- `body` : Specify the body content of the docblock. It's usually taken automatically from the first non tagged content
- `category` : Specify a category
- `class` : Specify if is a class that we document
- `constructor` : Specify if is a constructor that we document
- `const` : Specify if is a constant
- `copyright` : Specify a copyright
- `default` : Specify the default value for a property.
- `deprecated` : Specify if is deprecated
- `event` : Specify if the docblock document an event or not
  - Usage :

```
@name 	my-cool-event
@event
etc...
```

- `example` : Specify an example.
  - Usage :

```
@example    {language}
your code here...
```

- `extends` : Specify the parent class
- `final` : Specify if is final implementation
- `global` : Specify if is a global variable, etc...
- `implements` : Specify some interfaces that the class implement
- `interface` : Specify if is an interface
- `name` : Specify the name of the item.
- `override` : Specify if is an override
- `package` : Specify a package
- `param` : Specify the parameters for the function
  - Usage :

```
@param    {String}    myCoolParam    A cool param
@param    {Integer}    [otherParam=2]    Another optional param
```

- `private` : Specify if the function/variable is private
- `property` : Specify some properties
  - Usage :

```
@property    {String}    myCoolProperty    A cool property
@property    {Integer}    [otherProperty=2]    Another cool property
```

- `protected` : Specify if the function/variable is protected
- `public` : Specify if the function/variable is public
- `return` : Specify the returned value
  - Usage :

```
@return    {String}    The cool returned value
```

- `see` : Specify a url for more info
  - Usage :

```
@see    http://google.com    {optionalLabel}
```

- `static` : Specify if the documented property/function is a static one.
- `todo` : Specify some things to do
- `type` : Specify the type(s) of the documented variable.
  - Usage :

```
@type    {String|Boolean}
```

- `values` : Specify the possible values for the documented element
  - Usage :

```
@values    Hello|World
```

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
