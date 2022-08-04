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
function wait(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}
export default wait;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxJQUFJLENBQUMsVUFBa0IsQ0FBQztJQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDM0IsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsSUFBSSxDQUFDIn0=