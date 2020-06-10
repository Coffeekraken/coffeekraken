


<!-- @namespace    sugar.node.object -->

# ```js deepDiff ```


Take two objects and return an object that contains only the differences between them

## Parameters

- **origin**  Object: The original object to compare

- **compare**  Object: The object to compare to the original one



## Example (js)

```js
const deepDiff = require('@coffeekraken/sugar/node/object/deepDiff');
const origin = { hello: 'world', plop: 'yop' };
const compare = { hello: 'world' };
deepDiff(origin, compare); // => { plop: 'yop' }
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



