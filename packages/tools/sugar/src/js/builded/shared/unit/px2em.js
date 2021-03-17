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
     * @name                    px2em
     * @namespace           sugar.js.unit
     * @type                    Function
     * @stable
     *
     * Convert rem value to a px one
     *
     * @param         {Number}          em           The rem value to convert
     * @param         {HTMLElement}     [$elm=document.documentElement]         The HTMLElement to take as source for calculating the em
     * @return        {Number}                        The pixel value
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import px2em from '@coffeekraken/sugar/js/unit/px2em';
     * px2em(36);
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function px2em(px, $elm) {
        if ($elm === void 0) { $elm = document.documentElement; }
        return px / parseFloat(getComputedStyle($elm).fontSize || '16px');
    }
    exports.default = px2em;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHgyZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zaGFyZWQvdW5pdC9weDJlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxTQUFTLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBK0I7UUFBL0IscUJBQUEsRUFBQSxPQUFPLFFBQVEsQ0FBQyxlQUFlO1FBQ2hELE9BQU8sRUFBRSxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNELGtCQUFlLEtBQUssQ0FBQyJ9