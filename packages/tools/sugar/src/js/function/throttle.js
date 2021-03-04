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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aHJvdHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILG1CQUFtQjtJQUNuQixTQUFTLFFBQVEsQ0FBQyxFQUFFLEVBQUUsVUFBVTtRQUM5QixVQUFVLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxJQUFJLENBQUM7UUFDVCxPQUFPO1lBQ0wsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLEVBQ3BCLElBQUksR0FBRyxTQUFTLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLFVBQVUsRUFBRTtnQkFDckMsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDWCxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRCxrQkFBa0I7SUFDbEIsa0JBQWUsUUFBUSxDQUFDIn0=