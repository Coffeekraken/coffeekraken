/**
 * @name                  hexToRgba
 * @namespace            shared.color
 * @type                  Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * Hex to RGBA
 *
 * @param	              {string}       	hex         		The hex string to convert
 * @return            	{object} 			                  	The rgba object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import { __hexToRgba } from '@coffeekraken/sugar/color';
 * __hexToRgba('#ff00ff');
 *
 * @see         https://www.npmjs.com/package/colors-convert
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function hexToRGBA(h) {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (h.length == 4) {
        r = '0x' + h[1] + h[1];
        g = '0x' + h[2] + h[2];
        b = '0x' + h[3] + h[3];
        // 6 digits
    }
    else if (h.length == 7) {
        r = '0x' + h[1] + h[2];
        g = '0x' + h[3] + h[4];
        b = '0x' + h[5] + h[6];
    }
    return { r, g, b, a: 1 };
}
export default function __hexToRgba(hex) {
    // return hexToRgba(hex, 1);
    return hexToRGBA(hex);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxDQUFDO0lBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDTCxDQUFDLEdBQUcsQ0FBQyxFQUNMLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFVixXQUFXO0lBQ1gsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUNmLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZCLFdBQVc7S0FDZDtTQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7UUFDdEIsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDMUI7SUFDRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQzdCLENBQUM7QUFTRCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FBQyxHQUFXO0lBQzNDLDRCQUE0QjtJQUM1QixPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=