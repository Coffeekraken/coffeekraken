// @ts-nocheck
import __em2px from './em2px';
import __rem2px from './em2px';
import __px2em from './px2em';
import __px2rem from './px2rem';
/**
 * @name                  convert
 * @namespace            js.unit
 * @type                  Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Convert a passed unit to the wanted one. If the passed unit is a number and not a string like "10rem", the unit is take as pixels
 *
 * @param         {String|Number}           from            The base value to convert
 * @param         {String}                  [to='px']       The value unit you want back
 * @return        {Number}                                  The converted value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import convert from '@coffeekraken/sugar/js/unit/convert';
 * convert('2rem', 'px');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function convert(from, to = 'px', $elm) {
    let fromUnit = 'px';
    if (typeof from === 'string' && parseFloat(from).toString() !== from) {
        fromUnit = from.replace(/[0-9.,]+/g, '');
    }
    const fromNumber = parseFloat(from);
    let pxValue;
    switch (fromUnit) {
        case 'px':
            pxValue = fromNumber;
            break;
        case 'rem':
            pxValue = __rem2px(fromNumber);
            break;
        case 'em':
            pxValue = __em2px(fromNumber, $elm);
            break;
        default:
            return from;
            break;
    }
    switch (to) {
        case 'px':
            return pxValue;
            break;
        case 'rem':
            return __px2rem(pxValue);
            break;
        case 'em':
            return __px2em(pxValue, $elm);
            break;
        default:
            return from;
            break;
    }
}
export default convert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLFFBQVEsTUFBTSxTQUFTLENBQUM7QUFDL0IsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxJQUFJLEVBQUUsSUFBSTtJQUNsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDcEIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNsRSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDNUM7SUFDRCxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxPQUFPLENBQUM7SUFDWixRQUFRLFFBQVEsRUFBRTtRQUNkLEtBQUssSUFBSTtZQUNMLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDckIsTUFBTTtRQUNWLEtBQUssS0FBSztZQUNOLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0IsTUFBTTtRQUNWLEtBQUssSUFBSTtZQUNMLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BDLE1BQU07UUFDVjtZQUNJLE9BQU8sSUFBSSxDQUFDO1lBQ1osTUFBTTtLQUNiO0lBQ0QsUUFBUSxFQUFFLEVBQUU7UUFDUixLQUFLLElBQUk7WUFDTCxPQUFPLE9BQU8sQ0FBQztZQUNmLE1BQU07UUFDVixLQUFLLEtBQUs7WUFDTixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixNQUFNO1FBQ1YsS0FBSyxJQUFJO1lBQ0wsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzlCLE1BQU07UUFDVjtZQUNJLE9BQU8sSUFBSSxDQUFDO1lBQ1osTUFBTTtLQUNiO0FBQ0wsQ0FBQztBQUNELGVBQWUsT0FBTyxDQUFDIn0=