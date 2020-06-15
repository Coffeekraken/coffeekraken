


<!-- @namespace    sugar.js.dom -->
<!-- @name    closest -->

# ```js closest ```


Go up the dom three to find the first element that matches the passed selector

## Parameters

- **$elm**  HTMLElement: The element to start on

- **selector**  String,Function: A css selector to search for or a check function that will be used



## Example (js)

```js
import closest from '@coffeekraken/sugar/js/dom/closest'
const closestElm = closest(myCoolElement, '.my-cool-class');
if (closestElm) {
		// we have found en element that matches the selector
}
// the selector param can be a function that need to return either true or false like so:
closest(myCoolElement, (elm) => {
  return elm.hasAttribute('my-cool-attribute')
})
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



