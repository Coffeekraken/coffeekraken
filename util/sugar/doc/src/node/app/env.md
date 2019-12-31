# env

<!-- @namespace: sugar.node.app.env -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Initialize some data into the 'process.env' stack like '.env' and 'package.json' files...
Sources:
- `.env` file at `process.cwd()` path
- `package.json` file at `process.cwd()` path
- Setting the 'package.json' content inside the 'process.env.PACKAGE' variable


Return **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }** Return the `process.env` object stack

### Example
```js
	const env = require('@coffeekraken/sugar/node/app/env');
env();
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)