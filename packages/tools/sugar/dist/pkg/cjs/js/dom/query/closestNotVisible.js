"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const visible_1 = __importDefault(require("../is/visible"));
/**
 * @name        closestNotVisible
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Go up the dom three to find the first element that is not visible.
 * Not visible mean that has either an opacity to 0, a visibility to hidden or a display to none
 *
 * @param 		{HTMLElement} 					elm  		The element to start on
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import closestNotVisible from '@coffeekraken/sugar/js/dom/query/closestNotVisible'
 * const closestElm = closestNotVisible(myCoolElement);
 * if (closestElm) {
 * 		// we have found en element that is not visible
 * }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function closestNotVisible(elm) {
    const originalElm = elm;
    elm = elm.parentNode;
    while (elm && elm != originalElm.ownerDocument) {
        if (!(0, visible_1.default)(elm)) {
            return elm;
        }
        elm = elm.parentNode;
    }
    return null;
}
exports.default = closestNotVisible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUF3QztBQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLGlCQUFpQixDQUFDLEdBQWdCO0lBQ3ZDLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUN4QixHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNyQixPQUFPLEdBQUcsSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRTtRQUM1QyxJQUFJLENBQUMsSUFBQSxpQkFBVyxFQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCxHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztLQUN4QjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxrQkFBZSxpQkFBaUIsQ0FBQyJ9