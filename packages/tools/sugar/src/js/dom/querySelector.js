// @ts-nocheck
import __isVisible from './isVisible';
import __isInViewport from './isInViewport';
import __closestNotVisible from './closestNotVisible';
/**
 * @name      querySelector
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Enhanced proxy of the Element.querySelector function that let you specify
 * if you want an element that is visible, or even that is in the viewport
 *
 * @param 		{String} 			selector 			The css selector to search
 * @param 		{Object} 			settings	 		The settings of the query
 * @return 		{HTMLElement} 							The founded element
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import querySelector from '@coffeekraken/sugar/js/dom/querySelector';
 * // simple query
 * const elm = querySelector('.a-cool-css-selector');
 *
 * // get an element that is in the viewport
 * const elm = querySelector('.a-cool-css-selector', {
 * 		inViewport : true
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
/**
 * If we want only a visible element
 * @setting
 * @name 		visible
 * @type 		{Boolean}
 * @default 	false
 */
/**
 * If we want only an element that is in the viewport
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
function querySelector(selector, settings = {}) {
    // extend settings
    settings = Object.assign({ visible: null, inViewport: null, rootNode: document.body }, settings);
    // grab the element into the dom
    const elm = settings.rootNode.querySelector(selector);
    // if no element, stop here
    if (!elm)
        return null;
    // state tracking
    const isVisible = true;
    const isInViewport = true;
    // check settings
    if (settings.visible) {
        if (!__isVisible(elm) || !__closestNotVisible(elm))
            return null;
    }
    if (settings.inViewport) {
        if (!__isInViewport(elm))
            return null;
    }
    // return the element
    return elm;
}
export default querySelector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXJ5U2VsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLGNBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLG1CQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUVIOzs7Ozs7R0FNRztBQUVIOzs7Ozs7R0FNRztBQUVIOzs7Ozs7R0FNRztBQUVILFNBQVMsYUFBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUM1QyxrQkFBa0I7SUFDbEIsUUFBUSxtQkFDTixPQUFPLEVBQUUsSUFBSSxFQUNiLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxJQUNwQixRQUFRLENBQ1osQ0FBQztJQUVGLGdDQUFnQztJQUNoQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCwyQkFBMkI7SUFDM0IsSUFBSSxDQUFDLEdBQUc7UUFBRSxPQUFPLElBQUksQ0FBQztJQUV0QixpQkFBaUI7SUFDakIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQztJQUUxQixpQkFBaUI7SUFDakIsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1FBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztLQUNqRTtJQUNELElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO0tBQ3ZDO0lBRUQscUJBQXFCO0lBQ3JCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUNELGVBQWUsYUFBYSxDQUFDIn0=