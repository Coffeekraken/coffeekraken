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
            values = values.split(',').map(function (t) { return t.trim(); });
        var valuesThatExists = [];
        values.forEach(function (v) {
            if (string.includes(v)) {
                valuesThatExists.push(v);
            }
        });
        if (valuesThatExists.length)
            return valuesThatExists;
        return false;
    }
    return includes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmNsdWRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQVIsQ0FBUSxDQUFDLENBQUM7UUFDNUUsSUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUM7WUFDZixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNO1lBQUUsT0FBTyxnQkFBZ0IsQ0FBQztRQUNyRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxPQUFTLFFBQVEsQ0FBQyJ9