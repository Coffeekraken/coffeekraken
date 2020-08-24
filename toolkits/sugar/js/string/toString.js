"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toString;

var _array = _interopRequireDefault(require("../is/array"));

var _boolean = _interopRequireDefault(require("../is/boolean"));

var _function = _interopRequireDefault(require("../is/function"));

var _json = _interopRequireDefault(require("../is/json"));

var _number = _interopRequireDefault(require("../is/number"));

var _object = _interopRequireDefault(require("../is/object"));

var _regexp = _interopRequireDefault(require("../is/regexp"));

var _string = _interopRequireDefault(require("../is/string"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SError = _interopRequireDefault(require("../error/SError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        toString
 * @namespace           js.string
 * @type      Function
 *
 * Convert passed value to a string
 *
 * @param    {Mixed}    value    The value to convert to string
 * @param     {Object}      [settings={}]             An object of settings to configure your toString process:
 * - beautify (false) {Boolean}: Specify if you want to beautify the output like objects, arrays, etc...
 * @return    {String}    The resulting string
 *
 * @example    js
 * import toString from '@coffeekraken/sugar/js/string/toString'
 * toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function toString(value, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({
    beautify: false
  }, settings);

  if ((0, _string.default)(value)) {
    return value;
  } else if ((0, _number.default)(value)) {
    return value.toString();
  } else if (value === null) {
    return 'null';
  } else if (value instanceof _SError.default) {
    return value.toString();
  } else if (value instanceof Error) {
    if (typeof value.toString === 'function') {
      return value.toString();
    }

    return "".concat(value.name, ":\n\n      ").concat(value.message, "\n\n      ").concat(value.stack, "\n    ");
  } else if (typeof value === 'symbol' || typeof value === 'typedArray' || value instanceof Date || typeof value === 'color') {
    return value.toString();
  } else if ((0, _object.default)(value) || (0, _array.default)(value) || (0, _json.default)(value)) {
    return JSON.stringify(value, null, settings.beautify ? 4 : 0);
  } else if ((0, _boolean.default)(value)) {
    if (value) return 'true';else return 'false';
  } else if ((0, _function.default)(value)) {
    return '' + value;
  } else if ((0, _regexp.default)(value)) {
    return value.toString();
  } else if (value === undefined) {
    return 'undefined';
  } else {
    var returnVal;

    try {
      returnVal = JSON.stringify(value, null, settings.beautify ? 4 : 0);
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