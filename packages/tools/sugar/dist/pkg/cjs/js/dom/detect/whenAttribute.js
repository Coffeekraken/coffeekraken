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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtFQUF5RDtBQUN6RCxxRkFBOEQ7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQUNILFNBQXdCLGFBQWEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sR0FBRyxJQUFJO0lBQy9ELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzVCLE1BQU0sS0FBSyxHQUFHLElBQUEsa0JBQVUsRUFBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNmLE9BQU87YUFDVjtpQkFBTSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2YsT0FBTzthQUNWO1NBQ0o7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFBLDJCQUFrQixFQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2xELElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxRQUFRLEVBQUU7Z0JBQ3JDLE1BQU0sS0FBSyxHQUFHLElBQUEsa0JBQVUsRUFDcEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUN2RCxDQUFDO2dCQUNGLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM5QyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2YsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNoQjtxQkFBTSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2YsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNoQjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUE1QkQsZ0NBNEJDIn0=