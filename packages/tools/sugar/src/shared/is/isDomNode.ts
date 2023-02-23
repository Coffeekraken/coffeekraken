// @ts-nocheck

/**
 * @name      isDomNode
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the passed element is a DOM node
 *
 * @param       {any}           element             The element to check
 * @return      {Boolean}                           true if is a DOM node, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __isDomNode } from '@coffeekraken/sugar/dom'
 * __isDomNode($myElement);
 *
 * @see         https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isDomNode(element: any): boolean {
    return typeof Node === 'object'
        ? element instanceof Node
        : element &&
              typeof element === 'object' &&
              typeof element.nodeType === 'number' &&
              typeof element.nodeName === 'string';
}
