// @ts-nocheck
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
 * @snippet         __splitEvery($1, $2)
 *
 * @example           js
 * import { __splitEvery } from '@coffeekraken/sugar/array';
 * __splitEvery([1,2,3,4,5,6,7,8,9], 3);
 * // [[1,2,3],[4,5,6],[7,8,9]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __splitEvery(array, every) {
    let i, j;
    const finalArray = [];
    for (i = 0, j = array.length; i < j; i += every) {
        finalArray.push(array.slice(i, i + every));
    }
    return finalArray;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsWUFBWSxDQUFDLEtBQVksRUFBRSxLQUFhO0lBQzVELElBQUksQ0FBUyxFQUFFLENBQVMsQ0FBQztJQUN6QixNQUFNLFVBQVUsR0FBVSxFQUFFLENBQUM7SUFDN0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRTtRQUM3QyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzlDO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQyJ9