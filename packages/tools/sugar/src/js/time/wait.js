"use strict";
// @ts-nocheck
// @shared
/**
 * @name            wait
 * @namespace           sugar.js.time
 * @type            Function
 * @async
 * @stable
 *
 * This function is a simple "setTimeout" wrapper inside a promise.
 *
 * @param         {Number}        timeout       The timeout to wait in ms
 * @return        {Promise}                     A simple promise resolved once the timeout is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import wait from '@coffeekraken/sugar/js/time/wait';
 * await wait(2000);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function wait(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}
module.exports = wait;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndhaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLElBQUksQ0FBQyxPQUFPO0lBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxpQkFBUyxJQUFJLENBQUMifQ==