"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
function __isDomNode(element) {
    return typeof Node === 'object'
        ? element instanceof Node
        : element &&
            typeof element === 'object' &&
            typeof element.nodeType === 'number' &&
            typeof element.nodeName === 'string';
}
exports.default = __isDomNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBd0IsV0FBVyxDQUFDLE9BQVk7SUFDNUMsT0FBTyxPQUFPLElBQUksS0FBSyxRQUFRO1FBQzNCLENBQUMsQ0FBQyxPQUFPLFlBQVksSUFBSTtRQUN6QixDQUFDLENBQUMsT0FBTztZQUNILE9BQU8sT0FBTyxLQUFLLFFBQVE7WUFDM0IsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVE7WUFDcEMsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQztBQUNuRCxDQUFDO0FBUEQsOEJBT0MifQ==