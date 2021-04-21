// @ts-nocheck

/**
 * @name          sleep
 * @namespace            js.function
 * @type          Function
 * @stable
 *
 * Simple sleep function that can be used using "await" syntax in an "async" function
 *
 * @param         {Number}          time          The sleep duration in ms
 * @return        {Promise}                       A promise that will be resolved at the end of the sleep time
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import sleep from '@coffeekraken/sugar/js/function/sleep';
 * async function() {
 *  console.log('hello');
 *  await sleep(2000);
 *  console.log('World');
 * }
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
export default sleep;
