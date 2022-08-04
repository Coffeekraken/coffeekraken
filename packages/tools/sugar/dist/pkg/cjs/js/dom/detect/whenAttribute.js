"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autoCast_1 = __importDefault(require("../../../shared/string/autoCast"));
const observeAttributes_1 = __importDefault(require("../observe/observeAttributes"));
/**
 * @name      whenAttribute
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status        beta
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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import whenAttribute from '@coffeekraken/sugar/js/dom/whenAttribute'
 * whenAttribute(myCoolHTMLElement, 'value').then((value) => {
 * 		// the value attribute exist on the element
 * });
 * // with a checkFn
 * whenAttribute(myCoolHTMLElement, 'value', (newVal, oldVal) => {
 * 		// make sure the value is a number
 * 		return typeof(newVal) === 'number';
 * }).then((value) => {
 * 		// do something with your number value...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function whenAttribute(elm, attrName, checkFn = null) {
    return new Promise((resolve, reject) => {
        if (elm.hasAttribute(attrName)) {
            const value = (0, autoCast_1.default)(elm.getAttribute(attrName));
            if (checkFn && checkFn(value, value)) {
                resolve(value);
                return;
            }
            else if (!checkFn) {
                resolve(value);
                return;
            }
        }
        const obs = (0, observeAttributes_1.default)(elm).then((mutation) => {
            if (mutation.attributeName === attrName) {
                const value = (0, autoCast_1.default)(mutation.target.getAttribute(mutation.attributeName));
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
exports.default = whenAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtFQUF5RDtBQUN6RCxxRkFBOEQ7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NHO0FBQ0gsU0FBUyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEdBQUcsSUFBSTtJQUNoRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QixNQUFNLEtBQUssR0FBRyxJQUFBLGtCQUFVLEVBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDZixPQUFPO2FBQ1Y7aUJBQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNmLE9BQU87YUFDVjtTQUNKO1FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBQSwyQkFBa0IsRUFBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNsRCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssUUFBUSxFQUFFO2dCQUNyQyxNQUFNLEtBQUssR0FBRyxJQUFBLGtCQUFVLEVBQ3BCLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FDdkQsQ0FBQztnQkFDRixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDOUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNmLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDaEI7cUJBQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNmLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDaEI7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Qsa0JBQWUsYUFBYSxDQUFDIn0=