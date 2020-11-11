"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;

var _parseRgba = _interopRequireDefault(require("./parseRgba"));

var _parseHsv = _interopRequireDefault(require("./parseHsv"));

var _hsv2rgba = _interopRequireDefault(require("./hsv2rgba"));

var _parseHsl = _interopRequireDefault(require("./parseHsl"));

var _hsl2rgba = _interopRequireDefault(require("./hsl2rgba"));

var _hex2rgba = _interopRequireDefault(require("./hex2rgba"));

var _rgba2hsl = _interopRequireDefault(require("./rgba2hsl"));

var _rgba2hsv = _interopRequireDefault(require("./rgba2hsv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            parse
 * @namespace           sugar.js.color
 * @type            Function
 * @private
 *
 * Parse a string and return you the wanted object format like "rgba", "hsl" or "hsv".
 *
 * @param       {Object}      color       The color to parse like (#ff0000 | rgba(...) | hsl(...) | hsv(...))
 * @param       {String}      [format='rgba']       The object format wanted. Can be "rgba", "hsl" or "hsv"
 * @return      {Object}                  The rgba representation of the passed color
 *
 * @example         js
 * import parse from '@coffeekraken/sugar/js/color/parse';
 * parse('rgba(10,20,30,100)'); // => { r: 10, b: 20, b: 30, a: 100 }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parse(color, format) {
  if (format === void 0) {
    format = 'rgba';
  }

  color = color.replace(/\s/g, '');

  if (color.indexOf('rgb') != -1) {
    color = (0, _parseRgba.default)(color);
  } else if (color.indexOf('hsv') != -1) {
    color = (0, _parseHsv.default)(color);
    color = (0, _hsv2rgba.default)(color.h, color.s, color.v);
  } else if (color.indexOf('hsl') != -1) {
    color = (0, _parseHsl.default)(color);
    color = (0, _hsl2rgba.default)(color.h, color.s, color.l);
  } else if (color.substring(0, 1) == '#') {
    color = (0, _hex2rgba.default)(color);
  }

  switch (format) {
    case 'hsl':
      return (0, _rgba2hsl.default)(color);
      break;

    case 'hsv':
      return (0, _rgba2hsv.default)(color);
      break;

    case 'rgba':
    default:
      return color;
      break;
  }
}

module.exports = exports.default;