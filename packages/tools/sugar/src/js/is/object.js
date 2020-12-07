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
     * @name        isObject
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if the passed value is a js object
     *
     * @param    {Mixed}    value    The value to check
     * @return   {Boolean}   true if it's a object, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isObject from '@coffeekraken/sugar/js/is/object'
     * if (isObject({}) {
     *   // do something
     * }
     *
     * @since         1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isObject(value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }
    return isObject;
});
//# sourceMappingURL=object.js.map