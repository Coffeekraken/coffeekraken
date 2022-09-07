"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __whenImageLoaded($img, callback = null) {
    let imgLoadedHandler, imgErrorHandler;
    const pro = new s_promise_1.default(({ resolve, reject }) => {
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
    }, {
        id: 'whenImageLoaded',
    });
    pro.on('finally', () => {
        imgLoadedHandler && $img.removeEventListener('load', imgLoadedHandler);
        imgErrorHandler && $img.removeEventListener('error', imgErrorHandler);
    });
    return pro;
}
exports.default = whenImageLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsaUJBQWlCLENBQ3RCLElBQXNCLEVBQ3RCLFFBQVEsR0FBRyxJQUFJO0lBRWYsSUFBSSxnQkFBZ0IsRUFBRSxlQUFlLENBQUM7SUFFdEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxtQkFBVSxDQUN0QixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDcEIsbUNBQW1DO1FBQ25DLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzNDLGtCQUFrQjtZQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZCw2QkFBNkI7WUFDN0IsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0gsb0JBQW9CO1lBQ3BCLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLHNCQUFzQjtnQkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNkLG9CQUFvQjtnQkFDcEIsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDaEQsbUJBQW1CO1lBQ25CLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNwQixTQUFTO2dCQUNULE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDbkQ7SUFDTCxDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsaUJBQWlCO0tBQ3hCLENBQ0osQ0FBQztJQUNGLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNuQixnQkFBZ0IsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDdkUsZUFBZSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDMUUsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFDRCxrQkFBZSxlQUFlLENBQUMifQ==