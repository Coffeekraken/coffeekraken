// @ts-nocheck
import __unique from './unique';
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
export default function __keysFirst(array, keys) {
    // all the keys has to exist in the array stack
    // otherwise we filter it out
    keys = keys.filter((key) => {
        return array.indexOf(key) !== -1;
    });
    // add the keys at start
    const empty = [];
    let res = empty.concat(keys).concat(array);
    // remove double items
    res = __unique(res);
    // return the result
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQUMsS0FBWSxFQUFFLElBQVc7SUFDekQsK0NBQStDO0lBQy9DLDZCQUE2QjtJQUM3QixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNILHdCQUF3QjtJQUN4QixNQUFNLEtBQUssR0FBVSxFQUFFLENBQUM7SUFDeEIsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0Msc0JBQXNCO0lBQ3RCLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsb0JBQW9CO0lBQ3BCLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQyJ9