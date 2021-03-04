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
     * @name                                      isJs
     * @namespace           sugar.js.is
     * @type                                      Function
     * @stable
     *
     * Check if the current script is running under javascript runtime or not...
     *
     * @return                {Boolean}                           true if running under javascript runtime, false if not...
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example               js
     * import isJs from '@coffeekraken/sugar/js/is/js';
     * isJs(); // => true
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.default = (function () {
        return typeof window !== 'undefined';
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHO0lBQ0gsbUJBQWU7UUFDYixPQUFPLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQztJQUN2QyxDQUFDLEVBQUMifQ==