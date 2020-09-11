import __SPromise from '../promise/SPromise';

/**
 * @name      imageLoaded
 * @namespace           js.dom
 * @type      Function
 *
 * Wait until the passed image is fully loaded
 *
 * @param 		{HTMLImageElement} 			$img  		The image to check the loading state
 * @param 		{Function}					[cb=null] 	An optional callback to call
 * @return 		{SPromise} 								The promise that will be resolved when all the images are correctly loaded
 *
 * @example  	js
 * import imageLoaded from '@coffeekraken/sugar/js/dom/imageLoaded'
 * imageLoaded(myCoolHTMLImageElement).then(($img) => {
 * 		// do something when the image is loaded
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function imageLoaded($img, callback = null) {
  let imgLoadedHandler, imgErrorHandler;

  return new __SPromise((resolve, reject, trigger, cancel) => {
    // check if image is already loaded
    if ($img.hasAttribute('src') && $img.complete) {
      // resolve promise
      resolve($img);
      // call the callback if exist
      callback && callback($img);
    } else {
      // wait until loaded
      imgLoadedHandler = (e) => {
        // resolve the promise
        resolve($img);
        // callback if exist
        callback && callback($img);
      };
      $img.addEventListener('load', imgLoadedHandler);
      // listen for error
      imgErrorHandler = (e) => {
        // reject
        reject(e);
      };
      $img.addEventListener('error', imgErrorHandler);
    }
  }).on('finally', () => {
    imgLoadedHandler && $img.removeEventListener('load', imgLoadedHandler);
    imgErrorHandler && $img.removeEventListener('error', imgErrorHandler);
  });
}
