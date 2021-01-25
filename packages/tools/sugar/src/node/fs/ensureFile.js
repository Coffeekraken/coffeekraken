"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * @name        ensureFile
 * @namespace           sugar.node.fs
 * @type          Function
 * @async
 * @stable
 *
 * Ensure that the passed file exists. If not, it will be created... (async)
 *
 * @param       {String}              file           The file to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the file has been created if needed...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import ensureFile from '@coffeekraken/node/fs/ensureFile';
 * ensureFile('my/cool/file.jpg').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ensureFile(file) {
    return fs_extra_1.default.ensureFile(file);
}
module.exports = ensureFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVuc3VyZUZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCx3REFBNEI7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxJQUFJO0lBQ3RCLE9BQU8sa0JBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUNELGlCQUFTLFVBQVUsQ0FBQyJ9