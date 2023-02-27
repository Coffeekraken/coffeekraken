"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strip_ansi_1 = __importDefault(require("strip-ansi"));
/**
 * @name            stripAnsi
 * @namespace            shared.string
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function simply strip all the ansi characters in a string
 *
 * @param       {String}        string          The string to strip ansi from
 * @return      {String}                        The new string without any ansi characters
 *
 * @snippet         __stripAnsi($1)
 *
 * @example     js
 * import { __stripAnsi } from '@coffeekraken/sugar/string';
 * __stripAnsi('\u001B]8;;https://github.com\u0007Click\u001B]8;;\u0007'); // => Click
 *
 * @see         https://www.npmjs.com/package/strip-ansi
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function stripAnsi(string) {
    return (0, strip_ansi_1.default)(string);
}
exports.default = stripAnsi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQXFDO0FBRXJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IsU0FBUyxDQUFDLE1BQU07SUFDcEMsT0FBTyxJQUFBLG9CQUFXLEVBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUZELDRCQUVDIn0=