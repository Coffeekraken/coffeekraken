// @ts-nocheck
import * as __convertColors from 'colors-convert';
/**
 * @name                  hex2rgba
 * @namespace            js.color
 * @type                  Function
 * @platform          js
 * @platform          ts
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
 * import hex2rgba from '@coffeekraken/sugar/js/color/hex2rgba';
 * hex2rgba('#ff00ff');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function hex2rgba(hex) {
    return __convertColors.hexToRgba(hex, 1);
}
export default hex2rgba;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGV4MnJnYmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZXgycmdiYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsT0FBTyxLQUFLLGVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxRQUFRLENBQUMsR0FBRztJQUNqQixPQUFPLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFDRCxlQUFlLFFBQVEsQ0FBQyJ9