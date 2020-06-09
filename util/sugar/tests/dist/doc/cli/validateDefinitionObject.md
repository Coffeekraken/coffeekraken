
# Function


## ```js validateDefinitionObject ```
### Since: 2.0.0

This function take a definition object as parameter and check if all is valid.

## Parameters

- **definitionObj**  Object: The definition object to check



## Example (js)

```js
import validateDefinitionObject from '@coffeekraken/sugar/js/cli/validateDefinitionObject';
const definition = {
   arg1: {
     type: 'String',
     alias: 'a',
     description: 'Something cool',
     default: 'hello'
   }
}
validateDefinitionObject(definition); // => true
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



