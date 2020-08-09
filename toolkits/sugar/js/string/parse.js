"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                                  parse
 * @namespace           js.string
 * @type                                  Function
 *
 * Parse a string and convert it into his native data type like date, number, boolean, etc...
 *
 * @param             {String}                        value                                 The value to convert
 * @return            {Mixed}                                                               The converted value
 *
 * @example           js
 * import parse from '@coffeekraken/sugar/js/string/parse';
 * parse('10'); // => 10
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = value => {
  if (typeof value !== 'string') return value;

  try {
    return Function("\n      \"use strict\";\n      return (".concat(value, ");\n    "))();
  } catch (e) {
    return value;
  }
};

exports.default = _default;
module.exports = exports.default;