"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mergeAnything = require("merge-anything");

var _toPlainObject = _interopRequireDefault(require("../class/toPlainObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                deepMerge
 * @namespace           sugar.js.object
 * @type                Function
 *
 * Deep merge one object with another and return the merged object result
 * 
 * @param           {Object}            objects...        Pass all the objects you want to merge
 * @return          {Object}                              The merged object result
 *
 * @example           js
 * import deepMerge from '@coffeekraken/sugar/node/object/deepMerge';
 * deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepMerge() {
  // merge all the passed objects
  function deepMergeErase(originVal, newVal, key) {
    if (newVal !== null && newVal !== undefined && newVal._deepMergeEraseKeys) {
      // console.log('KEY', key, originVal, newVal);
      Object.keys(newVal).forEach(k => {
        if (newVal._deepMergeEraseKeys.indexOf(k) === -1 && k !== '_deepMergeEraseKeys') {
          delete newVal[k];
        }
      });
      delete newVal._deepMergeEraseKeys;
      return newVal;
    } // always return newVal as fallback!!


    return newVal;
  }

  const mergeArgumentsArray = Array.prototype.slice.call(arguments).map(obj => {
    return (0, _toPlainObject.default)(obj);
  });
  mergeArgumentsArray.unshift(deepMergeErase);
  return _mergeAnything.mergeAndCompare.apply(null, mergeArgumentsArray);
}

var _default = deepMerge;
exports.default = _default;
module.exports = exports.default;