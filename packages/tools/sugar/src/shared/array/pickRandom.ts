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
export default function __pickRandom(array: any[], count: number = 1): any {
    // make the array unique
    array = __unique(array);

    const items: any[] = [];
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
    } else if (count === 1) {
        return array[Math.round(Math.random() * (array.length - 1))];
    }

    return array;
}
