# DrawerWebcomponent

Type : **{ Class }**

Extends **SWebComponent**


Simple webcomponent to create fully customizable drawers.
Features:
1. Fully customizable
2. Support all sides (top, right, bottom and left)
3. Support 3 animation types (push, slide and reveal)


### Example
```scss
	@use 'node_modules/@coffeekraken/drawer-webcomponent/index' as drawer-webcomponent;
@include drawer-webcomponent.classes(
	$name : menu,
	$side : right
);
@include drawer-webcomponent.element(drawer) {
	background-color: black;
	padding: 20px;
}
@include drawer-webcomponent.element(overlay) {
	background-color: rgba(0,0,0,.5);
}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)




## Attributes

Here's the list of available attribute(s).

### name

Specify the name of the drawer to be able to access it later through the API

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### closeOnLinksClick

Close the drawer when click on a link inside it

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### escapeKey

Specify is the `escape` key is activated and close the drawer if is opened

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### handleHash

Specify if need to check the hash to automatically open the drawer if match with the name

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### preventContentScroll

Prevent the content from scrolling when the drawer is opened.
This will override your transitions on the content so be aware of that...

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**



## Properties


### open

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Open the drawer


Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### close

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Close the drawer


Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)