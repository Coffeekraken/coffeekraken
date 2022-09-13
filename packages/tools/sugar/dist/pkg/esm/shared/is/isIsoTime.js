// @ts-nocheck
/**
 * @name        isoTime
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
 * import { __isIsoTime } from '@coffeekraken/sugar/is';
 * __isIsoTime('john.doe@gmail.com') => false
 * __isIsoTime('plop@yop.com') => false
 * __isIsoTime('hello') => false
 * __isIsoTime('17:21') => true
 *
 * @see             https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s07.html
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isIsoTime(value) {
    return (value.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9])$/) ||
        value.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/) ||
        value.match(/^(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/) ||
        value.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQUMsS0FBYTtJQUM3QyxPQUFPLENBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQztRQUNqRCxLQUFLLENBQUMsS0FBSyxDQUFDLGtEQUFrRCxDQUFDO1FBQy9ELEtBQUssQ0FBQyxLQUFLLENBQUMscURBQXFELENBQUM7UUFDbEUsS0FBSyxDQUFDLEtBQUssQ0FDUCxtR0FBbUcsQ0FDdEcsQ0FDSixDQUFDO0FBQ04sQ0FBQyJ9