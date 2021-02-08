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
     * @name        keysLast
     * @namespace           sugar.js.array
     * @type      Function
     * @stable
     *
     * Make sure the passed array ends with the passed keys
     * @param    {Array}    array    The array to process
     * @param    {Array}    keys    The keys to end the array with
     * @return    {Array}    The processed array
     *
     * @example    js
     * import keysLast from '@coffeekraken/sugar/js/array/keysLast'
     * keysLast(['a','b','d','g','c'], ['d','g'])
     * // ['a','b','c','d','g']
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function keysLast(array, keys) {
        // all the keys has to exist in the array stack
        // otherwise we filter it out
        keys = keys.filter(function (key) {
            return array.indexOf(key) !== -1;
        });
        // add the keys at start
        var res = [].concat(array).concat(keys);
        // reverse the array
        res = res.reverse();
        // remove double items
        res = uniq_1.default(res);
        // reverse back the array
        res = res.reverse();
        // return the result
        return res;
    }
    return keysLast;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5c0xhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJrZXlzTGFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7SUFFVixxREFBK0I7SUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDM0IsK0NBQStDO1FBQy9DLDZCQUE2QjtRQUM3QixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUc7WUFDckIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsd0JBQXdCO1FBQ3hCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLG9CQUFvQjtRQUNwQixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLHNCQUFzQjtRQUN0QixHQUFHLEdBQUcsY0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLHlCQUF5QjtRQUN6QixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLG9CQUFvQjtRQUNwQixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxPQUFTLFFBQVEsQ0FBQyJ9