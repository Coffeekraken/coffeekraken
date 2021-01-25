"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * @name        removeSync
 * @namespace           sugar.node.fs
 * @type          Function
 * @stable
 *
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (sync)
 *
 * @param       {String}              path           The file/directory path to delete
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import removeSync from '@coffeekraken/node/fs/removeSync';
 * try {
 *    removeSync('my/cool/file.json');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function removeSync(path) {
    return fs_extra_1.default.removeSync(path);
}
module.exports = removeSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbW92ZVN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCx3REFBNEI7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxVQUFVLENBQUMsSUFBSTtJQUN0QixPQUFPLGtCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFDRCxpQkFBUyxVQUFVLENBQUMifQ==