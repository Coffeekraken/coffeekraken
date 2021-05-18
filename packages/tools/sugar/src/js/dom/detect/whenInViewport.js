// @ts-nocheck
import __inViewport from 'in-viewport';
/**
 * @name      whenInViewport
 * @namespace            js.dom.detect
 * @type      Function
 * @stable
 *
 * Monitor an HTMLElement to be notified when it is in the viewport
 *
 * @param 		{HTMLElement} 				elm 					The element to monitor
 * @param 		{Number} 					[offset=50] 			An offset that represent the distance before entering the viewport for the detection
 * @return 		(Promise) 											The promise that will be resolved when the element is in the viewport
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import whenInViewport from '@coffeekraken/sugar/js/dom/whenInViewport'
 * whenInViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has entered the viewport...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function whenInViewport(elm, offset = 50) {
    return new Promise((resolve, reject) => {
        __inViewport(elm, {
            offset: offset
        }, () => {
            resolve(elm);
        });
    });
}
export default whenInViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbkluVmlld3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aGVuSW5WaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sYUFBYSxDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLGNBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLEVBQUU7SUFDdEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxZQUFZLENBQ1YsR0FBRyxFQUNIO1lBQ0UsTUFBTSxFQUFFLE1BQU07U0FDZixFQUNELEdBQUcsRUFBRTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsZUFBZSxjQUFjLENBQUMifQ==