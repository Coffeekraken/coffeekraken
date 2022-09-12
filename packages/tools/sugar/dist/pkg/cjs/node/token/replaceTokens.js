"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replaceTokens_1 = __importDefault(require("../../shared/token/replaceTokens"));
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = require("@coffeekraken/sugar/path");
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
function replaceTokens(string) {
    string = (0, replaceTokens_1.default)(string);
    string = (0, path_1.__replacePathTokens)(string);
    string = (0, package_1.__replacePackageJsonTokens)(string);
    return string;
}
exports.default = replaceTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUZBQXFFO0FBQ3JFLHlEQUF5RTtBQUN6RSxtREFBK0Q7QUFFL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQXdCLGFBQWEsQ0FBQyxNQUFjO0lBQ2hELE1BQU0sR0FBRyxJQUFBLHVCQUFxQixFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sR0FBVyxJQUFBLDBCQUFtQixFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLE1BQU0sR0FBRyxJQUFBLG9DQUEwQixFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFMRCxnQ0FLQyJ9