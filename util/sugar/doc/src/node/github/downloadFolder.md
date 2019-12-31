# downloadFolder

<!-- @namespace: sugar.node.github.downloadFolder -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Provide the ability to download all the files in a particular folder of a specific repository



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
repo  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The repository name (path) in which live the folder that you want to download  |  required  |
path  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The folder path that you want to download  |  required  |
destinationPath  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The folder in which you want to save the downloaded one  |  optional  |  __downloadsFolder()

Return **{ [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise) }** A promise that will be resolved with the saved absolute files pathes, or rejected with the error passed

### Example
```js
	const downloadFolder = require('@coffeekraken/sugar/node/github/downloadFolder');
downloadFolder('Coffeekraken/coffeekraken', 'style/button-style').then((response) => {
   console.log('response', response);
}).catch((error) => { console.log(error); });
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)