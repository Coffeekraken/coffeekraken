"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hex2rgba_1 = __importDefault(require("./hex2rgba"));
const hsla2rgba_1 = __importDefault(require("./hsla2rgba"));
const parseHsla_1 = __importDefault(require("./parseHsla"));
const parseRgba_1 = __importDefault(require("./parseRgba"));
const rgba2hsla_1 = __importDefault(require("./rgba2hsla"));
/**
 * @name            parse
 * @namespace            js.color
 * @type            Function
 * @platform          js
 * @platform          node
 * @status          beta
 * @private
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function parse(color, format = 'rgba') {
    color = color.replace(/\s/g, '');
    if (color.indexOf('rgb') != -1) {
        color = (0, parseRgba_1.default)(color);
    }
    else if (color.indexOf('hsl') != -1) {
        color = (0, parseHsla_1.default)(color);
        color = (0, hsla2rgba_1.default)(color.h, color.s, color.l);
    }
    else if (color.substring(0, 1) == '#') {
        color = (0, hex2rgba_1.default)(color);
    }
    switch (format) {
        case 'hsla':
        case 'hsl':
            return (0, rgba2hsla_1.default)(color);
            break;
        case 'rgba':
        case 'rgb':
        default:
            return color;
            break;
    }
}
exports.default = parse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUFvQztBQUNwQyw0REFBc0M7QUFDdEMsNERBQXNDO0FBQ3RDLDREQUFzQztBQUN0Qyw0REFBc0M7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxHQUFHLE1BQU07SUFDakMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUM1QixLQUFLLEdBQUcsSUFBQSxtQkFBVyxFQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlCO1NBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQ25DLEtBQUssR0FBRyxJQUFBLG1CQUFXLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsS0FBSyxHQUFHLElBQUEsbUJBQVcsRUFBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xEO1NBQU0sSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7UUFDckMsS0FBSyxHQUFHLElBQUEsa0JBQVUsRUFBQyxLQUFLLENBQUMsQ0FBQztLQUM3QjtJQUVELFFBQVEsTUFBTSxFQUFFO1FBQ1osS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLEtBQUs7WUFDTixPQUFPLElBQUEsbUJBQVcsRUFBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixNQUFNO1FBQ1YsS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLEtBQUssQ0FBQztRQUNYO1lBQ0ksT0FBTyxLQUFLLENBQUM7WUFDYixNQUFNO0tBQ2I7QUFDTCxDQUFDO0FBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=