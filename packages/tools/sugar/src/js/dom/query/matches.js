// @ts-nocheck
/**
 * @name      matches
 * @namespace            js.dom.query
 * @type      Function
 * @platform      js
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
 * import matches from '@coffeekraken/sugar/js/dom/matches'
 * if (matches(myCoolHTMLElement, '.my-cool-css-selector')) {
 * 		// the element match the selector
 * }
 *
 * @see 		https://developer.mozilla.org/en/docs/Web/API/Element/matches
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
export default matches;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGNoZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsT0FBTyxDQUFDLEVBQWUsRUFBRSxRQUFnQjtJQUNoRCxJQUFJLEVBQUUsQ0FBQyxRQUFRLElBQUksVUFBVSxJQUFJLEVBQUUsQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFFO1FBQ3ZELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFDRCxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxHQUNMLENBQUMsQ0FBQyxPQUFPO1FBQ1QsQ0FBQyxDQUFDLHFCQUFxQjtRQUN2QixDQUFDLENBQUMsa0JBQWtCO1FBQ3BCLENBQUMsQ0FBQyxpQkFBaUI7UUFDbkIsVUFBVSxDQUFDO1lBQ1QsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDO0lBQ0osT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBQ0QsZUFBZSxPQUFPLENBQUMifQ==