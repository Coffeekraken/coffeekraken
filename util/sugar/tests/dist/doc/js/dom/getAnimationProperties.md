


<!-- @namespace    sugar.js.dom -->
<!-- @name    getAnimationProperties -->

# ```js getAnimationProperties ```


Get the css animation properties from an HTMLElement in an object format

## Parameters

- **elm**  HTMLElement: The element to get the properties from



## Example (js)

```js
import getAnimationProperties from '@coffeekraken/sugar/js/dom/getAnimationProperties'
const props = getAnimationProperties(myCoolHTMLElement);
// output format
// {
// 	name : ['animation1'],
// 	duration : [200],
// 	delay : [0],
// 	timingFunction : ['linear'],
// 	iterationCount : [1],
// 	direction : ['forward'],
// 	totalDuration : 200
// }
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



