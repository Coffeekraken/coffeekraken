// @ts-nocheck
import { paramCase } from 'param-case';
/**
 * @name          paramCase
 * @namespace            js.string
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function transform a string into a param case one like so "something-cool"
 *
 * @param       {String}        string          The string to convert
 * @return      {String}                        The converted string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import paramCase from '@coffeekraken/sugar/js/string/paramCase';
 * paramCase('some thoing cool'); // => some-thing-cool
 *
 * @see         https://www.npmjs.com/package/param-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function paramCaseFn(string) {
    return paramCase(string);
}
export default paramCaseFn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxNQUFNO0lBQ3ZCLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9