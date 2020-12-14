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
     * @name        camelize
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * Camelize a string
     *
     * @param         {String}          text        The string to camelize
     * @return        {String}                      The camelized string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example     js
     * import camelize from '@coffeekraken/sugar/js/string/camelize';
     * camelize('hello world'); // => helloWorld
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function camelize(text) {
        var res = '';
        var reg = /(?:^|[_-\s])(\w)/g;
        res = text.replace(reg, function (_, c) {
            return c ? c.toUpperCase() : '';
        });
        res = res.substr(0, 1).toLowerCase() + res.slice(1);
        return res.trim();
    }
    return camelize;
});
//# sourceMappingURL=module.js.map