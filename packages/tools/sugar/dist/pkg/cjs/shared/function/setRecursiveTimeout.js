"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        setRecursiveTimeout
 * @namespace            shared.function
 * @type      Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * This utils function allows you to call a passed function each x time during a certain duration
 *
 * @param 		{Function} 		fn 				The function to execute
 * @param 		{Number} 		timeout 		The time between each execution
 * @param 		{Number} 		duration 		The duration of the timeout
 * @param 		{Number}		[spread=0] 		An optional spread time that will be used to randomize the function executions times
 * @return 		{Function} 		       		A function that you can use to clear the timeout before it ends by itself
 *
 * @todo          interface
 * @todo          doc
 * @todo          tests
 *
 * @example 		js
 * import { __setRecursiveTimeout } from '@coffeekraken/sugar/function';
 *  __setRecursiveTimeout(() => {
 * 		// I will be executed 10 times
 * }, 1000, 10000);
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __setRecursiveTimeout(fn, timeout, duration, spread = 0) {
    let idx = 0;
    let currentDuration = 0;
    let timeoutFn = null;
    (function tick() {
        // call the function
        fn(idx);
        // update current duration
        currentDuration += timeout;
        idx++;
        // recursive call until end
        if (!duration || duration === -1 || currentDuration < duration) {
            const spreadValue = -spread + Math.round(Math.random(spread * 2));
            timeoutFn = setTimeout(tick, timeout + spreadValue);
        }
    })();
    // return the clear function to be able to stop the timeout
    return function () {
        // clear the timeout
        clearTimeout(timeoutFn);
    };
}
exports.default = __setRecursiveTimeout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBd0IscUJBQXFCLENBQ3pDLEVBQUUsRUFDRixPQUFPLEVBQ1AsUUFBUSxFQUNSLE1BQU0sR0FBRyxDQUFDO0lBRVYsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1osSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztJQUVyQixDQUFDLFNBQVMsSUFBSTtRQUNWLG9CQUFvQjtRQUNwQixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFUiwwQkFBMEI7UUFDMUIsZUFBZSxJQUFJLE9BQU8sQ0FBQztRQUMzQixHQUFHLEVBQUUsQ0FBQztRQUVOLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsS0FBSyxDQUFDLENBQUMsSUFBSSxlQUFlLEdBQUcsUUFBUSxFQUFFO1lBQzVELE1BQU0sV0FBVyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUM7U0FDdkQ7SUFDTCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBRUwsMkRBQTJEO0lBQzNELE9BQU87UUFDSCxvQkFBb0I7UUFDcEIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQztBQUNOLENBQUM7QUE5QkQsd0NBOEJDIn0=