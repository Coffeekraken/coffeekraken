// @ts-nocheck
import __countLine from '../../shared/string/countLine';
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
 * @example         js
 * import countLines from '@coffeekraken/sugar/node//countLine';
 * countLines('Hello <red>World</red>'); // 11
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function countLines(string) {
    let currentCount = 0;
    let lines = string.split('\n');
    lines.forEach((line) => {
        const lineCount = __countLine(line);
        currentCount += Math.ceil(lineCount / process.stdout.columns);
    });
    return currentCount;
}
export default countLines;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFJZCxPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsVUFBVSxDQUFDLE1BQU07SUFDdEIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25CLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxZQUFZLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFDRCxlQUFlLFVBQVUsQ0FBQyJ9