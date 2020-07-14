


<!-- @namespace    sugar.js.cli -->
<!-- @name    validateWithDefinitionObject -->

# ```js validateWithDefinitionObject ```
### Since: 2.0.0

This function take an object, a definition object and validate this one depending on the definition...
A definition object is a plain object that specify for each properties, some requirerments like the type, if it is required or not, etc...
For more documentation about the definition objects, check the "validateDefinitionObject" function doc.

## Parameters

- **objectToCheck**  Object: The object to check using the definition one

- **definitionObj**  Object: The definition object to use

- **validateDefinitionObject** (true) Boolean: Specify if you want to validate the passed definition object first or not



## Example (js)

```js
import validateWithDefinitionObject from '@coffeekraken/sugar/js/object/validateWithDefinitionObject';
validateWithDefinitionObject({
   arg1: 'hello',
   arg2: false
}, {
   arg1: {
     type: 'String',
     required: true
   },
   arg2: {
     type: 'Boolean',
     required: true
   }
}); // => true
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



