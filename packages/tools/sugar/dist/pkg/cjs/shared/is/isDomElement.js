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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBd0IsY0FBYyxDQUFDLE9BQVk7SUFDL0MsT0FBTyxPQUFPLFdBQVcsS0FBSyxRQUFRO1FBQ2xDLENBQUMsQ0FBQyxPQUFPLFlBQVksV0FBVyxDQUFDLE1BQU07UUFDdkMsQ0FBQyxDQUFDLE9BQU87WUFDSCxPQUFPLE9BQU8sS0FBSyxRQUFRO1lBQzNCLE9BQU8sS0FBSyxJQUFJO1lBQ2hCLE9BQU8sQ0FBQyxRQUFRLEtBQUssQ0FBQztZQUN0QixPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDO0FBQ25ELENBQUM7QUFSRCxpQ0FRQyJ9