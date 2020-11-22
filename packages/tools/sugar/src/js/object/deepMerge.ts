import __copyTo from 'copy-to';
import __isPlainObject from '../is/plainObject';
import __unique from '../array/unique';

/**
 * @name                deepMerge
 * @namespace           sugar.js.object
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
export default function deepMerge(...args) {
  let settings = {
    array: false,
    object: true
  };

  function merge(firstObj, secondObj) {
    const newObj = {};
    if (!firstObj && secondObj) return secondObj;
    if (!secondObj && firstObj) return firstObj;
    if (!firstObj && !secondObj) return {};
    __copyTo(firstObj).override(newObj);
    for (const key of Object.keys(secondObj)) {
      // merging arrays
      if (
        settings.array === true &&
        Array.isArray(firstObj[key]) &&
        Array.isArray(secondObj[key])
      ) {
        let newArray = __unique([...firstObj[key], ...secondObj[key]]);
        newObj[key] = newArray;
        continue;
      }

      // merging objects
      else if (
        settings.object === true &&
        __isPlainObject(firstObj[key]) &&
        __isPlainObject(secondObj[key])
      ) {
        newObj[key] = merge(firstObj[key], secondObj[key]);
        continue;
      }
      __copyTo(secondObj).pick(key).toCover(newObj);
    }
    return newObj;
  }

  let potentialSettingsObj = args[args.length - 1] || {};
  if (
    (potentialSettingsObj.array &&
      typeof potentialSettingsObj.array === 'boolean') ||
    (potentialSettingsObj.object &&
      typeof potentialSettingsObj.object === 'boolean')
  ) {
    if (potentialSettingsObj.array !== undefined)
      settings.array = potentialSettingsObj.array;
    if (potentialSettingsObj.object !== undefined)
      settings.object = potentialSettingsObj.object;
    args.pop();
  }

  let currentObj = {};
  for (let i = 0; i < args.length; i++) {
    const toMergeObj = args[i] || {};
    currentObj = merge(currentObj, toMergeObj);
  }

  return currentObj;
}
