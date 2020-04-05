/**
 * @name                                splitEvery
 * @namespace                           sugar.node.array
 * @type                                Function
 *
 * Split an array every N items
 *
 * @param           {Array}           array               The array to split
 * @param           {Number}          every               Every how many items to split the array
 * @return          {Array}                               An array of arrays splited
 *
 * @example           js
 * const splitEvery = require('@coffeekraken/sugar/node/array/splitEvery');
 * splitEvery([1,2,3,4,5,6,7,8,9], 3);
 * // [[1,2,3],[4,5,6],[7,8,9]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function splitEvery(array, every) {
  let i, j, finalArray = [];
  for (i = 0, j = array.length; i < j; i += every) {
    finalArray.push(array.slice(i, i + every));
  }
  return finalArray;
  // let tempArray = [];
  // const finalArray = [];
  // let splitAt = every;
  // for (let i = 0; i < array.length; i++) {
  //   if (i + 1 === splitAt) {
  //     finalArray.push(tempArray);
  //     tempArray = [];
  //     splitAt += every;
  //     splitAt -= 1;
  //   }
  //   tempArray.push(array[i]);
  // }
  // return finalArray;
}