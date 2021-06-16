// @ts-nocheck
import __getStyleProperty from '../style/getStyleProperty';
import __imageLoaded from './imageLoaded';
import __unquote from '../../../shared/string/unquote';
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name        backgroundImageLoaded
 * @namespace            js.dom.load
 * @type      Function
 * @platform      js
 * @status        betas
 *
 * Detect when a background image has been loaded on an HTMLElement
 *
 * @feature       Promise based API
 * @feature       Callback support
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to detect the background image load
 * @param     {Function}      [cb=null]       A callback function if you prefer
 * @return    {SPromise}    A promise that will be resolved when the background image has been loaded
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import backgroundImageLoaded from '@coffeekraken/sugar/js/dom/backgroundImageLoaded'
 * backgroundImageLoaded($myElm).then(() => {
 *   // do something when loaded
 * })
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function backgroundImageLoaded($elm, cb = null) {
    let isCancelled = false, $img;
    const promise = new __SPromise(({ resolve, reject, emit }) => {
        // get the background-image property from computed style
        const backgroundImage = __getStyleProperty($elm, 'background-image');
        const matches = backgroundImage.match(/.*url\((.*)\).*/);
        if (!matches || !matches[1]) {
            reject('No background image url found...');
            return;
        }
        // process url
        const url = __unquote(matches[1]);
        // make a new image with the image set
        $img = new Image();
        $img.src = url;
        // return the promise of image loaded
        __imageLoaded($img).then(() => {
            if (!isCancelled) {
                if (cb)
                    cb($elm);
                resolve($elm);
            }
        });
    }, {
        id: 'backgroundImageLoaded'
    }).on('finally', () => {
        isCancelled = true;
    });
    promise.__$img = $img;
    return promise;
}
export default backgroundImageLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZEltYWdlTG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFja2dyb3VuZEltYWdlTG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGtCQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLFNBQVMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMscUJBQXFCLENBQUMsSUFBaUIsRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUN6RCxJQUFJLFdBQVcsR0FBRyxLQUFLLEVBQ3JCLElBQUksQ0FBQztJQUNQLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUM1QixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVCLHdEQUF3RDtRQUN4RCxNQUFNLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNyRSxNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMzQixNQUFNLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUMzQyxPQUFPO1NBQ1I7UUFDRCxjQUFjO1FBQ2QsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLHNDQUFzQztRQUN0QyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLHFDQUFxQztRQUNyQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM1QixJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixJQUFJLEVBQUU7b0JBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxFQUNEO1FBQ0UsRUFBRSxFQUFFLHVCQUF1QjtLQUM1QixDQUNGLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDbkIsV0FBVyxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxlQUFlLHFCQUFxQixDQUFDIn0=