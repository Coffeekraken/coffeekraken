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
     * @name        unquote
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * Remove the quotes of a string
     * Types of quotes removed :
     * - `"`, `'`, `”`, '`'
     *
     * @param    {String}    string    The string to process
     * @param    {Array<String>}    [quotesToRemove=['"','\'','”','`']]    The quotes to removes
     * @return    {String}    The unquoted string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import unquote from '@coffeekraken/sugar/js/string/unquote'
     * unquote("'Hello world'") // "Hello world"
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function unquote(string, quotesToRemove) {
        if (quotesToRemove === void 0) { quotesToRemove = ['"', "'", '”', '`']; }
        // trim the string just in case
        string = string.trim();
        // loop on each quotes to remove
        quotesToRemove.forEach(function (quote) {
            if (string.substr(0, 1) === quote && string.substr(-1) === quote) {
                string = string.substr(1);
                string = string.substr(0, string.length - 1);
                // break the loop to avoid unquoting multiple levels
                return;
            }
        });
        // return the processed string
        return string;
    }
    exports.default = unquote;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5xdW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvc3RyaW5nL3VucXVvdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLE9BQU8sQ0FBQyxNQUFNLEVBQUUsY0FBcUM7UUFBckMsK0JBQUEsRUFBQSxrQkFBa0IsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQzVELCtCQUErQjtRQUMvQixNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLGdDQUFnQztRQUNoQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUMzQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUNoRSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLG9EQUFvRDtnQkFDcEQsT0FBTzthQUNSO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCw4QkFBOEI7UUFDOUIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELGtCQUFlLE9BQU8sQ0FBQyJ9