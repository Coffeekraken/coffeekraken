


<!-- @namespace    sugar.js.dom -->
<!-- @name    closestNotVisible -->

# ```js closestNotVisible ```


Go up the dom three to find the first element that is not visible.
Not visible mean that has either an opacity to 0, a visibility to hidden or a display to none

## Parameters

- **elm**  HTMLElement: The element to start on



## Example (js)

```js
import closestNotVisible from 'sugarcss/js/dom/closestNotVisible'
const closestElm = closestNotVisible(myCoolElement);
if (closestElm) {
		// we have found en element that is not visible
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



