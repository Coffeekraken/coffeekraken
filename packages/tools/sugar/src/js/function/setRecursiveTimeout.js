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
