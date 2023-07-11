import __sharedReplaceTokens from '../../shared/token/replaceTokens.js';
/**
 * @name            replaceTokens
 * @namespace       js.string
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function replace these tokens in the passed string:
 *
 * - `%moduleSystem` - Either "esm" or "cjs"
 *
 * @param       {String}            string          The string you want to process
 * @return      {String}                            The processed string
 *
 * @snippet         (string) __replaceTokens($1)
 * __replaceTokens($1)
 *
 * @example         js
 * import { __replaceTokens } from '@coffeekraken/sugar/string';
 *  __replaceTokens('Current module system is %moduleSystem');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __replaceTokens(string) {
    string = __sharedReplaceTokens(string);
    return string;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8scUJBQXFCLE1BQU0scUNBQXFDLENBQUM7QUFFeEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxlQUFlLENBQUMsTUFBYztJQUNsRCxNQUFNLEdBQUcscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyJ9