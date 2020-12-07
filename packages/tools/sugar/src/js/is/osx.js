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
    // TODO tests
    /**
     * @name                            osx
     * @namespace           sugar.js.is
     * @type                            Function
     * @stable
     *
     * Check if the app run on mac OS X or not
     *
     * @return        {Boolean}                             true if mac OS X, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import isOsx from '@coffeekraken/sugar/js/is/osx';
     * isOsx(); // => true
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function osx() {
        if (process && process.platform) {
            return process.platform === 'darwin';
        }
        return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    }
    return osx;
});
//# sourceMappingURL=osx.js.map