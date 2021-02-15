// @ts-nocheck
// @shared
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
    var es5_1 = __importDefault(require("aggregation/es5"));
    /**
     * @name                multipleExtends
     * @namespace           sugar.js.class
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
     * import multipleExtends from '@coffeekraken/sugar/js/class/multipleExtends';
     * class MyCoolClass extends multipleExtends(Another, AnotherOne) {
     * }
     *
     * @see       https://www.npmjs.com/package/aggregation
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.default = (function () {
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        return es5_1.default.apply(void 0, classes);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGVFeHRlbmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVsdGlwbGVFeHRlbmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVix3REFBNEM7SUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxtQkFBZTtRQUFDLGlCQUFVO2FBQVYsVUFBVSxFQUFWLHFCQUFVLEVBQVYsSUFBVTtZQUFWLDRCQUFVOztRQUN4QixPQUFPLGFBQWEsZUFBSSxPQUFPLEVBQUU7SUFDbkMsQ0FBQyxFQUFDIn0=