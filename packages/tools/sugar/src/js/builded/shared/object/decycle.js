// @shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "json-cyclic"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var json_cyclic_1 = require("json-cyclic");
    /**
     * @name          decycle
     * @namespace     sugar.js.object
     * @type          Function
     *
     * This method simply remove the circular references in the passed object
     *
     * @param     {Object}      obj         The object to process
     * @return    {Object}                  The new object circular references free
     *
     * @example     js
     * import decycle from '@coffeekraken/sugar/js/object/decycle';
     * decycle({
     *    something: 'cool',
     *    with: 'circular references',
     *    //..
     * });
     *
     * @see         https://www.npmjs.com/package/json-cyclic
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function decycle(obj) {
        return json_cyclic_1.decycle(obj);
    }
    exports.default = decycle;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjeWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NoYXJlZC9vYmplY3QvZGVjeWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7SUFFViwyQ0FBbUQ7SUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsT0FBTyxDQUFDLEdBQUc7UUFDbEIsT0FBTyxxQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxrQkFBZSxPQUFPLENBQUMifQ==