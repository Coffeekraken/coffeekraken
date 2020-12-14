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
     * @name        isJson
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if the passed value is a valid json
     *
     * @param    {Mixed}    value    The value to check
     * @return   {Boolean}   true if it's a valid json, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isJson from '@coffeekraken/sugar/js/is/json'
     * if (isJson('[{id:10}]')) {
     *   // do something
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isJson(value) {
        try {
            JSON.parse(value);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    return isJson;
});
//# sourceMappingURL=module.js.map