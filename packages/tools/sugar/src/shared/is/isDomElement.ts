// @ts-nocheck

/**
 * @name      isDomElement
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the passed element is a DOM element
 *
 * @param       {any}           element             The element to check
 * @return      {Boolean}                           true if is a DOM element, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isDomElement($1)
 * 
 * @example    js
 * import { __isDomElement } from '@coffeekraken/sugar/dom'
 * __isDomElement($myElement);
 *
 * @see         https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isDomElement(element: any): boolean {
    return typeof HTMLElement === 'object'
        ? element instanceof HTMLElement //DOM2
        : element &&
              typeof element === 'object' &&
              element !== null &&
              element.nodeType === 1 &&
              typeof element.nodeName === 'string';
}
