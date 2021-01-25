"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const is_valid_path_1 = __importDefault(require("is-valid-path"));
const fs_1 = __importDefault(require("fs"));
/**
 * @name                            isPath
 * @namespace           sugar.node.fs
 * @type                            Function
 * @stable
 *
 * Check if the passed string is a valid path or not
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
module.exports = isPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNQYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsa0VBQTBDO0FBQzFDLDRDQUFzQjtBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBYyxHQUFHLEtBQUs7SUFDMUMsMEJBQTBCO0lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXRDLG9DQUFvQztJQUNwQyxJQUFJLENBQUMsdUJBQWEsQ0FBQyxJQUFJLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUV2Qyx5Q0FBeUM7SUFDekMsSUFBSSxjQUFjLEVBQUU7UUFDbEIsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7S0FDMUM7SUFFRCx1QkFBdUI7SUFDdkIsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBQ0QsaUJBQVMsTUFBTSxDQUFDIn0=