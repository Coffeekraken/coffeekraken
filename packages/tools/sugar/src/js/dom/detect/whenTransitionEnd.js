// @ts-nocheck
import __getTransitionProperties from './style/getTransitionProperties';
/**
 * @name      whenTransitionEnd
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform        js
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlblRyYW5zaXRpb25FbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuVHJhbnNpdGlvbkVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyx5QkFBeUIsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUFTLGlCQUFpQixDQUFDLEdBQWdCLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFDcEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxNQUFNLFVBQVUsR0FBRyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsT0FBTyxFQUFFLENBQUM7WUFDVixFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDYixDQUFDLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUsaUJBQWlCLENBQUMifQ==