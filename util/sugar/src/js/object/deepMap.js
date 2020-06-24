import __isPlainObject from '../is/plainObject';

/**
 * @name            deepMap
 * @namespace           js.object
 * @type            Function
 *
 * This function is the same as the "map" one. The only difference is that this one goes deep into the object
 *
 * @param         {Object}        object          The object you want to map through
 * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
 *
 * @example       js
 * import deepMap from '@coffeekraken/sugar/js/object/deepMap';
 * deepMap({
 *    hello: 'world'
 * }, (value, prop, fullPath) => {
 *    return '~ ' + value;
 * });
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function deepMap(object, processor, _path = []) {
  Object.keys(object).forEach((prop) => {
    if (__isPlainObject(object[prop])) {
      object[prop] = deepMap(object[prop], processor, [..._path, prop]);
      // return;
    }
    const res = processor(object[prop], prop, [..._path, prop].join('.'));
    if (res === -1) delete object[prop];
    else object[prop] = res;
  });
  return object;
}
