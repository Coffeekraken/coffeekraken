# dataset

<!-- @namespace: sugar.js.dom.dataset -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Get or set a value on the passed element with the passed name



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
elm  |  **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }**  |  The HTMLElement on which to set to value  |  required  |
key  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The key to set the data  |  required  |
key  |  **{ Mixed }**  |  The value to set  |  optional  |  null

Return **{ Mixed }** Return the value wanted or setted

### Example
```js
	import dataset from '@coffeekraken/sugar/js/dom/dataset';
dataset(myCoolElement, 'hello', 'world'); // => 'world';
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)