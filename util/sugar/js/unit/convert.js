"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convert;

var _em2px = _interopRequireDefault(require("./em2px"));

var _px2em = _interopRequireDefault(require("./px2em"));

var _px2rem = _interopRequireDefault(require("./px2rem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                  convert
 * @namespace             sugar.js.unit
 * @type                  Function
 * 
 * Convert a passed unit to the wanted one. If the passed unit is a number and not a string like "10rem", the unit is take as pixels
 * 
 * @param         {String|Number}           from            The base value to convert
 * @param         {String}                  [to='px']       The value unit you want back
 * @return        {Number}                                  The converted value
 * 
 * @example       js
 * import convert from '@coffeekraken/sugar/js/unit/convert';
 * convert('2rem', 'px');
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function convert(from, to = 'px', $elm) {
  let fromUnit = 'px';

  if (typeof from === 'string' && parseFloat(from).toString() !== from) {
    fromUnit = from.replace(/[0-9.,]+/g, '');
  }

  const fromNumber = parseFloat(from);
  let pxValue;

  switch (fromUnit) {
    case 'px':
      pxValue = fromNumber;
      break;

    case 'rem':
      pxValue = (0, _em2px.default)(fromNumber);
      break;

    case 'em':
      pxValue = (0, _em2px.default)(fromNumber, $elm);
      break;

    default:
      return from;
      break;
  }

  switch (to) {
    case 'px':
      return pxValue;
      break;

    case 'rem':
      return (0, _px2rem.default)(pxValue);
      break;

    case 'em':
      return (0, _px2em.default)(pxValue, $elm);
      break;

    default:
      return from;
      break;
  }
}

module.exports = exports.default;