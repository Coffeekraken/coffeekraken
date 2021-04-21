/**
 * @name            pickRandom
 * @namespace            shared.array
 * @type            Function
 *
 * Pick a random item in the passed array
 *
 * @param       {Array}         array       The array from which to pick a random item
 * @return      {Any}                       A random array item
 *
 * @example         js
 * import pickRandom from '@coffeekraken/sugar/shared/array/pickRandom';
 * const array = ['hello','world'];
 * pickRandom(array); // => 'world'
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function pickRandom(array: any[]): any {
  return array[Math.round(Math.random() * (array.length - 1))];
}
