/**
 * @name        roundWithSign
 * @namespace   sugar.shared.math
 * @type       Function
 * @status      stable
 * @platform    node
 * @platform        js
 *
 * This function allows you to round a number by keeping his sign "+" or "-"
 *
 * @param       {Number}    number    The number to round
 * @return      {Number}     The rounded number
 *
 * @example         js
 * import __roundWithSign from '@coffeekraken/sugar/shared/math/roundWithSign';
 * __roundWithSign(1.5); // => 1
 * __roundWithSign(-1.5); // => -1
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function roundWithSign(number) {
    return Math.sign(number) * Math.round(Math.abs(number));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUFDLE1BQWM7SUFDaEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzVELENBQUMifQ==