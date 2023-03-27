"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("@coffeekraken/sugar/string");
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
        const spl = statement.split(':'), key = (0, string_1.__camelize)(spl[0]), value = spl[1];
        // add element into object
        obj[key] = (0, string_1.__parse)(value);
    });
    // return the style object
    return obj;
}
exports.default = __styleStringToObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLHVEQUFpRTtBQUVqRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQXdCLHFCQUFxQixDQUFDLEtBQWE7SUFDdkQsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssRUFBRTtRQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3RDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNmLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDeEIscUNBQXFDO1FBQ3JDLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzVCLEdBQUcsR0FBRyxJQUFBLG1CQUFVLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3hCLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsMEJBQTBCO1FBQzFCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFBLGdCQUFPLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDSCwwQkFBMEI7SUFDMUIsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBZEQsd0NBY0MifQ==