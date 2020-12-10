"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * @name        ensureFileSync
 * @namespace           sugar.node.fs
 * @type          Function
 * @stable
 *
 * Ensure that the passed file exists. If not, will be created... (async)
 *
 * @param       {String}              file           The file to ensure that it exists...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import ensureFileSync from '@coffeekraken/node/fs/ensureFileSync';
 * try {
 *    ensureFileSync('my/cool/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ensureFileSync(file) {
    fs_extra_1.default.ensureFileSync(file);
}
module.exports = ensureFileSync;
//# sourceMappingURL=module.js.map