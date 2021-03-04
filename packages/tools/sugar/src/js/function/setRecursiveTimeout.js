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
    exports.default = setRecursiveTimeout;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0UmVjdXJzaXZlVGltZW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldFJlY3Vyc2l2ZVRpbWVvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTBCRztJQUNILFNBQVMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBVTtRQUFWLHVCQUFBLEVBQUEsVUFBVTtRQUM1RCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRXJCLENBQUMsU0FBUyxJQUFJO1lBQ1osb0JBQW9CO1lBQ3BCLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVSLDBCQUEwQjtZQUMxQixlQUFlLElBQUksT0FBTyxDQUFDO1lBQzNCLEdBQUcsRUFBRSxDQUFDO1lBRU4sMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxLQUFLLENBQUMsQ0FBQyxJQUFJLGVBQWUsR0FBRyxRQUFRLEVBQUU7Z0JBQzlELElBQU0sV0FBVyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDO2FBQ3JEO1FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVMLDJEQUEyRDtRQUMzRCxPQUFPO1lBQ0wsb0JBQW9CO1lBQ3BCLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0Qsa0JBQWUsbUJBQW1CLENBQUMifQ==