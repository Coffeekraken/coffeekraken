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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRMaW5lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvdW50TGluZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUlkLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxVQUFVLENBQUMsTUFBTTtJQUN0QixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDckIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbkIsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLFlBQVksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=