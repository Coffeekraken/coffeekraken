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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NoYXJlZC9pcy9pbnRlZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsU0FBUyxDQUFDLElBQUk7UUFDckIsT0FBTyxDQUNMLE9BQU8sSUFBSSxLQUFLLFFBQVE7WUFDeEIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ1osQ0FBQyxVQUFVLENBQUM7Z0JBQ1YsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3JCLENBQUM7SUFDSixDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=