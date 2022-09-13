import __unique from './unique';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FBQyxLQUFZLEVBQUUsUUFBZ0IsQ0FBQztJQUNoRSx3QkFBd0I7SUFDeEIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV4QixNQUFNLEtBQUssR0FBVSxFQUFFLENBQUM7SUFDeEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1FBQ1gsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUN2QixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQjtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2hCO1NBQU0sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1FBQ3BCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEU7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDIn0=