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
    const uniq_1 = __importDefault(require("lodash/uniq"));
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
        keys = keys.filter((key) => {
            return array.indexOf(key) !== -1;
        });
        // add the keys at start
        const empty = [];
        let res = empty.concat(keys).concat(array);
        // remove double items
        res = uniq_1.default(res);
        // return the result
        return res;
    }
    exports.default = keysFirst;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5c0ZpcnN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsia2V5c0ZpcnN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVix1REFBK0I7SUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILFNBQVMsU0FBUyxDQUFDLEtBQVksRUFBRSxJQUFXO1FBQzFDLCtDQUErQztRQUMvQyw2QkFBNkI7UUFDN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN6QixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCx3QkFBd0I7UUFDeEIsTUFBTSxLQUFLLEdBQVUsRUFBRSxDQUFDO1FBQ3hCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLHNCQUFzQjtRQUN0QixHQUFHLEdBQUcsY0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLG9CQUFvQjtRQUNwQixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxrQkFBZSxTQUFTLENBQUMifQ==