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
    const json_cyclic_1 = require("json-cyclic");
    /**
     * @name          decycle
     * @namespace            js.object
     * @type          Function
     *
     * This method simply remove the circular references in the passed object
     *
     * @param     {Object}      obj         The object to process
     * @return    {Object}                  The new object circular references free
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjeWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlY3ljbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSw2Q0FBbUQ7SUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsT0FBTyxDQUFDLEdBQUc7UUFDbEIsT0FBTyxxQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxrQkFBZSxPQUFPLENBQUMifQ==