// @ts-nocheck
// @shared
import __em2px from './em2px';
import __rem2px from './em2px';
import __px2em from './px2em';
import __px2rem from './px2rem';
/**
 * @name                  convert
 * @namespace           sugar.js.unit
 * @type                  Function
 * @stable
 *
 * Convert a passed unit to the wanted one. If the passed unit is a number and not a string like "10rem", the unit is take as pixels
 *
 * @param         {String|Number}           from            The base value to convert
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVixPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxRQUFRLE1BQU0sU0FBUyxDQUFDO0FBQy9CLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLElBQUksRUFBRSxJQUFJO0lBQ3BDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztJQUNwQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3BFLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMxQztJQUNELE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLE9BQU8sQ0FBQztJQUNaLFFBQVEsUUFBUSxFQUFFO1FBQ2hCLEtBQUssSUFBSTtZQUNQLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDckIsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0IsTUFBTTtRQUNSLEtBQUssSUFBSTtZQUNQLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BDLE1BQU07UUFDUjtZQUNFLE9BQU8sSUFBSSxDQUFDO1lBQ1osTUFBTTtLQUNUO0lBQ0QsUUFBUSxFQUFFLEVBQUU7UUFDVixLQUFLLElBQUk7WUFDUCxPQUFPLE9BQU8sQ0FBQztZQUNmLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixNQUFNO1FBQ1IsS0FBSyxJQUFJO1lBQ1AsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzlCLE1BQU07UUFDUjtZQUNFLE9BQU8sSUFBSSxDQUFDO1lBQ1osTUFBTTtLQUNUO0FBQ0gsQ0FBQztBQUNELGVBQWUsT0FBTyxDQUFDIn0=