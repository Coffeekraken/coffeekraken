"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const autoCast_1 = __importDefault(require("../../../shared/string/autoCast"));
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
 * import { __whenAttribute } from '@coffeekraken/sugar/dom'
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
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __whenAttribute(elm, attrName, checkFn = null) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
        const obs = (0, dom_1.__observeAttributes)(elm);
        obs.on('attribute', (mutation) => {
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
    }));
}
exports.default = __whenAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLGlEQUE4RDtBQUM5RCwrRUFBeUQ7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQUNILFNBQXdCLGVBQWUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sR0FBRyxJQUFJO0lBQ2pFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDekMsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzVCLE1BQU0sS0FBSyxHQUFHLElBQUEsa0JBQVUsRUFBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNmLE9BQU87YUFDVjtpQkFBTSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2YsT0FBTzthQUNWO1NBQ0o7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFBLHlCQUFtQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXJDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDN0IsSUFBSSxRQUFRLENBQUMsYUFBYSxLQUFLLFFBQVEsRUFBRTtnQkFDckMsTUFBTSxLQUFLLEdBQUcsSUFBQSxrQkFBVSxFQUNwQixRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQ3ZELENBQUM7Z0JBQ0YsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzlDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDZixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2hCO3FCQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDZixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2hCO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBOUJELGtDQThCQyJ9