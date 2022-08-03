import __sharedReplaceTokens from '../../shared/token/replaceTokens';
import __replacePackageJsonTokens from '../package/replacePackageJsonTokens';
import __replacePathTokens from '../path/replacePathTokens';
/**
 * @name            replaceTokens
 * @namespace       node.token
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function take as input a string and replace some tokens using these functions:
 * - sharedReplaceToken: Replace tokens like %moduleSystem
 * - replacePathTokens: Replace path tokens like %packageRootDir, %distJsDir, etc...
 * - replacePackageJsonTokens: Replace tokens like %packageJson.name, %packageJson.version, etc... with package.json values
 *
 * @param       {String}            string          The string you want to process
 * @return      {String}                            The processed string
 *
 * @example         js
 * import replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';
 * replaceTokens('Hello %packageJson.name, hope you are doing well (%packageRootDir)');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function replaceTokens(string) {
    string = __sharedReplaceTokens(string);
    string = __replacePathTokens(string);
    string = __replacePackageJsonTokens(string);
    return string;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8scUJBQXFCLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTywwQkFBMEIsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3RSxPQUFPLG1CQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGFBQWEsQ0FBQyxNQUFjO0lBQ2hELE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxNQUFNLEdBQVcsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsTUFBTSxHQUFHLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMifQ==