// @ts-nocheck
import __getStyleProperty from '../style/getStyleProperty';
import __imageLoaded from './imageLoaded';
import __unquote from '../../../shared/string/unquote';
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name        backgroundImageLoaded
 * @namespace            js.dom.load
 * @type      Function
 * @stable
 *
 * Detect when a background image has been loaded on an HTMLElement
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to detect the background image load
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
function backgroundImageLoaded($elm) {
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
            if (!isCancelled)
                resolve($elm);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZEltYWdlTG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFja2dyb3VuZEltYWdlTG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGtCQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLFNBQVMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLHFCQUFxQixDQUFDLElBQUk7SUFDakMsSUFBSSxXQUFXLEdBQUcsS0FBSyxFQUNyQixJQUFJLENBQUM7SUFDUCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FDNUIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1Qix3REFBd0Q7UUFDeEQsTUFBTSxlQUFlLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDckUsTUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDM0IsTUFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDM0MsT0FBTztTQUNSO1FBQ0QsY0FBYztRQUNkLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxzQ0FBc0M7UUFDdEMsSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixxQ0FBcUM7UUFDckMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFdBQVc7Z0JBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxFQUNEO1FBQ0UsRUFBRSxFQUFFLHVCQUF1QjtLQUM1QixDQUNGLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDbkIsV0FBVyxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxlQUFlLHFCQUFxQixDQUFDIn0=