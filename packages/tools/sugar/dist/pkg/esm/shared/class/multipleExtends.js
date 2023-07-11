// @ts-nocheck
import __aggregation from 'aggregation/es5.js';
/**
 * @name                multipleExtends
 * @namespace           shared.class
 * @type                Function
 * @platform          js
 * @platform          node
 * @status          alpha
 *
 * This function allows you to extends your class with multiple other ones.
 *
 * @param     {Class}           ...classes          All the classed you want to extend the first one with
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __multipleExtends($1, $2)
 *
 * @example         js
 * import { __multipleExtends } from '@coffeekraken/sugar/class';
 * class MyCoolClass extends __multipleExtends(Another, AnotherOne) {
 * }
 *
 * @see       https://www.npmjs.com/package/aggregation
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default (...classes) => {
    return __aggregation(...classes);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSxvQkFBb0IsQ0FBQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxlQUFlLENBQUMsR0FBRyxPQUFPLEVBQUUsRUFBRTtJQUMxQixPQUFPLGFBQWEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyJ9