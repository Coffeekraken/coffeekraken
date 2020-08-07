"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convert;

var _parse = _interopRequireDefault(require("./parse"));

var _hsl2rgba = _interopRequireDefault(require("./hsl2rgba"));

var _hsv2rgba = _interopRequireDefault(require("./hsv2rgba"));

var _rgba2hsl = _interopRequireDefault(require("./rgba2hsl"));

var _rgba2hsv = _interopRequireDefault(require("./rgba2hsv"));

var _rgba2hex = _interopRequireDefault(require("./rgba2hex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                  convert
 * @namespace           js.color
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
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function convert(input, format = 'rgba') {
  // transforming the input into rgba object
  let rgbaObj = {};

  if (typeof input === 'string') {
    rgbaObj = (0, _parse.default)(input, 'rgba');
  } else if (typeof input === 'object') {
    if (input.r !== undefined && input.g !== undefined && input.b !== undefined) {
      rgbaObj = input;
    } else if (input.h !== undefined && input.s !== undefined && input.l !== undefined) {
      rgbaObj = (0, _hsl2rgba.default)(input);
    } else if (input.h !== undefined && input.s !== undefined && input.v !== undefined) {
      rgbaObj = (0, _hsv2rgba.default)(input);
    }
  }

  switch (format) {
    case 'rgba':
      return rgbaObj;
      break;

    case 'hsl':
      return (0, _rgba2hsl.default)(rgbaObj);
      break;

    case 'hsv':
      return (0, _rgba2hsv.default)(rgbaObj);
      break;

    case 'hex':
    case 'hexString':
      return (0, _rgba2hex.default)(rgbaObj);
      break;

    case 'rgbaString':
      return `rgba(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b},${rgbaObj.a})`;
      break;

    case 'hslString':
      const hslObj = convert(rgbaObj, 'hsl');
      return `hsl(${hslObj.h},${hslObj.s},${hslObj.l})`;
      break;

    case 'hsvString':
      const hsvObj = convert(rgbaObj, 'hsv');
      return `hsv(${hsvObj.h},${hsvObj.s},${hsvObj.v})`;
      break;
  } // if nothing supported


  return undefined;
}

module.exports = exports.default;