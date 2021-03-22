// @ts-nocheck

import __isPlainObject from '../is/plainObject';
import __deepMerge from '../object/deepMerge';
import __isClassInstance from '../is/classInstance';

/**
 * @name            deepMap
 * @namespace           sugar.js.object
 * @type            Function
 * @stable
 *
 * This function is the same as the "map" one. The only difference is that this one goes deep into the object
 *
 * @param         {Object}        object          The object you want to map through
 * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
 * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
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
function deepMap(object, processor, settings = {}, _path = []) {
  settings = __deepMerge(
    {
      deepFirst: false,
      classInstances: false,
      array: true,
      privateProps: false,
      cloneFirst: true
    },
    settings
  );

  if (settings.cloneFirst) {
    object = Object.assign({}, object);
  }

  Object.keys(object).forEach((prop) => {
    if (!settings.privateProps && prop.match(/^_/)) {
      delete object[prop];
      return;
    }

    // const descriptor = Object.getOwnPropertyDescriptor(object, prop);
    // if (
    //   descriptor.get &&
    //   typeof descriptor.get === 'function' &&
    //   !descriptor.set
    // ) {
    //   return;
    // }

    if (!settings.deepFirst) {
      if (
        __isPlainObject(object[prop]) ||
        (__isClassInstance(object[prop]) && settings.classInstances) ||
        (Array.isArray(object[prop]) && settings.array)
      ) {
        object[prop] = deepMap(object[prop], processor, settings, [
          ..._path,
          prop
        ]);
        // if (!settings.classInstances) return;
      }

      const res = processor({
        object,
        prop,
        value: object[prop],
        path: [..._path, prop].join('.')
      });
      if (res === -1) delete object[prop];
      else object[prop] = res;
    } else {
      const res = processor({
        object,
        prop,
        value: object[prop],
        path: [..._path, prop].join('.')
      });
      if (res === -1) delete object[prop];
      else object[prop] = res;
      if (
        __isPlainObject(object[prop]) ||
        (__isClassInstance(object[prop]) && settings.classInstances) ||
        (Array.isArray(object[prop]) && settings.array)
      ) {
        object[prop] = deepMap(object[prop], processor, settings, [
          ..._path,
          prop
        ]);
        // if (!settings.classInstances) return;
      }
    }
  });
  return object;
}
export default deepMap;
