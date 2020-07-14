# setAppMeta

<!-- @namespace: sugar.node.app.setAppMeta -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Set some application meta data that will be reused in some others functions/utilities, etc...



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
meta  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  The meta data to set  |  required  |
override  |  **{ (Boolean }**  |  If false, the passed meta data will be merged with the current one. If true, all the current meta will be overrided  |  optional  |  false

Return **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }** The meta data object setted

### Example
```js
	const setAppMeta = require('@coffeekraken/sugar/node/app/setAppMeta');
setAppMeta({ name: 'My Cool App', version: '1.0.0' });
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)