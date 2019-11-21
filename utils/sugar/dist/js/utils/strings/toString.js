"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toString;

var _json = _interopRequireDefault(require("../is/json"));

var _object = _interopRequireDefault(require("../is/object"));

var _array = _interopRequireDefault(require("../is/array"));

var _function = _interopRequireDefault(require("../is/function"));

var _boolean = _interopRequireDefault(require("../is/boolean"));

var _regexp = _interopRequireDefault(require("../is/regexp"));

var _string = _interopRequireDefault(require("../is/string"));

var _number = _interopRequireDefault(require("../is/number"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert passed value to a string
 * @param    {Mixed}    value    The value to convert to string
 * @return    {String}    The resulting string
 *
 * @example    js
 * import toString from 'coffeekraken-sugar/js/utils/strings/toString'
 * toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function toString(value) {
  if ((0, _string.default)(value)) {
    return value;
  } else if ((0, _object.default)(value) || (0, _array.default)(value) || (0, _json.default)(value)) {
    return JSON.stringify(value);
  } else if ((0, _boolean.default)(value)) {
    if (value) return "true";else return "false";
  } else if ((0, _function.default)(value)) {
    return "" + value;
  } else if ((0, _regexp.default)(value)) {
    return value.toString();
  } else if ((0, _number.default)(value)) {
    return value.toString();
  } else if (value === null) {
    return "";
  } else if (value === undefined) {
    return "undefined";
  } else {
    let returnVal;

    try {
      returnVal = JSON.stringify(value);
    } catch (e) {
      try {
        returnVal = value.toString();
      } catch (e) {
        return value;
      }
    }

    return returnVal;
  }
}

module.exports = exports.default;