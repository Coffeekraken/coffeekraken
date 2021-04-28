// @ts-nocheck
import __em2px from './em2px';
import __rem2px from './em2px';
import __px2em from './px2em';
import __px2rem from './px2rem';
/**
 * @name                  convert
 * @namespace            js.unit
 * @type                  Function
 * @stable
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLFFBQVEsTUFBTSxTQUFTLENBQUM7QUFDL0IsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsSUFBSSxFQUFFLElBQUk7SUFDcEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDcEUsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQUksT0FBTyxDQUFDO0lBQ1osUUFBUSxRQUFRLEVBQUU7UUFDaEIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNyQixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvQixNQUFNO1FBQ1IsS0FBSyxJQUFJO1lBQ1AsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDcEMsTUFBTTtRQUNSO1lBQ0UsT0FBTyxJQUFJLENBQUM7WUFDWixNQUFNO0tBQ1Q7SUFDRCxRQUFRLEVBQUUsRUFBRTtRQUNWLEtBQUssSUFBSTtZQUNQLE9BQU8sT0FBTyxDQUFDO1lBQ2YsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pCLE1BQU07UUFDUixLQUFLLElBQUk7WUFDUCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUIsTUFBTTtRQUNSO1lBQ0UsT0FBTyxJQUFJLENBQUM7WUFDWixNQUFNO0tBQ1Q7QUFDSCxDQUFDO0FBQ0QsZUFBZSxPQUFPLENBQUMifQ==