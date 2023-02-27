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
 * @snippet         __isDomNode($1)
 *
 * @example    js
 * import { __isDomNode } from '@coffeekraken/sugar/dom'
 * __isDomNode($myElement);
 *
 * @see         https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isDomNode(element) {
    return typeof Node === 'object'
        ? element instanceof Node
        : element &&
            typeof element === 'object' &&
            typeof element.nodeType === 'number' &&
            typeof element.nodeName === 'string';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUFDLE9BQVk7SUFDNUMsT0FBTyxPQUFPLElBQUksS0FBSyxRQUFRO1FBQzNCLENBQUMsQ0FBQyxPQUFPLFlBQVksSUFBSTtRQUN6QixDQUFDLENBQUMsT0FBTztZQUNILE9BQU8sT0FBTyxLQUFLLFFBQVE7WUFDM0IsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVE7WUFDcEMsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQztBQUNuRCxDQUFDIn0=