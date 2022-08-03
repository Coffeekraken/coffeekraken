"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matches_1 = __importDefault(require("./matches"));
/**
 * @name        querySelectorUp
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Go up the dom three to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @param 		{String|Function} 				selector 	A css selector to search for or a check function that will be used
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import querySelectorUp from '@coffeekraken/sugar/js/dom/query/querySelectorUp'
 * const closestElm = querySelectorUp(myCoolElement, '.my-cool-class');
 * if (closestElm) {
 * 		// we have found en element that matches the selector
 * }
 * // the selector param can be a function that need to return either true or false like so:
 * querySelectorUp(myCoolElement, (elm) => {
 *   return elm.hasAttribute('my-cool-attribute')
 * })
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function querySelectorUp($elm, selector) {
    const originalElm = $elm;
    $elm = $elm.parentNode;
    while ($elm && $elm != originalElm.ownerDocument) {
        if (typeof selector === 'function') {
            if (selector($elm))
                return $elm;
        }
        else if (typeof selector === 'string' && (0, matches_1.default)($elm, selector)) {
            return $elm;
        }
        $elm = $elm.parentNode;
    }
    return null;
}
exports.default = querySelectorUp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFrQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsU0FBUyxlQUFlLENBQUMsSUFBaUIsRUFBRSxRQUEyQjtJQUNuRSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDdkIsT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUU7UUFDOUMsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDaEMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1NBQ25DO2FBQU0sSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksSUFBQSxpQkFBUyxFQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRTtZQUNsRSxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDMUI7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0Qsa0JBQWUsZUFBZSxDQUFDIn0=