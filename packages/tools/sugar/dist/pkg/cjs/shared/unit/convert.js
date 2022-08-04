"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const em2px_1 = __importDefault(require("./em2px"));
const px2em_1 = __importDefault(require("./px2em"));
const px2rem_1 = __importDefault(require("./px2rem"));
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
            pxValue = (0, em2px_1.default)(fromNumber);
            break;
        case 'em':
            pxValue = (0, em2px_1.default)(fromNumber, $elm);
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
            return (0, px2rem_1.default)(pxValue);
            break;
        case 'em':
            return (0, px2em_1.default)(pxValue, $elm);
            break;
        default:
            return from;
            break;
    }
}
exports.default = convert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9EQUFrRTtBQUNsRSxvREFBOEI7QUFDOUIsc0RBQWdDO0FBRWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLElBQUksRUFBRSxJQUFJO0lBQ2xDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztJQUNwQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2xFLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM1QztJQUNELE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLE9BQU8sQ0FBQztJQUNaLFFBQVEsUUFBUSxFQUFFO1FBQ2QsS0FBSyxJQUFJO1lBQ0wsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNyQixNQUFNO1FBQ1YsS0FBSyxLQUFLO1lBQ04sT0FBTyxHQUFHLElBQUEsZUFBUSxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9CLE1BQU07UUFDVixLQUFLLElBQUk7WUFDTCxPQUFPLEdBQUcsSUFBQSxlQUFPLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BDLE1BQU07UUFDVjtZQUNJLE9BQU8sSUFBSSxDQUFDO1lBQ1osTUFBTTtLQUNiO0lBQ0QsUUFBUSxFQUFFLEVBQUU7UUFDUixLQUFLLElBQUk7WUFDTCxPQUFPLE9BQU8sQ0FBQztZQUNmLE1BQU07UUFDVixLQUFLLEtBQUs7WUFDTixPQUFPLElBQUEsZ0JBQVEsRUFBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixNQUFNO1FBQ1YsS0FBSyxJQUFJO1lBQ0wsT0FBTyxJQUFBLGVBQU8sRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUIsTUFBTTtRQUNWO1lBQ0ksT0FBTyxJQUFJLENBQUM7WUFDWixNQUFNO0tBQ2I7QUFDTCxDQUFDO0FBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=