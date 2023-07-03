import __stripAnsi from 'strip-ansi';
/**
 * @name            stripAnsi
 * @namespace            shared.string
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function simply strip all the ansi characters in a string
 *
 * @param       {String}        string          The string to strip ansi from
 * @return      {String}                        The new string without any ansi characters
 *
 * @snippet         __stripAnsi($1)
 *
 * @example     js
 * import { __stripAnsi } from '@coffeekraken/sugar/string';
 * __stripAnsi('\u001B]8;;https://github.com\u0007Click\u001B]8;;\u0007'); // => Click
 *
 * @see         https://www.npmjs.com/package/strip-ansi
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function stripAnsi(string) {
    return __stripAnsi(string);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLFlBQVksQ0FBQztBQUVyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUFDLE1BQU07SUFDcEMsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0IsQ0FBQyJ9