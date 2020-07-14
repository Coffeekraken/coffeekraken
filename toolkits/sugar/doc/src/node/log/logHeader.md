# logHeader

<!-- @namespace: sugar.node.log.logHeader -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Log a header message containing infos like passed title, passed description and passed infos {Object}.



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
title  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The title to display  |  required  |
description  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The description to display  |  optional  |  null
infos  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  An object of infos to display in {key}: {value} format  |  optional  |  {}

### Example
```js
	const logHeader = require('@coffeekraken/sugar/node/log/logHeader');
logHeader('Hello World', 'Something cool to say about the application...', { version: '1.0.0' });
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)