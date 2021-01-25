"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const em2px_1 = __importDefault(require("./em2px"));
const em2px_2 = __importDefault(require("./em2px"));
const px2em_1 = __importDefault(require("./px2em"));
const px2rem_1 = __importDefault(require("./px2rem"));
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
            pxValue = em2px_2.default(fromNumber);
            break;
        case 'em':
            pxValue = em2px_1.default(fromNumber, $elm);
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
            return px2rem_1.default(pxValue);
            break;
        case 'em':
            return px2em_1.default(pxValue, $elm);
            break;
        default:
            return from;
            break;
    }
}
module.exports = convert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7O0FBRVYsb0RBQThCO0FBQzlCLG9EQUErQjtBQUMvQixvREFBOEI7QUFDOUIsc0RBQWdDO0FBRWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxJQUFJLEVBQUUsSUFBSTtJQUNwQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDcEIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNwRSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDMUM7SUFDRCxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxPQUFPLENBQUM7SUFDWixRQUFRLFFBQVEsRUFBRTtRQUNoQixLQUFLLElBQUk7WUFDUCxPQUFPLEdBQUcsVUFBVSxDQUFDO1lBQ3JCLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixPQUFPLEdBQUcsZUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9CLE1BQU07UUFDUixLQUFLLElBQUk7WUFDUCxPQUFPLEdBQUcsZUFBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwQyxNQUFNO1FBQ1I7WUFDRSxPQUFPLElBQUksQ0FBQztZQUNaLE1BQU07S0FDVDtJQUNELFFBQVEsRUFBRSxFQUFFO1FBQ1YsS0FBSyxJQUFJO1lBQ1AsT0FBTyxPQUFPLENBQUM7WUFDZixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsT0FBTyxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pCLE1BQU07UUFDUixLQUFLLElBQUk7WUFDUCxPQUFPLGVBQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUIsTUFBTTtRQUNSO1lBQ0UsT0FBTyxJQUFJLENBQUM7WUFDWixNQUFNO0tBQ1Q7QUFDSCxDQUFDO0FBQ0QsaUJBQVMsT0FBTyxDQUFDIn0=