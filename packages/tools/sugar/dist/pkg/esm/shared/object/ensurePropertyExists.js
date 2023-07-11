// @ts-nocheck
import __get from './get.js';
import __set from './set.js';
/**
 * @name                        ensurePropertyExists
 * @namespace            shared.object
 * @type                        Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Pass a string like "my.cool.object" and the value it has to be and this function will ensure that this deep object exist
 *
 * @param           {Object}            obj                           The object on which to check the path existence
 * @param           {String}            path                           The dotted object path to check
 * @param           {Mixed}             value                         The value to set to the object path created if not already exist
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __ensurePropertyExists($1, $2)
 *
 * @example           js
 * import { __ensureProperyExists } from '@coffeekraken/sugar/object';
 * const myObj = { hello: 'world' }«
 * __ensureProperyExists(myObj, 'cool.object', {});
 * // { hello: 'world', cool: { object: {} } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __ensureProperyExists(obj, path, value = {}) {
    const v = __get(obj, path);
    if (v === undefined) {
        __set(obj, path, value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEtBQUssTUFBTSxVQUFVLENBQUM7QUFDN0IsT0FBTyxLQUFLLE1BQU0sVUFBVSxDQUFDO0FBRTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFO0lBQy9ELE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0IsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1FBQ2pCLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzNCO0FBQ0wsQ0FBQyJ9