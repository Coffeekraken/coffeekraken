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
     * @name        throttle
     * @namespace           sugar.js.function
     * @type      Function
     * @stable
     *
     * This utils function allows you to make sure that a function that will normally be called
     * several times, for example during a scroll event, to be called once each threshhold time
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 		js
     * import throttle from '@coffeekraken/sugar/js/function/throttle';
     * const myThrottledFn = throttle(() => {
     * 		// my function content that will be
     * 		// executed only once each second
     * }, 1000);
     *
     * document.addEventListener('scroll', (e) => {
     * 		// call my throttled function
     * 		myThrottledFn();
     * });
     *
     * @since         2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    /*eslint-disable */
    function throttle(fn, threshhold) {
        threshhold || (threshhold = 250);
        var last;
        return function () {
            var context = this;
            var now = new Date(), args = arguments;
            if (!last || last <= now - threshhold) {
                last = now;
                fn.apply(context, args);
            }
        };
    }
    /*eslint-enable */
    exports.default = throttle;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zaGFyZWQvZnVuY3Rpb24vdGhyb3R0bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSCxtQkFBbUI7SUFDbkIsU0FBUyxRQUFRLENBQUMsRUFBRSxFQUFFLFVBQVU7UUFDOUIsVUFBVSxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLElBQUksSUFBSSxDQUFDO1FBQ1QsT0FBTztZQUNMLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxFQUNwQixJQUFJLEdBQUcsU0FBUyxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxVQUFVLEVBQUU7Z0JBQ3JDLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBQ1gsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0Qsa0JBQWtCO0lBQ2xCLGtCQUFlLFFBQVEsQ0FBQyJ9