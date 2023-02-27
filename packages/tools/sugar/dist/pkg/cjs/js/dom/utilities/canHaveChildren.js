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
 * @snippet         __canHaveChildren($1)
 *
 * @example       js
 * import { __canHaveChildren } from '@coffeekraken/sugar/dom';
 *  __canHaveChildren('img'); // => false
 *  __canHaveChildren('div'); // => true
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __canHaveChildren(element) {
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
exports.default = __canHaveChildren;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQXdCLGlCQUFpQixDQUFDLE9BQW9CO0lBQzFELElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQzdCLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzdDO1NBQU0sSUFBSSxDQUFDLENBQUMsT0FBTyxZQUFZLFdBQVcsQ0FBQyxFQUFFO1FBQzFDLE1BQU0sbUdBQW1HLE9BQU8sT0FBTyxHQUFHLENBQUM7S0FDOUg7SUFDRCxJQUFJLGFBQWEsSUFBSSxPQUFPO1FBQUUsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBQ3pELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDaEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxPQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVE7UUFDL0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQVpELG9DQVlDIn0=