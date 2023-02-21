"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const __rematrix = __importStar(require("rematrix"));
/**
 * @name      getTranslateProperties
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Get a translate properties of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		The element to get the properties from
 * @return 		{Object} 									The translate x,y and z properties
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __getTranslateProperties } from '@coffeekraken/sugar/dom'
 * const props = __getTranslateProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	x : 100,
 * // 	y : 0,
 * // 	z : 0
 * // }
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __getTranslateProperties($elm) {
    if (!window.getComputedStyle)
        return {
            x: 0,
            y: 0,
            z: 0,
        };
    const style = getComputedStyle($elm);
    const transform = style.transform ||
        style.webkitTransform ||
        style.mozTransform ||
        style.msTransform;
    if (!transform)
        return {
            x: 0,
            y: 0,
            z: 0,
        };
    const matrix3d = __rematrix.fromString(transform);
    return {
        x: matrix3d[12],
        y: matrix3d[13],
        z: matrix3d[14],
    };
}
exports.default = __getTranslateProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQscURBQXVDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBd0Isd0JBQXdCLENBQUMsSUFBaUI7SUFLOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDeEIsT0FBTztZQUNILENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNQLENBQUM7SUFDTixNQUFNLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxNQUFNLFNBQVMsR0FDWCxLQUFLLENBQUMsU0FBUztRQUNmLEtBQUssQ0FBQyxlQUFlO1FBQ3JCLEtBQUssQ0FBQyxZQUFZO1FBQ2xCLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFDdEIsSUFBSSxDQUFDLFNBQVM7UUFDVixPQUFPO1lBQ0gsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1NBQ1AsQ0FBQztJQUVOLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsT0FBTztRQUNILENBQUMsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ2YsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDZixDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQztLQUNsQixDQUFDO0FBQ04sQ0FBQztBQTlCRCwyQ0E4QkMifQ==