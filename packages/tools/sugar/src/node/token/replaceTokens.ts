import __sharedReplaceTokens from '../../shared/token/replaceTokens.js';
import __replacePackageJsonTokens from '../package/replacePackageJsonTokens.js';
import __replacePathTokens from '../path/replacePathTokens.js';

/**
 * @name            replaceTokens
 * @namespace       node.string
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function replace these tokens in the passed string:
 * - `%moduleSystem`: Either "esm" or "cjs"
 * - `%distRootDir`: The absolute path to the "dist" directory
 * - `%packageCacheDir`: The absolute path to the "cache" directory in the package
 * - `%packageLocalDir`: The absolute path to the ".local" directory in the package
 * - `%packageRootDir`: The absolute path to the package directory
 * - `%packageTmpDir`: The absolute path to the "tmp" package directory
 * - `%srcCssDir`: The absolute path to the "css" directory in the "src" one
 * - `%srcDocDir`: The absolute path to the "doc" directory in the "src" one
 * - `%srcFontDir`: The absolute path to the "font" directory in the "src" one
 * - `%srcIconDir`: The absolute path to the "icon" directory in the "src" one
 * - `%srcImgDir`: The absolute path to the "img" directory in the "src" one
 * - `%srcJsDir`: The absolute path to the "js" directory in the "src" one
 * - `%srcNodeDir`: The absolute path to the "node" directory in the "src" one
 * - `%srcRootDir`: The absolute path to the "src" directory
 * - `%srcViewsDir`: The absolute path to the "views" directory in the "src" one
 * - `%distCssDir`: The absolute path to the "css" directory in the "dist" one
 * - `%distDocDir`: The absolute path to the "doc" directory in the "dist" one
 * - `%distFontDir`: The absolute path to the "font" directory in the "dist" one
 * - `%distIconDir`: The absolute path to the "icon" directory in the "dist" one
 * - `%distImgDir`: The absolute path to the "img" directory in the "dist" one
 * - `%distJsDir`: The absolute path to the "js" directory in the "dist" one
 * - `%distNodeDir`: The absolute path to the "node" directory in the "dist" one
 * - `%distRootDir`: The absolute path to the "dist" directory
 * - `%distViewsDir`: The absolute path to the "views" directory in the "dist" one
 * - `%packageJson.property...`: Any value from the package.json file
 *
 * @param       {String}            string          The string you want to process
 * @return      {String}                            The processed string
 *
 * @snippet         _replaceTokens($1)
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
