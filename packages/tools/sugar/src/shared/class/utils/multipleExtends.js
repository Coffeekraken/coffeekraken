// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "aggregation/es5"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const es5_1 = __importDefault(require("aggregation/es5"));
    /**
     * @name                multipleExtends
     * @namespace           shared.class.utils
     * @type                Function
     * @stable
     *
     * This function allows you to extends your class with multiple other ones.
     *
     * @param     {Class}           ...classes          All the classed you want to extend the first one with
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import multipleExtends from '@coffeekraken/sugar/shared/class/utils/multipleExtends';
     * class MyCoolClass extends multipleExtends(Another, AnotherOne) {
     * }
     *
     * @see       https://www.npmjs.com/package/aggregation
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.default = (...classes) => {
        return es5_1.default(...classes);
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGVFeHRlbmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVsdGlwbGVFeHRlbmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBEQUE0QztJQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILGtCQUFlLENBQUMsR0FBRyxPQUFPLEVBQUUsRUFBRTtRQUM1QixPQUFPLGFBQWEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyJ9