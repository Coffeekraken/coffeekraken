// @ts-nocheck
// @shared
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
export default setRecursiveTimeout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0UmVjdXJzaXZlVGltZW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldFJlY3Vyc2l2ZVRpbWVvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sR0FBRyxDQUFDO0lBQzVELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztJQUN4QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFFckIsQ0FBQyxTQUFTLElBQUk7UUFDWixvQkFBb0I7UUFDcEIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRVIsMEJBQTBCO1FBQzFCLGVBQWUsSUFBSSxPQUFPLENBQUM7UUFDM0IsR0FBRyxFQUFFLENBQUM7UUFFTiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLEtBQUssQ0FBQyxDQUFDLElBQUksZUFBZSxHQUFHLFFBQVEsRUFBRTtZQUM5RCxNQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEUsU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDO1NBQ3JEO0lBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVMLDJEQUEyRDtJQUMzRCxPQUFPO1FBQ0wsb0JBQW9CO1FBQ3BCLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUM7QUFDSixDQUFDO0FBQ0QsZUFBZSxtQkFBbUIsQ0FBQyJ9