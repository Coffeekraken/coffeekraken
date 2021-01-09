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
    return decycle;
});
//# sourceMappingURL=decycle.js.map