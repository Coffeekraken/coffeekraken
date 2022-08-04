// @ts-nocheck
import { default as __em2px, default as __rem2px } from './em2px';
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsT0FBTyxJQUFJLE9BQU8sRUFBRSxPQUFPLElBQUksUUFBUSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2xFLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsSUFBSSxFQUFFLElBQUk7SUFDbEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDbEUsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzVDO0lBQ0QsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQUksT0FBTyxDQUFDO0lBQ1osUUFBUSxRQUFRLEVBQUU7UUFDZCxLQUFLLElBQUk7WUFDTCxPQUFPLEdBQUcsVUFBVSxDQUFDO1lBQ3JCLE1BQU07UUFDVixLQUFLLEtBQUs7WUFDTixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9CLE1BQU07UUFDVixLQUFLLElBQUk7WUFDTCxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwQyxNQUFNO1FBQ1Y7WUFDSSxPQUFPLElBQUksQ0FBQztZQUNaLE1BQU07S0FDYjtJQUNELFFBQVEsRUFBRSxFQUFFO1FBQ1IsS0FBSyxJQUFJO1lBQ0wsT0FBTyxPQUFPLENBQUM7WUFDZixNQUFNO1FBQ1YsS0FBSyxLQUFLO1lBQ04sT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekIsTUFBTTtRQUNWLEtBQUssSUFBSTtZQUNMLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5QixNQUFNO1FBQ1Y7WUFDSSxPQUFPLElBQUksQ0FBQztZQUNaLE1BQU07S0FDYjtBQUNMLENBQUM7QUFDRCxlQUFlLE9BQU8sQ0FBQyJ9