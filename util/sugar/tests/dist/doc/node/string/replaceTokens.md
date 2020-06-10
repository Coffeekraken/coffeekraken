


<!-- @namespace    sugar.js.string -->

# ```js replaceTokens ```
### Since: 2.0.0

This function takes as parameter a tokened string like "something [cool]", an object
of arguments/values and return the processed string with the tokens replaced by the arguments values.

## Parameters

- **string**  String: The string to process

- **argsObj**  Object: The arguments/value object

- **settings** ([object Object]) Object: A settings object to configure the parsing process
- regexp ('\\[([a-zA-Z0-9-_]+)\\]') {String}: Specify the token reg to use for detecting/replacing values
- stripUndefined (true) {Boolean}: Specify if you want to strip the tokens that doesn't have any value passed



## Example (js)

```js
import replaceTokens from '@coffeekraken/sugar/js/string/replaceTokens';
replaceTokens('hello [world]', { world: 'Coco' }); // => hello Coco
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



