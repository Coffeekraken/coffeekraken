import __urlCompliant from '../string/urlCompliant';
/**
 * @name            isUrlCompliant
 * @namespace            shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function check if the passed string is url compliant.
 * This mean that it has no spaces, and no special characters
 *
 * @param       {String}        string         The string to process
 * @return      {Boolean}                       true if compliant, false if not
 *
 * @snippet         __isUrlCompliant($1)
 *
 * @example         php
 * import { __isUrlCompliant } from '@coffeekraken/sugar/string';
 * __isUrlCompliant('Hello world'); // false
 * __isUrlCompliant('/something/cool'); // true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isUrlCompliant(str) {
    return str === __urlCompliant(str);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLHdCQUF3QixDQUFDO0FBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQUMsR0FBVztJQUNoRCxPQUFPLEdBQUcsS0FBSyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkMsQ0FBQyJ9