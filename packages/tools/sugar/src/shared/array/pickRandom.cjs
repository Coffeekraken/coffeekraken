"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function pickRandom(array) {
    return array[Math.round(Math.random() * (array.length - 1))];
}
exports.default = pickRandom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja1JhbmRvbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvYXJyYXkvcGlja1JhbmRvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILFNBQXdCLFVBQVUsQ0FBQyxLQUFZO0lBQzdDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUZELDZCQUVDIn0=