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
    /**
     * @name                            windows
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
     * import isOsx from '@coffeekraken/sugar/js/is/windows';
     * isWindows(); // => true
     *
     * @since       1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function windows() {
        if (process && process.platform) {
            return process.platform === 'win32';
        }
        return navigator.platform.toUpperCase().indexOf('WIN') > -1;
    }
    exports.default = windows;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndpbmRvd3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNILFNBQVMsT0FBTztRQUNkLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDL0IsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQztTQUNyQztRQUNELE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNELGtCQUFlLE9BQU8sQ0FBQyJ9