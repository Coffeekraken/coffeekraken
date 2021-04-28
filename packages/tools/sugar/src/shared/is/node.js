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
     * @name                                      isNode
     * @namespace            js.is
     * @type                                      Function
     * @stable
     *
     * Check if the current script is running under node runtime or not...
     *
     * @return                {Boolean}                           true if running under javascript runtime, false if not...
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example               js
     * import isNode from '@coffeekraken/sugar/js/is/node';
     * isNode(); // => true
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.default = () => {
        return (typeof process !== 'undefined' &&
            process.release &&
            process.release.name === 'node');
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvaXMvbm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSCxrQkFBZSxHQUFHLEVBQUU7UUFDbEIsT0FBTyxDQUNMLE9BQU8sT0FBTyxLQUFLLFdBQVc7WUFDOUIsT0FBTyxDQUFDLE9BQU87WUFDZixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLENBQ2hDLENBQUM7SUFDSixDQUFDLENBQUMifQ==