"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            extractValues
 * @namespace            shared.object
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function take an array of objects and a key name as parameters and return an array containing
 * only the specified object key value.
 *
 * @param       {Array<Object>}         arrayOfObjects            An array of objects as source
 * @param       {String}                keyName                   The key name you want to extract of the objects
 * @return      {Array}                                           An array containing only the values of the property specified
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import { __extractValues } from '@coffeekraken/sugar/object';
 * __extractValues ([{
 *    hello: 'world',
 *    plop: 'Yes'
 * }, {
 *    hello: 'king',
 *    plop: 'something'
 * }], 'hello'); // => ['world', 'king']
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __extractValues(arrayOfObjects, keyName) {
    const finalArray = [];
    arrayOfObjects.forEach((object) => {
        if (object[keyName] === undefined)
            return;
        finalArray.push(object[keyName]);
    });
    return finalArray;
}
exports.default = __extractValues;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsU0FBd0IsZUFBZSxDQUFDLGNBQWMsRUFBRSxPQUFPO0lBQzNELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN0QixjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDOUIsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUztZQUFFLE9BQU87UUFDMUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUM7QUFQRCxrQ0FPQyJ9