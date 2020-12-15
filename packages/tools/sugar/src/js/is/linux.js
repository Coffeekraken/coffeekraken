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
     * @name                            linux
     * @namespace           sugar.js.is
     * @type                            Function
     * @stable
     *
     * Check if the app run on linux
     *
     * @return        {Boolean}                             true if linux, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import isLinux from '@coffeekraken/sugar/js/is/linux';
     * isLinux(); // => true
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function linux() {
        if (process && process.platform) {
            return process.platform === 'linux';
        }
        return navigator.platform.toUpperCase().indexOf('LINUX') >= 0;
    }
    return linux;
});
//# sourceMappingURL=linux.js.map