// @ts-nocheck
import __stripAnsi from 'strip-ansi';
import __deepMerge from '../object/deepMerge';
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
export default function __countLineChars(line, count = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFO0lBQ3JELEtBQUssR0FBRyxXQUFXLENBQ2Y7UUFDSSxRQUFRLEVBQUUsS0FBSztRQUNmLG9CQUFvQixFQUFFLEtBQUs7UUFDM0IsWUFBWSxFQUFFLEtBQUs7S0FDdEIsRUFDRCxLQUFLLENBQ1IsQ0FBQztJQUVGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztJQUNuQixJQUFJLEtBQUssQ0FBQyxvQkFBb0IsS0FBSyxLQUFLLEVBQUU7UUFDdEMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNsQztJQUNELElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7UUFDMUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDN0Q7SUFDRCxJQUFJLEtBQUssQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO1FBQzlCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN2QztJQUVELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUMxQixDQUFDIn0=