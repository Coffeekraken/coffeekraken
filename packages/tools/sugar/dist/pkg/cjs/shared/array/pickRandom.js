"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unique_1 = __importDefault(require("./unique"));
/**
 * @name            pickRandom
 * @namespace            shared.array
 * @type            Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Pick a random item in the passed array
 *
 * @param       {Array}         array       The array from which to pick a random item
 * @return      {Any}                       A random array item
 *
 * @example         js
 * import { __pickRandom } from '@coffeekraken/sugar/array';
 * const array = ['hello','world'];
 * __pickRandom(array); // => 'world'
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __pickRandom(array, count = 1) {
    // make the array unique
    array = (0, unique_1.default)(array);
    const items = [];
    if (count > 1) {
        if (count >= array.length) {
            return array;
        }
        for (let i = 0; i < count; i++) {
            let item = pickRandom(array, 1);
            while (items.includes(item)) {
                item = pickRandom(array, 1);
            }
            items.push(item);
        }
        return items;
    }
    else if (count === 1) {
        return array[Math.round(Math.random() * (array.length - 1))];
    }
    return array;
}
exports.default = __pickRandom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQWdDO0FBRWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQXdCLFlBQVksQ0FBQyxLQUFZLEVBQUUsUUFBZ0IsQ0FBQztJQUNoRSx3QkFBd0I7SUFDeEIsS0FBSyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUV4QixNQUFNLEtBQUssR0FBVSxFQUFFLENBQUM7SUFDeEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1FBQ1gsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUN2QixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQy9CO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQjtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2hCO1NBQU0sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1FBQ3BCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEU7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBdEJELCtCQXNCQyJ9