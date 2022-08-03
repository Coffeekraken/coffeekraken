"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      matches
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Polyfill for the Element.matches function
 *
 * @param 		{HTMLElement} 			elm  			The element to check
 * @param 		{String} 				selector 		The selector to check on the element
 * @return 		{Boolean} 								If the element match the selector or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import matches from '@coffeekraken/sugar/js/dom/query/matches'
 * if (matches(myCoolHTMLElement, '.my-cool-css-selector')) {
 * 		// the element match the selector
 * }
 *
 * @see 		https://developer.mozilla.org/en/docs/Web/API/Element/matches
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function matches(el, selector) {
    if (el.nodeName == '#comment' || el.nodeName == '#text') {
        return false;
    }
    const p = Element.prototype;
    const f = p.matches ||
        p.webkitMatchesSelector ||
        p.mozMatchesSelector ||
        p.msMatchesSelector ||
        function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
    return f.call(el, selector);
}
exports.default = matches;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsT0FBTyxDQUFDLEVBQWUsRUFBRSxRQUFnQjtJQUM5QyxJQUFJLEVBQUUsQ0FBQyxRQUFRLElBQUksVUFBVSxJQUFJLEVBQUUsQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFFO1FBQ3JELE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUM1QixNQUFNLENBQUMsR0FDSCxDQUFDLENBQUMsT0FBTztRQUNULENBQUMsQ0FBQyxxQkFBcUI7UUFDdkIsQ0FBQyxDQUFDLGtCQUFrQjtRQUNwQixDQUFDLENBQUMsaUJBQWlCO1FBQ25CLFVBQVUsQ0FBQztZQUNQLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQztJQUNOLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUNELGtCQUFlLE9BQU8sQ0FBQyJ9