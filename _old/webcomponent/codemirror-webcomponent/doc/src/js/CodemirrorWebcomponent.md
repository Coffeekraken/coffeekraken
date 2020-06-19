# CodemirrorWebcomponent

Extends **SWebComponent**

<!-- @namespace: codemirror-webcomponent.CodemirrorWebcomponent -->

Type : **{ Class }**


Webcomponent wrapper for the codemirror editor library.


### Example
```html
	<s-codemirror language="html">
	<h1>
		Hello world
	</h1>
	<p>
		Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent eleifend risus nibh, sed ultrices turpis imperdiet a. Praesent elit odio, efficitur accumsan nisl nec, venenatis.
	</p>
</s-codemirror>
```
See : **Codemirror 5.x.x repository** : [http://github.coffeekraken.io/codemirror/codemirror/^5.0.0](http://github.coffeekraken.io/codemirror/codemirror/^5.0.0)

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)




## Attributes

Here's the list of available attribute(s).

### mode

Specify the mode used inside the demo
Support html, css, javascript, json, typescript, jsx, php, scss and sass by default.
If you want more, you just have to import the codemirror support
for your language

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### language

Specify the language used inside the demo (alias to mode)

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **html**


### id

Specify the id of the codemirror module
This is used to display the name on top of the codemirror editor if the
title is not provided

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### autoFormat

Specify if need to auto format the code or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### indentUnit

Set the indent unit to use

Type : **{ Intetger }**

Default : **4**


### theme

Set the theme to use

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **default**


### tabSize

Set the tab size

Type : **{ Integer }**

Default : **2**


### indentWithTabs

Set if need to indent with tabs or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### lineWrapping

Specify if need to wrap long lines or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### lineNumbers

Display or not the line numbers

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### onUpdate

When an update has been made

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### compile

Compile the code before injecting it into the iframe.
This function specified here will receive as parameters:
1. The code string to compile
2. The language in which to compile the code
3. The compileOptions object if provided for this particular language
This function has to return an object formated like this:
```js
return {
	language : 'css',
	data : '...'
};
```

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### compileOptions

Compile options by language

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**

Default : **null**


### displayActions

Specify the display action mode. Can be "hover" or "always"

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **hover**


### updateOn

Specify when to trigger the update

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Values : **change,run**

Default : **change**


### runLabel

Specify the run label

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **Run**


### compilingLabel

Specify the compiling label

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **Compiling...**


### compiledLabel

Specify the compiled label

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **Compiled!**


### compileErrorLabel

Specify the compile error label

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **Compilation error...**


### copyEnabled

Specify if the copy feature is enables or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### copyLabel

Specify the copy to clipboard label

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **Copy**


### updateTimeout

Update timeout when the updateOn property is on "change"

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **0**


### title

Set the title of the editor

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### accept

Set the accepted modes (comma separated modes)

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### processCodeAtStart

Specify if want to process the code at start or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**



## Properties


### value

Get editor value

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**


## Methods


### refresh

Refresh the editor


### isCompiling

Check if is compiling or not

Return **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }** Return if the editor is in compile phase