# prependChild

<!-- @namespace: sugar.js.dom.prependChild -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Prepend an HTMLElement into another HTMLElement



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
elm  |  **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }**  |  The element to prepend  |  required  |
refElm  |  **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }**  |  The element in which to prepend the new element  |  required  |

### Example
```js
	import prependChild from '@coffeekraken/sugar/js/dom/prependChild'
prependChild(myElementToInsert, theReferenceElement);
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)