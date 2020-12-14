// shared
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
     * @name              functionTypeDescriptor
     * @namespace         sugar.js.type.descriptor
     * @type              ISTypeDescriptor
     *
     * Describe the type "function" with some utilities methods like "is", "cast", etc...
     *
     * @example         js
     * export default {
     *    name: 'String',
     *    id: 'string',
     *    is: (value) => typeof value === 'string',
     *    cast: (value) => '' + value,
     *    // etc...
     * };
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var descriptor = {
        name: 'Function',
        id: 'function',
        is: function (value) { return typeof value === 'function'; },
        cast: function (value) {
            return new Error("Sorry but nothing is castable to a Function");
        }
    };
    return descriptor;
});
//# sourceMappingURL=module.js.map