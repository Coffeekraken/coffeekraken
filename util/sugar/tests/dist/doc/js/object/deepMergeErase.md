


<!-- @namespace    sugar.js.object -->

# ```js deepMergeErase ```


This function allows you to tell the deepMerge one to use ONLY the passed value as final value and to not merge it as normal...
This seemd maybe a little bit weird but it will be more understandable in the example bellow...

## Parameters

- **obj**  Object: The object to keep as final value. It will erase the object of the other object



## Example (js)

```js
import deepMerge from '@coffeekraken/sugar/node/object/deepMerge';
import deepMergeErase from '@coffeekraken/sugar/node/object/deepMergeErase';
const obj1 = {
   value: {
     hello: 'world',
     coco: 'plop'
   }
};
const obj2 = {
   value: deepMergeErase({
     yop: 'cool value'
   })
};
deepMerge(obj1, obj2);
{
   value: {
     yop: 'cool value'
   }
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



