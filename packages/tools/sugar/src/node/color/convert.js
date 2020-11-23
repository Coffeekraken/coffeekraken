"use strict";
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
 *
 * This function take as input any color format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
 * and convert it into the wanted format like "rgba", "hsl", "hsv", "hex", "rgbaString", "hslString" or "hsvString"
 *
 * @param           {Mixed}               input           The input color to convert
 * @param           {String}              [format="rgba"]     The format wanted
 * @return          {Mixed}                               The converted color
 *
 * @example         js
 * import convert from '@coffeekraken/sugar/js/color/convert';
 * convert('rgba(10,20,30,100)', 'rgba'); // => { r: 10, g: 20, b: 30, a: 100 }
 *
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
