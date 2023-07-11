import __unique from './unique.js';
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
 * @snippet         __pickRandom($1)
 *
 * @example         js
 * import { __pickRandom } from '@coffeekraken/sugar/array';
 * const array = ['hello','world'];
 * __pickRandom(array); // => 'world'
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __pickRandom(array, count = 1) {
    // make the array unique
    array = __unique(array);
    const items = [];
    if (count > 1) {
        if (count >= array.length) {
            return array;
        }
        for (let i = 0; i < count; i++) {
            let item = __pickRandom(array, 1);
            while (items.includes(item)) {
                item = __pickRandom(array, 1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLGFBQWEsQ0FBQztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsWUFBWSxDQUFDLEtBQVksRUFBRSxRQUFnQixDQUFDO0lBQ2hFLHdCQUF3QjtJQUN4QixLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXhCLE1BQU0sS0FBSyxHQUFVLEVBQUUsQ0FBQztJQUN4QixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFDWCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekIsSUFBSSxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDakM7WUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxLQUFLLENBQUM7S0FDaEI7U0FBTSxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7UUFDcEIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoRTtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMifQ==