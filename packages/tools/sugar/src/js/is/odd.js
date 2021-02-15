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
     * @name        isOdd
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if a number is odd or not
     *
     * @param    {Number}    value    The value to check
     * @return    {Boolean}    true if odd, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isOdd from '@coffeekraken/sugar/js/is/odd'
     * isOdd(1) // true
     * isOdd(2) // false
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isOdd(value) {
        return value % 2 === 1;
    }
    exports.default = isOdd;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2RkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2RkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsS0FBSyxDQUFDLEtBQUs7UUFDbEIsT0FBTyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=