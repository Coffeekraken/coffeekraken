// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
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
    const pro = new __SPromise(({ resolve, reject }) => {
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
export default whenImageLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsaUJBQWlCLENBQ3RCLElBQXNCLEVBQ3RCLFFBQVEsR0FBRyxJQUFJO0lBRWYsSUFBSSxnQkFBZ0IsRUFBRSxlQUFlLENBQUM7SUFFdEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQ3RCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUNwQixtQ0FBbUM7UUFDbkMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDM0Msa0JBQWtCO1lBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNkLDZCQUE2QjtZQUM3QixRQUFRLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO2FBQU07WUFDSCxvQkFBb0I7WUFDcEIsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDckIsc0JBQXNCO2dCQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2Qsb0JBQW9CO2dCQUNwQixRQUFRLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUNoRCxtQkFBbUI7WUFDbkIsZUFBZSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BCLFNBQVM7Z0JBQ1QsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztTQUNuRDtJQUNMLENBQUMsRUFDRDtRQUNJLEVBQUUsRUFBRSxpQkFBaUI7S0FDeEIsQ0FDSixDQUFDO0lBQ0YsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ25CLGdCQUFnQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RSxlQUFlLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztJQUMxRSxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUNELGVBQWUsZUFBZSxDQUFDIn0=