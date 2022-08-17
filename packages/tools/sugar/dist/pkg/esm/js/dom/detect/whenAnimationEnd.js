// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __addEventListenerOnce from '../event/addEventListenerOnce';
/**
 * @name      whenAnimationEnd
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status      stable
 * @async
 *
 * Detect when animation ends
 *
 * @param    {HTMLElement}    elm    The element to listen on
 * @return   {SPromise<HTMLElement>}                  A promise that will be resolved once the animation has ended
 *
 * @todo      tests
 *
 * @example    js
 * import __whenAnimationEnd from '@coffeekraken/sugar/js/dom/whenAnimationEnd'
 * await __whenAnimationEnd(myCoolElm);
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function whenAnimationEnd($elm) {
    return new __SPromise(({ resolve }) => {
        __addEventListenerOnce($elm, 'animationend', (e) => {
            resolve($elm);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLHNCQUFzQixNQUFNLCtCQUErQixDQUFDO0FBRW5FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGdCQUFnQixDQUNwQyxJQUFpQjtJQUVqQixPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ2xDLHNCQUFzQixDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==