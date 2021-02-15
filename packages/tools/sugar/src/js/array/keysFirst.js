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
    exports.default = keysFirst;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5c0ZpcnN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsia2V5c0ZpcnN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixxREFBK0I7SUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILFNBQVMsU0FBUyxDQUFDLEtBQVksRUFBRSxJQUFXO1FBQzFDLCtDQUErQztRQUMvQyw2QkFBNkI7UUFDN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHO1lBQ3JCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNILHdCQUF3QjtRQUN4QixJQUFNLEtBQUssR0FBVSxFQUFFLENBQUM7UUFDeEIsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0Msc0JBQXNCO1FBQ3RCLEdBQUcsR0FBRyxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsb0JBQW9CO1FBQ3BCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELGtCQUFlLFNBQVMsQ0FBQyJ9