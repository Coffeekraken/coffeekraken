import __clone from 'lodash/clone';
import __deepClone from 'lodash/clonedeep';

/**
 * @name                clone
 * @type                Function
 *
 * This function allows you to clone an object either at 1 level, or deeply.
 *
 * @param       {Object}        object        The object to copy
 * @param       {Boolean}       [deep=false]  Specify if you want to clone the object deeply
 *
 * @example       js
 * import clone from '@coffeekraken/sugar/js/object/clone';
 * clone({
 *    hello: 'world'
 * });
 *
 * @see       https://www.npmjs.com/package/lodash
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function clone(object, deep = false) {
  if (deep) {
    return __deepClone(object);
  }
  return __clone(object);
}
