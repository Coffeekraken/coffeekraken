


<!-- @namespace    sugar.js.string -->

# ```js autoCast ```


Auto cast the string into the correct variable type

## Parameters

- **string**  String: The string to auto cast



## Example (js)

```js
import autoCast from '@coffeekraken/sugar/js/strings/autoCast'
autoCast('12') // => 12
autoCast('window.HTMLElement') // => HTMLElement
autoCast('{"hello":"world"}') // {hello:'world'}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



