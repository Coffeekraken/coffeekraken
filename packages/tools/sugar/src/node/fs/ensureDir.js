"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * @name        ensureDir
 * @namespace           sugar.node.fs
 * @type          Function
 * @async
 * @stable
 *
 * Ensure that the passed directory exists. If not, will be created recursively... (async)
 *
 * @param       {String}              dir           The directory to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import ensureDir from '@coffeekraken/node/fs/ensureDir';
 * ensureDir('my/cool/dir').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ensureDir(dir) {
    return fs_extra_1.default.ensureDir(dir);
}
module.exports = ensureDir;
//# sourceMappingURL=module.js.map