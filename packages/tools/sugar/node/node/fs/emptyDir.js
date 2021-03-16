"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const replacePathTokens_1 = __importDefault(require("../path/replacePathTokens"));
/**
 * @name        emptyDir
 * @namespace           sugar.node.fs
 * @type          Function
 * @async
 * @stable
 *
 * Empty a directory (async)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              dir           The directory path to empty
 * @return      {Promise}                           A promise that will be resolved once the directory has been cleaned
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import emptyDir from '@coffeekraken/node/fs/emptyDir';
 * emptyDir('my/cool/directory').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function emptyDir(dir) {
    dir = replacePathTokens_1.default(dir);
    return fs_extra_1.default.emptyDir(dir);
}
exports.default = emptyDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHlEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9mcy9lbXB0eURpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx3REFBNEI7QUFDNUIsa0ZBQTREO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsUUFBUSxDQUFDLEdBQUc7SUFDbkIsR0FBRyxHQUFHLDJCQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLE9BQU8sa0JBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUNELGtCQUFlLFFBQVEsQ0FBQyJ9