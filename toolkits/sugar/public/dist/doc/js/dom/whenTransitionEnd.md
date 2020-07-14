


<!-- @namespace    sugar.js.dom -->
<!-- @name    whenTransitionEnd -->

# ```js whenTransitionEnd ```


Monitor an HTMLElement to be notified when his transition has ended

## Parameters

- **elm**  HTMLElement: The element to monitor

- **cb**  Function: An optional callback to call when the element transition has ended



## Example (js)

```js
import whenTransitionEnd from '@coffeekraken/sugar/js/dom/whenTransitionEnd'
whenTransitionEnd(myCoolHTMLElement).then((elm) => {
		// do something with your element transition has ended...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



