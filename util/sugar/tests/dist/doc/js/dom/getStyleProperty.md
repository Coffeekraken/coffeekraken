


<!-- @namespace    sugar.js.dom -->

# ```js getStyleProperty ```


Get a style property on the passed element through the computed style.
This function try to store the actual style to not trigger more that 1 redraw
each js execution loop.

## Parameters

- **elm**  HTMLElement: The element to get style from

- **property**  String: The css property to get



## Example (js)

```js
import getStyleProperty from '@coffeekraken/sugar/js/dom/getStyleProperty'
const opacity = getStyleProperty(myCoolHTMLElement, 'opacity');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



