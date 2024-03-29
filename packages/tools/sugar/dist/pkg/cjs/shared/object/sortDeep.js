"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPlainObject_js_1 = __importDefault(require("../is/isPlainObject.js"));
const sort_js_1 = __importDefault(require("./sort.js"));
/**
 * @name                                sortDeep
 * @namespace            shared.object
 * @type                                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Sort an object properties the same way as the Array.sort do it but will do it recusrively to sort the object deeply.
 *
 * @param                 {Object}                  object                The object to sort
 * @param                 {Function}                sort                  The sort function to use
 * @return                {Object}                                        The sorted object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __sortDeep($1, $2)
 * __sortDeep($1, (a, b) => {
 *      $2
 * })
 *
 * @example               js
 * import { __sortDeep } from '@coffeekraken/sugar/object';
 * __sortDeep({
 *    lolo: { weight: 2 },
 *    coco: { weight: 10 },
 *    plop: { weight: 5 },
 *    aha: {
 *      hello: 'world',
 *      coco: 'plop'
 *    }
 * }, (a, b) => {
 *    return a.key.localeCompare(b.key);
 * });
 * // {
 * //   aha: {
 * //      coco: 'plop',
 * //      hello: 'world'
 * //   }
 * //   coco: { weight: 10 }
 * //   lolo: { weight: 2 },
 * //   plop: { weight: 5 },
 * // }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __sortDeep(object, sort) {
    // sort passed object
    const sortedObject = (0, sort_js_1.default)(object, sort);
    // go deep to sort lower levels
    for (let [key, value] of Object.entries(sortedObject)) {
        if ((0, isPlainObject_js_1.default)(value)) {
            sortedObject[key] = __sortDeep(sortedObject[key], sort);
        }
    }
    return sortedObject;
}
exports.default = __sortDeep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhFQUFxRDtBQUNyRCx3REFBK0I7QUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQUNILFNBQXdCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSTtJQUMzQyxxQkFBcUI7SUFDckIsTUFBTSxZQUFZLEdBQUcsSUFBQSxpQkFBTSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQywrQkFBK0I7SUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDbkQsSUFBSSxJQUFBLDBCQUFlLEVBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0Q7S0FDSjtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFWRCw2QkFVQyJ9