


<!-- @namespace    sugar.js.dom -->

# ```js previous ```


Browse the passed element previous siblings to find the first element that matches the passed selector

## Parameters

- **elm**  HTMLElement: The element to start on

- **selector**  String: A css selector to search for



## Example (js)

```js
import previous from '@coffeekraken/sugar/js/dom/previous'
const previousElm = previous(myCoolElement, '.my-cool-class');
if (previousElm) {
		// we have found en element that matches the selector
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



