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
//# sourceMappingURL=module.js.map