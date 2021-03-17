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
     * @name        upperFirst
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * Upper first
     *
     * @param    {String}    string    The string to process
     * @return    {String}    The processed string with first letter uppercase
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import upperFirst from '@coffeekraken/sugar/js/string/upperFirst'
     * upperFirst('hello world') // Hello world
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function upperFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    exports.default = upperFirst;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBwZXJGaXJzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NoYXJlZC9zdHJpbmcvdXBwZXJGaXJzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsVUFBVSxDQUFDLE1BQU07UUFDeEIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNELGtCQUFlLFVBQVUsQ0FBQyJ9