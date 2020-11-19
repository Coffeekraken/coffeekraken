# log

<!-- @namespace: sugar.node.log.log -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Simply log your messages with different levels as 'error','warning','info','verbose','debug' or 'silly'.
Your messages will be saved in some separed files under the '.logs' directory.



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
message  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  Your message to log  |  required  |
level  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The level of your log  |  optional  |  'info'

### Example
```js
	const log = require('@coffeekraken/sugar/node/log/log');
log('Hello world');
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)