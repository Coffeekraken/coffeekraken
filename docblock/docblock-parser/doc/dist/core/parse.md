# parse

Parse the given string to extract the docblock in JSON format


### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
stringToParse  |  **{ string }**  |  The string to extract the docblocks JSON from  |  required  |
language  |  **{ string }**  |  The language of the string to parse (js, scss, etc...)  |  optional  |  null

Return **{ [JSON](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/JSON) }** The docblocks in JSON format

### Example
```js
	const docblockParser = require('coffeekraken-docblock-parser');
const jsonDocblocks = docblockParser({
	// override some configs here
}).parse(myStringToParse);
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)