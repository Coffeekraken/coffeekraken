"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        moveItem
 * @namespace            shared.array
 * @type      Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * This function allows you to move an item to another place in the array
 *
 * @param    {Array}    array    The array to process
 * @param    {any|integer}      from        Either the element itself that you want to move, or the index of the element you want to move
 * @param    {any|integer}      to          Either the element itself where you want to move the first one, or the index of the element you want to move your element to
 * @return    {Array}    The processed array
 *
 * @snippet         __moveItem($1, $2, $3)
 *
 * @example    js
 * import { __moveItem } from '@coffeekraken/sugar/array';
 * const myArray = ['hello','world','something'];
 * __moveItem(myArray, 0, 1); // ['world','hello','something']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __moveItem(arr, from, to) {
    if (typeof from !== 'number') {
        from = arr.indexOf(from);
    }
    if (typeof to !== 'number') {
        to = arr.indexOf(to);
    }
    if (from > to && to < arr.length) {
        to++;
    }
    let item = arr.splice(from, 1)[0];
    arr.splice(to, 0, item);
    return arr;
}
exports.default = __moveItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQXdCLFVBQVUsQ0FDOUIsR0FBVSxFQUNWLElBQWtCLEVBQ2xCLEVBQWdCO0lBRWhCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzFCLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCO0lBQ0QsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLEVBQUU7UUFDeEIsRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDeEI7SUFFRCxJQUFJLElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDOUIsRUFBRSxFQUFFLENBQUM7S0FDUjtJQUVELElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFuQkQsNkJBbUJDIn0=