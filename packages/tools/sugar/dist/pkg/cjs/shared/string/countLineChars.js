"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strip_ansi_1 = __importDefault(require("strip-ansi"));
const deepMerge_js_1 = __importDefault(require("../object/deepMerge.js"));
/**
 * @name                                  countLineChars
 * @namespace            shared.string
 * @type                                  Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Count how many characters their is in the passed line.
 * This function will exclude the characters like the html tags like <red>, etc...
 *
 * @param           {String}              line              The line to count
 * @param           {Object}              [count={}]        Specify what you want to count outside of the normal characters of yourse. Here's the list of available options:
 * - htmlTags (false) {Boolean}: Specify if you want to count the html tags or not
 * - terminalSpecialChars (false) {Boolean}: Specify if you want to count the terminal specials chars like "\u001b[30m", etc...
 * - newLineChars (false) {Boolean}: Specify if you want to count the new line special char "\n" or not
 * @return          {Number}                                How many characters their is in the line
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __countLineChars($1)
 *
 * @example         js
 * import { __countLineChars } from '@coffeekraken/sugar/string';
 *  __countLineChars('Hello <red>World</red>'); // 11
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __countLineChars(line, count = {}) {
    count = (0, deepMerge_js_1.default)({
        htmlTags: false,
        terminalSpecialChars: false,
        newLineChars: false,
    }, count);
    let newLine = line;
    if (count.terminalSpecialChars === false) {
        newLine = (0, strip_ansi_1.default)(newLine);
    }
    if (count.htmlTags === false) {
        newLine = newLine.replace(/<\/?[a-zA-Z0-9]+\s?\/?>/g, '');
    }
    if (count.newLineChars === false) {
        newLine = newLine.replace('\n', '');
    }
    return newLine.length;
}
exports.default = __countLineChars;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFxQztBQUNyQywwRUFBaUQ7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILFNBQXdCLGdCQUFnQixDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsRUFBRTtJQUNyRCxLQUFLLEdBQUcsSUFBQSxzQkFBVyxFQUNmO1FBQ0ksUUFBUSxFQUFFLEtBQUs7UUFDZixvQkFBb0IsRUFBRSxLQUFLO1FBQzNCLFlBQVksRUFBRSxLQUFLO0tBQ3RCLEVBQ0QsS0FBSyxDQUNSLENBQUM7SUFFRixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDbkIsSUFBSSxLQUFLLENBQUMsb0JBQW9CLEtBQUssS0FBSyxFQUFFO1FBQ3RDLE9BQU8sR0FBRyxJQUFBLG9CQUFXLEVBQUMsT0FBTyxDQUFDLENBQUM7S0FDbEM7SUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO1FBQzFCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzdEO0lBQ0QsSUFBSSxLQUFLLENBQUMsWUFBWSxLQUFLLEtBQUssRUFBRTtRQUM5QixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDdkM7SUFFRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDMUIsQ0FBQztBQXRCRCxtQ0FzQkMifQ==