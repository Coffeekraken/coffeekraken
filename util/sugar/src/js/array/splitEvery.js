/**
 * @name                                splitEvery
 * @namespace                           sugar.js.array
 * @type                                Function
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
export default function splitEvery(array, every) {
  let tempArray = [];
  const finalArray = [];
  let splitAt = every;
  for (let i = 0; i < array.length; i++) {
    if (i + 1 === splitAt) {
      finalArray.push(tempArray);
      tempArray = [];
      splitAt += every;
      splitAt -= 1;
    }
    tempArray.push(array[i]);
  }
  return finalArray;
}