// @ts-nocheck
import __deepMerge from '../object/deepMerge';
import __stripAnsi from 'strip-ansi';
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
    count = __deepMerge({
        htmlTags: false,
        terminalSpecialChars: false,
        newLineChars: false,
    }, count);
    let newLine = line;
    if (count.terminalSpecialChars === false) {
        newLine = __stripAnsi(newLine);
    }
    if (count.htmlTags === false) {
        newLine = newLine.replace(/<\/?[a-zA-Z0-9]+\s?\/?>/g, '');
    }
    if (count.newLineChars === false) {
        newLine = newLine.replace('\n', '');
    }
    return newLine.length;
}
export default countLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLFdBQVcsTUFBTSxZQUFZLENBQUM7QUFFckM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUU7SUFDL0IsS0FBSyxHQUFHLFdBQVcsQ0FDZjtRQUNJLFFBQVEsRUFBRSxLQUFLO1FBQ2Ysb0JBQW9CLEVBQUUsS0FBSztRQUMzQixZQUFZLEVBQUUsS0FBSztLQUN0QixFQUNELEtBQUssQ0FDUixDQUFDO0lBRUYsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25CLElBQUksS0FBSyxDQUFDLG9CQUFvQixLQUFLLEtBQUssRUFBRTtRQUN0QyxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDO0lBQ0QsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtRQUMxQixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM3RDtJQUNELElBQUksS0FBSyxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUU7UUFDOUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQzFCLENBQUM7QUFDRCxlQUFlLFNBQVMsQ0FBQyJ9