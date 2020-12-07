// shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../is/string", "../../string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    var string_1 = __importDefault(require("../../is/string"));
    var toString_1 = __importDefault(require("../../string/toString"));
    /**
     * @name              stringTypeDescriptor
     * @namespace         sugar.js.type.descriptor
     * @type              ISTypeDescriptor
     *
     * Describe the type "string" with some utilities methods like "is", "cast", etc...
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
        name: 'String',
        id: 'string',
        is: function (value) { return string_1.default(value); },
        cast: function (value) {
            return toString_1.default(value, {
                beautify: true
            });
        }
    };
    return descriptor;
});
//# sourceMappingURL=stringTypeDescriptor.js.map