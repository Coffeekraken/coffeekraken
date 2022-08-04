// @ts-nocheck
/**
 * @name          sleep
 * @namespace            js.function
 * @type          Function
 * @platform          js
 * @platform          node
 * @status          beta
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
export default sleep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxLQUFLLENBQUMsSUFBSTtJQUNmLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUMzQixVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsS0FBSyxDQUFDIn0=