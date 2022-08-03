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
        id: 'imageLoaded',
    });
    pro.on('finally', () => {
        imgLoadedHandler && $img.removeEventListener('load', imgLoadedHandler);
        imgErrorHandler && $img.removeEventListener('error', imgErrorHandler);
    });
    return pro;
}
export default imageLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsV0FBVyxDQUNoQixJQUFzQixFQUN0QixRQUFRLEdBQUcsSUFBSTtJQUVmLElBQUksZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO0lBRXRDLE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUN0QixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDcEIsbUNBQW1DO1FBQ25DLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzNDLGtCQUFrQjtZQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZCw2QkFBNkI7WUFDN0IsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0gsb0JBQW9CO1lBQ3BCLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLHNCQUFzQjtnQkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNkLG9CQUFvQjtnQkFDcEIsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDaEQsbUJBQW1CO1lBQ25CLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNwQixTQUFTO2dCQUNULE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDbkQ7SUFDTCxDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsYUFBYTtLQUNwQixDQUNKLENBQUM7SUFDRixHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDbkIsZ0JBQWdCLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZFLGVBQWUsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzFFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0QsZUFBZSxXQUFXLENBQUMifQ==