"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = require("@coffeekraken/sugar/path");
const replaceTokens_1 = __importDefault(require("../../shared/token/replaceTokens"));
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
 * @example         js
 * import { __replaceTokens } from '@coffeekraken/sugar/string';
 * __replaceTokens('Hello %packageJson.name, hope you are doing well (%packageRootDir)');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function replaceTokens(string) {
    string = (0, replaceTokens_1.default)(string);
    string = (0, path_1.__replacePathTokens)(string);
    string = (0, package_1.__replacePackageJsonTokens)(string);
    return string;
}
exports.default = replaceTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseURBQXlFO0FBQ3pFLG1EQUErRDtBQUMvRCxxRkFBcUU7QUFFckU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQ0c7QUFDSCxTQUF3QixhQUFhLENBQUMsTUFBYztJQUNoRCxNQUFNLEdBQUcsSUFBQSx1QkFBcUIsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxNQUFNLEdBQVcsSUFBQSwwQkFBbUIsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxNQUFNLEdBQUcsSUFBQSxvQ0FBMEIsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBTEQsZ0NBS0MifQ==