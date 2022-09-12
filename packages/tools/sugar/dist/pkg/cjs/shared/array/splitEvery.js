"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                                splitEvery
 * @namespace            shared.array
 * @type                                Function
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * Split an array every N items
 *
 * @param           {Array}           array               The array to split
 * @param           {Number}          every               Every how many items to split the array
 * @return          {Array}                               An array of arrays splited
 *
 * @example           js
 * import { __splitEvery } from '@coffeekraken/sugar/array';
 * __splitEvery([1,2,3,4,5,6,7,8,9], 3);
 * // [[1,2,3],[4,5,6],[7,8,9]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __splitEvery(array, every) {
    let i, j;
    const finalArray = [];
    for (i = 0, j = array.length; i < j; i += every) {
        finalArray.push(array.slice(i, i + every));
    }
    return finalArray;
}
exports.default = __splitEvery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQXdCLFlBQVksQ0FBQyxLQUFZLEVBQUUsS0FBYTtJQUM1RCxJQUFJLENBQVMsRUFBRSxDQUFTLENBQUM7SUFDekIsTUFBTSxVQUFVLEdBQVUsRUFBRSxDQUFDO0lBQzdCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUU7UUFDN0MsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUM5QztJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUM7QUFQRCwrQkFPQyJ9