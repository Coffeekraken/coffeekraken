"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelize_1 = __importDefault(require("../../shared/string/camelize"));
const autoCast_1 = __importDefault(require("../../shared/string/autoCast"));
/**
 * @name      styleString2Object
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Transform a style string to an object representation
 *
 * @param 		{String} 				style 			The style string
 * @return 		(Object) 								The string object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import styleString2Object from '@coffeekraken/sugar/js/dom/styleString2Object'
 * const styleString = styleString2Object('padding-left:20px; display:block;');
 * // output => {
 * //		paddingLeft : '20px',
 * // 		display : 'block'
 * // }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function styleString2Object(style) {
    if (!style || style === '')
        return {};
    const obj = {};
    const split = style.replace(/\s/g, '').split(';');
    split.forEach((statement) => {
        // split statement by key value pairs
        const spl = statement.split(':'), key = (0, camelize_1.default)(spl[0]), value = spl[1];
        // add element into object
        obj[key] = (0, autoCast_1.default)(value);
    });
    // return the style object
    return obj;
}
exports.default = styleString2Object;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFzRDtBQUN0RCw0RUFBc0Q7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxLQUFhO0lBQ3JDLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLEVBQUU7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN0QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDZixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3hCLHFDQUFxQztRQUNyQyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUM1QixHQUFHLEdBQUcsSUFBQSxrQkFBVSxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN4QixLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLDBCQUEwQjtRQUMxQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBQSxrQkFBVSxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsMEJBQTBCO0lBQzFCLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUNELGtCQUFlLGtCQUFrQixDQUFDIn0=