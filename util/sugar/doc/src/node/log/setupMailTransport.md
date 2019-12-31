# setupMailTransport

<!-- @namespace: sugar.node.log.setupMailTransport -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Setup a mail transport to send your logs to a certain email address



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
emails  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) , [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) }**  |  The emails where you want to send the logs to  |  required  |
level  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The levels that you want to be send by email  |  optional  |  'error'
winstonMailSettings  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  Some [winston-mail](https://github.com/wavded/winston-mail) settings that you want to override  |  optional  |  {}

### Example
```js
	const setupMailTransport = require('@coffeekraken/sugar/node/log/setupMailTransport');
setupMailTransport(['hello@world.com', 'plop@youhou.com'], 'error', {});
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)