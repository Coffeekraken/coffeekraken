# getAuthToken

<!-- @namespace: sugar.node.github.getAuthToken -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Get back the authentification informations (username, token) setted using the 'setAuthToken' function


Return **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }** Return back the auth token object formated like so : username, token

### Example
```js
	const getAuthToken = require('@coffeekraken/node/github/getAuthToken');
console.log(getAuthToken()); // => { username: '...', token: '...' }
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)