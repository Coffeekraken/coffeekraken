"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clipboard_copy_1 = __importDefault(require("clipboard-copy"));
/**
 * @name                copy
 * @namespace           js.clipboard
 * @type                Function
 * @platform          js
 * @async
 * @status              stable
 *
 * This function allows you to copy to the clipboard the passed text
 *
 * @param       {String}            text            The text to copy
 * @return      {Promise}                          A promise fullfilled when the copy has been made correctly
 *
 * @todo        doc
 * @todo        tests
 *
 * @snippet         __copy($1);
 *
 * @example         js
 * import { __copy } from '@coffeekraken/sugar/clipboard';
 * __copy('Hello world');
 *
 * @see             https://www.npmjs.com/package/clipboard-copy
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function copy(text) {
    return (0, clipboard_copy_1.default)(text);
}
exports.default = copy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQW9DO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBd0IsSUFBSSxDQUFDLElBQVk7SUFDckMsT0FBTyxJQUFBLHdCQUFNLEVBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQUZELHVCQUVDIn0=