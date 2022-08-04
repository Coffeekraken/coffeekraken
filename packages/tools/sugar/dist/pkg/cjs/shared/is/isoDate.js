"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
 * import isoDate from '@coffeekraken/sugar/shared/is/isoDate';
 * isoDate('john.doe@gmail.com') => false
 * isoDate('plop@yop.com') => false
 * isoDate('hello') => false
 * isoDate('2008-08') => true
 *
 * @see             https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s07.html
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isoDate(value) {
    return (value.match(/^([0-9]{4})-(1[0-2]|0[1-9])$/) ||
        value.match(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$/) ||
        value.match(/^([0-9]{4})(-?)(1[0-2]|0[1-9])\2(3[01]|0[1-9]|[12][0-9])$/) ||
        value.match(/^([0-9]{4})-?(36[0-6]|3[0-5][0-9]|[12][0-9]{2}|0[1-9][0-9]|00[1-9])$/));
}
exports.default = isoDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxLQUFhO0lBQzFCLE9BQU8sQ0FDSCxLQUFLLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDO1FBQzNDLEtBQUssQ0FBQyxLQUFLLENBQ1AseURBQXlELENBQzVEO1FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FDUCwyREFBMkQsQ0FDOUQ7UUFDRCxLQUFLLENBQUMsS0FBSyxDQUNQLHNFQUFzRSxDQUN6RSxDQUNKLENBQUM7QUFDTixDQUFDO0FBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=