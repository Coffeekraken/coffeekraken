"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
 * import isoTime from '@coffeekraken/sugar/shared/is/isoTime';
 * isoTime('john.doe@gmail.com') => false
 * isoTime('plop@yop.com') => false
 * isoTime('hello') => false
 * isoTime('17:21') => true
 *
 * @see             https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s07.html
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isoTime(value) {
    return (value.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9])$/) ||
        value.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/) ||
        value.match(/^(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/) ||
        value.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/));
}
exports.default = isoTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxLQUFhO0lBQzFCLE9BQU8sQ0FDSCxLQUFLLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDO1FBQ2pELEtBQUssQ0FBQyxLQUFLLENBQUMsa0RBQWtELENBQUM7UUFDL0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxxREFBcUQsQ0FBQztRQUNsRSxLQUFLLENBQUMsS0FBSyxDQUNQLG1HQUFtRyxDQUN0RyxDQUNKLENBQUM7QUFDTixDQUFDO0FBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=