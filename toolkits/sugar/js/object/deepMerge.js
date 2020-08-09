"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepMerge;

var _copyTo = _interopRequireDefault(require("copy-to"));

var _plainObject = _interopRequireDefault(require("../is/plainObject"));

var _unique = _interopRequireDefault(require("../array/unique"));

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
 * @param           {Object}            args...        Pass all the objects you want to merge
 * @param           {Object}            [settings={}]       Pass as last object the settings one that can contain these properties:
 * - object (true) {Boolean}: Specify if you want to merge the objects
 * - array (false) {Boolean}: Specify if you want to merge the arrays
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
  var settings = {
    array: false,
    object: true
  };

  function merge(firstObj, secondObj) {
    var newObj = {};
    if (!firstObj && secondObj) return secondObj;
    if (!secondObj && firstObj) return firstObj;
    if (!firstObj && !secondObj) return {};
    (0, _copyTo.default)(firstObj).override(newObj);

    for (var key of Object.keys(secondObj)) {
      // merging arrays
      if (settings.array === true && Array.isArray(firstObj[key]) && Array.isArray(secondObj[key])) {
        var newArray = (0, _unique.default)([...firstObj[key], ...secondObj[key]]);
        newObj[key] = newArray;
        continue;
      } // merging objects
      else if (settings.object === true && (0, _plainObject.default)(firstObj[key]) && (0, _plainObject.default)(secondObj[key])) {
          newObj[key] = merge(firstObj[key], secondObj[key]);
          continue;
        }

      (0, _copyTo.default)(secondObj).pick(key).toCover(newObj);
    }

    return newObj;
  }

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var potentialSettingsObj = args[args.length - 1] || {};

  if (potentialSettingsObj.array && typeof potentialSettingsObj.array === 'boolean' || potentialSettingsObj.object && typeof potentialSettingsObj.object === 'boolean') {
    if (potentialSettingsObj.array !== undefined) settings.array = potentialSettingsObj.array;
    if (potentialSettingsObj.object !== undefined) settings.object = potentialSettingsObj.object;
    args.pop();
  }

  var currentObj = {};

  for (var i = 0; i < args.length; i++) {
    var toMergeObj = args[i] || {};
    currentObj = merge(currentObj, toMergeObj);
  }

  return currentObj;
}

module.exports = exports.default;