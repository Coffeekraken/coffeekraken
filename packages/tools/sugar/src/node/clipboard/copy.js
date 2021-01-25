"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const clipboardy_1 = __importDefault(require("clipboardy"));
const toString_1 = __importDefault(require("../string/toString"));
const copy_paste_1 = __importDefault(require("copy-paste"));
/**
 * @name            copy
 * @namespace       sugar.node.clipboard
 * @type            Function
 * @stable
 *
 * Simple function to copy things into the system clipboard.
 * This is using https://www.npmjs.com/package/clipboardy under the hood.
 *
 * @param       {String}      text        The text to copy
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import copy from '@coffeekraken/sugar/node/clipboard/copy';
 * copy('Hello world');
 *
 * @since       2.0.0
 * @see         https://www.npmjs.com/package/clipboardy
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function copy(text) {
    text = toString_1.default(text);
    try {
        clipboardy_1.default.writeSync(text);
    }
    catch (e) {
        copy_paste_1.default.copy(text);
    }
}
module.exports = copy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCw0REFBc0M7QUFDdEMsa0VBQTRDO0FBQzVDLDREQUErQjtBQUUvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsSUFBSSxDQUFDLElBQUk7SUFDaEIsSUFBSSxHQUFHLGtCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsSUFBSTtRQUNGLG9CQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixvQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQjtBQUNILENBQUM7QUFDRCxpQkFBUyxJQUFJLENBQUMifQ==