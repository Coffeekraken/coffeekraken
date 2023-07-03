// @ts-nocheck
import __getStyleProperty from '../style/getStyleProperty';
import __whenImageLoaded from './whenImageLoaded';
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
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to detect the background image load
 * @return    {SPromise}    A promise that will be resolved when the background image has been loaded
 *
 * @snippet         __whenBackgroundImageLoaded($1)
 * __whenBackgroundImageLoaded($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __whenBackgroundImageLoaded } from '@coffeekraken/sugar/dom'
 *
 * // using promise
 * await __whenBackgroundImageLoaded($elm);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenBackgroundImageLoaded($elm) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGtCQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8saUJBQWlCLE1BQU0sbUJBQW1CLENBQUM7QUFFbEQsT0FBTyxTQUFTLE1BQU0sZ0NBQWdDLENBQUM7QUFFdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLDJCQUEyQixDQUMvQyxJQUFpQjtJQUVqQixJQUFJLFdBQVcsR0FBRyxLQUFLLEVBQ25CLElBQUksQ0FBQztJQUNULE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUN2QixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNoQix3REFBd0Q7UUFDeEQsTUFBTSxlQUFlLEdBQUcsa0JBQWtCLENBQ3RDLElBQUksRUFDSixrQkFBa0IsQ0FDckIsQ0FBQztRQUNGLE1BQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQzNDLE9BQU87U0FDVjtRQUNELGNBQWM7UUFDZCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsc0NBQXNDO1FBQ3RDLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YscUNBQXFDO1FBQ3JDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDZCxJQUFJLEVBQUU7b0JBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsRUFDRDtRQUNJLEVBQUUsRUFBRSwyQkFBMkI7S0FDbEMsQ0FDSixDQUFDO0lBRUYsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDZCxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdEIsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQyJ9