// const __deepMerge = require('deepmerge');
// const __isPlainObject = require('is-plain-object');
const { mergeAndCompare, merge } = require('merge-anything');

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
 * import deepMerge from '@coffeekraken/sugar/js/object/deepMerge';
 * deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// const __overwriteMerge = (destinationArray, sourceArray, options) => sourceArray
// const __isSettingsObject = (obj) => {
//   return obj.mergeArrays !== undefined;
// };
module.exports = function deepMerge() {
  // merge all the passed objects

  function deepMergeErase(originVal, newVal, key) {
    if (newVal._deepMergeEraseKeys) {
      // console.log('KEY', key, originVal, newVal);
      Object.keys(newVal).forEach(k => {
        if (k.indexOf(newVal._deepMergeEraseKeys) === -1) delete newVal[k];
      });
      delete newVal._deepMergeEraseKeys;
      return newVal;
    }
    // always return newVal as fallback!!
    return newVal
  }

  const mergeArgumentsArray = Array.prototype.slice.call(arguments);
  mergeArgumentsArray.unshift(deepMergeErase);

  // console.log(mergeArgumentsArray);
  // process.exit();

  // return merge.apply(null, Array.prototype.slice.call(arguments));
  return mergeAndCompare.apply(null, mergeArgumentsArray);

  // let objectsArray = Array.prototype.slice.call(arguments);
  // let settings = {
  //   mergeArrays: false
  // };
  // if (__isSettingsObject(objectsArray[objectsArray.length - 1])) {
  //   const settingsObject = objectsArray.pop();
  //   settings = __deepMerge(settings, settingsObject);
  // }

  // // objectsArray = objectsArray.map(o => {
  // //   delete o.setup;
  // //   return o;
  // // });

  // console.log(objectsArray);
  // // process.exit();

  // // let finalSettings = {
  // //   isMergeableObject: __isPlainObject
  // // };
  // // if (settings.mergeArrays) finalSettings.arrayMerge = __overwriteMerge;

  // let finalSettings = {};

  // const res = __deepMerge.all(objectsArray, finalSettings);
  // return res;
}
