"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const uniq_1 = __importDefault(require("lodash/uniq"));
/**
 * @name        keysFirst
 * @namespace           sugar.js.array
 * @type      Function
 * @stable
 *
 * Make sure the passed array start with the passed keys
 *
 * @param    {Array}    array    The array to sort
 * @param    {Array}    keys    The keys to start the array with
 * @return    {Array}    The processed array
 *
 * @example    js
 * import keysFirst from '@coffeekraken/sugar/js/array/keysFirst'
 * keysFirst(['a','b','d','g','c'], ['d','g'])
 * // ['d','g','a','b','c']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function keysFirst(array, keys) {
    // all the keys has to exist in the array stack
    // otherwise we filter it out
    keys = keys.filter((key) => {
        return array.indexOf(key) !== -1;
    });
    // add the keys at start
    const empty = [];
    let res = empty.concat(keys).concat(array);
    // remove double items
    res = uniq_1.default(res);
    // return the result
    return res;
}
module.exports = keysFirst;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5c0ZpcnN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsia2V5c0ZpcnN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLHVEQUErQjtBQUUvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxTQUFTLENBQUMsS0FBWSxFQUFFLElBQVc7SUFDMUMsK0NBQStDO0lBQy9DLDZCQUE2QjtJQUM3QixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3pCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNILHdCQUF3QjtJQUN4QixNQUFNLEtBQUssR0FBVSxFQUFFLENBQUM7SUFDeEIsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0Msc0JBQXNCO0lBQ3RCLEdBQUcsR0FBRyxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEIsb0JBQW9CO0lBQ3BCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELGlCQUFTLFNBQVMsQ0FBQyJ9