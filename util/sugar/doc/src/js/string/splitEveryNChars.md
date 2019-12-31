# splitEveryNChars

<!-- @namespace: sugar.js.string.splitEveryNChars -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Split a string every n characters and return an array of the splited parts



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
string  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The string to split  |  required  |
n  |  **{ Integer }**  |  At how many characters to split the string  |  required  |

Return **{ [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) }** An array of the splited string parts

### Example
```js
	import splitEveryNChars from '@coffeekraken/sugar/js/string/splitEveryNChars';
splitEveryNChars('abcabcabcabcabcabcabc', 3); // => ['abc','abc','abc','abc','abc','abc','abc']
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)