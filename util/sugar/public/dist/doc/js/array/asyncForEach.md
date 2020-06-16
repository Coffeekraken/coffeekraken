


<!-- @namespace    sugar.js.array -->
<!-- @name    asyncForEach -->

# ```js asyncForEach ```


Allow to make some async foreach on your arrays

## Parameters

- **array**  Array: The array to loop on

- **asyncFn**  Function: The async function to call on each items



## Example (js)

```js
import asyncForEach from '@coffeekraken/sugar/js/array/asyncForEach';
const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
asyncForEach([0,1,2,3], async (item) => {
   await waitWor(50);
   console.log(item);
});
// 0
// 1
// 2
// 3
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



