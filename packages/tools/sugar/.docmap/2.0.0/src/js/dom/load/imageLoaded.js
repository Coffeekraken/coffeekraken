/**
*
* @name      imageLoaded
* @namespace            js.dom.load
* @type      Function
* @platform          js
* @platform          ts
* @status        beta
*
* Wait until the passed image is fully loaded
*
* @feature         Promise based API
* @feature         Callback support
*
* @param 		{HTMLImageElement} 			$img  		The image to check the loading state
* @param 		{Function}					[cb=null] 	An optional callback to call
* @return 		{SPromise} 								The promise that will be resolved when all the images are correctly loaded
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example  	js
* import imageLoaded from '@coffeekraken/sugar/js/dom/imageLoaded'
* imageLoaded(myCoolHTMLImageElement).then(($img) => {
* 		// do something when the image is loaded
* });
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/