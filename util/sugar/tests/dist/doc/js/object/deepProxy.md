


<!-- @namespace    sugar.js.object -->

# ```js deepProxy ```


This function allows you to add Proxy to an object in deep fashion.
Normally the Proxy process only the level on which it has been added. Here we add Proxy to all the
object levels and to new properties as well.

## Parameters

- **object**  Object: The object on which to add the proxy

- **handlerFn**  Function: The handler function that will be called with the update object. It can be a property deleted, an array item added, a property updated, etc...:
- Object.set: An object property added or updated
- Object.delete: An object property deleted
- Array.push: An item has been added inside an array
- Array.{methodName}: Every array actions


## Example (js)

```js
import deepProxy from '@coffeekraken/sugar/js/object/deepProxy';
const a = deepProxy({
   hello: 'world'
}, (actionObj) => {
   // do something with the actionObj...
});
a.hello = 'coco';
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



