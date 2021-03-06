"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keysFirst;

var _uniq = _interopRequireDefault(require("lodash/uniq"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        keysFirst
 * @namespace       sugar.js.array
 * @type      Function
 *
 * Make sure the passed array start with the passed keys
 *
 * @param    {Array}    array    The array to sort
 * @param    {Array}    keys    The keys to start the array with
 * @return    {Array}    The processed array
 *
 * @example    js
 * import keysFirst from '@coffeekraken/sugar/js/array/keysFirst'
 * keysFirst(['a','b','d','g','c'], ['d','g'])
 * // ['d','g','a','b','c']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function keysFirst(array, keys) {
  // all the keys has to exist in the array stack
  // otherwise we filter it out
  keys = keys.filter(key => {
    return array.indexOf(key) !== -1;
  }); // add the keys at start

  let res = [].concat(keys).concat(array); // remove double items

  res = (0, _uniq.default)(res); // return the result

  return res;
}

module.exports = exports.default;