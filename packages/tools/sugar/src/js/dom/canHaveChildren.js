/**
 * @name          canHaveChildren
 * @namespace     sugar.js.dom
 * @type          Function
 *
 * This function take as input either a tagName String like "img", "div", etc... or an HTMLElement node
 * and return true or false depending if this element is supposed to have children or not.
 *
 * @TODO      tests
 *
 * @param       {String|HTMLElement}          element       The element to check. A tagName like "img", or directly a HTMLElement node reference
 * @return      {Boolean}                                   true if the element is supposed to have children, false if not
 *
 * @example       js
 * import canHaveChildren from '@coffeekraken/sugar/js/dom/canHaveChildren';
 * canHaveChildren('img'); // => false
 * canHaveChildren('div'); // => true
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function canHaveChildren(element) {
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
