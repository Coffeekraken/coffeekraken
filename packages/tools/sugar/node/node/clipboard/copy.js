"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = copy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2NsaXBib2FyZC9jb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFzQztBQUN0QyxrRUFBNEM7QUFDNUMsNERBQStCO0FBRS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxJQUFJLENBQUMsSUFBSTtJQUNoQixJQUFJLEdBQUcsa0JBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixJQUFJO1FBQ0Ysb0JBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLG9CQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQUNELGtCQUFlLElBQUksQ0FBQyJ9