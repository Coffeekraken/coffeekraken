// @ts-nocheck
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aHJvdHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0gsbUJBQW1CO0lBQ25CLFNBQVMsUUFBUSxDQUFDLEVBQUUsRUFBRSxVQUFVO1FBQzlCLFVBQVUsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQztRQUNULE9BQU87WUFDTCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFDcEIsSUFBSSxHQUFHLFNBQVMsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsVUFBVSxFQUFFO2dCQUNyQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUNYLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELGtCQUFrQjtJQUNsQixrQkFBZSxRQUFRLENBQUMifQ==