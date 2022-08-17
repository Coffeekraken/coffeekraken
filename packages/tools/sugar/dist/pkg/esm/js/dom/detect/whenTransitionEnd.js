// @ts-nocheck
import __getTransitionProperties from './style/getTransitionProperties';
/**
 * @name      whenTransitionEnd
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        stable
 * @async
 *
 * Monitor an HTMLElement to be notified when his transition has ended
 *
 * @feature       Promise based API
 * @feature       Callback support
 *
 * @param 		{HTMLElement} 				elm 		The element to monitor
 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element transition has ended
 * @return 		(Promise<HTMLElement>) 								The promise that will be resolved when the element transition has ended
 *
 * @todo      tests
 *
 * @example 	js
 * import __whenTransitionEnd from '@coffeekraken/sugar/js/dom/whenTransitionEnd'
 * await __whenTransitionEnd(myCoolHTMLElement);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function whenTransitionEnd(elm, cb = null) {
    return new Promise((resolve, reject) => {
        const transition = __getTransitionProperties(elm);
        setTimeout(() => {
            resolve($elm);
            cb && cb($elm);
        }, transition.totalDuration);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLHlCQUF5QixNQUFNLGlDQUFpQyxDQUFDO0FBRXhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FDckMsR0FBZ0IsRUFDaEIsS0FBZSxJQUFJO0lBRW5CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsTUFBTSxVQUFVLEdBQUcseUJBQXlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNkLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==