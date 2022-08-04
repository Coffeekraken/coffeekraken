"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                        parseRgba
 * @namespace            js.color
 * @type                        Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * Parse RGBA string and return an object
 *
 * @param 	          {string}	            rgbaString		            The rgba string (rgba(r,g,b,a)) to parse
 * @return 	          {object} 				                              	The rgba object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import parseRgba from '@coffeekraken/sugar/js/color/parseRgba';
 * parseRgba('rgba(20,10,100,20)');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function parseRgba(rgbaString) {
    rgbaString = rgbaString.toLowerCase();
    const string = rgbaString
        .replace('rgba(', '')
        .replace('rgb(', '')
        .replace(')', '')
        .replace(/\s/g, '');
    const array = string.split(',');
    return {
        r: parseInt(array[0]),
        g: parseInt(array[1]),
        b: parseInt(array[2]),
        a: array[3] ? parseInt(array[3]) : 1,
    };
}
exports.default = parseRgba;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsU0FBUyxDQUFDLFVBQVU7SUFDekIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxNQUFNLE1BQU0sR0FBRyxVQUFVO1NBQ3BCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1NBQ3BCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1NBQ25CLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO1NBQ2hCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxPQUFPO1FBQ0gsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3ZDLENBQUM7QUFDTixDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=