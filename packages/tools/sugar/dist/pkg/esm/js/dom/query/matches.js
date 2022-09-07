// @ts-nocheck
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
 * import { __matches } from '@coffeekraken/sugar/dom'
 * if (__matches(myCoolHTMLElement, '.my-cool-css-selector')) {
 * 		// the element match the selector
 * }
 *
 * @see 		https://developer.mozilla.org/en/docs/Web/API/Element/matches
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __matches(el, selector) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxFQUFlLEVBQUUsUUFBZ0I7SUFDL0QsSUFBSSxFQUFFLENBQUMsUUFBUSxJQUFJLFVBQVUsSUFBSSxFQUFFLENBQUMsUUFBUSxJQUFJLE9BQU8sRUFBRTtRQUNyRCxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDNUIsTUFBTSxDQUFDLEdBQ0gsQ0FBQyxDQUFDLE9BQU87UUFDVCxDQUFDLENBQUMscUJBQXFCO1FBQ3ZCLENBQUMsQ0FBQyxrQkFBa0I7UUFDcEIsQ0FBQyxDQUFDLGlCQUFpQjtRQUNuQixVQUFVLENBQUM7WUFDUCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUM7SUFDTixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLENBQUMifQ==