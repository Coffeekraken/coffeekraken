"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
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
 * import { __closestNotVisible } from '@coffeekraken/sugar/dom'
 * const closestElm =  __closestNotVisible(myCoolElement);
 * if (closestElm) {
 * 		// we have found en element that is not visible
 * }
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __closestNotVisible(elm) {
    const originalElm = elm;
    elm = elm.parentNode;
    while (elm && elm != originalElm.ownerDocument) {
        if (!(0, dom_1.__isVisible)(elm)) {
            return elm;
        }
        elm = elm.parentNode;
    }
    return null;
}
exports.default = __closestNotVisible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUF3QixtQkFBbUIsQ0FBQyxHQUFnQjtJQUN4RCxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7SUFDeEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7SUFDckIsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUU7UUFDNUMsSUFBSSxDQUFDLElBQUEsaUJBQVcsRUFBQyxHQUFHLENBQUMsRUFBRTtZQUNuQixPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQ0QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7S0FDeEI7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBVkQsc0NBVUMifQ==