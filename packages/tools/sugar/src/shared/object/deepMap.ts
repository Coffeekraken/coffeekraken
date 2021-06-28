// @ts-nocheck

import __isPlainObject from '../is/plainObject';
import __deepMerge from '../object/deepMerge';
import __isClassInstance from '../is/classInstance';

/**
 * @name            deepMap
 * @namespace            js.object
 * @type            Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status        beta
 *
 * This function is the same as the "map" one. The only difference is that this one goes deep into the object
 *
 * @param         {Object}        object          The object you want to map through
 * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
 * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
 * - classInstances (false) {Boolean}: Specify if you want the objects to be processed the same as other values
 * - deepFirst (true) {Boolean}: Specify if you want to process deep values first
 * - array (true) {Boolean}: Specify if we have to treat array like simple value to process of treat them as an object and continue our map down
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import deepMap from '@coffeekraken/sugar/js/object/deepMap';
 * deepMap({
 *    hello: 'world'
 * }, ({object, prop, value, path}) => {
 *    return '~ ' + value;
 * });
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepMap(objectOrArray, processor, settings = {}, _path = []) {
  settings = __deepMerge(
    {
      classInstances: false,
      array: true,
      privateProps: false,
      cloneFirst: true
    },
    settings
  );

  const isArray = Array.isArray(objectOrArray);

  const newObject = isArray
    ? []
    : settings.cloneFirst
    ? Object.assign({}, objectOrArray)
    : objectOrArray;

  Object.keys(objectOrArray).forEach((prop) => {
    if (!settings.privateProps && prop.match(/^_/)) return;

    if (
      __isPlainObject(objectOrArray[prop]) ||
      (__isClassInstance(objectOrArray[prop]) && settings.classInstances) ||
      (Array.isArray(objectOrArray[prop]) && settings.array)
    ) {
      const res = deepMap(objectOrArray[prop], processor, settings, [
        ..._path,
        prop
      ]);

      if (isArray) {
        newObject.push(res);
      } else {
        newObject[prop] = res;
      }
      return;
    }

    const res = processor({
      object: objectOrArray,
      prop,
      value: objectOrArray[prop],
      path: [..._path, prop].join('.')
    });
    if (res === -1) {
      delete objectOrArray[prop];
      return;
    }
    if (isArray) newObject.push(res);
    else newObject[prop] = res;

  });
  return newObject;
}
export default deepMap;
