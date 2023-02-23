// @ts-nocheck

/**
 * @name      whenImageLoaded
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Wait until the passed image is fully loaded
 *
 * @feature         Promise based API
 *
 * @param 		{HTMLImageElement} 			$img  		The image to check the loading state
 * @return 		{SPromise} 								The promise that will be resolved when all the images are correctly loaded
 *
 * @snippet         __whenImageLoaded($1);
 * __whenImageLoaded($1).then(\$img => {
 *      $2
 * });
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __whenImageLoaded } from '@coffeekraken/sugar/dom'
 *  __whenImageLoaded(myCoolHTMLImageElement).then(($img) => {
 * 		// do something when the image is loaded
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenImageLoaded(
    $img: HTMLImageElement,
): Promise<HTMLImageElement> {
    let imgLoadedHandler, imgErrorHandler;

    const pro = new Promise((resolve, reject) => {
        // check if image is already loaded
        if ($img.hasAttribute('src') && $img.complete) {
            // resolve promise
            resolve($img);
        } else {
            // wait until loaded
            imgLoadedHandler = (e) => {
                // resolve the promise
                resolve($img);
            };
            $img.addEventListener('load', imgLoadedHandler);
            // listen for error
            imgErrorHandler = (e) => {
                // reject
                reject(e);
            };
            $img.addEventListener('error', imgErrorHandler);
        }
    });
    pro.finally(() => {
        imgLoadedHandler && $img.removeEventListener('load', imgLoadedHandler);
        imgErrorHandler && $img.removeEventListener('error', imgErrorHandler);
    });
    return pro;
}
