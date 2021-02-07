// @ts-nocheck
// @shared

/**
 * @name                                splitEvery
 * @namespace           sugar.js.array
 * @type                                Function
 * @status              beta
 *
 * Split an array every N items
 *
 * @param           {Array}           array               The array to split
 * @param           {Number}          every               Every how many items to split the array
 * @return          {Array}                               An array of arrays splited
 *
 * @example           js
 * import splitEvery from '@coffeekraken/sugar/js/array/splitEvery';
 * splitEvery([1,2,3,4,5,6,7,8,9], 3);
 * // [[1,2,3],[4,5,6],[7,8,9]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function splitEvery(array: any[], every: number): any[] {
  let i: number, j: number;
  const finalArray: any[] = [];
  for (i = 0, j = array.length; i < j; i += every) {
    finalArray.push(array.slice(i, i + every));
  }
  return finalArray;
}
export = splitEvery;
