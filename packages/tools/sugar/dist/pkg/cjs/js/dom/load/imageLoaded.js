"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
 * import imageLoaded from '@coffeekraken/sugar/js/dom/load/imageLoaded'
 * imageLoaded(myCoolHTMLImageElement).then(($img) => {
 * 		// do something when the image is loaded
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function imageLoaded($img, callback = null) {
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
        id: 'imageLoaded',
    });
    pro.on('finally', () => {
        imgLoadedHandler && $img.removeEventListener('load', imgLoadedHandler);
        imgErrorHandler && $img.removeEventListener('error', imgErrorHandler);
    });
    return pro;
}
exports.default = imageLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsV0FBVyxDQUNoQixJQUFzQixFQUN0QixRQUFRLEdBQUcsSUFBSTtJQUVmLElBQUksZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO0lBRXRDLE1BQU0sR0FBRyxHQUFHLElBQUksbUJBQVUsQ0FDdEIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3BCLG1DQUFtQztRQUNuQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMzQyxrQkFBa0I7WUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2QsNkJBQTZCO1lBQzdCLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNILG9CQUFvQjtZQUNwQixnQkFBZ0IsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNyQixzQkFBc0I7Z0JBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZCxvQkFBb0I7Z0JBQ3BCLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hELG1CQUFtQjtZQUNuQixlQUFlLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDcEIsU0FBUztnQkFDVCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQyxFQUNEO1FBQ0ksRUFBRSxFQUFFLGFBQWE7S0FDcEIsQ0FDSixDQUFDO0lBQ0YsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ25CLGdCQUFnQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RSxlQUFlLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztJQUMxRSxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUNELGtCQUFlLFdBQVcsQ0FBQyJ9