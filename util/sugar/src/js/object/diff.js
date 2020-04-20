import __map from './map';
import __objectDiff from 'object-diff';
import __isPlainObject from '../is/plainObject';
import __isEqual from 'is-equal';

/**
 * @name                      diff
 * @namespace                 sugar.js.object
 * @type                      Function
 * 
 * This function take two objects and return an object that contains only what has been changed between the two.
 * This function is a simple wrapper around the nice object-diff package from Thomas Jensen that you can find here: https://www.npmjs.com/package/object-diff
 * 
 * @param         {Object}          object1            The first object used for the diff process
 * @param         {Object}          object2            The second object used for the diff process
 * @return        {Object}                             The object that contains only the differences between the two
 * 
 * @example         js
 * import diff from '@coffeekraken/sugar/js/object/diff';
 * const myObject1 = {
 *    hello: 'world', 
 *    plop: 'yop'
 * };
 * const myObject2 = {
 *    coco: 'plop',
 *    hello: 'hey!',
 *    plop: 'yop'
 * };
 * diff(myObject1, myObject2);
 * {
 *    coco: 'plop',
 *    hello: 'hey!'
 * }
 * 
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function diff(object1, object2) {

  const keys = Array.from(new Set([...Object.keys(object1), ...Object.keys(object2)]));

  for (let i = 0; i < keys.length; i++) {
    const _prop = keys[i];

    if (__isPlainObject(object1[_prop]) && __isPlainObject(object2[_prop])) {
      object1[_prop] = diff(object1[_prop], object2[_prop]);
      if (Object.keys(object1[_prop]).length === 0) delete object1[_prop];
      continue;
    }

    if (object1[_prop] === undefined && object2[_prop] !== undefined) {
      object1[_prop] = object2[_prop];
      continue;
    }

    if (object1[_prop] !== undefined && object2[_prop] === undefined) {
      delete object1[_prop];
      continue;
    }

    if (__isEqual(object1[_prop], object2[_prop])) {
      delete object1[_prop];
      continue;
    }

    if (__isPlainObject(object1[_prop]) && Object.keys(object1[_prop]).length === 0) {
      delete object1[_prop];
      continue;
    }

    if (!__isEqual(object1[_prop], object2[_prop])) {
      object1[_prop] = object2[_prop];
      continue;
    }

  }

  return object1;

}