// @ts-nocheck
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
 * @return   {Promise<HTMLElement>}                  A promise that will be resolved once the animation has ended
 *
 * @snippet         __whenAnimationEnd($1)
 * __whenAnimationEnd($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example    js
 * import { __whenAnimationEnd } from '@coffeekraken/sugar/dom'
 * __whenAnimationEnd(myCoolElm).then(($elm) => {
 *      // do something...
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenAnimationEnd($elm) {
    return new Promise((resolve) => {
        __addEventListenerOnce($elm, 'animationend', (e) => {
            resolve($elm);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLHNCQUFzQixNQUFNLCtCQUErQixDQUFDO0FBRW5FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FDdEMsSUFBaUI7SUFFakIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQzNCLHNCQUFzQixDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==