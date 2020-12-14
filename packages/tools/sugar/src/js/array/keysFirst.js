// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "lodash/uniq"], factory);
    }
})(function (require, exports) {
    "use strict";
    var uniq_1 = __importDefault(require("lodash/uniq"));
    /**
     * @name        keysFirst
     * @namespace           sugar.js.array
     * @type      Function
     * @stable
     *
     * Make sure the passed array start with the passed keys
     *
     * @param    {Array}    array    The array to sort
     * @param    {Array}    keys    The keys to start the array with
     * @return    {Array}    The processed array
     *
     * @example    js
     * import keysFirst from '@coffeekraken/sugar/js/array/keysFirst'
     * keysFirst(['a','b','d','g','c'], ['d','g'])
     * // ['d','g','a','b','c']
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function keysFirst(array, keys) {
        // all the keys has to exist in the array stack
        // otherwise we filter it out
        keys = keys.filter(function (key) {
            return array.indexOf(key) !== -1;
        });
        // add the keys at start
        var empty = [];
        var res = empty.concat(keys).concat(array);
        // remove double items
        res = uniq_1.default(res);
        // return the result
        return res;
    }
    return keysFirst;
});
//# sourceMappingURL=module.js.map