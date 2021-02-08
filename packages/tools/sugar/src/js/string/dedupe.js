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
    return dedupe;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVkdXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVkdXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7OztJQUVWLHNEQUFpQztJQUVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxTQUFTO1FBQzVCLElBQU0sR0FBRyxHQUFHLGtCQUFTLENBQUMsTUFBSSxTQUFTLE1BQUcsRUFBRTtZQUN0QyxRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxHQUFHO1NBQ1gsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHO2FBQ1AsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLE9BQU8sRUFBRTthQUNULE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRztZQUN6QixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUM7YUFDRCxPQUFPLEVBQUU7YUFDVCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZCxDQUFDO0lBQ0QsT0FBUyxNQUFNLENBQUMifQ==