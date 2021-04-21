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
    // @ts-nocheck
    /**
     * @name          testEnv
     * @namespace            js.is
     * @type          Function
     * @stable
     *
     * Check if the current environment is in a test process or not
     *
     * @return      {Boolean}         true if in environment environment, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import isTest from '@coffeekraken/sugar/js/is/testEnv';
     * isTest(); // => true
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isTestEnv() {
        var _a;
        return ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === 'test';
    }
    exports.default = isTestEnv;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdEVudi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3RFbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxjQUFjO0lBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHO0lBQ0gsU0FBUyxTQUFTOztRQUNoQixPQUFPLE9BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsMENBQUUsUUFBUSxNQUFLLE1BQU0sQ0FBQztJQUMzQyxDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=