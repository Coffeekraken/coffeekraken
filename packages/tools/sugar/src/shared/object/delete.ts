// @ts-nocheck
// @shared

import __set from './set';

/**
 * @name                      delete
 * @namespace           sugar.js.object
 * @type                      Function
 * @stable
 *
 * Delete an object property using a dotPath like "something.else"
 *
 * @param         {Object}          object            The object on which you want to delete the property
 * @param         {String}          dotPath           The dotpath to the property you want to delete
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import delete from '@coffeekraken/sugar/js/object/delete';
 * const myObject = {
 *    hello: 'world',
 *    plop: 'yop'
 * };
 * delete(myObject, 'plop');
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function del(object, dotPath) {
  const parentDotPath = dotPath.split('.').slice(0, -1).join('.');

  if (!dotPath || dotPath === '' || dotPath === '.') return object;
  dotPath = dotPath.replace(/\[(\w+)\]/g, '.$1');
  dotPath = dotPath.replace(/^\./, '');
  const a = dotPath.split('.');
  let o = object;
  while (a.length) {
    const n = a.shift();
    if (a.length < 1) {
      if (Array.isArray(o)) {
        const valueToDelete = o[n];
        o = o.filter((v) => {
          return v !== valueToDelete;
        });
      } else {
        delete o[n];
      }
      __set(object, parentDotPath, o);
    } else {
      o = o[n];
    }
  }
  return object;
}
export default del;
