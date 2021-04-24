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
        define(["require", "exports", "is-glob"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const is_glob_1 = __importDefault(require("is-glob"));
    /**
     * @name                                      isGlob
     * @namespace            js.is
     * @type                                      Function
     * @stable
     *
     * Check if the passed string is a valid glob pattern or not
     *
     * @param                 {String}        $string             The string to check
     * @return                {Boolean}                           true if is a valid glob pattern, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example               js
     * import isGlob from '@coffeekraken/sugar/js/is/js';
     * isGlob('something/*.js); // => true
     *
     * @see       https://www.npmjs.com/package/is-glob
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.default = (string) => {
        return is_glob_1.default(string);
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdsb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsc0RBQStCO0lBRS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsa0JBQWUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN4QixPQUFPLGlCQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDIn0=