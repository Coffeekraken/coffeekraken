# downloadFile

<!-- @namespace: sugar.node.file.downloadFile -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Download a file and save it on the file system



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
downloadUrl  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The absolute url to the file that you want to download  |  required  |
destinationPath  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The path where you want to save the file. Can be a simple directory path or an absolute file path with the file name and the extension  |  optional  |  __downloadsFolder()
callback  |  **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**  |  A callback function to call on success or on error. In case of success it will take as parameter the final file path on the file system, otherwise it will be the error passed  |  optional  |  null

Return **{ [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise) }** A promise that will be resolved with the final absolute file path, or rejected with the error passed

### Example
```js
	const downloadFile = require('@coffeekraken/node/file/downloadFile');
downloadFile('https://myCoolFileUrl.ch/coco.json').then((dest) => {
   console.log('file downloeaded and saved here', dest);
}).catch(err) => {});
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)