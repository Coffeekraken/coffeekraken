"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clipboardy_1 = __importDefault(require("clipboardy"));
const toString_1 = __importDefault(require("../../shared/string/toString"));
const copy_paste_1 = __importDefault(require("copy-paste"));
/**
 * @name            copy
 * @namespace            node.clipboard
 * @type            Function
 * @platform        node
 * @status          beta
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function copy(text) {
    text = (0, toString_1.default)(text);
    try {
        clipboardy_1.default.writeSync(text);
    }
    catch (e) {
        copy_paste_1.default.copy(text);
    }
}
exports.default = copy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFzQztBQUN0Qyw0RUFBc0Q7QUFDdEQsNERBQStCO0FBRS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsSUFBSSxDQUFDLElBQUk7SUFDZCxJQUFJLEdBQUcsSUFBQSxrQkFBVSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLElBQUk7UUFDQSxvQkFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoQztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1Isb0JBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEI7QUFDTCxDQUFDO0FBQ0Qsa0JBQWUsSUFBSSxDQUFDIn0=