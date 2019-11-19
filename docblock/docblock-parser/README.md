# Coffeekraken docblock parser <img src=".resources/coffeekraken-logo.jpg" height="25px" />

![npm](https://img.shields.io/npm/l/@coffeekraken/docblock-parser?style=flat-square)
![npm](https://img.shields.io/npm/v/@coffeekraken/docblock-parser?style=flat-square)
![npm](https://img.shields.io/npm/dw/@coffeekraken/docblock-parser?style=flat-square)

Simple, powerfull and extensible docblock parser that return a JSON representation to work with

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Documentation](#readme-documentation)

<a name="readme-install"></a>

## Install

```
npm install @coffeekraken/docblock-parser --save-dev
```

<a name="readme-get-started"></a>

## Get Started

First, require the package in your javascript node file like so:

```js
const docblockParser = require("@offeekraken/docblock-parser");
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

<a name="readme-coffeekraken"></a>

# Coffeekraken

We are a young collective of front-end creative developers with one goal in mind. Build tools to make every team working day life better. This is our first and only concern. All our tools are build around that purpose.
All what we provide are some cool tools that you can use the way you want. These tools features cover a large scope of the front-end workflow (styleguide generation, colors/fonts management, etc...). You can use only the parts that you need and let the rest aside...

[![Coffeekraken](.resources/coffeekraken-logo.jpg)](https://coffeekraken.io)
