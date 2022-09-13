// @ts-nocheck
/**
 * @name        isoDate
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a valid iso date string
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __isIsoDate } from '@coffeekraken/sugar/is';
 * __isIsoDate('john.doe@gmail.com') => false
 * __isIsoDate('plop@yop.com') => false
 * __isIsoDate('hello') => false
 * __isIsoDate('2008-08') => true
 *
 * @see             https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s07.html
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isIsoDate(value) {
    return (value.match(/^([0-9]{4})-(1[0-2]|0[1-9])$/) ||
        value.match(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$/) ||
        value.match(/^([0-9]{4})(-?)(1[0-2]|0[1-9])\2(3[01]|0[1-9]|[12][0-9])$/) ||
        value.match(/^([0-9]{4})-?(36[0-6]|3[0-5][0-9]|[12][0-9]{2}|0[1-9][0-9]|00[1-9])$/));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQUMsS0FBYTtJQUM3QyxPQUFPLENBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQztRQUMzQyxLQUFLLENBQUMsS0FBSyxDQUNQLHlEQUF5RCxDQUM1RDtRQUNELEtBQUssQ0FBQyxLQUFLLENBQ1AsMkRBQTJELENBQzlEO1FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FDUCxzRUFBc0UsQ0FDekUsQ0FDSixDQUFDO0FBQ04sQ0FBQyJ9