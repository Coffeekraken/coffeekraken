
# Function


## ```js deepMerge ```


Deep merge one object with another and return the merged object result

## Parameters

- **objects...**  Object: Pass all the objects you want to merge



## Example (js)

```js
import deepMerge from '@coffeekraken/sugar/node/object/deepMerge';
deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
// => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



