"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepMerge;

var _copyTo = _interopRequireDefault(require("copy-to"));

var _plainObject = _interopRequireDefault(require("../is/plainObject"));

var _minimatch = _interopRequireDefault(require("minimatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                deepMerge
 * @namespace           js.object
 * @type                Function
 *
 * Deep merge one object with another and return the merged object result. This merging implementation support:
 * - Merging object with getters/setters
 * - n numbers of objects as arguments
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
function deepMerge(...args) {
  function merge(firstObj, secondObj) {
    const newObj = {};
    if (!firstObj && secondObj) return secondObj;
    if (!secondObj && firstObj) return firstObj;
    if (!firstObj && !secondObj) return {};
    (0, _copyTo.default)(firstObj).override(newObj);

    for (const key of Object.keys(secondObj)) {
      if ((0, _plainObject.default)(firstObj[key]) && (0, _plainObject.default)(secondObj[key])) {
        newObj[key] = merge(firstObj[key], secondObj[key]);
        continue;
      }

      (0, _copyTo.default)(secondObj).pick(key).toCover(newObj);
    }

    return newObj;
  }

  let currentObj = {};

  for (let i = 0; i < args.length; i++) {
    const toMergeObj = args[i] || {};
    currentObj = merge(currentObj, toMergeObj);
  }

  return currentObj;
}

module.exports = exports.default;