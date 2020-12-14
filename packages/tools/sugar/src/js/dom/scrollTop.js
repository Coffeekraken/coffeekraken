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
     * @name      scrollTop
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Return the amount of scroll top that the user as made in the page
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example     js
     * import scrollTop from '@coffeekraken/sugar/js/dom/scrollTop';
     * scrollTop();
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) (https://olivierbossel.com)
     */
    function scrollTop() {
        return window.pageYOffset || document.scrollTop || document.body.scrollTop;
    }
    return scrollTop;
});
//# sourceMappingURL=module.js.map