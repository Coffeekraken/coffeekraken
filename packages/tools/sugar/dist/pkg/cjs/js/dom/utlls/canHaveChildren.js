"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = canHaveChildren;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLGVBQWUsQ0FBQyxPQUFvQjtJQUN6QyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUM3QixPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUM3QztTQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sWUFBWSxXQUFXLENBQUMsRUFBRTtRQUMxQyxNQUFNLG1HQUFtRyxPQUFPLE9BQU8sR0FBRyxDQUFDO0tBQzlIO0lBQ0QsSUFBSSxhQUFhLElBQUksT0FBTztRQUFFLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUN6RCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ2hDLE1BQU0sUUFBUSxHQUFHLEtBQUssT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRO1FBQy9ELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxrQkFBZSxlQUFlLENBQUMifQ==