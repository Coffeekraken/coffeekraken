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
        define(["require", "exports", "func-to-classes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const func_to_classes_1 = __importDefault(require("func-to-classes"));
    /**
     * @name            functionToClass
     * @namespace            js.class.utils
     * @type            Function
     * @stable
     *
     * Transform ES5 Functions to ES6 Classes
     *
     * @param       {Function}          function        The function to transform into class
     * @return      {Class}                             An ES6 class version of your function
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import functionToClass from '@coffeekraken/sugar/js/class/functionToClass';
     * functionToClass(function coco() {});
     *
     * @see             https://www.npmjs.com/package/func-to-classes
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.default = func_to_classes_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25Ub0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnVuY3Rpb25Ub0NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHNFQUE0QztJQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILGtCQUFlLHlCQUFhLENBQUMifQ==