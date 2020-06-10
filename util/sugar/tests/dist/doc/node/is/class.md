


<!-- @namespace    sugar.js.is -->

# ```js class ```


Check if the passed variable (or array of variables) is/are plain variable(s)

## Parameters

- **variable**  Mixed,Array: The variable(s) to check



## Example (js)

```js
import isClass = from '@coffeekraken/sugar/js/is/class';
isClass({ hello: 'world'}); // => false
const myCoolClass = class Coco{};
isClass(myCoolClass); // => true
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



