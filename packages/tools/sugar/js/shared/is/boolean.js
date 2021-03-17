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
     * @name        isBoolean
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if the passed value is a js Boolean
     *
     * @param    {Mixed}    value    The value to check
     * @return   {Boolean}   true if it's a Boolean, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isBoolean from '@coffeekraken/sugar/js/is/boolean'
     * if (isBoolean(true) {
     *   // do something
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isBoolean(value) {
        return typeof value === 'boolean';
    }
    exports.default = isBoolean;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvaXMvYm9vbGVhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsU0FBUyxTQUFTLENBQUMsS0FBSztRQUN0QixPQUFPLE9BQU8sS0FBSyxLQUFLLFNBQVMsQ0FBQztJQUNwQyxDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=