"use strict";
// @ts-nocheck
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
 * @namespace            js.color
 * @type                  Function
 * @stable
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvY29sb3IvY29udmVydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxvREFBOEI7QUFDOUIsMERBQW9DO0FBQ3BDLDBEQUFvQztBQUNwQywwREFBb0M7QUFDcEMsMERBQW9DO0FBQ3BDLDBEQUFvQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxHQUFHLE1BQU07SUFDckMsMENBQTBDO0lBQzFDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM3QixPQUFPLEdBQUcsZUFBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNsQztTQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3BDLElBQ0UsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO1lBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUztZQUNyQixLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFDckI7WUFDQSxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ2pCO2FBQU0sSUFDTCxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7WUFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO1lBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUNyQjtZQUNBLE9BQU8sR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO2FBQU0sSUFDTCxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVM7WUFDckIsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTO1lBQ3JCLEtBQUssQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUNyQjtZQUNBLE9BQU8sR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO0tBQ0Y7SUFFRCxRQUFRLE1BQU0sRUFBRTtRQUNkLEtBQUssTUFBTTtZQUNULE9BQU8sT0FBTyxDQUFDO1FBQ2pCLEtBQUssS0FBSztZQUNSLE9BQU8sa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixLQUFLLEtBQUs7WUFDUixPQUFPLGtCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLFdBQVc7WUFDZCxPQUFPLGtCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsS0FBSyxZQUFZO1lBQ2YsT0FBTyxRQUFRLE9BQU8sQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyRSxLQUFLLFdBQVc7WUFDZCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sT0FBTyxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3BELEtBQUssV0FBVztZQUNkLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkMsT0FBTyxPQUFPLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FDckQ7SUFFRCx1QkFBdUI7SUFDdkIsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUNELGtCQUFlLE9BQU8sQ0FBQyJ9