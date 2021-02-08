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
    function rtrim(string, needle, trimResult) {
        if (trimResult === void 0) { trimResult = true; }
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
    return rtrim;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnRyaW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydHJpbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQWlCO1FBQWpCLDJCQUFBLEVBQUEsaUJBQWlCO1FBQzlDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO1lBQ2hELElBQUksVUFBVSxFQUFFO2dCQUNkLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDL0Q7aUJBQU07Z0JBQ0wsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN4RDtTQUNGO1FBQ0Qsa0JBQWtCO1FBQ2xCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxPQUFTLEtBQUssQ0FBQyJ9