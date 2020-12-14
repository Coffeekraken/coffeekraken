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
     * @name        isMmddyyyyDate
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if is a valid mm.dd.yyyy date
     * This will match : mm.dd.yyyy | mm/dd/yyyy | mm-dd-yyyy | mm dd yyyy
     *
     * @param    {String}    date    The date to check
     * @return    {Boolean}    true if is valid, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isMmddyyyyDate from '@coffeekraken/sugar/js/is/mmddyyyyDate'
     * if (isMmddyyyyDate('12.25.2018')) {
     *     // do something cool
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isMmddyyyyDate(date) {
        return /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d\d\d\d$/.test(date);
    }
    return isMmddyyyyDate;
});
//# sourceMappingURL=module.js.map