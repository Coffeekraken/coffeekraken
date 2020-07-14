


<!-- @namespace    sugar.js.dom -->
<!-- @name    whenOutOfViewport -->

# ```js whenOutOfViewport ```


Monitor an HTMLElement to be notified when it exit the viewport

## Parameters

- **elm**  HTMLElement: The element to monitor

- **offset** (50) Number: An offset that represent the distance before entering the viewport for the detection



## Example (js)

```js
import whenOutOfViewport from '@coffeekraken/sugar/js/dom/whenOutOfViewport'
whenOutOfViewport(myCoolHTMLElement).then((elm) => {
		// do something with your element that has exit the viewport...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



