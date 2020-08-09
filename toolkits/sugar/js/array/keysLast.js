"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keysLast;

var _uniq = _interopRequireDefault(require("lodash/uniq"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        keysLast
 * @namespace           js.array
 * @type      Function
 *
 * Make sure the passed array ends with the passed keys
 * @param    {Array}    array    The array to process
 * @param    {Array}    keys    The keys to end the array with
 * @return    {Array}    The processed array
 *
 * @example    js
 * import keysLast from '@coffeekraken/sugar/js/array/keysLast'
 * keysLast(['a','b','d','g','c'], ['d','g'])
 * // ['a','b','c','d','g']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function keysLast(array, keys) {
  // all the keys has to exist in the array stack
  // otherwise we filter it out
  keys = keys.filter(key => {
    return array.indexOf(key) !== -1;
  }); // add the keys at start

  var res = [].concat(array).concat(keys); // reverse the array

  res = res.reverse(); // remove double items

  res = (0, _uniq.default)(res); // reverse back the array

  res = res.reverse(); // return the result

  return res;
}

module.exports = exports.default;