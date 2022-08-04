"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const unique_1 = __importDefault(require("./unique"));
/**
 * @name        keysLast
 * @namespace            js.array
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
 * import keysLast from '@coffeekraken/sugar/js/array/keysLast'
 * keysLast(['a','b','d','g','c'], ['d','g'])
 * // ['a','b','c','d','g']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function keysLast(array, keys) {
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
exports.default = keysLast;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLHNEQUFnQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJO0lBQ3pCLCtDQUErQztJQUMvQyw2QkFBNkI7SUFDN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUN2QixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDSCx3QkFBd0I7SUFDeEIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsb0JBQW9CO0lBQ3BCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDcEIsc0JBQXNCO0lBQ3RCLEdBQUcsR0FBRyxJQUFBLGdCQUFRLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIseUJBQXlCO0lBQ3pCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDcEIsb0JBQW9CO0lBQ3BCLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUVELGtCQUFlLFFBQVEsQ0FBQyJ9