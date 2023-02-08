import __currentModuleSystem from '../module/currentModuleSystem';
/**
 * @name            replaceTokens
 * @namespace       shared.token
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function replace these tokens in the passed string:
 * - `%moduleSystem` - Either "esm" or "cjs"
 *
 * @param       {String}            string          The string you want to process
 * @return      {String}                            The processed string
 *
 * @example         js
 * import replaceTokens from '@coffeekraken/sugar/shared/token/replaceTokens';
 * replaceTokens('Current module system is %moduleSystem');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function replaceTokens(string) {
    string = string.replace(/\%moduleSystem/g, __currentModuleSystem());
    return string;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8scUJBQXFCLE1BQU0sK0JBQStCLENBQUM7QUFFbEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGFBQWEsQ0FBQyxNQUFjO0lBQ2hELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLHFCQUFxQixFQUFFLENBQUMsQ0FBQztJQUNwRSxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIn0=