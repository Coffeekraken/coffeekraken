# Methods

Factory function that gives back a docblock parser instance.


### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
config  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  A config object  |  required  |

Return **{ DocblockParser }** A DocblockParser instance

### Example
```js
	const docblockParser = require('coffeekraken-docblock-parser');
const jsonDocblocks = docblockParser({
	// override some configs here
}).parse(myStringToParse);
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)