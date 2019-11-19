# config

Default config object

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**

Default : **{**

## Constructor

Map the @constructor tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

## Properties

### config.language

Set the language of the string to parse. (js, scss, etc...)

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**

### config.version

Set the version that will replace the \{version\} tokens inside the docblocks.
If not specified, will try to use the package.json version by default.

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**

### config.tags

Map each tags with an analyze function that will populate the tag object properly

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**

Default : **{**

### config.tags.@abstract

Map the @abstract tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@attribute

Map the @attribute tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@author

Map the @author tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@category

Map the @category tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@class

Map the @class tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@const

Map the @const tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@copyright

Map the @copyright tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@default

Map the @default tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@deprecated

Map the @deprecated tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@event

Map the @event tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@example

Map the @example tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@extends

Map the @extends tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@final

Map the @final tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@global

Map the @global tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@implements

Map the @implements tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@interface

Map the @interface tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@name

Map the @name tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@override

Map the @override tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@package

Map the @package tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@param

Map the @param tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@private

Map the @private tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@property

Map the @property tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@protected

Map the @protected tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@public

Map the @public tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@return

Map the @return tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@see

Map the @see tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@todo

Map the @todo tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@type

Map the @type tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.tags.@values

Map the @values tag with his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

### config.nextLineAnalyzer

Map each next line with an analyze function that will populate the tag object properly

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**

Default : **{**

### config.nextLineAnalyzer.js

Map the js next line to his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **\_\_docblockNextLineAnalyzerJs**

### config.nextLineAnalyzer.jsx

Map the jsx next line to his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **\_\_docblockNextLineAnalyzerJs**

### config.nextLineAnalyzer.scss

Map the scss next line to his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **\_\_docblockNextLineAnalyzerScss**

### config.nextLineAnalyzer.php

Map the php next line to his analyze function

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **\_\_docblockNextLineAnalyzerPhp**
