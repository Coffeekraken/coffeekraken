// @ts-nocheck
import __getStyleProperty from '../style/getStyleProperty';
import __imageLoaded from './imageLoaded';
import __unquote from '../../../shared/string/unquote';
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name        backgroundImageLoaded
 * @namespace            js.dom.load
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
 * import backgroundImageLoaded from '@coffeekraken/sugar/js/dom/backgroundImageLoaded'
 * backgroundImageLoaded($myElm).then(() => {
 *   // do something when loaded
 * })
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
        id: 'backgroundImageLoaded',
    }).on('finally', () => {
        isCancelled = true;
    });
    promise.__$img = $img;
    return promise;
}
export default backgroundImageLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZEltYWdlTG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFja2dyb3VuZEltYWdlTG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGtCQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLFNBQVMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMscUJBQXFCLENBQzFCLElBQWlCLEVBQ2pCLEVBQUUsR0FBRyxJQUFJO0lBRVQsSUFBSSxXQUFXLEdBQUcsS0FBSyxFQUNuQixJQUFJLENBQUM7SUFDVCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FDMUIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUMxQix3REFBd0Q7UUFDeEQsTUFBTSxlQUFlLEdBQUcsa0JBQWtCLENBQ3RDLElBQUksRUFDSixrQkFBa0IsQ0FDckIsQ0FBQztRQUNGLE1BQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQzNDLE9BQU87U0FDVjtRQUNELGNBQWM7UUFDZCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsc0NBQXNDO1FBQ3RDLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YscUNBQXFDO1FBQ3JDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFO29CQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsdUJBQXVCO0tBQzlCLENBQ0osQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNqQixXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdEIsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUNELGVBQWUscUJBQXFCLENBQUMifQ==