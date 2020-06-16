


<!-- @namespace    sugar.js.dom -->
<!-- @name    imagesLoaded -->

# ```js imagesLoaded ```


Detect when some images are loaded. This function take advantage of the SPromise class
and expose a callback registration function called "img" that will be triggered on each loaded images. See in the example bellow.

## Parameters

- **$imgs**  Array<HTMLImageElement>: An array (or nodeList) of HTMLImageElement to detect the load



## Example (js)

```js
import imagesLoaded from '@coffeekraken/sugar/js/dom/imagesLoaded'
imagesLoaded([
	$img1, $img2, $img3
]).img($img => {
   // do something with the loaded image
}).then(() => {
  // do something here
})
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



