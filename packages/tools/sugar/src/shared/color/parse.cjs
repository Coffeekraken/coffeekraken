"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
 * @namespace            js.color
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
exports.default = parse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2NvbG9yL3BhcnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFzQztBQUN0QywwREFBb0M7QUFDcEMsMERBQW9DO0FBQ3BDLDBEQUFvQztBQUNwQywwREFBb0M7QUFDcEMsMERBQW9DO0FBQ3BDLDBEQUFvQztBQUNwQywwREFBb0M7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sR0FBRyxNQUFNO0lBQ25DLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDOUIsS0FBSyxHQUFHLG1CQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUI7U0FBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDckMsS0FBSyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsS0FBSyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMvQztTQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNyQyxLQUFLLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixLQUFLLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQy9DO1NBQU0sSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7UUFDdkMsS0FBSyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0I7SUFFRCxRQUFRLE1BQU0sRUFBRTtRQUNkLEtBQUssS0FBSztZQUNSLE9BQU8sa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsT0FBTyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLE1BQU07UUFDUixLQUFLLE1BQU0sQ0FBQztRQUNaO1lBQ0UsT0FBTyxLQUFLLENBQUM7WUFDYixNQUFNO0tBQ1Q7QUFDSCxDQUFDO0FBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=