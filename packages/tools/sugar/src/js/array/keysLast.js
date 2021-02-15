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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = keysLast;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5c0xhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJrZXlzTGFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYscURBQStCO0lBRS9COzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNILFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQzNCLCtDQUErQztRQUMvQyw2QkFBNkI7UUFDN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHO1lBQ3JCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNILHdCQUF3QjtRQUN4QixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxvQkFBb0I7UUFDcEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQixzQkFBc0I7UUFDdEIsR0FBRyxHQUFHLGNBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQix5QkFBeUI7UUFDekIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQixvQkFBb0I7UUFDcEIsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsa0JBQWUsUUFBUSxDQUFDIn0=