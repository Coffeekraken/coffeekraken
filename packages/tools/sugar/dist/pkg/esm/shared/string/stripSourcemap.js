/**
 * @name            stripSourcemap
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function simply take a string and get rid of all sourcemap
 *
 * @feature        Support sourcemap like `//# sourceMappingURL=...`
 *
 * @param       {String}            str         The string to process
 * @return      {String}                        The processed string
 *
 * @snippet         __stripSourcemap($1)
 *
 * @example         js
 * import { __stripSourcemap } from '@coffeekraken/sugar/string';
 * __stripSourcemap('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __stripSourcemap(str) {
    str = str.replace(/\/\/#\s?sourceMappingURL=[\w\W]+/gm, '');
    return str;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQUMsR0FBVztJQUNoRCxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0MsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1RCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMifQ==