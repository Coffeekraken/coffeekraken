


<!-- @namespace    sugar.js.is -->
<!-- @name    validateWithDefinitionObject -->

# ```js validateWithDefinitionObject ```
### Since: 2.0.0

This function take an property value and an argument definition object
to check if the passed value is valid

## Parameters

- **value**  Mixed: The value to check

- **definitionObj**  Object: The argument definition object

- **validateDefinitionObj** (true) Boolean: Specify if you want to validate the passed definition object first or not



## Example (js)

```js
import isValidateWithDefinitionObject from '@coffeekraken/sugar/js/is/validateWithDefinitionObject';
isValidateWidthDefinitionObject('something', {
   type: 'String',
   required: true
}); // => true
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



