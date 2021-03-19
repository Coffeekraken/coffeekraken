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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHgyZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJweDJlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUErQjtRQUEvQixxQkFBQSxFQUFBLE9BQU8sUUFBUSxDQUFDLGVBQWU7UUFDaEQsT0FBTyxFQUFFLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=