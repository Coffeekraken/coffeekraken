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
     * @name        isRegexp
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if the passed value is a js Regexp
     *
     * @param    {Mixed}    value    The value to check
     * @return   {Regexp}   true if it's a Regexp, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isRegexp from '@coffeekraken/sugar/js/is/regexp'
     * if (isRegexp(/^hello$/g) {
     *   // do something
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isRegexp(value) {
        return value && typeof value === 'object' && value.constructor === RegExp;
    }
    return isRegexp;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnZXhwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnZXhwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUNILFNBQVMsUUFBUSxDQUFDLEtBQUs7UUFDckIsT0FBTyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFDO0lBQzVFLENBQUM7SUFDRCxPQUFTLFFBQVEsQ0FBQyJ9