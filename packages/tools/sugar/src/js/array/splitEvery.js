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
     * @name                                splitEvery
     * @namespace           sugar.js.array
     * @type                                Function
     * @status              beta
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
    exports.default = splitEvery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRFdmVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGl0RXZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCxTQUFTLFVBQVUsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUM3QyxJQUFJLENBQVMsRUFBRSxDQUFTLENBQUM7UUFDekIsSUFBTSxVQUFVLEdBQVUsRUFBRSxDQUFDO1FBQzdCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUU7WUFDL0MsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxrQkFBZSxVQUFVLENBQUMifQ==