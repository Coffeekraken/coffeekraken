"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = emptyDirSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHlEaXJTeW5jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW1wdHlEaXJTeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUE0QjtBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFlBQVksQ0FBQyxHQUFHO0lBQ3ZCLGtCQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFDRCxrQkFBZSxZQUFZLENBQUMifQ==