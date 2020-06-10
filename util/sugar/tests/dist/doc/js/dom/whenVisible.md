


<!-- @namespace    sugar.js.dom -->

# ```js whenVisible ```


Monitor an HTMLElement to be notified when it is visible

## Parameters

- **elm**  HTMLElement: The element to monitor

- **cb**  Function: An optional callback to call when the element is visible



## Example (js)

```js
import whenVisible from '@coffeekraken/sugar/js/dom/whenVisible'
whenVisible(myCoolHTMLElement).then((elm) => {
		// do something with your element that is now visible
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



