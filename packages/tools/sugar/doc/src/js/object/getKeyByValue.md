# getKeyByValue

<!-- @namespace: sugar.js.object.getKeyByValue -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Return the key that correspond to the passed value in the passed object



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
object  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  The object in which to search for the value  |  required  |
value  |  **{ Mixed }**  |  The value to find in the object  |  required  |

Return **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }** The key of the wanted value or false if not found

### Example
```js
	import getKeyByValue from '@coffeekraken/sugar/js/object/getKeyByValue';
console.log(getKeyByValue({ hello: 'world' }, 'world')); // => hello
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)