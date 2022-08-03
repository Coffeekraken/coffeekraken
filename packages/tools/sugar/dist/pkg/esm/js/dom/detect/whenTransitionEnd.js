// @ts-nocheck
import __getTransitionProperties from './style/getTransitionProperties';
/**
 * @name      whenTransitionEnd
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status        beta
 *
 * Monitor an HTMLElement to be notified when his transition has ended
 *
 * @feature       Promise based API
 * @feature       Callback support
 *
 * @param 		{HTMLElement} 				elm 		The element to monitor
 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element transition has ended
 * @return 		(Promise) 								The promise that will be resolved when the element transition has ended
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import whenTransitionEnd from '@coffeekraken/sugar/js/dom/whenTransitionEnd'
 * whenTransitionEnd(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element transition has ended...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function whenTransitionEnd(elm, cb = null) {
    return new Promise((resolve, reject) => {
        const transition = __getTransitionProperties(elm);
        setTimeout(() => {
            resolve();
            cb && cb();
        }, transition.totalDuration);
    });
}
export default whenTransitionEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLHlCQUF5QixNQUFNLGlDQUFpQyxDQUFDO0FBRXhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILFNBQVMsaUJBQWlCLENBQUMsR0FBZ0IsRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUNsRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLE1BQU0sVUFBVSxHQUFHLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixPQUFPLEVBQUUsQ0FBQztZQUNWLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNmLENBQUMsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsZUFBZSxpQkFBaUIsQ0FBQyJ9