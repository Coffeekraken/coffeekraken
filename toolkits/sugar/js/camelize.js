"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = camelize;

/**
 * @name        camelize
 * @namespace           sugar.js.string
 * @type      Function
 *
 * Camelize a string
 *
 * @param         {String}          text        The string to camelize
 * @return        {String}                      The camelized string
 *
 * @example     js
 * import camelize from '@coffeekraken/sugar/js/string/camelize';
 * camelize('hello world'); // => helloWorld
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function camelize(text) {
  var res = '';
  var reg = /(?:^|[_-\s])(\w)/g;
  res = text.replace(reg, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
  res = res.substr(0, 1).toLowerCase() + res.slice(1);
  return res.trim();
}

module.exports = exports.default;