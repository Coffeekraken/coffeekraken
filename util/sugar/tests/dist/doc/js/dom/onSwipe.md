


<!-- @namespace    sugar.js.dom -->
<!-- @name    onSwipe -->

# ```js onSwipe ```


Detect swipes gestures on touch devices.

## Parameters

- **elm**  HTMLElement: The HTMLElement on which to detect the swipe

- **cb**  Function: The function to call on swipe. The callback function has as parameter an object that containthe swipe direction like left, right, up and down

- **threshold** (100) Number: The swipe threshold



## Example (js)

```js
import onSwipe from '@coffeekraken/sugar/js/dom/onSwipe'
onSwipe(myCoolElm, (swipe) => {
	// check the swipe direction
	if (swipe.left) {
		// do something...
	}
	// support : left, right, up, down
	// etc...
}, {
	threshold : 50
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



