// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';

/**
 * @name      imageLoaded
 * @namespace            js.dom.load
 * @type      Function
 * @platform          js
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
function imageLoaded(
    $img: HTMLImageElement,
    callback = null,
): __SPromise<HTMLImageElement> {
    let imgLoadedHandler, imgErrorHandler;

    return new __SPromise(
        ({ resolve, reject }) => {
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
        },
        {
            id: 'imageLoaded',
        },
    ).on('finally', () => {
        imgLoadedHandler && $img.removeEventListener('load', imgLoadedHandler);
        imgErrorHandler && $img.removeEventListener('error', imgErrorHandler);
    });
}
export default imageLoaded;
