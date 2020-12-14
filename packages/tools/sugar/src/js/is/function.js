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
     * @name        isFunction
     * @namespace       sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if the passed value is a js function
     *
     * @param    {Mixed}    value    The value to check
     * @return   {Boolean}   true if it's a function, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isFunction from '@coffeekraken/sugar/js/is/function'
     * if (isFunction(function() {})) {
     *   // do something
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isFunction(value) {
        return value && {}.toString.call(value) === '[object Function]';
    }
    return isFunction;
});
//# sourceMappingURL=module.js.map