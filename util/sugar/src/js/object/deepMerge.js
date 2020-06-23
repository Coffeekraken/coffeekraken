import __copyTo from 'copy-to';
import __isPlainObject from '../is/plainObject';

/**
 * @name                deepMerge
 * @namespace           sugar.js.object
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
export default function deepMerge(...args) {
  function merge(firstObj, secondObj) {
    const newObj = {};
    __copyTo(firstObj).override(newObj);
    for (const key of Object.keys(secondObj)) {
      if (__isPlainObject(firstObj[key]) && __isPlainObject(secondObj[key])) {
        newObj[key] = merge(firstObj[key], secondObj[key]);
        continue;
      }
      __copyTo(secondObj).pick(key).toCover(newObj);
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
