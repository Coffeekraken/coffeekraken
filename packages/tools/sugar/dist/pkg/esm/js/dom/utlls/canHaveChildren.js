// @ts-nocheck
/**
 * @name          canHaveChildren
 * @namespace            js.dom.utils
 * @type          Function
 * @platform          js
 * @status      beta
 *
 * This function take as input either a tagName String like "img", "div", etc... or an HTMLElement node
 * and return true or false depending if this element is supposed to have children or not.
 *
 * @param       {String|HTMLElement}          element       The element to check. A tagName like "img", or directly a HTMLElement node reference
 * @return      {Boolean}                                   true if the element is supposed to have children, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import canHaveChildren from '@coffeekraken/sugar/js/dom/canHaveChildren';
 * canHaveChildren('img'); // => false
 * canHaveChildren('div'); // => true
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function canHaveChildren(element) {
    if (typeof element === 'string') {
        element = document.createElement(element);
    }
    else if (!(element instanceof HTMLElement)) {
        throw `The element parameter can be either a string or an HTMLElement node reference... You've passed "${typeof element}"`;
    }
    if ('canHaveHTML' in element)
        return element.canHaveHTML;
    const tagName = element.tagName;
    const closeTag = `</${tagName}>`.toLowerCase();
    if (element.outerHTML.slice((tagName.length + 3) * -1) === closeTag)
        return true;
    return false;
}
export default canHaveChildren;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxlQUFlLENBQUMsT0FBb0I7SUFDekMsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7UUFDN0IsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDN0M7U0FBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLFlBQVksV0FBVyxDQUFDLEVBQUU7UUFDMUMsTUFBTSxtR0FBbUcsT0FBTyxPQUFPLEdBQUcsQ0FBQztLQUM5SDtJQUNELElBQUksYUFBYSxJQUFJLE9BQU87UUFBRSxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDekQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUNoQyxNQUFNLFFBQVEsR0FBRyxLQUFLLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9DLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUTtRQUMvRCxPQUFPLElBQUksQ0FBQztJQUNoQixPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBQ0QsZUFBZSxlQUFlLENBQUMifQ==