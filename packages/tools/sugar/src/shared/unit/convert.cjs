"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const em2px_1 = __importDefault(require("./em2px"));
const em2px_2 = __importDefault(require("./em2px"));
const px2em_1 = __importDefault(require("./px2em"));
const px2rem_1 = __importDefault(require("./px2rem"));
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
exports.default = convert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvdW5pdC9jb252ZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9EQUE4QjtBQUM5QixvREFBK0I7QUFDL0Isb0RBQThCO0FBQzlCLHNEQUFnQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsSUFBSSxFQUFFLElBQUk7SUFDcEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDcEUsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQUksT0FBTyxDQUFDO0lBQ1osUUFBUSxRQUFRLEVBQUU7UUFDaEIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNyQixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsT0FBTyxHQUFHLGVBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvQixNQUFNO1FBQ1IsS0FBSyxJQUFJO1lBQ1AsT0FBTyxHQUFHLGVBQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDcEMsTUFBTTtRQUNSO1lBQ0UsT0FBTyxJQUFJLENBQUM7WUFDWixNQUFNO0tBQ1Q7SUFDRCxRQUFRLEVBQUUsRUFBRTtRQUNWLEtBQUssSUFBSTtZQUNQLE9BQU8sT0FBTyxDQUFDO1lBQ2YsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLE9BQU8sZ0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixNQUFNO1FBQ1IsS0FBSyxJQUFJO1lBQ1AsT0FBTyxlQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzlCLE1BQU07UUFDUjtZQUNFLE9BQU8sSUFBSSxDQUFDO1lBQ1osTUFBTTtLQUNUO0FBQ0gsQ0FBQztBQUNELGtCQUFlLE9BQU8sQ0FBQyJ9