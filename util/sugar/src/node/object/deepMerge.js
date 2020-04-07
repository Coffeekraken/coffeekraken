const { mergeAndCompare } = require('merge-anything');

/**
 * @name                deepMerge
 * @namespace           sugar.node.object
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
// const __overwriteMerge = (destinationArray, sourceArray, options) => sourceArray
// const __isSettingsObject = (obj) => {
//   return obj.mergeArrays !== undefined;
// };
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
    }
    // always return newVal as fallback!!
    return newVal
  }

  const mergeArgumentsArray = Array.prototype.slice.call(arguments);
  mergeArgumentsArray.unshift(deepMergeErase);
  return mergeAndCompare.apply(null, mergeArgumentsArray);

}

module.exports = deepMerge;
