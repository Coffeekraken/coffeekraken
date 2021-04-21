// @ts-nocheck

import uniq from 'lodash/uniq';

/**
 * @name        keysFirst
 * @namespace            js.array
 * @type      Function
 * @stable
 *
 * Make sure the passed array start with the passed keys
 *
 * @param    {Array}    array    The array to sort
 * @param    {Array}    keys    The keys to start the array with
 * @return    {Array}    The processed array
 *
 * @example    js
 * import keysFirst from '@coffeekraken/sugar/js/array/keysFirst'
 * keysFirst(['a','b','d','g','c'], ['d','g'])
 * // ['d','g','a','b','c']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function keysFirst(array: any[], keys: any[]): any[] {
  // all the keys has to exist in the array stack
  // otherwise we filter it out
  keys = keys.filter((key) => {
    return array.indexOf(key) !== -1;
  });
  // add the keys at start
  const empty: any[] = [];
  let res = empty.concat(keys).concat(array);
  // remove double items
  res = uniq(res);
  // return the result
  return res;
}

export default keysFirst;
