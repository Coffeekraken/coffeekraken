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
     * @name        lowerFirst
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * Lower first letter
     *
     * @param    {String}    string    The string to lower the first letter
     * @return    {String}    The string with the first letter lowered
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import lowerFirst from '@coffeekraken/sugar/js/string/lowerFirst'
     * lowerFirst('Hello world') // hello world
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function lowerFirst(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }
    exports.default = lowerFirst;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG93ZXJGaXJzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvd2VyRmlyc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLFVBQVUsQ0FBQyxNQUFNO1FBQ3hCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCxrQkFBZSxVQUFVLENBQUMifQ==