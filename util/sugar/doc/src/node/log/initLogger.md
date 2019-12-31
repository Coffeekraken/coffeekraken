# initLogger

<!-- @namespace: sugar.node.log.initLogger -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Init a winston logger object with the passed settings or with default onces...



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
winstonSettings  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  Pass some winston settings to override the defaults settings  |  optional  |  {}
logsPath  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  Define the folder where to save the logs files  |  optional  |  process.cwd() + '/.logs

### Example
```js
	const initLogger = require('@coffeekraken/sugar/node/log/initLogger');
const myLogger = initLogger({ exitOnError: true });
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)