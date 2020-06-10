


<!-- @namespace    sugar.js.dom -->

# ```js querySelector ```


Enhanced proxy of the Element.querySelector function that let you specify
if you want an element that is visible, or even that is in the viewport

## Parameters

- **selector**  String: The css selector to search

- **settings**  Object: The settings of the query



## Example (js)

```js
import querySelector from '@coffeekraken/sugar/js/dom/querySelector';
// simple query
const elm = querySelector('.a-cool-css-selector');

// get an element that is in the viewport
const elm = querySelector('.a-cool-css-selector', {
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

