"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                    parseHsla
 * @namespace            js.color
 * @type                    Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Parse HSL
 *
 * @param 	      {string}	        hslaString			      The hsl string (hsl(h,s,l)) to parse
 * @return 	        {object} 					                  	The hsl object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import parseHsl from '@coffeekraken/sugar/color/parseHsl';
 * parseHsl('hsl(20,20,20)');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function parseHsl(hslaString) {
    hslaString = hslaString.toLowerCase();
    const string = hslaString
        .replace('hsla(', '')
        .replace('hsl(', '')
        .replace(')', '')
        .replace(/\s/g, '');
    const array = string.split(',');
    return {
        h: parseFloat(array[0]),
        s: parseFloat(array[1]),
        l: parseFloat(array[2]),
        a: array[3] ? parseFloat(array[3]) : 1,
    };
}
exports.default = parseHsl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsUUFBUSxDQUFDLFVBQVU7SUFDeEIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxNQUFNLE1BQU0sR0FBRyxVQUFVO1NBQ3BCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1NBQ3BCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1NBQ25CLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO1NBQ2hCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVoQyxPQUFPO1FBQ0gsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pDLENBQUM7QUFDTixDQUFDO0FBQ0Qsa0JBQWUsUUFBUSxDQUFDIn0=