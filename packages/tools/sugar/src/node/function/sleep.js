"use strict";
// @ts-nocheck
// @shared
/**
 * @name          sleep
 * @namespace           sugar.js.function
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
module.exports = sleep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xlZXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGVlcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsS0FBSyxDQUFDLElBQUk7SUFDakIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQzdCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsaUJBQVMsS0FBSyxDQUFDIn0=