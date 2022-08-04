"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const offset_1 = __importDefault(require("./offset"));
/**
 * @name      offsetParent
 * @namespace            js.dom.offset
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Get the offset top and left of the passed element from his parent top left point
 *
 * @param 		{HTMLElement} 					elm  		The element to get the offset from
 * @return 		{top: number; left: number;} 									The offset top and left object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import offsetParent from '@coffeekraken/sugar/js/dom/offsetParent'
 * const offsetParentElm = offsetParent(myCoolElement);
 * // output : { top : 200, left : 300 }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function offsetParent(elm) {
    const parentOffset = (0, offset_1.default)(elm.parentNode);
    const offset = (0, offset_1.default)(elm);
    return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left,
    };
}
exports.default = offsetParent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNEQUFnQztBQUNoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFlBQVksQ0FBQyxHQUFnQjtJQUlsQyxNQUFNLFlBQVksR0FBRyxJQUFBLGdCQUFRLEVBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQVEsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixPQUFPO1FBQ0gsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLEdBQUc7UUFDbEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUk7S0FDeEMsQ0FBQztBQUNOLENBQUM7QUFDRCxrQkFBZSxZQUFZLENBQUMifQ==