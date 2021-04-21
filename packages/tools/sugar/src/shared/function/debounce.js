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
     * @name        debounce
     * @namespace            js.function
     * @type      Function
     * @stable
     *
     * This utils function allows you to make sure that a function that will normally be called
     * several times, for example during a scroll event, to be called only once after
     * the delay passed
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 		js
     * import debounce from '@coffeekraken/sugar/js/function/debounce';
     * const myDebouncedFn = debounce(() => {
     * 		// my function content that will be
     * 		// executed only once after the 1 second delay
     * }, 1000);
     *
     * document.addEventListener('scroll', (e) => {
     * 		// call my debounced function
     * 		myDebouncedFn();
     * });
     *
     * @since           2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    /*eslint-disable */
    function debounce(fn, delay) {
        let timer = null;
        return function () {
            const context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }
    /*eslint-enable */
    exports.default = debounce;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVib3VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWJvdW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTRCRztJQUNILG1CQUFtQjtJQUNuQixTQUFTLFFBQVEsQ0FBQyxFQUFFLEVBQUUsS0FBSztRQUN6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsT0FBTztZQUNMLE1BQU0sT0FBTyxHQUFHLElBQUksRUFDbEIsSUFBSSxHQUFHLFNBQVMsQ0FBQztZQUNuQixZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsS0FBSyxHQUFHLFVBQVUsQ0FBQztnQkFDakIsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELGtCQUFrQjtJQUNsQixrQkFBZSxRQUFRLENBQUMifQ==