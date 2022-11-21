// @ts-nocheck

/**
 * @name        isIsoDateTime
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
 * import { __isIsoDateTime } from '@coffeekraken/sugar/is';
 * __isIsoDateTime('john.doe@gmail.com') => false
 * __isIsoDateTime('plop@yop.com') => false
 * __isIsoDateTime('2008-08-30 17:21:59') => true
 *
 * @see             https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s07.html
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isIsoDateTime(value: string): boolean {
    return (
        value.match(
            /^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])↵\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/,
        ) ||
        value.match(
            /^(?:([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])|([0-9]{4})(1[0-2]|0[1-9])(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9])([0-5][0-9])([0-5][0-9]))$/,
        )
    );
}
