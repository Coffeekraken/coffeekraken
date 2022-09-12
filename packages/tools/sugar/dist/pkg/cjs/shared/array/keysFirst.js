"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const unique_1 = __importDefault(require("./unique"));
/**
 * @name        keysFirst
 * @namespace            shared.array
 * @type      Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * Make sure the passed array start with the passed keys
 *
 * @param    {Array}    array    The array to sort
 * @param    {Array}    keys    The keys to start the array with
 * @return    {Array}    The processed array
 *
 * @example    js
 * import { __keysFirst } from '@coffeekraken/sugar/array'
 * __keysFirst(['a','b','d','g','c'], ['d','g'])
 * // ['d','g','a','b','c']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __keysFirst(array, keys) {
    // all the keys has to exist in the array stack
    // otherwise we filter it out
    keys = keys.filter((key) => {
        return array.indexOf(key) !== -1;
    });
    // add the keys at start
    const empty = [];
    let res = empty.concat(keys).concat(array);
    // remove double items
    res = (0, unique_1.default)(res);
    // return the result
    return res;
}
exports.default = __keysFirst;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLHNEQUFnQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxTQUF3QixXQUFXLENBQUMsS0FBWSxFQUFFLElBQVc7SUFDekQsK0NBQStDO0lBQy9DLDZCQUE2QjtJQUM3QixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNILHdCQUF3QjtJQUN4QixNQUFNLEtBQUssR0FBVSxFQUFFLENBQUM7SUFDeEIsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0Msc0JBQXNCO0lBQ3RCLEdBQUcsR0FBRyxJQUFBLGdCQUFRLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsb0JBQW9CO0lBQ3BCLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQWJELDhCQWFDIn0=