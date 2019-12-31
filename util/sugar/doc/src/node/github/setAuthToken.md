# setAuthToken

<!-- @namespace: sugar.node.github.setAuthToken -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Set the github authentification token that will be used by all the sugar github related functions



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
username  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The username to use as authentification  |  required  |
token  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The token generated on github.com  |  required  |

### Example
```js
	const setAuthToken = require('@coffeekraken/sugar/node/github/setAuthToken');
setAuthToken('olivierbossel', '3a182619e6cf6dd2bc1ec2ca98f80a9ee8e7eaf2');
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)