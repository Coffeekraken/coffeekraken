"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hexToRgba_js_1 = __importDefault(require("./hexToRgba.js"));
const hslaToRgba_js_1 = __importDefault(require("./hslaToRgba.js"));
const parseHsla_js_1 = __importDefault(require("./parseHsla.js"));
const parseRgba_js_1 = __importDefault(require("./parseRgba.js"));
const rgbaToHsla_js_1 = __importDefault(require("./rgbaToHsla.js"));
/**
 * @name            parseColor
 * @namespace            shared.color
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
 * @snippet         __parseColor($1)
 *
 * @example         js
 * import { __parseColor } from '@coffeekraken/sugar/color';
 * __parseColor('rgba(10,20,30,100)'); // => { r: 10, b: 20, b: 30, a: 100 }
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __parseColor(color, format = 'rgba') {
    color = color.replace(/\s/g, '');
    if (color.startsWith('rgb')) {
        color = (0, parseRgba_js_1.default)(color);
    }
    else if (color.startsWith('hsl')) {
        color = (0, parseHsla_js_1.default)(color);
        // console.log('CC__CC', color);
        color = (0, hslaToRgba_js_1.default)(color.h, color.s, color.l);
    }
    else if (color.startsWith('#')) {
        // console.log('parseHEx0, col', color);
        color = (0, hexToRgba_js_1.default)(color);
    }
    switch (format) {
        case 'hsla':
        case 'hsl':
            return (0, rgbaToHsla_js_1.default)(color);
            break;
        case 'rgba':
        case 'rgb':
        default:
            return color;
            break;
    }
}
exports.default = __parseColor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUF5QztBQUN6QyxvRUFBMkM7QUFDM0Msa0VBQXlDO0FBQ3pDLGtFQUF5QztBQUN6QyxvRUFBMkM7QUFFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQXdCLFlBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxHQUFHLE1BQU07SUFDdkQsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN6QixLQUFLLEdBQUcsSUFBQSxzQkFBVyxFQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlCO1NBQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2hDLEtBQUssR0FBRyxJQUFBLHNCQUFXLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsZ0NBQWdDO1FBQ2hDLEtBQUssR0FBRyxJQUFBLHVCQUFZLEVBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuRDtTQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM5Qix3Q0FBd0M7UUFDeEMsS0FBSyxHQUFHLElBQUEsc0JBQVcsRUFBQyxLQUFLLENBQUMsQ0FBQztLQUM5QjtJQUVELFFBQVEsTUFBTSxFQUFFO1FBQ1osS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLEtBQUs7WUFDTixPQUFPLElBQUEsdUJBQVksRUFBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixNQUFNO1FBQ1YsS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLEtBQUssQ0FBQztRQUNYO1lBQ0ksT0FBTyxLQUFLLENBQUM7WUFDYixNQUFNO0tBQ2I7QUFDTCxDQUFDO0FBeEJELCtCQXdCQyJ9