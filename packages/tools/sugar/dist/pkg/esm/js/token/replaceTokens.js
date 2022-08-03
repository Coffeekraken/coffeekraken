import __sharedReplaceTokens from '../../shared/token/replaceTokens';
/**
 * @name            replaceTokens
 * @namespace       js.token
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function take as input a string and replace some tokens using these functions:
 * -
 *
 * @param       {String}            string          The string you want to process
 * @return      {String}                            The processed string
 *
 * @example         js
 * import replaceTokens from '@coffeekraken/sugar/js/token/replaceTokens';
 * replaceTokens('Current module system is %moduleSystem');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function replaceTokens(string) {
    string = __sharedReplaceTokens(string);
    return string;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8scUJBQXFCLE1BQU0sa0NBQWtDLENBQUM7QUFFckU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGFBQWEsQ0FBQyxNQUFjO0lBQ2hELE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIn0=