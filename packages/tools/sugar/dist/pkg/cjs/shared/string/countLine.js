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
 * @namespace            js.string
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
 * import countLine from '@coffeekraken/sugar/js/string/countLine';
 * countLine('Hello <red>World</red>'); // 11
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function countLine(line, count = {}) {
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
exports.default = countLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQUM5Qyw0REFBcUM7QUFFckM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUU7SUFDL0IsS0FBSyxHQUFHLElBQUEsbUJBQVcsRUFDZjtRQUNJLFFBQVEsRUFBRSxLQUFLO1FBQ2Ysb0JBQW9CLEVBQUUsS0FBSztRQUMzQixZQUFZLEVBQUUsS0FBSztLQUN0QixFQUNELEtBQUssQ0FDUixDQUFDO0lBRUYsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25CLElBQUksS0FBSyxDQUFDLG9CQUFvQixLQUFLLEtBQUssRUFBRTtRQUN0QyxPQUFPLEdBQUcsSUFBQSxvQkFBVyxFQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDO0lBQ0QsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtRQUMxQixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM3RDtJQUNELElBQUksS0FBSyxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUU7UUFDOUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQzFCLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==