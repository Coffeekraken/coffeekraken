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
    return px2em;
});
//# sourceMappingURL=module.js.map