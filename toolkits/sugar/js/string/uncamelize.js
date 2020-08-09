"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uncamelize;

/**
 * @name        uncamelize
 * @namespace           js.string
 * @type      Function
 *
 * Uncamelize a string
 *
 * @param    {String}    string    The string to uncamelize
 * @param    {String}    [separator='-']    The separator to use
 * @return    {String}    The uncamelized string
 *
 * @example    js
 * import uncamelize from '@coffeekraken/sugar/js/string/uncamelize'
 * uncamelize('helloWorldAndUniverse') // hello-world-and-universe
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function uncamelize(text, separator) {
  if (separator === void 0) {
    separator = '-';
  }

  // Replace all capital letters by separator followed by lowercase one
  var res = '';
  res = text.replace(/[A-Z]/g, function (letter) {
    return separator + letter.toLowerCase();
  }); // Remove first separator (to avoid _hello_world name)

  if (res.slice(0, 1) === separator) res = res.slice(1);
  return res;
}

module.exports = exports.default;