import __get from './get';
import __set from './set';

/**
 * @name                        ensureExists
 * @namespace           js.object
 * @type                        Function
 *
 * Pass a string like "my.cool.object" and the value it has to be and this function will ensure that this deep object exist
 *
 * @param           {Object}            obj                           The object on which to check the path existence
 * @param           {String}            path                           The dotted object path to check
 * @param           {Mixed}             value                         The value to set to the object path created if not already exist
 *
 * @example           js
 * import ensureExists from '@coffeekraken/sugar/js/object/ensureExists';
 * const myObj = { hello: 'world' }«
 * ensureExists(myObj, 'cool.object', {});
 * // { hello: 'world', cool: { object: {} } }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default (obj, path, value = {}) => {
  const v = __get(obj, path);
  if (v === undefined) {
    __set(obj, path, value);
  }
};
