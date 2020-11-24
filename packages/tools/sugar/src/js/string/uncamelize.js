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
    /**
     * @name        uncamelize
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * Uncamelize a string
     *
     * @param    {String}    string    The string to uncamelize
     * @param    {String}    [separator='-']    The separator to use
     * @return    {String}    The uncamelized string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import uncamelize from '@coffeekraken/sugar/js/string/uncamelize'
     * uncamelize('helloWorldAndUniverse') // hello-world-and-universe
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function uncamelize(text, separator) {
        if (separator === void 0) { separator = '-'; }
        // Replace all capital letters by separator followed by lowercase one
        var res = '';
        res = text.replace(/[A-Z]/g, function (letter) {
            return separator + letter.toLowerCase();
        });
        // Remove first separator (to avoid _hello_world name)
        if (res.slice(0, 1) === separator)
            res = res.slice(1);
        return res;
    }
    return uncamelize;
});
