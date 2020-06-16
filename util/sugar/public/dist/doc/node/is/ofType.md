


<!-- @namespace    sugar.js.is -->
<!-- @name    ofType -->

# ```js ofType ```
### Since: 2.0.0

This function take the value to check and an argument type definition string like "String", "Array<String>", etc... and return true or false depending
if the value pass the test or not...

## Parameters

- **value**  Mixed: The value to check

- **argTypeDefinition**  String: The argument type definition string to use for the test

- **returnError**  Boolean: Specify if you want the error string to be returned



## Example (js)

```js
import isOfType from '@coffeekraken/sugar/js/is/ofType';
ifOfType(true, 'Boolean'); // => true
isOfType(12, 'String|Number'); // => true
isOfType(['hello',true], 'Array<String>'); // => false
isOfType(['hello',true], 'Array<String|Boolean>'); // => true
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



