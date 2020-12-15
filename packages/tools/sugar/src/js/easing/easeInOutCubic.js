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
     * @name      easeInOutCubic
     * @namespace           sugar.js.easing
     * @type      Function
     * @stable
     *
     * Ease in out cubic function
     *
     * @param 		{Number} 		t 		The current time
     * @return 		{Number} 				The value depending on time
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function ease(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    return ease;
});
//# sourceMappingURL=easeInOutCubic.js.map