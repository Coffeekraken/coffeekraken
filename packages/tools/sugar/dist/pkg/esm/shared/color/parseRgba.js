// @ts-nocheck
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
export default parseRgba;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxVQUFVO0lBQ3pCLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEMsTUFBTSxNQUFNLEdBQUcsVUFBVTtTQUNwQixPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztTQUNwQixPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztTQUNuQixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztTQUNoQixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsT0FBTztRQUNILENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN2QyxDQUFDO0FBQ04sQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=