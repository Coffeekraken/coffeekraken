// @ts-nocheck
/**
 * @name        setRecursiveTimeout
 * @namespace            js.function
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
export default setRecursiveTimeout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0UmVjdXJzaXZlVGltZW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvZnVuY3Rpb24vc2V0UmVjdXJzaXZlVGltZW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEdBQUcsQ0FBQztJQUM1RCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDWixJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFDeEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRXJCLENBQUMsU0FBUyxJQUFJO1FBQ1osb0JBQW9CO1FBQ3BCLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVSLDBCQUEwQjtRQUMxQixlQUFlLElBQUksT0FBTyxDQUFDO1FBQzNCLEdBQUcsRUFBRSxDQUFDO1FBRU4sMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxLQUFLLENBQUMsQ0FBQyxJQUFJLGVBQWUsR0FBRyxRQUFRLEVBQUU7WUFDOUQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQztTQUNyRDtJQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFTCwyREFBMkQ7SUFDM0QsT0FBTztRQUNMLG9CQUFvQjtRQUNwQixZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNELGVBQWUsbUJBQW1CLENBQUMifQ==