const __deepMerge = require('deepmerge');
const __isPlainObject = require('is-plain-object');

/**
 * @name                deepMerge
 * @namespace           sugar.js.object
 * @type                Function
 *
 * Deep merge one object with another and return the merged object result
 * Settings:
 * - mergeArrays: (Boolean) Define if you want to merge arrays or not. Default: false
 * 
 * @param           {Object}            objects...        Pass all the objects you want to merge
 * @param           {Object}            [settings={}]     Pass a settings object at the end. See the settings available just on top
 * @return          {Object}                              The merged object result
 *
 * @example           js
 * import deepMerge from '@coffeekraken/sugar/js/object/deepMerge';
 * deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const __overwriteMerge = (destinationArray, sourceArray, options) => sourceArray
const __isSettingsObject = (obj) => {
  return obj.mergeArrays !== undefined;
};
module.exports = function deepMerge() {
  // merge all the passed objects
  const objectsArray = Array.prototype.slice.call(arguments);
  let settings = {
    mergeArrays: false
  };
  if (__isSettingsObject(objectsArray[objectsArray.length - 1])) {
    const settingsObject = objectsArray.pop();
    settings = __deepMerge(settings, settingsObject);
  }

  let finalSettings = {
    isMergeableObject: __isPlainObject
  };
  if (settings.mergeArrays) finalSettings.arrayMerge = __overwriteMerge;

  const res = __deepMerge.all(objectsArray, finalSettings);
  return res;
}
