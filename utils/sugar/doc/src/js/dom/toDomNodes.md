# toDomNodes

<!-- @namespace: sugar.js.dom.toDomNodes -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Return a usable nodeTree from a variable source like selector, an html string, an html template tag or a node that will be cloned.



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
source  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) , [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }**  |  The source of the template (html string, selector, node element)  |  required  |

Return **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }** An HTMLElement node tree that represent the template

### Example
```js
	import toDomNodes from '@coffeekraken/sugar/js/dom/toDomNodes';
toDomNodes('<span>Hello World</span>');
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)