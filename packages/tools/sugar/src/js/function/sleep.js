/**
 * @name          sleep
 * @namespace           sugar.js.function
 * @type          Function
 *
 * Simple sleep function that can be used using "await" syntax in an "async" function
 *
 * @param         {Number}          time          The sleep duration in ms
 * @return        {Promise}                       A promise that will be resolved at the end of the sleep time
 *
 * @example       js
 * import sleep from '@coffeekraken/sugar/js/function/sleep';
 * async function() {
 *  console.log('hello');
 *  await sleep(2000);
 *  console.log('World');
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
