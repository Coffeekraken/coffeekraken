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
 * import pickRandom from '@coffeekraken/sugar/shared/array/pickRandom';
 * const array = ['hello','world'];
 * pickRandom(array); // => 'world'
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function pickRandom(array) {
    return array[Math.round(Math.random() * (array.length - 1))];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja1JhbmRvbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBpY2tSYW5kb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQUMsS0FBWTtJQUMzQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLENBQUMifQ==