"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
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
    const parentOffset = (0, dom_1.__offsetFromViewport)(elm.parentNode);
    const offset = (0, dom_1.__offsetFromViewport)(elm);
    return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left,
    };
}
exports.default = offsetParent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUErRDtBQUMvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFlBQVksQ0FBQyxHQUFnQjtJQUlsQyxNQUFNLFlBQVksR0FBRyxJQUFBLDBCQUFvQixFQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxRCxNQUFNLE1BQU0sR0FBRyxJQUFBLDBCQUFvQixFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLE9BQU87UUFDSCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsR0FBRztRQUNsQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSTtLQUN4QyxDQUFDO0FBQ04sQ0FBQztBQUNELGtCQUFlLFlBQVksQ0FBQyJ9