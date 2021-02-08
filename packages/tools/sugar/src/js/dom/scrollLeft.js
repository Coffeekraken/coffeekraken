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
    /**
     * @name      scrollLeft
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Get the amount of scroll left
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import scrollLeft from '@coffeekraken/sugar/js/dom/scrollLeft'
     * scrollLeft() // 40
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivier.bossel@gmail.com)
     */
    function scrollLeft() {
        return window.pageXOffset || document.scrollLeft || document.body.scrollLeft;
    }
    return scrollLeft;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsTGVmdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNjcm9sbExlZnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBQ0gsU0FBUyxVQUFVO1FBQ2pCLE9BQU8sTUFBTSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQy9FLENBQUM7SUFDRCxPQUFTLFVBQVUsQ0FBQyJ9