"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parseRgba_1 = __importDefault(require("./parseRgba"));
const parseHsv_1 = __importDefault(require("./parseHsv"));
const hsv2rgba_1 = __importDefault(require("./hsv2rgba"));
const parseHsl_1 = __importDefault(require("./parseHsl"));
const hsl2rgba_1 = __importDefault(require("./hsl2rgba"));
const hex2rgba_1 = __importDefault(require("./hex2rgba"));
const rgba2hsl_1 = __importDefault(require("./rgba2hsl"));
const rgba2hsv_1 = __importDefault(require("./rgba2hsv"));
/**
 * @name            parse
 * @namespace           sugar.js.color
 * @type            Function
 * @private
 * @stable
 *
 * Parse a string and return you the wanted object format like "rgba", "hsl" or "hsv".
 *
 * @param       {Object}      color       The color to parse like (#ff0000 | rgba(...) | hsl(...) | hsv(...))
 * @param       {String}      [format='rgba']       The object format wanted. Can be "rgba", "hsl" or "hsv"
 * @return      {Object}                  The rgba representation of the passed color
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import parse from '@coffeekraken/sugar/js/color/parse';
 * parse('rgba(10,20,30,100)'); // => { r: 10, b: 20, b: 30, a: 100 }
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parse(color, format = 'rgba') {
    color = color.replace(/\s/g, '');
    if (color.indexOf('rgb') != -1) {
        color = parseRgba_1.default(color);
    }
    else if (color.indexOf('hsv') != -1) {
        color = parseHsv_1.default(color);
        color = hsv2rgba_1.default(color.h, color.s, color.v);
    }
    else if (color.indexOf('hsl') != -1) {
        color = parseHsl_1.default(color);
        color = hsl2rgba_1.default(color.h, color.s, color.l);
    }
    else if (color.substring(0, 1) == '#') {
        color = hex2rgba_1.default(color);
    }
    switch (format) {
        case 'hsl':
            return rgba2hsl_1.default(color);
            break;
        case 'hsv':
            return rgba2hsv_1.default(color);
            break;
        case 'rgba':
        default:
            return color;
            break;
    }
}
module.exports = parse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7QUFFViw0REFBc0M7QUFDdEMsMERBQW9DO0FBQ3BDLDBEQUFvQztBQUNwQywwREFBb0M7QUFDcEMsMERBQW9DO0FBQ3BDLDBEQUFvQztBQUNwQywwREFBb0M7QUFDcEMsMERBQW9DO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEdBQUcsTUFBTTtJQUNuQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQzlCLEtBQUssR0FBRyxtQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVCO1NBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQ3JDLEtBQUssR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLEtBQUssR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDL0M7U0FBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDckMsS0FBSyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsS0FBSyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMvQztTQUFNLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ3ZDLEtBQUssR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzNCO0lBRUQsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLEtBQUs7WUFDUixPQUFPLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekIsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLE9BQU8sa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixNQUFNO1FBQ1IsS0FBSyxNQUFNLENBQUM7UUFDWjtZQUNFLE9BQU8sS0FBSyxDQUFDO1lBQ2IsTUFBTTtLQUNUO0FBQ0gsQ0FBQztBQUNELGlCQUFTLEtBQUssQ0FBQyJ9