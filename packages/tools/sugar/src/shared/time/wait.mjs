// @ts-nocheck
/**
 * @name            wait
 * @namespace            js.time
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
export default wait;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvdGltZS93YWl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsSUFBSSxDQUFDLE9BQU87SUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQzdCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUsSUFBSSxDQUFDIn0=