// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __addEventListenerOnce from '../event/addEventListenerOnce';
/**
 * @name      whenAnimationEnd
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status      beta
 * @async
 *
 * Detect when animation ends
 *
 * @param    {HTMLElement}    elm    The element to listen on
 * @return   {Promise}                  A promise that will be resolved once the animation has ended
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import whenAnimationEnd from '@coffeekraken/sugar/js/dom/whenAnimationEnd'
 * await whenAnimationEnd(myCoolElm);
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function whenAnimationEnd($elm, cls) {
    return new __SPromise(({ resolve }) => {
        __addEventListenerOnce($elm, 'animationend', (e) => {
            resolve(e);
        });
    }, {
        id: 'whenAnimationEnd',
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLHNCQUFzQixNQUFNLCtCQUErQixDQUFDO0FBRW5FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUc7SUFDOUMsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7UUFDWixzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLEVBQ0Q7UUFDSSxFQUFFLEVBQUUsa0JBQWtCO0tBQ3pCLENBQ0osQ0FBQztBQUNOLENBQUMifQ==