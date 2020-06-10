


<!-- @namespace    sugar.js.dom -->

# ```js imageLoaded ```


Wait until the passed image is fully loaded

## Parameters

- **$img**  HTMLImageElement: The image to check the loading state

- **cb**  Function: An optional callback to call



## Example (js)

```js
import imageLoaded from '@coffeekraken/sugar/js/dom/imageLoaded'
imageLoaded(myCoolHTMLImageElement).then(($img) => {
		// do something when the image is loaded
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



