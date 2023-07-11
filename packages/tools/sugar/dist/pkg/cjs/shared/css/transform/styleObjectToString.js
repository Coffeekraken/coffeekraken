"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uncamelize_js_1 = __importDefault(require("../../../shared/string/uncamelize.js"));
/**
 * @name      styleObject2String
 * @namespace            js.css.transform
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Transform a style object to inline string separated by ;
 *
 * @param 		{Object} 				styleObj 		An object of style to apply
 * @return 		(String) 								The string style representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __styleObjectToString($1)
 *
 * @example 	js
 * import { __styleObjectToString } from '@coffeekraken/sugar/css'
 * const styleString =  __styleObjectToString({
 * 		paddingLeft : '20px',
 * 		display : 'block'
 * });
 * // output => padding-left:20px; display:block;
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __styleObjectToString(styleObj) {
    // process the style object
    const propertiesArray = [];
    for (const key in styleObj) {
        const value = styleObj[key];
        // if the value is ''
        // mean that we need to get rid of
        if (value === undefined || value === '') {
            delete styleObj[key];
        }
        else {
            propertiesArray.push(`${(0, uncamelize_js_1.default)(key)}:${value};`);
        }
    }
    // return the css text
    return propertiesArray.join(' ');
}
exports.default = __styleObjectToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHlGQUFnRTtBQUVoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQXdCLHFCQUFxQixDQUFDLFFBQWE7SUFDdkQsMkJBQTJCO0lBQzNCLE1BQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUMzQixLQUFLLE1BQU0sR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUN4QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIscUJBQXFCO1FBQ3JCLGtDQUFrQztRQUNsQyxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNyQyxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjthQUFNO1lBQ0gsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUEsdUJBQVksRUFBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQzFEO0tBQ0o7SUFDRCxzQkFBc0I7SUFDdEIsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFmRCx3Q0FlQyJ9