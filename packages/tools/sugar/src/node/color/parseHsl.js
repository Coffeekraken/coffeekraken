"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                    parseHsl
 * @namespace           sugar.js.color
 * @type                    Function
 * @stable
 *
 * Parse HSL
 *
 * @param 	      {string}	        hslString			      The hsl string (hsl(h,s,l)) to parse
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseHsl(hslString) {
    hslString = hslString.toLowerCase();
    const string = hslString
        .replace('hsl(', '')
        .replace(')', '')
        .replace(/\s/g, '');
    const array = string.split(',');
    return {
        h: parseFloat(array[0]),
        s: parseFloat(array[1]),
        l: parseFloat(array[2])
    };
}
exports.default = parseHsl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIc2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUhzbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7O0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsUUFBUSxDQUFDLFNBQVM7SUFDekIsU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxNQUFNLE1BQU0sR0FBRyxTQUFTO1NBQ3JCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1NBQ25CLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO1NBQ2hCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxPQUFPO1FBQ0wsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEIsQ0FBQztBQUNKLENBQUM7QUFDRCxrQkFBZSxRQUFRLENBQUMifQ==