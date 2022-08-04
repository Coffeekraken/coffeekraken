"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hsla2rgba_1 = __importDefault(require("./hsla2rgba"));
const parse_1 = __importDefault(require("./parse"));
const rgba2hex_1 = __importDefault(require("./rgba2hex"));
const rgba2hsla_1 = __importDefault(require("./rgba2hsla"));
/**
 * @name                  convert
 * @namespace            js.color
 * @type                  Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * This function take as input any color format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
 * and convert it into the wanted format like "rgba", "hsl", "hsv", "hex", "rgbaString", "hslString" or "hsvString"
 *
 * @param           {Mixed}               input           The input color to convert
 * @param           {String}              [format="rgba"]     The format wanted
 * @return          {Mixed}                               The converted color
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import convert from '@coffeekraken/sugar/js/color/convert';
 * convert('rgba(10,20,30,100)', 'rgba'); // => { r: 10, g: 20, b: 30, a: 100 }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function convert(input, format = 'rgba') {
    // transforming the input into rgba object
    let rgbaObj = {};
    if (typeof input === 'string') {
        rgbaObj = (0, parse_1.default)(input, 'rgba');
    }
    else if (typeof input === 'object') {
        if (input.r !== undefined &&
            input.g !== undefined &&
            input.b !== undefined) {
            rgbaObj = input;
        }
        else if (input.h !== undefined &&
            input.s !== undefined &&
            input.l !== undefined) {
            rgbaObj = (0, hsla2rgba_1.default)(input);
        }
    }
    switch (format) {
        case 'rgba':
            return rgbaObj;
        case 'hsl':
        case 'hsla':
            return (0, rgba2hsla_1.default)(rgbaObj);
        case 'hex':
        case 'hexString':
            return (0, rgba2hex_1.default)(rgbaObj);
        case 'rgbString':
            return `rgb(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b})`;
        case 'rgbaString':
            return `rgba(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b},${rgbaObj.a})`;
        case 'hslString':
            const hslObj = convert(rgbaObj, 'hsl');
            return `hsl(${hslObj.h},${hslObj.s},${hslObj.l})`;
        case 'hslaString':
            const hslaObj = convert(rgbaObj, 'hsla');
            return `hsla(${hslaObj.h},${hslaObj.s},${hslaObj.l},${hslaObj.a})`;
    }
    // if nothing supported
    return undefined;
}
exports.default = convert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFzQztBQUN0QyxvREFBOEI7QUFDOUIsMERBQW9DO0FBQ3BDLDREQUFzQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLEdBQUcsTUFBTTtJQUNuQywwQ0FBMEM7SUFDMUMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLE9BQU8sR0FBRyxJQUFBLGVBQU8sRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUNsQyxJQUNJLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztZQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7WUFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQ3ZCO1lBQ0UsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUNuQjthQUFNLElBQ0gsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO1lBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztZQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFDdkI7WUFDRSxPQUFPLEdBQUcsSUFBQSxtQkFBVyxFQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0tBQ0o7SUFFRCxRQUFRLE1BQU0sRUFBRTtRQUNaLEtBQUssTUFBTTtZQUNQLE9BQU8sT0FBTyxDQUFDO1FBQ25CLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxNQUFNO1lBQ1AsT0FBTyxJQUFBLG1CQUFXLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLFdBQVc7WUFDWixPQUFPLElBQUEsa0JBQVUsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixLQUFLLFdBQVc7WUFDWixPQUFPLE9BQU8sT0FBTyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN6RCxLQUFLLFlBQVk7WUFDYixPQUFPLFFBQVEsT0FBTyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3ZFLEtBQUssV0FBVztZQUNaLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkMsT0FBTyxPQUFPLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDdEQsS0FBSyxZQUFZO1lBQ2IsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6QyxPQUFPLFFBQVEsT0FBTyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO0tBQzFFO0lBRUQsdUJBQXVCO0lBQ3ZCLE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFDRCxrQkFBZSxPQUFPLENBQUMifQ==