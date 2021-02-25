// @ts-nocheck
// @shared
/**
 * @name                        parseRgba
 * @namespace           sugar.js.color
 * @type                        Function
 * @stable
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseRgba(rgbaString) {
    rgbaString = rgbaString.toLowerCase();
    const string = rgbaString
        .replace('rgba(', '')
        .replace(')', '')
        .replace(/\s/g, '');
    const array = string.split(',');
    return {
        r: parseInt(array[0]),
        g: parseInt(array[1]),
        b: parseInt(array[2]),
        a: parseInt(array[3])
    };
}
export default parseRgba;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VSZ2JhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VSZ2JhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsU0FBUyxDQUFDLFVBQVU7SUFDM0IsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxNQUFNLE1BQU0sR0FBRyxVQUFVO1NBQ3RCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1NBQ3BCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO1NBQ2hCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxPQUFPO1FBQ0wsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEIsQ0FBQztBQUNKLENBQUM7QUFDRCxlQUFlLFNBQVMsQ0FBQyJ9