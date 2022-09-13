"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hexToRgba_1 = __importDefault(require("./hexToRgba"));
const hslaToRgba_1 = __importDefault(require("./hslaToRgba"));
const parseHsla_1 = __importDefault(require("./parseHsla"));
const parseRgba_1 = __importDefault(require("./parseRgba"));
const rgbaToHsla_1 = __importDefault(require("./rgbaToHsla"));
/**
 * @name            parse
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
 * @example         js
 * import { __parse } from '@coffeekraken/sugar/color';
 * __parse('rgba(10,20,30,100)'); // => { r: 10, b: 20, b: 30, a: 100 }
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __parse(color, format = 'rgba') {
    color = color.replace(/\s/g, '');
    if (color.indexOf('rgb') != -1) {
        color = (0, parseRgba_1.default)(color);
    }
    else if (color.indexOf('hsl') != -1) {
        color = (0, parseHsla_1.default)(color);
        color = (0, hslaToRgba_1.default)(color.h, color.s, color.l);
    }
    else if (color.substring(0, 1) == '#') {
        color = (0, hexToRgba_1.default)(color);
    }
    switch (format) {
        case 'hsla':
        case 'hsl':
            return (0, rgbaToHsla_1.default)(color);
            break;
        case 'rgba':
        case 'rgb':
        default:
            return color;
            break;
    }
}
exports.default = __parse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFzQztBQUN0Qyw4REFBd0M7QUFDeEMsNERBQXNDO0FBQ3RDLDREQUFzQztBQUN0Qyw4REFBd0M7QUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUF3QixPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sR0FBRyxNQUFNO0lBQ2xELEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDNUIsS0FBSyxHQUFHLElBQUEsbUJBQVcsRUFBQyxLQUFLLENBQUMsQ0FBQztLQUM5QjtTQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNuQyxLQUFLLEdBQUcsSUFBQSxtQkFBVyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLEtBQUssR0FBRyxJQUFBLG9CQUFZLEVBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuRDtTQUFNLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ3JDLEtBQUssR0FBRyxJQUFBLG1CQUFXLEVBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUI7SUFFRCxRQUFRLE1BQU0sRUFBRTtRQUNaLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxLQUFLO1lBQ04sT0FBTyxJQUFBLG9CQUFZLEVBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsTUFBTTtRQUNWLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxLQUFLLENBQUM7UUFDWDtZQUNJLE9BQU8sS0FBSyxDQUFDO1lBQ2IsTUFBTTtLQUNiO0FBQ0wsQ0FBQztBQXRCRCwwQkFzQkMifQ==