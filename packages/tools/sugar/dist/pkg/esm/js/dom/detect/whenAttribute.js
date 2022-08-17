// @ts-nocheck
import __autoCast from '../../../shared/string/autoCast';
import __observeAttribute from '../observe/observeAttributes';
/**
 * @name      whenAttribute
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        stable
 * @async
 *
 * Resolve a promise when the wanted attribute on the passed HTMLElement exist or pass the check function provided
 *
 * @feature       Detect attribute changes
 * @feature       Possibility to pass a check function to check if the attribute suits your needs
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				elm 				The HTMLElement on which to monitor the property
 * @param 		{String} 					attribute 			The attribute to monitor
 * @param 		{Function} 					[checkFn=null] 		An optional function to check the attribute. The promise is resolved when this function return true
 * @return 		(Promise) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
 *
 * @todo      tests
 *
 * @example 	js
 * import __whenAttribute from '@coffeekraken/sugar/js/dom/whenAttribute'
 * __whenAttribute(myCoolHTMLElement, 'value').then((value) => {
 * 		// the value attribute exist on the element
 * });
 * // with a checkFn
 * __whenAttribute(myCoolHTMLElement, 'value', (newVal, oldVal) => {
 * 		// make sure the value is a number
 * 		return typeof(newVal) === 'number';
 * }).then((value) => {
 * 		// do something with your number value...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function whenAttribute(elm, attrName, checkFn = null) {
    return new Promise((resolve, reject) => {
        if (elm.hasAttribute(attrName)) {
            const value = __autoCast(elm.getAttribute(attrName));
            if (checkFn && checkFn(value, value)) {
                resolve(value);
                return;
            }
            else if (!checkFn) {
                resolve(value);
                return;
            }
        }
        const obs = __observeAttribute(elm).then((mutation) => {
            if (mutation.attributeName === attrName) {
                const value = __autoCast(mutation.target.getAttribute(mutation.attributeName));
                if (checkFn && checkFn(value, mutation.oldValue)) {
                    resolve(value);
                    obs.cancel();
                }
                else if (!checkFn) {
                    resolve(value);
                    obs.cancel();
                }
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RCxPQUFPLGtCQUFrQixNQUFNLDhCQUE4QixDQUFDO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGFBQWEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sR0FBRyxJQUFJO0lBQy9ELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzVCLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNmLE9BQU87YUFDVjtpQkFBTSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2YsT0FBTzthQUNWO1NBQ0o7UUFFRCxNQUFNLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNsRCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssUUFBUSxFQUFFO2dCQUNyQyxNQUFNLEtBQUssR0FBRyxVQUFVLENBQ3BCLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FDdkQsQ0FBQztnQkFDRixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDOUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNmLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDaEI7cUJBQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNmLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDaEI7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=