// @ts-nocheck
// @shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
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
    function setRecursiveTimeout(fn, timeout, duration, spread) {
        if (spread === void 0) { spread = 0; }
        var idx = 0;
        var currentDuration = 0;
        var timeoutFn = null;
        (function tick() {
            // call the function
            fn(idx);
            // update current duration
            currentDuration += timeout;
            idx++;
            // recursive call until end
            if (!duration || duration === -1 || currentDuration < duration) {
                var spreadValue = -spread + Math.round(Math.random(spread * 2));
                timeoutFn = setTimeout(tick, timeout + spreadValue);
            }
        })();
        // return the clear function to be able to stop the timeout
        return function () {
            // clear the timeout
            clearTimeout(timeoutFn);
        };
    }
    return setRecursiveTimeout;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0UmVjdXJzaXZlVGltZW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldFJlY3Vyc2l2ZVRpbWVvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJHO0lBQ0gsU0FBUyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFVO1FBQVYsdUJBQUEsRUFBQSxVQUFVO1FBQzVELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFckIsQ0FBQyxTQUFTLElBQUk7WUFDWixvQkFBb0I7WUFDcEIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRVIsMEJBQTBCO1lBQzFCLGVBQWUsSUFBSSxPQUFPLENBQUM7WUFDM0IsR0FBRyxFQUFFLENBQUM7WUFFTiwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLEtBQUssQ0FBQyxDQUFDLElBQUksZUFBZSxHQUFHLFFBQVEsRUFBRTtnQkFDOUQsSUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUM7YUFDckQ7UUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRUwsMkRBQTJEO1FBQzNELE9BQU87WUFDTCxvQkFBb0I7WUFDcEIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRCxPQUFTLG1CQUFtQixDQUFDIn0=