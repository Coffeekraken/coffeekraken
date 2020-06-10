


<!-- @namespace    sugar.js.parse -->

# ```js argumentTypeDefinitionString ```
### Since: 2.0.0

Thia function take an argument type definition string like "String", "Array<String>", "Array|String", etc... and return an object that represent this.

## Parameters

- **argTypeString**  String: The argument type definition string



## Example (js)

```js
import argumentTypeDefinitionString from '@coffeekraken/sugar/js/parse/argumentTypeDefinitionString';
argumentTypeDefinitionString('Array'); // => [{ type: 'array', of: null }] }
argumentTypeDefinitionString('Array<String>'); // => [{ type: 'array', of: [{ type: 'string' }] }]
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



