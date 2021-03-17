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
        define(["require", "exports", "is-glob"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var is_glob_1 = __importDefault(require("is-glob"));
    /**
     * @name                                      isGlob
     * @namespace           sugar.js.is
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
    exports.default = (function (string) {
        return is_glob_1.default(string);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NoYXJlZC9pcy9nbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixvREFBK0I7SUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxtQkFBZSxVQUFDLE1BQU07UUFDcEIsT0FBTyxpQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUMsRUFBQyJ9