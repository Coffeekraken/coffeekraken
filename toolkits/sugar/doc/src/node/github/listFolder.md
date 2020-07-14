# listFolder

<!-- @namespace: sugar.node.github.listFolder -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


List a github folder and return the JSON formated github API response



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
repo  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The repository name that you want to list the folder in  |  required  |
path  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The path inside the repository to the folder that you want to list  |  optional  |  ''

Return **{ [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise) }** A promise that will be resolved with the JSON as parameter, or rejected with the error

### Example
```js
	const listFolder = require('@coffeekraken/node/github/listFolder');
listFolder('Coffeekraken/coffeekraken', 'style/button-style').then((response) => {
   console.log('response', response);
}).catch((error) => {});
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)