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
     * @name                    em2px
     * @namespace            js.unit
     * @type                    Function
     * @stable
     *
     * Convert rem value to a px one
     *
     * @param         {Number}          em           The rem value to convert
     * @param         {HTMLElement}     [$elm=document.documentElement]         The HTMLElement to take as source for calculating the em
     * @return        {Number}                        The pixel value
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import em2px from '@coffeekraken/sugar/js/unit/em2px';
     * em2px(2);
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function em2px(em, $elm = document.documentElement) {
        return em * parseFloat(getComputedStyle($elm).fontSize || '16px');
    }
    exports.default = em2px;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW0ycHguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbTJweC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWU7UUFDaEQsT0FBTyxFQUFFLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=