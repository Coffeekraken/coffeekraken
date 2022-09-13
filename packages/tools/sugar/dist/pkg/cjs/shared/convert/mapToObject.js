"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name          mapToObject
 * @namespace            shared.convert
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function simply take a Map object and convert it to a plain object
 *
 * @param       {Map}         map       The map object to convert into object
 * @return      {Object}                The plain object
 *
 * @example       js
 * import { __mapToObject } from '@coffeekraken/sugar/convert';
 * const myMap = new Map();
 * myMap.set('hello', 'world');
 * __mapToObject(myMap);
 * // {
 * //   hello: 'world'
 * // }
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __mapToObject(map) {
    const obj = {};
    for (const [k, v] of map)
        obj[k] = v;
    return obj;
}
exports.default = __mapToObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQXdCLGFBQWEsQ0FBQyxHQUFRO0lBQzFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNmLEtBQUssTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHO1FBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFKRCxnQ0FJQyJ9