// @ts-nocheck

/**
 * @name            wait
 * @namespace            js.time
 * @type            Function
 * @async
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function wait(timeout: number = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}
export default wait;
