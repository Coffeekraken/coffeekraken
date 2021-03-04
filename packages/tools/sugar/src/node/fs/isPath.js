"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_valid_path_1 = __importDefault(require("is-valid-path"));
const fs_1 = __importDefault(require("fs"));
const replacePathTokens_1 = __importDefault(require("../path/replacePathTokens"));
/**
 * @name                            isPath
 * @namespace           sugar.node.fs
 * @type                            Function
 * @stable
 *
 * Check if the passed string is a valid path or not
 * Support the ```replacePathTokens``` tokens
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isPath from '@coffeekraken/sugar/node/fs/isPath';
 * isPath('hello/world'); // => true
 *
 * @see       https://www.npmjs.com/package/is-valid-path
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isPath(path, checkExistence = false) {
    path = replacePathTokens_1.default(path);
    // check if we have some /
    if (!path.includes('/'))
        return false;
    // check if the path is valid or not
    if (!is_valid_path_1.default(path))
        return false;
    // if we have to check the path existence
    if (checkExistence) {
        if (!fs_1.default.existsSync(path))
            return false;
    }
    // otherwise, all is ok
    return true;
}
exports.default = isPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNQYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUEwQztBQUMxQyw0Q0FBc0I7QUFDdEIsa0ZBQTREO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBYyxHQUFHLEtBQUs7SUFDMUMsSUFBSSxHQUFHLDJCQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWpDLDBCQUEwQjtJQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUV0QyxvQ0FBb0M7SUFDcEMsSUFBSSxDQUFDLHVCQUFhLENBQUMsSUFBSSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFdkMseUNBQXlDO0lBQ3pDLElBQUksY0FBYyxFQUFFO1FBQ2xCLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO0tBQzFDO0lBRUQsdUJBQXVCO0lBQ3ZCLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUNELGtCQUFlLE1BQU0sQ0FBQyJ9