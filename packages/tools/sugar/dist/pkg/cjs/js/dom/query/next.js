"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
/**
 * @name      next
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Browse the passed element next siblings to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					elm  		The element to start on
 * @param 		{String} 						selector 	A css selector to search for
 * @return 		{HTMLElement} 								The element found or null
 *
 * @snippet         __next($1, $2)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __next } from '@coffeekraken/sugar/dom'
 * const nextElm =  __next(myCoolElement, '.my-cool-class');
 * if (nextElm) {
 * 		// we have found en element that matches the selector
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __next(elm, selector) {
    elm = elm.nextSibling;
    while (elm) {
        if ((0, dom_1.__matches)(elm, selector)) {
            return elm;
        }
        elm = elm.nextSibling;
    }
    return false;
}
exports.default = __next;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUFvRDtBQUVwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQXdCLE1BQU0sQ0FDMUIsR0FBZ0IsRUFDaEIsUUFBZ0I7SUFFaEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDdEIsT0FBTyxHQUFHLEVBQUU7UUFDUixJQUFJLElBQUEsZUFBUyxFQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsRUFBRTtZQUMxQixPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQ0QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7S0FDekI7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBWkQseUJBWUMifQ==