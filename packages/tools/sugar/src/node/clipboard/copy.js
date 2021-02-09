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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNERBQXNDO0FBQ3RDLGtFQUE0QztBQUM1Qyw0REFBK0I7QUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLElBQUksQ0FBQyxJQUFJO0lBQ2hCLElBQUksR0FBRyxrQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLElBQUk7UUFDRixvQkFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5QjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1Ysb0JBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEI7QUFDSCxDQUFDO0FBQ0Qsa0JBQWUsSUFBSSxDQUFDIn0=