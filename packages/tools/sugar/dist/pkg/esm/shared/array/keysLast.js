// @ts-nocheck
import __unique from './unique';
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
    res = __unique(res);
    // reverse back the array
    res = res.reverse();
    // return the result
    return res;
}
export default keysLast;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSTtJQUN6QiwrQ0FBK0M7SUFDL0MsNkJBQTZCO0lBQzdCLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDdkIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsd0JBQXdCO0lBQ3hCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLG9CQUFvQjtJQUNwQixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BCLHNCQUFzQjtJQUN0QixHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLHlCQUF5QjtJQUN6QixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BCLG9CQUFvQjtJQUNwQixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFFRCxlQUFlLFFBQVEsQ0FBQyJ9