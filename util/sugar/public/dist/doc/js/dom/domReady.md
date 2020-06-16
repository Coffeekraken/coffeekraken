


<!-- @namespace    sugar.js.dom -->
<!-- @name    domReady -->

# ```js domReady ```


Wait that the dom is ready before resolving the promise

## Parameters

- **cb**  Function: An optional callback that will be called when the dom is ready



## Example (js)

```js
import domReady from '@coffeekraken/sugar/js/dom/domReady'
// using callback
domReady(() => {
		// do something
});
// using promise
domReady().then(() => {
		// do something
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



