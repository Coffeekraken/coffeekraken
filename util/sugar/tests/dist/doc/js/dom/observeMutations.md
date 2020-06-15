


<!-- @namespace    sugar.js.dom -->
<!-- @name    observeMutations -->

# ```js observeMutations ```


Observe mutations on an HTMLElement and get them through the observable subscription.
You can pass the mutation observer settings through the second argument. By default, here's his values:
- attributes: true,
- childList: false,
- subtree: false

## Parameters

- **$target**  HTMLElement: The element to observe

- **settings** ([object Object]) MutationObserverInit: The mutation observer settings



## Example (js)

```js
import observeMutations from '@coffeekraken/sugar/js/dom/observeMutations'
const promise = observeMutations(myElement).then(mutation => {
   // do something with the mutation
});
// stop listening for mutations
promise.cancel();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



