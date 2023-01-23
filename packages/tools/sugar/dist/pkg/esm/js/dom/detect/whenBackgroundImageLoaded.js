// @ts-nocheck
import { __getStyleProperty, __whenImageLoaded } from '@coffeekraken/sugar/dom';
import __unquote from '../../../shared/string/unquote';
/**
 * @name        whenBackgroundImageLoaded
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
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
 * import { __whenBackgroundImageLoaded } from '@coffeekraken/sugar/dom'
 * __whenBackgroundImageLoaded($myElm).then(() => {
 *   // do something when loaded
 * })
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenBackgroundImageLoaded($elm, cb = null) {
    let isCancelled = false, $img;
    const promise = new Promise((resolve, reject) => {
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
        __whenImageLoaded($img).then(() => {
            if (!isCancelled) {
                if (cb)
                    cb($elm);
                resolve($elm);
            }
        });
    }, {
        id: 'whenBackgroundImageLoaded',
    });
    promise.then(() => {
        isCancelled = true;
    });
    promise.__$img = $img;
    return promise;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRixPQUFPLFNBQVMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUV2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsMkJBQTJCLENBQy9DLElBQWlCLEVBQ2pCLEVBQUUsR0FBRyxJQUFJO0lBRVQsSUFBSSxXQUFXLEdBQUcsS0FBSyxFQUNuQixJQUFJLENBQUM7SUFDVCxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FDdkIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDaEIsd0RBQXdEO1FBQ3hELE1BQU0sZUFBZSxHQUFHLGtCQUFrQixDQUN0QyxJQUFJLEVBQ0osa0JBQWtCLENBQ3JCLENBQUM7UUFDRixNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN6QixNQUFNLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUMzQyxPQUFPO1NBQ1Y7UUFDRCxjQUFjO1FBQ2QsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLHNDQUFzQztRQUN0QyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLHFDQUFxQztRQUNyQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzlCLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFO29CQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsMkJBQTJCO0tBQ2xDLENBQ0osQ0FBQztJQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ2QsV0FBVyxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMifQ==