# constructorName

<!-- @namespace: sugar.js.object.constructorName -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Return the constructor name of the passed object



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
obj  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  The object to get the constructor name from  |  required  |

Return **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }** The constructor name

### Example
```js
	import constructorName from '@coffeekraken/sugar/js/object/constructorName';
class MyCoolClass {
		// class implementation...
}
const myObj = new MyCoolClass();
console.log(constructorName(myObj)); => MyCoolClass
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)