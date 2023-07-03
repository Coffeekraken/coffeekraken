// @ts-nocheck
/**
 * @name              extractSame
 * @namespace            shared.string
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
 * @snippet             __extractSame($1)
 *
 * @example       js
 * import { __extractSame } from '@coffeekraken/sugar/string';
 * __extractSame('Hello world', 'Hello plop'); // => 'Hello '
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __extractSame(string1, string2, multiple = false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxHQUFHLEtBQUs7SUFDcEUsMkJBQTJCO0lBQzNCLE1BQU0sY0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQUUsTUFBTTtRQUNqQyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDaEIsY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO1NBQ3JEO2FBQU0sSUFBSSxRQUFRLEVBQUU7WUFDakIsSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUNoRCxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDSCxNQUFNO1NBQ1Q7S0FDSjtJQUNELE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDIn0=