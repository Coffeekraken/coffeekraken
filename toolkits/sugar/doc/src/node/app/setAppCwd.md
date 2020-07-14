# setAppCwd

<!-- @namespace: sugar.node.app.setAppCwd -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Set the application "current working directory". This can be different of the 'process.cwd()' value



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
cwd  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The current working directory to set  |  required  |

Return **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }** The current working directory setted

### Example
```js
	const setAppCwd = require('@coffeekraken/sugar/node/app/setAppCwd');
setAppCwd('/users/coco/myCoolApplication');
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)