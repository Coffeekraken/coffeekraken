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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5xdW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NoYXJlZC9zdHJpbmcvdW5xdW90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxjQUFxQztRQUFyQywrQkFBQSxFQUFBLGtCQUFrQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDNUQsK0JBQStCO1FBQy9CLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsZ0NBQWdDO1FBQ2hDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBQzNCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ2hFLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDN0Msb0RBQW9EO2dCQUNwRCxPQUFPO2FBQ1I7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILDhCQUE4QjtRQUM5QixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=