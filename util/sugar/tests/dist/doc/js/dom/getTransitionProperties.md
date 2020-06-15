


<!-- @namespace    sugar.js.dom -->
<!-- @name    getTransitionProperties -->

# ```js getTransitionProperties ```


Get the css transition properties from an HTMLElement in an object format

## Parameters

- **elm**  HTMLElement: The element to get the properties from



## Example (js)

```js
import getTransitionProperties from '@coffeekraken/sugar/js/dom/getTransitionProperties'
const props = getTransitionProperties(myCoolHTMLElement);
// output format
// {
// 	property : ['all'],
// 	duration : [200],
// 	delay : [0],
// 	timingFunction : ['linear'],
// 	totalDuration : 200
// }
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



