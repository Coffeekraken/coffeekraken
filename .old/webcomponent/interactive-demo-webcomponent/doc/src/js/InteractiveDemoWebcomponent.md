# InteractiveDemoWebcomponent

Extends **SWebComponent**

<!-- @namespace: interactive-demo-webcomponent.InteractiveDemoWebcomponent -->

Type : **{ Class }**


Provide a nice webcomponent to display interactive html/css/js demo (codepen like).


### Example
```html
	<ck-interactive-demo>
	<ck-codemirror language="html">
 	<h1>My Cool demo</h1>
 </ck-codemirror>
	<ck-codemirror language="css">
 	h1 {
 		color : red
 	}
 </ck-codemirror>
</ck-interactive-demo>
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)




## Attributes

Here's the list of available attribute(s).

### scripts

Script to load inside the demo

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) , [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) }**

Default : **null**


### styles

Styles to load inside the demo

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) , [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) }**

Default : **null**


### resizePreview

Automatically resize the preview

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### hide

Array of editors ids to hide by default

Type : **{ [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) }**

Default : **[]**


### displayToggles

Display toggles

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**