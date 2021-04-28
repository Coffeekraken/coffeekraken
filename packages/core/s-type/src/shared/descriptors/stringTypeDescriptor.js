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
        define(["require", "exports", "@coffeekraken/sugar/shared/is/string", "@coffeekraken/sugar/shared/string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const string_1 = __importDefault(require("@coffeekraken/sugar/shared/is/string"));
    const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
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
    const descriptor = {
        name: 'String',
        id: 'string',
        is: (value) => string_1.default(value),
        cast: (value) => toString_1.default(value, {
            beautify: true
        })
    };
    exports.default = descriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nVHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtdHlwZS9zcmMvc2hhcmVkL2Rlc2NyaXB0b3JzL3N0cmluZ1R5cGVEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7Ozs7Ozs7Ozs7Ozs7OztJQUVULGtGQUE4RDtJQUM5RCwwRkFBb0U7SUFJcEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILE1BQU0sVUFBVSxHQUFxQjtRQUNuQyxJQUFJLEVBQUUsUUFBUTtRQUNkLEVBQUUsRUFBRSxRQUFRO1FBQ1osRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxnQkFBVSxDQUFDLEtBQUssQ0FBQztRQUNyQyxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUNuQixrQkFBVSxDQUFDLEtBQUssRUFBRTtZQUNoQixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7S0FDTCxDQUFDO0lBRUYsa0JBQWUsVUFBVSxDQUFDIn0=