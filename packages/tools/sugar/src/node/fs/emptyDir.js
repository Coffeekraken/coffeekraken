"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * @name        emptyDir
 * @namespace           sugar.node.fs
 * @type          Function
 * @async
 * @stable
 *
 * Empty a directory (async)
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
    return fs_extra_1.default.emptyDir(dir);
}
module.exports = emptyDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHlEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbXB0eURpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLHdEQUE0QjtBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsUUFBUSxDQUFDLEdBQUc7SUFDbkIsT0FBTyxrQkFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBQ0QsaUJBQVMsUUFBUSxDQUFDIn0=