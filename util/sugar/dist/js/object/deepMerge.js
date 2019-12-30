"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepMerge;

var _mergeDeep = _interopRequireDefault(require("merge-deep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                deepMerge
 * @namespace           sugar.js.object
 * @type                Function
 *
 * Deep merge one object with another and return the merged object result
 *
 * @param           {Object}            object1           The object 1 to merge
 * @param           {Object}            object2           The object 2 to merge
 * @return          {Object}                              The merged object result
 *
 * @example           js
 * import deepMerge from '@coffeekraken/sugar/js/object/deepMerge';
 * deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepMerge(object1, object2) {
  return (0, _mergeDeep.default)(object1, object2);
}

module.exports = exports.default;