"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const countLineChars_js_1 = __importDefault(require("../../shared/string/countLineChars.js"));
/**
 * @name                                  countLine
 * @namespace            node.terminal
 * @type                                  Function
 * @platform          node
 * @status        beta
 *
 * Count how many lines the passed string will take in the current terminal
 *
 * @param           {String}              string              The string to count
 * @return          {Number}                                How many lines their is in the string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __countLines($1)
 *
 * @example         js
 * import { __countLines } from '@coffeekraken/sugar/terminal';
 * __countLines('Hello <red>World</red>'); // 11
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __countLines(string) {
    let currentCount = 0;
    let lines = string.split('\n');
    lines.forEach((line) => {
        const lineCount = (0, countLineChars_js_1.default)(line);
        currentCount += Math.ceil(lineCount / process.stdout.columns);
    });
    return currentCount;
}
exports.default = __countLines;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhGQUFxRTtBQUVyRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBd0IsWUFBWSxDQUFDLE1BQU07SUFDdkMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25CLE1BQU0sU0FBUyxHQUFHLElBQUEsMkJBQWdCLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsWUFBWSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFDO0FBUkQsK0JBUUMifQ==