// @ts-nocheck
/**
 * @name              extractSame
 * @namespace            js.string
 * @type              Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function return you what has been find the same in the two passed string.
 * It will return you either an array of same string parts or a simple string
 * representing the first same part found.
 *
 * @param         {String}            string1         The string 1 to compare
 * @param         {String}            string2         The string 2 to compare
 * @param         {Boolean}           [multiple=false]      Specify if you want to get back multiple same string if exists as an array
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import extractSame from '@coffeekraken/sugar/js/string/extractSame';
 * extractSame('Hello world', 'Hello plop'); // => 'Hello '
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function extractSame(string1, string2, multiple = false) {
    // compare letter by letter
    const extractedArray = [''];
    const chars = string1.split('');
    const chars2 = string2.split('');
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const char2 = chars2[i];
        if (i > chars2.length - 1)
            break;
        if (char === char2) {
            extractedArray[extractedArray.length - 1] += char;
        }
        else if (multiple) {
            if (extractedArray[extractedArray.length - 1] !== '')
                extractedArray.push('');
        }
        else {
            break;
        }
    }
    return multiple ? extractedArray : extractedArray[0];
}
export default extractSame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdFNhbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRyYWN0U2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEdBQUcsS0FBSztJQUNuRCwyQkFBMkI7SUFDM0IsTUFBTSxjQUFjLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxNQUFNO1FBQ2pDLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTtZQUNoQixjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7U0FDckQ7YUFBTSxJQUFJLFFBQVEsRUFBRTtZQUNqQixJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hELGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDL0I7YUFBTTtZQUNILE1BQU07U0FDVDtLQUNKO0lBQ0QsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9