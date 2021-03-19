// @ts-nocheck
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
     * @name        ltrim
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * Trim left a specified string
     *
     * @param    {String}    string    The string to trim
     * @param    {String}    needle    The string to find an cut out if found
     * @param    {Boolean}  [trimResult=true]       If you want to trim the resulted ltrim
     * @return    {String}    The trimed string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import ltrim from '@coffeekraken/sugar/js/string/ltrim'
     * ltrim('Hello World', 'Hello') // World
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function ltrim(string, needle, trimResult = true) {
        if (string.substr(0, needle.length) === needle) {
            return trimResult
                ? string.substr(needle.length).trim()
                : string.substr(needle.length);
        }
        // nothing to trim
        return string;
    }
    exports.default = ltrim;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHRyaW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsdHJpbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsR0FBRyxJQUFJO1FBQzlDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLE1BQU0sRUFBRTtZQUM5QyxPQUFPLFVBQVU7Z0JBQ2YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRTtnQkFDckMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2xDO1FBQ0Qsa0JBQWtCO1FBQ2xCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxrQkFBZSxLQUFLLENBQUMifQ==