# initApp

<!-- @namespace: sugar.node.app.initApp -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Initialize the app by doing:
- Setting the app meta using the 'setAppMeta' function and trying to read the 'package.json' file
- Initializing the 'process.env' stack using the 'dotenv' package
- Setting the 'package.json' content inside the 'process.env.PACKAGE' variable
- Printing in the console the application header with the infos like 'name', 'description', 'version', etc...

The 'settings' object must have this structure:
'''js
{
   meta: { }, // object passed to the 'setAppMeta' function
   env: { }, // object that will be setted in the 'process.env' stack
   cwd: getAppCwd() // the "current working directory" where the application lives. Can be different that the `process.cwd()`
}
'''



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
settings  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  The settings object to init the app  |  optional  |  {}

### Example
```js
	const initApp = require('@coffeekraken/sugar/node/app/initApp');
initApp();
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)