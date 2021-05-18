// @ts-nocheck
import __isVisible from './isVisible';
import __isInViewport from './isInViewport';
import __closestNotVisible from './query/closestNotVisible';
/**
 * @name      querySelectorAll
 * @namespace            js.dom.query
 * @type      Function
 * @stable
 *
 * Enhanced proxy of the Element.querySelectorAll function that let you specify
 * if you want elements that are visible, or even that are in the viewport
 *
 * @param 		{String} 				selector 			The css selector to search
 * @param 		{Object} 				settings	 		The settings of the query
 * @return 		{Array}<HTMLElement> 						The founded elements
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import querySelectorAll from '@coffeekraken/sugar/js/dom/querySelectorAll';
 * // simple query
 * const elms = querySelectorAll('.a-cool-css-selector');
 *
 * // get elements that are in the viewport
 * const elms = querySelectorAll('.a-cool-css-selector', {
 * 		inViewport : true
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
/**
 * If we want only visible elements
 * @setting
 * @name 		visible
 * @type 		{Boolean}
 * @default 	false
 */
/**
 * If we want only elements that are in the viewport
 * @setting
 * @name 		inViewport
 * @type 		{Boolean}
 * @default 	false
 */
/**
 * The root node to start the query from
 * @setting
 * @name 		rootNode
 * @type 		{HTMLElement}
 * @default 	document.body
 */
function querySelectorAll(selector, settings = {}) {
    // extend settings
    settings = Object.assign({ visible: null, inViewport: null, rootNode: document.body }, settings);
    // results array
    const results = [];
    // grab the element into the dom
    const elms = settings.rootNode.querySelectorAll(selector);
    // loop on the found elements
    [].forEach.call(elms, (elm) => {
        // check settings
        if (settings.visible) {
            if (!__isVisible(elm) || !__closestNotVisible(elm))
                return;
        }
        if (settings.inViewport) {
            if (!__isInViewport(elm))
                return;
        }
        // add the element to the result array
        results.push(elm);
    });
    // return the elements
    return results;
}
export default querySelectorAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXJ5U2VsZWN0b3JBbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLGNBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLG1CQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUVIOzs7Ozs7R0FNRztBQUVIOzs7Ozs7R0FNRztBQUVIOzs7Ozs7R0FNRztBQUVILFNBQVMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQy9DLGtCQUFrQjtJQUNsQixRQUFRLG1CQUNOLE9BQU8sRUFBRSxJQUFJLEVBQ2IsVUFBVSxFQUFFLElBQUksRUFDaEIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLElBQ3BCLFFBQVEsQ0FDWixDQUFDO0lBRUYsZ0JBQWdCO0lBQ2hCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUVuQixnQ0FBZ0M7SUFDaEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUUxRCw2QkFBNkI7SUFDN0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDNUIsaUJBQWlCO1FBQ2pCLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU87U0FDNUQ7UUFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTztTQUNsQztRQUVELHNDQUFzQztRQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBRUgsc0JBQXNCO0lBQ3RCLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxlQUFlLGdCQUFnQixDQUFDIn0=