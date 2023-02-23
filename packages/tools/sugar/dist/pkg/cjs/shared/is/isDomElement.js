"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
 * @example    js
 * import { __isDomElement } from '@coffeekraken/sugar/dom'
 * __isDomElement($myElement);
 *
 * @see         https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isDomElement(element) {
    return typeof HTMLElement === 'object'
        ? element instanceof HTMLElement //DOM2
        : element &&
            typeof element === 'object' &&
            element !== null &&
            element.nodeType === 1 &&
            typeof element.nodeName === 'string';
}
exports.default = __isDomElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQXdCLGNBQWMsQ0FBQyxPQUFZO0lBQy9DLE9BQU8sT0FBTyxXQUFXLEtBQUssUUFBUTtRQUNsQyxDQUFDLENBQUMsT0FBTyxZQUFZLFdBQVcsQ0FBQyxNQUFNO1FBQ3ZDLENBQUMsQ0FBQyxPQUFPO1lBQ0gsT0FBTyxPQUFPLEtBQUssUUFBUTtZQUMzQixPQUFPLEtBQUssSUFBSTtZQUNoQixPQUFPLENBQUMsUUFBUSxLQUFLLENBQUM7WUFDdEIsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQztBQUNuRCxDQUFDO0FBUkQsaUNBUUMifQ==