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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = descriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nVHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2hhcmVkL3R5cGUvZGVzY3JpcHRvcnMvc3RyaW5nVHlwZURlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUzs7Ozs7Ozs7Ozs7Ozs7O0lBRVQsMkRBQXlDO0lBQ3pDLG1FQUErQztJQUkvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBQ0gsSUFBTSxVQUFVLEdBQXFCO1FBQ25DLElBQUksRUFBRSxRQUFRO1FBQ2QsRUFBRSxFQUFFLFFBQVE7UUFDWixFQUFFLEVBQUUsVUFBQyxLQUFVLElBQUssT0FBQSxnQkFBVSxDQUFDLEtBQUssQ0FBQyxFQUFqQixDQUFpQjtRQUNyQyxJQUFJLEVBQUUsVUFBQyxLQUFVO1lBQ2YsT0FBQSxrQkFBVSxDQUFDLEtBQUssRUFBRTtnQkFDaEIsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDO1FBRkYsQ0FFRTtLQUNMLENBQUM7SUFFRixrQkFBZSxVQUFVLENBQUMifQ==