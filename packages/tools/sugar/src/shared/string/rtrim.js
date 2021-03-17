// @ts-nocheck
// @shared
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
     * @name        rtrim
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * Trim right a specified string
     *
     * @param    {String}    string    The string to trim
     * @param    {String}    needle    The string to find an cut out if found
     * @param     {Boolean}     [trimResult=true]       Specify if you want to trim the trimed string
     * @return    {String}    The trimed string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import rtrim from '@coffeekraken/sugar/js/string/rtrim'
     * rtrim('Hello World', 'ld') // Hello Wor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function rtrim(string, needle, trimResult = true) {
        if (string.substr(needle.length * -1) === needle) {
            if (trimResult) {
                return string.substr(0, string.length - needle.length).trim();
            }
            else {
                return string.substr(0, string.length - needle.length);
            }
        }
        // nothing to trim
        return string;
    }
    exports.default = rtrim;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnRyaW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydHJpbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsU0FBUyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEdBQUcsSUFBSTtRQUM5QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTtZQUNoRCxJQUFJLFVBQVUsRUFBRTtnQkFDZCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQy9EO2lCQUFNO2dCQUNMLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDeEQ7U0FDRjtRQUNELGtCQUFrQjtRQUNsQixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=