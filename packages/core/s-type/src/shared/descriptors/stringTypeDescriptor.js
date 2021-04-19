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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nVHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHJpbmdUeXBlRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7SUFFVCxrRkFBOEQ7SUFDOUQsMEZBQW9FO0lBSXBFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCxNQUFNLFVBQVUsR0FBcUI7UUFDbkMsSUFBSSxFQUFFLFFBQVE7UUFDZCxFQUFFLEVBQUUsUUFBUTtRQUNaLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsZ0JBQVUsQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FDbkIsa0JBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDaEIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDO0tBQ0wsQ0FBQztJQUVGLGtCQUFlLFVBQVUsQ0FBQyJ9