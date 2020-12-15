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
     * @name                                splitEvery
     * @namespace           sugar.js.array
     * @type                                Function
     * @beta
     *
     * Split an array every N items
     *
     * @param           {Array}           array               The array to split
     * @param           {Number}          every               Every how many items to split the array
     * @return          {Array}                               An array of arrays splited
     *
     * @example           js
     * import splitEvery from '@coffeekraken/sugar/js/array/splitEvery';
     * splitEvery([1,2,3,4,5,6,7,8,9], 3);
     * // [[1,2,3],[4,5,6],[7,8,9]]
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function splitEvery(array, every) {
        var i, j;
        var finalArray = [];
        for (i = 0, j = array.length; i < j; i += every) {
            finalArray.push(array.slice(i, i + every));
        }
        return finalArray;
    }
    return splitEvery;
});
//# sourceMappingURL=splitEvery.js.map