"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              extractSame
 * @namespace           sugar.js.string
 * @type              Function
 * @stable
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
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
exports.default = extractSame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdFNhbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRyYWN0U2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7O0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxHQUFHLEtBQUs7SUFDckQsMkJBQTJCO0lBQzNCLE1BQU0sY0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQUUsTUFBTTtRQUNqQyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDbEIsY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO1NBQ25EO2FBQU0sSUFBSSxRQUFRLEVBQUU7WUFDbkIsSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUNsRCxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO2FBQU07WUFDTCxNQUFNO1NBQ1A7S0FDRjtJQUNELE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=