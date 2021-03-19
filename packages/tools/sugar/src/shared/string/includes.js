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
     * @name        includes
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * Same as the native String.includes function but accept either an array of items
     * or a simple comma separated string like "something,cool,hello,world"
     *
     * @param    {String}    string    The string to check
     * @param     {Array|String}    values      An array or comma separated string to check
     * @return    {Boolean|Array}     An array of values that exists in the string or false if nothing match
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import includes from '@coffeekraken/sugar/js/string/includes'
     * includes('Hello world', 'world,coco') // ['world']
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function includes(string, values) {
        if (!Array.isArray(values))
            values = values.split(',').map((t) => t.trim());
        const valuesThatExists = [];
        values.forEach((v) => {
            if (string.includes(v)) {
                valuesThatExists.push(v);
            }
        });
        if (valuesThatExists.length)
            return valuesThatExists;
        return false;
    }
    exports.default = includes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmNsdWRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNuQixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNO1lBQUUsT0FBTyxnQkFBZ0IsQ0FBQztRQUNyRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxrQkFBZSxRQUFRLENBQUMifQ==