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
        define(["require", "exports", "is-class"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const is_class_1 = __importDefault(require("is-class"));
    /**
     * @name                      class
     * @namespace            js.is
     * @type                      Function
     * @stable
     *
     * Check if the passed variable (or array of variables) is/are plain variable(s)
     *
     * @param         {Mixed|Array}            variable                  The variable(s) to check
     * @return        {Boolean}                                         true if is class(es), false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example           js
     * import isClass = from '@coffeekraken/sugar/js/is/class';
     * isClass({ hello: 'world'}); // => false
     * const myCoolClass = class Coco{};
     * isClass(myCoolClass); // => true
     *
     * @see       https://www.npmjs.com/package/is-class
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function cls(cls) {
        if (!Array.isArray(cls))
            cls = [cls];
        for (let i = 0; i < cls.length; i++) {
            if (!is_class_1.default(cls[i]))
                return false;
        }
        return true;
    }
    exports.default = cls;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2lzL2NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdEQUFpQztJQUVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxHQUFHLENBQUMsR0FBRztRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxrQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztTQUN0QztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELGtCQUFlLEdBQUcsQ0FBQyJ9