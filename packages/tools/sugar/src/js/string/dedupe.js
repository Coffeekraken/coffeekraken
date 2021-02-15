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
        define(["require", "exports", "to-regex"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var to_regex_1 = __importDefault(require("to-regex"));
    /**
     * @name        dedupe
     * @namespace   sugar.js.string
     * @type        Function
     * @stable
     *
     * This function simple make sure that you don't have duplicate statements in the passed string
     *
     * @param           {String}        string        The string to process
     * @param           {String}        statement       The statement to check
     * @return          {String}                      The deduplicated string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import dedupe from '@coffeekraken/sugar/js/string/dedupe';
     * dedupe('hello world hello your', 'hello'); // => hello world your
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function dedupe(str, statement) {
        var reg = to_regex_1.default("(" + statement + ")", {
            contains: true,
            flags: 'g'
        });
        return str
            .split(reg)
            .reverse()
            .filter(function (e, i, arr) {
            return arr.indexOf(e, i + 1) === -1;
        })
            .reverse()
            .join('');
    }
    exports.default = dedupe;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVkdXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVkdXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixzREFBaUM7SUFFakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsU0FBUztRQUM1QixJQUFNLEdBQUcsR0FBRyxrQkFBUyxDQUFDLE1BQUksU0FBUyxNQUFHLEVBQUU7WUFDdEMsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsR0FBRztTQUNYLENBQUMsQ0FBQztRQUNILE9BQU8sR0FBRzthQUNQLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixPQUFPLEVBQUU7YUFDVCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUc7WUFDekIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDO2FBQ0QsT0FBTyxFQUFFO2FBQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUNELGtCQUFlLE1BQU0sQ0FBQyJ9