// @ts-nocheck
import getStyleProperty from './getStyleProperty';
/**
 * @name      querySelectorAllWithStyle
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Select all node that match the style object passed as parameter
 *
 * @param    {String}    selector    The css selector to use as base filter
 * @param    {Object}    style    The style that has to match
 * @param    {Object}    [settings={}]    A setting object
 * @return    [Array<HTMLElement>]    An array of HTMLElement that matches the style object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import querySelectorAllWithStyle from '@coffeekraken/sugar/js/dom/querySelectorAllWithStyle'
 * querySelectorAllWithStyle('*', {
 * 	backgroundImage: true
 * })
 *
 * // style object can contains either:
 * const style = {
 * 	 backgroundImage: true, // has to have the background-image style
 *   backgroundPosition: false, // has to not have the background-position style
 *   backgroundSize: /cover|contain/, // has to have the background-size set to cover or contain
 *   background: 'none' // has to have to background set to "none"
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function querySelectorAllWithStyle(selector, style, settings = {}) {
    // extend settings
    settings = Object.assign({ rootNode: document.body }, settings);
    // select all the element from the selector
    const $elms = settings.rootNode.querySelectorAll(selector);
    // check that we have some nodes to process
    if (!$elms.length)
        return [];
    // init the ar$Elms stack that will be returned at the end
    const ar$Elms = [];
    // loop on each elements
    Array.from($elms).forEach(($elm) => {
        // track if the $elm match all the properties
        let match = true;
        // loop on each properties of the style object
        // to check it against the dom computed style
        for (const key in style) {
            // get the value from the computed dom node
            const value = getStyleProperty($elm, key);
            // true as selector
            if (style[key] === true && !value) {
                match = false;
                break;
            }
            else if (style[key] === false && value) {
                match = false;
                break;
            }
            else if (style[key] instanceof RegExp &&
                !value.toString().match(style[key])) {
                match = false;
                break;
            }
            else if (typeof style[key] === 'string' && style[key] !== value) {
                match = false;
                break;
            }
        }
        // add the dom node in stack if it match all the
        // style object
        if (match) {
            ar$Elms.push($elm);
        }
    });
    // return the elements found
    return ar$Elms;
}
/**
 * @name 	settings.rootNode
 * The root node used to select the the elements within
 * @setting
 * @type 		{HTMLElement}
 * @default 	document
 */
export default querySelectorAllWithStyle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckFsbFdpdGhTdHlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXJ5U2VsZWN0b3JBbGxXaXRoU3R5bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNILFNBQVMseUJBQXlCLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUMvRCxrQkFBa0I7SUFDbEIsUUFBUSxtQkFDTixRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksSUFDcEIsUUFBUSxDQUNaLENBQUM7SUFDRiwyQ0FBMkM7SUFDM0MsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRCwyQ0FBMkM7SUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFDN0IsMERBQTBEO0lBQzFELE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNuQix3QkFBd0I7SUFDeEIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNqQyw2Q0FBNkM7UUFDN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLDhDQUE4QztRQUM5Qyw2Q0FBNkM7UUFDN0MsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDdkIsMkNBQTJDO1lBQzNDLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxQyxtQkFBbUI7WUFDbkIsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNqQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNkLE1BQU07YUFDUDtpQkFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFO2dCQUN4QyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNkLE1BQU07YUFDUDtpQkFBTSxJQUNMLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxNQUFNO2dCQUM1QixDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ25DO2dCQUNBLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ2QsTUFBTTthQUNQO2lCQUFNLElBQUksT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ2pFLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ2QsTUFBTTthQUNQO1NBQ0Y7UUFDRCxnREFBZ0Q7UUFDaEQsZUFBZTtRQUNmLElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsNEJBQTRCO0lBQzVCLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxlQUFlLHlCQUF5QixDQUFDIn0=