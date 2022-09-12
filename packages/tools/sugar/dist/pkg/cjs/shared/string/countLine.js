"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const strip_ansi_1 = __importDefault(require("strip-ansi"));
/**
 * @name                                  countLine
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
 * @example         js
 * import { __countLine } from '@coffeekraken/sugar/string';
 *  __countLine('Hello <red>World</red>'); // 11
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __countLine(line, count = {}) {
    count = (0, deepMerge_1.default)({
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
exports.default = __countLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQUM5Qyw0REFBcUM7QUFFckM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUF3QixXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFO0lBQ2hELEtBQUssR0FBRyxJQUFBLG1CQUFXLEVBQ2Y7UUFDSSxRQUFRLEVBQUUsS0FBSztRQUNmLG9CQUFvQixFQUFFLEtBQUs7UUFDM0IsWUFBWSxFQUFFLEtBQUs7S0FDdEIsRUFDRCxLQUFLLENBQ1IsQ0FBQztJQUVGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztJQUNuQixJQUFJLEtBQUssQ0FBQyxvQkFBb0IsS0FBSyxLQUFLLEVBQUU7UUFDdEMsT0FBTyxHQUFHLElBQUEsb0JBQVcsRUFBQyxPQUFPLENBQUMsQ0FBQztLQUNsQztJQUNELElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7UUFDMUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDN0Q7SUFDRCxJQUFJLEtBQUssQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO1FBQzlCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN2QztJQUVELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUMxQixDQUFDO0FBdEJELDhCQXNCQyJ9