"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * @name        emptyDirSync
 * @namespace           sugar.node.fs
 * @type          Function
 * @stable
 *
 * Empty a directory (sync)
 *
 * @param       {String}              dir           The directory path to empty
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import emptyDirSync from '@coffeekraken/node/fs/emptyDirSync';
 * try {
 *    emptyDirSync('my/cool/directory');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function emptyDirSync(dir) {
    fs_extra_1.default.emptyDirSync(dir);
}
module.exports = emptyDirSync;
//# sourceMappingURL=module.js.map