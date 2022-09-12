import __sharedReplaceTokens from '../../shared/token/replaceTokens';
import { __replacePackageJsonTokens } from '@coffeekraken/sugar/package';
import { __replacePathTokens } from '@coffeekraken/sugar/path';

/**
 * @name            replaceTokens
 * @namespace       node.string
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
 * import { __replaceTokens } from '@coffeekraken/sugar/string';
 * __replaceTokens('Hello %packageJson.name, hope you are doing well (%packageRootDir)');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function replaceTokens(string: string): string {
    string = __sharedReplaceTokens(string);
    string = <string>__replacePathTokens(string);
    string = __replacePackageJsonTokens(string);
    return string;
}
