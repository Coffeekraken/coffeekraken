


<!-- @namespace    sugar.js.dom -->
<!-- @name    scrollTo -->

# ```js scrollTo ```


Function that let you make a smooth page scroll to a specific element in the page

## Parameters

- **target**  HTMLElement: The element to scroll to

- **duration** (1000) Number: The animation duration

- **easing** (easeInOutQuad) Function: An easing Function

- **offset**  Number: The destination offset

- **align** (top) String: The destination align (top, center, bottom)

- **onFinish**  Function: A callback to call when the animation if finished



## Example (js)

```js
import scrollTop from '@coffeekraken/sugar/js/dom/scrollTo'
import easeInOutQuad from '@coffeekraken/sugar/js/easings/easeInOutQuad'
scrollTo(myCoolHTMLElement);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



