"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replacePathTokens_1 = __importDefault(require("../path/replacePathTokens"));
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * @name        copy
 * @namespace           sugar.node.fs
 * @type          Function
 * @async
 * @stable
 *
 * Copy a file or directory (async)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              src           The source path to copy
 * @param       {String}              dest          The destination path
 * @return      {Promise}                           A promise that will be resolved when the copy is completed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import copy from '@coffeekraken/node/fs/copy';
 * copy('my/cool/file.jpg', 'my/new/file.jpg').then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function copy(src, dest) {
    src = replacePathTokens_1.default(src);
    dest = replacePathTokens_1.default(dest);
    return fs_extra_1.default.copy(src, dest);
}
exports.default = copy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2ZzL2NvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsa0ZBQTREO0FBQzVELHdEQUE0QjtBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUk7SUFDckIsR0FBRyxHQUFHLDJCQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLElBQUksR0FBRywyQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxPQUFPLGtCQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBQ0Qsa0JBQWUsSUFBSSxDQUFDIn0=