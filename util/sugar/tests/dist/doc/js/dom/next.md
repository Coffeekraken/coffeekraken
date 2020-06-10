


<!-- @namespace    sugar.js.dom -->

# ```js next ```


Browse the passed element next siblings to find the first element that matches the passed selector

## Parameters

- **elm**  HTMLElement: The element to start on

- **selector**  String: A css selector to search for



## Example (js)

```js
import next from '@coffeekraken/sugar/js/dom/next'
const nextElm = next(myCoolElement, '.my-cool-class');
if (nextElm) {
		// we have found en element that matches the selector
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



