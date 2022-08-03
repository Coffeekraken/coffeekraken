"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isoDateTime
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a valid iso date time string
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isIsoDateTime from '@coffeekraken/sugar/shared/is/isoDateTime';
 * isIsoDateTime('john.doe@gmail.com') => false
 * isIsoDateTime('plop@yop.com') => false
 * isIsoDateTime('2008-08-30 17:21:59') => true
 *
 * @see             https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s07.html
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isIsoDateTime(value) {
    return (value.match(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])↵\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/) ||
        value.match(/^(?:([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])|([0-9]{4})(1[0-2]|0[1-9])(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9])([0-5][0-9])([0-5][0-9]))$/));
}
exports.default = isIsoDateTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsYUFBYSxDQUFDLEtBQWE7SUFDaEMsT0FBTyxDQUNILEtBQUssQ0FBQyxLQUFLLENBQ1AsMEdBQTBHLENBQzdHO1FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FDUCwyTUFBMk0sQ0FDOU0sQ0FDSixDQUFDO0FBQ04sQ0FBQztBQUNELGtCQUFlLGFBQWEsQ0FBQyJ9