


<!-- @namespace    sugar.js.dom -->
<!-- @name    linkLoaded -->

# ```js linkLoaded ```


Wait until the passed HTMLLinkElement is fully loaded

## Parameters

- **link**  HTMLLinkElement: The link tag to check the loading state

- **cb**  Function: An optional callback to call



## Example (js)

```js
import linkLoaded from '@coffeekraken/sugar/js/dom/linkLoaded'
linkLoaded(myCoolHTMLLinlElement).then((link) => {
		// do something when the link is loaded
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



