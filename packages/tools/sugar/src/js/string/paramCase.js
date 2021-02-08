// @ts-nocheck
// @shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "param-case"], factory);
    }
})(function (require, exports) {
    "use strict";
    var param_case_1 = require("param-case");
    /**
     * @name          paramCase
     * @namespace           sugar.js.string
     * @type          Function
     * @stable
     *
     * This function transform a string into a param case one like so "something-cool"
     *
     * @param       {String}        string          The string to convert
     * @return      {String}                        The converted string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import paramCase from '@coffeekraken/sugar/js/string/paramCase';
     * paramCase('some thoing cool'); // => some-thing-cool
     *
     * @see         https://www.npmjs.com/package/param-case
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function paramCaseFn(string) {
        return param_case_1.paramCase(string);
    }
    return paramCaseFn;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW1DYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyYW1DYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7OztJQUVWLHlDQUF1QztJQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsV0FBVyxDQUFDLE1BQU07UUFDekIsT0FBTyxzQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRCxPQUFTLFdBQVcsQ0FBQyJ9