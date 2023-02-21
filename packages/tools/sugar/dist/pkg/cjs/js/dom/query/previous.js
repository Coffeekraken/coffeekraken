"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
/**
 * @name      previous
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Browse the passed element previous siblings to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					elm  		The element to start on
 * @param 		{String} 						selector 	A css selector to search for
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __previous } from '@coffeekraken/sugar/dom'
 * const previousElm = __previous(myCoolElement, '.my-cool-class');
 * if (previousElm) {
 * 		// we have found en element that matches the selector
 * }
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __previous(elm, selector) {
    elm = elm.previousSibling;
    while (elm) {
        if ((0, dom_1.__matches)(elm, selector)) {
            return elm;
        }
        elm = elm.previousSibling;
    }
    return false;
}
exports.default = __previous;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUFvRDtBQUVwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUF3QixVQUFVLENBQzlCLEdBQWdCLEVBQ2hCLFFBQWdCO0lBRWhCLEdBQUcsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDO0lBQzFCLE9BQU8sR0FBRyxFQUFFO1FBQ1IsSUFBSSxJQUFBLGVBQVMsRUFBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDMUIsT0FBTyxHQUFHLENBQUM7U0FDZDtRQUNELEdBQUcsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDO0tBQzdCO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQVpELDZCQVlDIn0=