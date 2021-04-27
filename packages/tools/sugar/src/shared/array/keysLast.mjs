// @ts-nocheck
import uniq from 'lodash/uniq';
/**
 * @name        keysLast
 * @namespace            js.array
 * @type      Function
 * @stable
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    res = uniq(res);
    // reverse back the array
    res = res.reverse();
    // return the result
    return res;
}
export default keysLast;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5c0xhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2FycmF5L2tleXNMYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxhQUFhLENBQUM7QUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUk7SUFDM0IsK0NBQStDO0lBQy9DLDZCQUE2QjtJQUM3QixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3pCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNILHdCQUF3QjtJQUN4QixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxvQkFBb0I7SUFDcEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwQixzQkFBc0I7SUFDdEIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQix5QkFBeUI7SUFDekIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwQixvQkFBb0I7SUFDcEIsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsZUFBZSxRQUFRLENBQUMifQ==