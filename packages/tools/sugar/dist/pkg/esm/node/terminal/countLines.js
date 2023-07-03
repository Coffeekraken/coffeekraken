// @ts-nocheck
import __countLineChars from '../../shared/string/countLineChars';
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
export default function __countLines(string) {
    let currentCount = 0;
    let lines = string.split('\n');
    lines.forEach((line) => {
        const lineCount = __countLineChars(line);
        currentCount += Math.ceil(lineCount / process.stdout.columns);
    });
    return currentCount;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGdCQUFnQixNQUFNLG9DQUFvQyxDQUFDO0FBRWxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FBQyxNQUFNO0lBQ3ZDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztJQUNyQixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNuQixNQUFNLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxZQUFZLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUMifQ==