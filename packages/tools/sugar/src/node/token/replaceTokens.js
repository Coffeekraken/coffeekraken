import __replacePathTokens from '../path/replacePathTokens';
import __replacePackageJsonTokens from '../package/replacePackageJsonTokens';
/**
 * @name            replaceTokens
 * @namespace       node.tokens
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function take as input a string and replace some tokens using these functions:
 * - replacePathTokens: Replace path tokens like %packageRootDir, %distJsDir, etc...
 * - replacePackageJsonTokens: Replace tokens like %packageJson.name, %packageJson.version, etc... with package.json values
 *
 * @param       {String}            string          The string you want to process
 * @return      {String}                            The processed string
 *
 * @example         js
 * import replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';
 * replaceTokens('Hello %packageJson.name, hope you are doing well (%packageRootDir)');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function replaceTokens(string) {
    string = __replacePathTokens(string);
    string = __replacePackageJsonTokens(string);
    return string;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcGxhY2VUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxtQkFBbUIsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLDBCQUEwQixNQUFNLHFDQUFxQyxDQUFDO0FBRTdFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUFDLE1BQWM7SUFDaEQsTUFBTSxHQUFXLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLE1BQU0sR0FBRywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIn0=