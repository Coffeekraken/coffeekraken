"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
/**
 * @name      offsetFromParent
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
 * import { __offsetFromParent } from '@coffeekraken/sugar/dom'
 * const offsetFromParentElm = __offsetFromParent(myCoolElement);
 * // output : { top : 200, left : 300 }
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __offsetFromParent(elm) {
    const parentOffset = (0, dom_1.__offsetFromViewport)(elm.parentNode);
    const offset = (0, dom_1.__offsetFromViewport)(elm);
    return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left,
    };
}
exports.default = __offsetFromParent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUErRDtBQUMvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUF3QixrQkFBa0IsQ0FBQyxHQUFnQjtJQUl2RCxNQUFNLFlBQVksR0FBRyxJQUFBLDBCQUFvQixFQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxRCxNQUFNLE1BQU0sR0FBRyxJQUFBLDBCQUFvQixFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLE9BQU87UUFDSCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsR0FBRztRQUNsQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSTtLQUN4QyxDQUFDO0FBQ04sQ0FBQztBQVZELHFDQVVDIn0=