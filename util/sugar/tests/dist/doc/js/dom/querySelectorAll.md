


<!-- @namespace    sugar.js.dom -->

# ```js querySelectorAll ```


Enhanced proxy of the Element.querySelectorAll function that let you specify
if you want elements that are visible, or even that are in the viewport

## Parameters

- **selector**  String: The css selector to search

- **settings**  Object: The settings of the query



## Example (js)

```js
import querySelectorAll from '@coffeekraken/sugar/js/dom/querySelectorAll';
// simple query
const elms = querySelectorAll('.a-cool-css-selector');

// get elements that are in the viewport
const elms = querySelectorAll('.a-cool-css-selector', {
		inViewport : true
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js visible ```






### Author
- 





# ```js inViewport ```






### Author
- 





# ```js rootNode ```






### Author
- 

