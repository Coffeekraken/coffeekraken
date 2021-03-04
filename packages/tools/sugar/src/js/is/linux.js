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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = linux;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGludXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaW51eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVYsYUFBYTtJQUViOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNILFNBQVMsS0FBSztRQUNaLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDL0IsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQztTQUNyQztRQUNELE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFDRCxrQkFBZSxLQUFLLENBQUMifQ==