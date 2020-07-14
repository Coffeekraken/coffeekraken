


<!-- @namespace    sugar.js.dom -->
<!-- @name    whenInViewport -->

# ```js whenInViewport ```


Monitor an HTMLElement to be notified when it is in the viewport

## Parameters

- **elm**  HTMLElement: The element to monitor

- **offset** (50) Number: An offset that represent the distance before entering the viewport for the detection



## Example (js)

```js
import whenInViewport from '@coffeekraken/sugar/js/dom/whenInViewport'
whenInViewport(myCoolHTMLElement).then((elm) => {
		// do something with your element that has entered the viewport...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



