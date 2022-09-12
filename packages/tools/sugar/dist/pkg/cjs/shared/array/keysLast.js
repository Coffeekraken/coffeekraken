"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const unique_1 = __importDefault(require("./unique"));
/**
 * @name        keysLast
 * @namespace            shared.array
 * @type      Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * Make sure the passed array ends with the passed keys
 * @param    {Array}    array    The array to process
 * @param    {Array}    keys    The keys to end the array with
 * @return    {Array}    The processed array
 *
 * @example    js
 * import { __keysLast } from '@coffeekraken/sugar/array'
 * __keysLast(['a','b','d','g','c'], ['d','g'])
 * // ['a','b','c','d','g']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __keysLast(array, keys) {
    // all the keys has to exist in the array stack
    // otherwise we filter it out
    keys = keys.filter((key) => {
        return array.indexOf(key) !== -1;
    });
    // add the keys at start
    let res = [].concat(array).concat(keys);
    // reverse the array
    res = res.reverse();
    // remove double items
    res = (0, unique_1.default)(res);
    // reverse back the array
    res = res.reverse();
    // return the result
    return res;
}
exports.default = __keysLast;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLHNEQUFnQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILFNBQXdCLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSTtJQUMxQywrQ0FBK0M7SUFDL0MsNkJBQTZCO0lBQzdCLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDdkIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsd0JBQXdCO0lBQ3hCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLG9CQUFvQjtJQUNwQixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BCLHNCQUFzQjtJQUN0QixHQUFHLEdBQUcsSUFBQSxnQkFBUSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLHlCQUF5QjtJQUN6QixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BCLG9CQUFvQjtJQUNwQixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFoQkQsNkJBZ0JDIn0=