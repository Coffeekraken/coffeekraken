


<!-- @namespace    sugar.js.string -->
<!-- @name    extractSame -->

# ```js extractSame ```
### Since: 2.0.0

This function return you what has been find the same in the two passed string.
It will return you either an array of same string parts or a simple string
representing the first same part found.

## Parameters

- **string1**  String: The string 1 to compare

- **string2**  String: The string 2 to compare

- **multiple**  Boolean: Specify if you want to get back multiple same string if exists as an array



## Example (js)

```js
import extractSame from '@coffeekraken/sugar/js/string/extractSame';
extractSame('Hello world', 'Hello plop'); // => 'Hello '
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



