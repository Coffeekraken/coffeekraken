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
export default function __canHaveChildren(element: HTMLElement): boolean {
    if (typeof element === 'string') {
        element = document.createElement(element);
    } else if (!(element instanceof HTMLElement)) {
        throw `The element parameter can be either a string or an HTMLElement node reference... You've passed "${typeof element}"`;
    }
    if ('canHaveHTML' in element) return element.canHaveHTML;
    const tagName = element.tagName;
    const closeTag = `</${tagName}>`.toLowerCase();
    if (element.outerHTML.slice((tagName.length + 3) * -1) === closeTag)
        return true;
    return false;
}
