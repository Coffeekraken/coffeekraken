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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHO0lBQ0gsa0JBQWUsR0FBRyxFQUFFO1FBQ2xCLE9BQU8sQ0FDTCxPQUFPLE9BQU8sS0FBSyxXQUFXO1lBQzlCLE9BQU8sQ0FBQyxPQUFPO1lBQ2YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUNoQyxDQUFDO0lBQ0osQ0FBQyxDQUFDIn0=