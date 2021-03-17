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
        define(["require", "exports", "../../is/object"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var object_1 = __importDefault(require("../../is/object"));
    /**
     * @name              objectTypeDescriptor
     * @namespace         sugar.js.type.descriptor
     * @type              ISTypeDescriptor
     *
     * Describe the type "object" with some utilities methods like "is", "cast", etc...
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
        name: 'Object',
        id: 'object',
        is: function (value) { return object_1.default(value); },
        cast: function (value) {
            if (object_1.default(value))
                return value;
            return {
                value: value
            };
        }
    };
    exports.default = descriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0VHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zaGFyZWQvdHlwZS9kZXNjcmlwdG9ycy9vYmplY3RUeXBlRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7SUFFVCwyREFBeUM7SUFLekM7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILElBQU0sVUFBVSxHQUFxQjtRQUNuQyxJQUFJLEVBQUUsUUFBUTtRQUNkLEVBQUUsRUFBRSxRQUFRO1FBQ1osRUFBRSxFQUFFLFVBQUMsS0FBVSxJQUFLLE9BQUEsZ0JBQVUsQ0FBQyxLQUFLLENBQUMsRUFBakIsQ0FBaUI7UUFDckMsSUFBSSxFQUFFLFVBQUMsS0FBVTtZQUNmLElBQUksZ0JBQVUsQ0FBQyxLQUFLLENBQUM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDcEMsT0FBTztnQkFDTCxLQUFLLE9BQUE7YUFDTixDQUFDO1FBQ0osQ0FBQztLQUNGLENBQUM7SUFFRixrQkFBZSxVQUFVLENBQUMifQ==