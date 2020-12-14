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
        define(["require", "exports", "../../is/map"], factory);
    }
})(function (require, exports) {
    "use strict";
    var map_1 = __importDefault(require("../../is/map"));
    /**
     * @name              mapTypeDescriptor
     * @namespace         sugar.js.type.descriptor
     * @type              ISTypeDescriptor
     *
     * Describe the type "map" with some utilities methods like "is", "cast", etc...
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
        name: 'Map',
        id: 'map',
        is: function (value) { return map_1.default(value); },
        cast: function (value) {
            if (map_1.default(value))
                return value;
            var map = new Map();
            map.set('value', value);
            return map;
        }
    };
    return descriptor;
});
//# sourceMappingURL=module.js.map