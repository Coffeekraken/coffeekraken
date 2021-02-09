"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = __importDefault(require("./parse"));
const hsl2rgba_1 = __importDefault(require("./hsl2rgba"));
const hsv2rgba_1 = __importDefault(require("./hsv2rgba"));
const rgba2hsl_1 = __importDefault(require("./rgba2hsl"));
const rgba2hsv_1 = __importDefault(require("./rgba2hsv"));
const rgba2hex_1 = __importDefault(require("./rgba2hex"));
/**
 * @name                  convert
 * @namespace           sugar.js.color
 * @type                  Function
 * @stable
 *
 * This function take as input any color format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
 * and convert it into the wanted format like "rgba", "hsl", "hsv", "hex", "rgbaString", "hslString" or "hsvString"
 *
 * @param           {Mixed}               input           The input color to convert
 * @param           {String}              [format="rgba"]     The format wanted
 * @return          {Mixed}                               The converted color
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function convert(input, format = 'rgba') {
    // transforming the input into rgba object
    let rgbaObj = {};
    if (typeof input === 'string') {
        rgbaObj = parse_1.default(input, 'rgba');
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
            rgbaObj = hsl2rgba_1.default(input);
        }
        else if (input.h !== undefined &&
            input.s !== undefined &&
            input.v !== undefined) {
            rgbaObj = hsv2rgba_1.default(input);
        }
    }
    switch (format) {
        case 'rgba':
            return rgbaObj;
        case 'hsl':
            return rgba2hsl_1.default(rgbaObj);
        case 'hsv':
            return rgba2hsv_1.default(rgbaObj);
        case 'hex':
        case 'hexString':
            return rgba2hex_1.default(rgbaObj);
        case 'rgbaString':
            return `rgba(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b},${rgbaObj.a})`;
        case 'hslString':
            const hslObj = convert(rgbaObj, 'hsl');
            return `hsl(${hslObj.h},${hslObj.s},${hslObj.l})`;
        case 'hsvString':
            const hsvObj = convert(rgbaObj, 'hsv');
            return `hsv(${hsvObj.h},${hsvObj.s},${hsvObj.v})`;
    }
    // if nothing supported
    return undefined;
}
exports.default = convert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7OztBQUVWLG9EQUE4QjtBQUM5QiwwREFBb0M7QUFDcEMsMERBQW9DO0FBQ3BDLDBEQUFvQztBQUNwQywwREFBb0M7QUFDcEMsMERBQW9DO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLEdBQUcsTUFBTTtJQUNyQywwQ0FBMEM7SUFDMUMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzdCLE9BQU8sR0FBRyxlQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2xDO1NBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDcEMsSUFDRSxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7WUFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO1lBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUNyQjtZQUNBLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDakI7YUFBTSxJQUNMLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztZQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7WUFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQ3JCO1lBQ0EsT0FBTyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7YUFBTSxJQUNMLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztZQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7WUFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQ3JCO1lBQ0EsT0FBTyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7S0FDRjtJQUVELFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxNQUFNO1lBQ1QsT0FBTyxPQUFPLENBQUM7UUFDakIsS0FBSyxLQUFLO1lBQ1IsT0FBTyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLEtBQUssS0FBSztZQUNSLE9BQU8sa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssV0FBVztZQUNkLE9BQU8sa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixLQUFLLFlBQVk7WUFDZixPQUFPLFFBQVEsT0FBTyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JFLEtBQUssV0FBVztZQUNkLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkMsT0FBTyxPQUFPLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDcEQsS0FBSyxXQUFXO1lBQ2QsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2QyxPQUFPLE9BQU8sTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQztLQUNyRDtJQUVELHVCQUF1QjtJQUN2QixPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=