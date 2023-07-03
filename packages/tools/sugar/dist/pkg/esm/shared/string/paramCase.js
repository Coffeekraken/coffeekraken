// @ts-nocheck
import { paramCase } from 'param-case';
/**
 * @name          paramCase
 * @namespace            shared.string
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
 * @snippet         __paramCase($1)
 *
 * @example       js
 * import { __paramCase } from '@coffeekraken/sugar/string';
 * __paramCase('some thoing cool'); // => some-thing-cool
 *
 * @see         https://www.npmjs.com/package/param-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __paramCase(string) {
    return paramCase(string);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUFDLE1BQU07SUFDdEMsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0IsQ0FBQyJ9