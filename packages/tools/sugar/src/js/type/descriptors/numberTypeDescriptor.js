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
     * @name              numberTypeDescriptor
     * @namespace         sugar.js.type.descriptor
     * @type              ISTypeDescriptor
     *
     * Describe the type "number" with some utilities methods like "is", "cast", etc...
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
        name: 'Number',
        id: 'number',
        is: function (value) { return typeof value === 'number'; },
        cast: function (value) {
            if (typeof value !== 'string') {
                return new Error("Sorry but only strings can be casted to numbers...");
            }
            var res = parseFloat(value);
            if (isNaN(res))
                return new Error("Sorry but the conversion of \"<yellow>" + value + "</yellow>\" to a <green>Number</green> does not work...");
            return res;
        }
    };
    return descriptor;
});
//# sourceMappingURL=module.js.map