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
    return unquote;
});
//# sourceMappingURL=module.js.map