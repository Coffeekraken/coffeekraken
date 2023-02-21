"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
 * import { __whenImageLoaded } from '@coffeekraken/sugar/dom'
 *  __whenImageLoaded(myCoolHTMLImageElement).then(($img) => {
 * 		// do something when the image is loaded
 * });
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __whenImageLoaded($img, callback = null) {
    let imgLoadedHandler, imgErrorHandler;
    const pro = new Promise((resolve, reject) => {
        // check if image is already loaded
        if ($img.hasAttribute('src') && $img.complete) {
            // resolve promise
            resolve($img);
            // call the callback if exist
            callback && callback($img);
        }
        else {
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
    });
    pro.finally(() => {
        imgLoadedHandler && $img.removeEventListener('load', imgLoadedHandler);
        imgErrorHandler && $img.removeEventListener('error', imgErrorHandler);
    });
    return pro;
}
exports.default = __whenImageLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBd0IsaUJBQWlCLENBQ3JDLElBQXNCLEVBQ3RCLFFBQVEsR0FBRyxJQUFJO0lBRWYsSUFBSSxnQkFBZ0IsRUFBRSxlQUFlLENBQUM7SUFFdEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDeEMsbUNBQW1DO1FBQ25DLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzNDLGtCQUFrQjtZQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZCw2QkFBNkI7WUFDN0IsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0gsb0JBQW9CO1lBQ3BCLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLHNCQUFzQjtnQkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNkLG9CQUFvQjtnQkFDcEIsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDaEQsbUJBQW1CO1lBQ25CLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNwQixTQUFTO2dCQUNULE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDbkQ7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2IsZ0JBQWdCLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZFLGVBQWUsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzFFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBbkNELG9DQW1DQyJ9