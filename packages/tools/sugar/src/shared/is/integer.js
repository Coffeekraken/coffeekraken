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
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name        isInteger
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if the passed value is an integer
     *
     * @param 		{Mixed} 		value 		The value to check
     * @return 		{Boolean} 					The check result
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import isInteger from '@coffeekraken/sugar/js/is/integer';
     * isInteger(10) => true
     * isInteger('hello') => false
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isInteger(data) {
        return (typeof data === 'number' &&
            !isNaN(data) &&
            (function (x) {
                return (x | 0) === x;
            })(parseFloat(data)));
    }
    exports.default = isInteger;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJO1FBQ3JCLE9BQU8sQ0FDTCxPQUFPLElBQUksS0FBSyxRQUFRO1lBQ3hCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNaLENBQUMsVUFBVSxDQUFDO2dCQUNWLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUNyQixDQUFDO0lBQ0osQ0FBQztJQUNELGtCQUFlLFNBQVMsQ0FBQyJ9