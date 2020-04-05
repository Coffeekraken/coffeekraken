"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepMerge;

var _mergeAnything = require("merge-anything");

// import __deepMerge from 'deepmerge';

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
 * import deepMerge from '@coffeekraken/sugar/js/object/deepMerge';
 * deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepMerge() {
  // merge all the passed objects
  return _mergeAnything.merge.apply(null, Array.prototype.slice.call(arguments)); // return __deepMerge.all(Array.prototype.slice.call(arguments));
}

module.exports = exports.default;