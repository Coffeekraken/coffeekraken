


<!-- @namespace    sugar.js.cli -->

# ```js argsToObject ```
### Since: 2.0.0

This function take a simple object, a definitionObj object and return you the string version that you can pass
directly to the command line interface

## Parameters

- **argsObj**  Object,String: The arguments object or string

- **definitionObj**  Object: The definitionObj object that has to be formated like so:



## Example (js)

```js
import argsToObject from '@coffeekraken/sugar/js/cli/argsToObject';
argsToObject('-a Yop, {
   arg1: {
     type: 'String',
     alias: 'a',
     default: 'Plop'
   },
   myOtherArg: {
     type: 'String'
   },
   lastArg: {
     type: 'String',
     alias: 'l',
     default: 'Nelson'
   }
});
// => { arg1: 'Yop', lastArg: 'Nelson' }
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



