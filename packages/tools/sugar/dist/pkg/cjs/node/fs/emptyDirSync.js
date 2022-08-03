"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * @name        emptyDirSync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * Empty a directory (sync)
 *
 * @param       {String}              dir           The directory path to empty
 *
 * @example       js
 * import emptyDirSync from '@coffeekraken/node/fs/emptyDirSync';
 * try {
 *    emptyDirSync('my/cool/directory');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function emptyDirSync(dir) {
    fs_extra_1.default.emptyDirSync(dir);
}
exports.default = emptyDirSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUE0QjtBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxTQUFTLFlBQVksQ0FBQyxHQUFHO0lBQ3JCLGtCQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFDRCxrQkFBZSxZQUFZLENBQUMifQ==