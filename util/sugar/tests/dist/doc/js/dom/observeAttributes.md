


<!-- @namespace    sugar.js.dom -->

# ```js observeAttributes ```


Observe attributes on an HTMLElement and get mutations through the SPromise instance

## Parameters

- **target**  HTMLElement: The element to observe

- **settings**  MutationObserverInit: The mutation observer settings



## Example (js)

```js
import observeAttributes from 'sugarcss/js/dom/observeAttributes'
const observer = observeAttributes(myCoolHTMLElement).then(mutation => {
		// do something with the mutation
});
// cancel the observer
observer.cancel();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js attributes ```






### Author
- 

