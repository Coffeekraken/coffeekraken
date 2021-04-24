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
     * @name        unquote
     * @namespace            js.string
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
    function unquote(string, quotesToRemove = ['"', "'", '”', '`']) {
        // trim the string just in case
        string = string.trim();
        // loop on each quotes to remove
        quotesToRemove.forEach((quote) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5xdW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVucXVvdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxjQUFjLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDNUQsK0JBQStCO1FBQy9CLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsZ0NBQWdDO1FBQ2hDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUNoRSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLG9EQUFvRDtnQkFDcEQsT0FBTzthQUNSO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCw4QkFBOEI7UUFDOUIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELGtCQUFlLE9BQU8sQ0FBQyJ9