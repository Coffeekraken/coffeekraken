"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        setRecursiveTimeout
 * @namespace           sugar.js.function
 * @type      Function
 * @stable
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
 * import setRecursiveTimeout from '@coffeekraken/sugar/js/function/setRecursiveTimeout';
 * setRecursiveTimeout(() => {
 * 		// I will be executed 10 times
 * }, 1000, 10000);
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function setRecursiveTimeout(fn, timeout, duration, spread = 0) {
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
exports.default = setRecursiveTimeout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0UmVjdXJzaXZlVGltZW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldFJlY3Vyc2l2ZVRpbWVvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOztBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxHQUFHLENBQUM7SUFDNUQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1osSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztJQUVyQixDQUFDLFNBQVMsSUFBSTtRQUNaLG9CQUFvQjtRQUNwQixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFUiwwQkFBMEI7UUFDMUIsZUFBZSxJQUFJLE9BQU8sQ0FBQztRQUMzQixHQUFHLEVBQUUsQ0FBQztRQUVOLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsS0FBSyxDQUFDLENBQUMsSUFBSSxlQUFlLEdBQUcsUUFBUSxFQUFFO1lBQzlELE1BQU0sV0FBVyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUM7U0FDckQ7SUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBRUwsMkRBQTJEO0lBQzNELE9BQU87UUFDTCxvQkFBb0I7UUFDcEIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFDRCxrQkFBZSxtQkFBbUIsQ0FBQyJ9