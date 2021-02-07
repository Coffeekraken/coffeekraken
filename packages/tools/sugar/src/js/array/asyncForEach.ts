// @ts-nocheck
// @shared

/**
 * @name                              asyncForEach
 * @namespace           sugar.js.array
 * @type                              Function
 * @status              beta
 *
 * Allow to make some async foreach on your arrays
 *
 * @param         {Array}             array             The array to loop on
 * @param         {Function}          asyncFn           The async function to call on each items
 *
 * @example         js
 * import asyncForEach from '@coffeekraken/sugar/js/array/asyncForEach';
 * const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
 * asyncForEach([0,1,2,3], async (item) => {
 *    await waitWor(50);
 *    console.log(item);
 * });
 * // 0
 * // 1
 * // 2
 * // 3
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
interface IAsyncForEach {
  (value: any, index: number, array: any[]): void;
}
export = async function asyncForEach(
  array: any[],
  asyncFn: IAsyncForEach
): Promise<any> {
  return new Promise(async ({ resolve, reject }) => {
    for (let index = 0; index < array.length; index++) {
      await asyncFn(array[index], index, array);
    }
    resolve();
  });
};
