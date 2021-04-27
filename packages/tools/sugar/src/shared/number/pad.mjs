// @ts-nocheck
/**
 * @name        pad
 * @namespace            js.number
 * @type      Function
 * @stable
 *
 * Pad a number n of x 0 or another passed character
 *
 * @param    {Number}    number    The number to pad
 * @param    {Integer}    width    The width of pad to apply
 * @param    {String}    [character="0"]    The character to use
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import pad from '@coffeekraken/sugar/js/numbers/pad'
 * pad(123, 4) // 0123
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function pad(number, width, character = '0') {
    number = number + '';
    return number.length >= width
        ? number
        : new Array(width - number.length + 1).join(character) + number;
}
export default pad;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9udW1iZXIvcGFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxHQUFHLEdBQUc7SUFDekMsTUFBTSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDckIsT0FBTyxNQUFNLENBQUMsTUFBTSxJQUFJLEtBQUs7UUFDM0IsQ0FBQyxDQUFDLE1BQU07UUFDUixDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNwRSxDQUFDO0FBQ0QsZUFBZSxHQUFHLENBQUMifQ==