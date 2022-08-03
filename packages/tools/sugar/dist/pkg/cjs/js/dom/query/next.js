"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matches_1 = __importDefault(require("./matches"));
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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import next from '@coffeekraken/sugar/js/dom/query/next'
 * const nextElm = next(myCoolElement, '.my-cool-class');
 * if (nextElm) {
 * 		// we have found en element that matches the selector
 * }
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function next(elm, selector) {
    elm = elm.nextSibling;
    while (elm) {
        if ((0, matches_1.default)(elm, selector)) {
            return elm;
        }
        elm = elm.nextSibling;
    }
    return false;
}
exports.default = next;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFrQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLElBQUksQ0FBQyxHQUFnQixFQUFFLFFBQWdCO0lBQzVDLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQ3RCLE9BQU8sR0FBRyxFQUFFO1FBQ1IsSUFBSSxJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQzFCLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztLQUN6QjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxrQkFBZSxJQUFJLENBQUMifQ==