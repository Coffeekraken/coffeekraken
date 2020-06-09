
# Function


## ```js argsToString ```
### Since: 2.0.0

This function take a simple object, a definition object and return you the string version that you can pass
directly to the command line interface

## Parameters

- **args**  Object: The arguments object

- **definition**  Object: The definition object that has to be formated like so:
- argName: The argument name to describe
   - type: The type of the value supported
   - alias: The alias of the full name like "t", "l", etc...
   - default: The default value if nothing is specified
   - regexp: A regexp that is used to validate the passed value
   - validator: A function to validate the passed value. Has to return true or false
- **includeAllArgs** (true) Boolean: Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument



## Example (js)

```js
import argsToString from '@coffeekraken/sugar/js/cli/argsToString';
argsToString({
   arg1: 'Hello',
   myOtherArg: 'World'
}, {
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
// => -a Hello --myOtherArg World
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



