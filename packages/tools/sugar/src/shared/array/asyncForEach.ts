// @ts-nocheck

/**
 * @name                              asyncForEach
 * @namespace            shared.array
 * @type                              Function
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * Allow to make some async foreach on your arrays
 *
 * @param         {Array}             array             The array to loop on
 * @param         {Function}          asyncFn           The async function to call on each items
 *
 * @example         js
 * import { __asyncForEach } from '@coffeekraken/sugar/array';
 * const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
 * __asyncForEach([0,1,2,3], async (item) => {
 *    await waitWor(50);
 *    console.log(item);
 * });
 * // 0
 * // 1
 * // 2
 * // 3
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
interface IAsyncForEach {
    (value: any, index: number, array: any[]): void;
}
export default async function __asyncForEach(
    array: any[],
    asyncFn: IAsyncForEach,
): Promise<any> {
    return new Promise(async ({ resolve, reject }) => {
        for (let index = 0; index < array.length; index++) {
            await asyncFn(array[index], index, array);
        }
        resolve();
    });
}
