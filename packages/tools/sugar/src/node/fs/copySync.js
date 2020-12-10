"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * @name        copySync
 * @namespace           sugar.node.fs
 * @type          Function
 * @stable
 *
 * Copy a file or directory (sync)
 *
 * @param       {String}              src           The source path to copy
 * @param       {String}              dest          The destination path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import copySync from '@coffeekraken/node/fs/copySync';
 * try {
 *    copySync('my/cool/file.jpg', 'my/new/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function copySync(src, dest) {
    fs_extra_1.default.copySync(src, dest);
}
module.exports = copySync;
//# sourceMappingURL=module.js.map