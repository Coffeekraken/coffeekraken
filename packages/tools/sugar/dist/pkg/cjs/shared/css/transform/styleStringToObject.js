"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelize_js_1 = __importDefault(require("../../string/camelize.js"));
const parse_js_1 = __importDefault(require("../../string/parse.js"));
/**
 * @name      styleString2Object
 * @namespace            js.css.transform
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
 * @snippet         __styleStringToObject($1)
 *
 * @example 	js
 * import { __styleStringToObject } from '@coffeekraken/sugar/css'
 * const styleString =  __styleStringToObject('padding-left:20px; display:block;');
 * // output => {
 * //		paddingLeft : '20px',
 * // 		display : 'block'
 * // }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __styleStringToObject(style) {
    if (!style || style === '')
        return {};
    const obj = {};
    const split = style.replace(/\s/g, '').split(';');
    split.forEach((statement) => {
        // split statement by key value pairs
        const spl = statement.split(':'), key = (0, camelize_js_1.default)(spl[0]), value = spl[1];
        // add element into object
        obj[key] = (0, parse_js_1.default)(value);
    });
    // return the style object
    return obj;
}
exports.default = __styleStringToObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDJFQUFrRDtBQUNsRCxxRUFBNEM7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUF3QixxQkFBcUIsQ0FBQyxLQUFhO0lBQ3ZELElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLEVBQUU7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN0QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDZixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3hCLHFDQUFxQztRQUNyQyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUM1QixHQUFHLEdBQUcsSUFBQSxxQkFBVSxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN4QixLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLDBCQUEwQjtRQUMxQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBQSxrQkFBTyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsMEJBQTBCO0lBQzFCLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQWRELHdDQWNDIn0=