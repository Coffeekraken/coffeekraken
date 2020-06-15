


<!-- @namespace    sugar.js.object -->
<!-- @name    sort -->

# ```js sort ```


Sort an object properties the same way as the Array.sort do it

## Parameters

- **object**  Object: The object to sort

- **sort**  Function: The sort function to use



## Example (js)

```js
import sortObject from '@coffeekraken/sugar/js/object/sort';
sortObject({
   coco: { weight: 10 },
   lolo: { weight: 2 },
   plop: { weight: 5 }
}, (a, b) => {
  return a.weight - b.weight;
});
// {
//   lolo: { weight: 2 },
//   plop: { weight: 5 },
//   coco: { weight: 10 }
// }
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



