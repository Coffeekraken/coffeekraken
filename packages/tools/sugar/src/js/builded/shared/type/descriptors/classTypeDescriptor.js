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
        define(["require", "exports", "../../is/class"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var class_1 = __importDefault(require("../../is/class"));
    /**
     * @name              classTypeDescriptor
     * @namespace         sugar.js.type.descriptor
     * @type              ISTypeDescriptor
     *
     * Describe the type "class" with some utilities methods like "is", "cast", etc...
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
        name: 'Class',
        id: 'class',
        is: function (value) { return class_1.default(value); },
        cast: function (value) {
            return new Error("Sorry but nothing is castable to a Class");
        }
    };
    exports.default = descriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NUeXBlRGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NoYXJlZC90eXBlL2Rlc2NyaXB0b3JzL2NsYXNzVHlwZURlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUzs7Ozs7Ozs7Ozs7Ozs7O0lBR1QseURBQXVDO0lBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCxJQUFNLFVBQVUsR0FBcUI7UUFDbkMsSUFBSSxFQUFFLE9BQU87UUFDYixFQUFFLEVBQUUsT0FBTztRQUNYLEVBQUUsRUFBRSxVQUFDLEtBQVUsSUFBSyxPQUFBLGVBQVMsQ0FBQyxLQUFLLENBQUMsRUFBaEIsQ0FBZ0I7UUFDcEMsSUFBSSxFQUFFLFVBQUMsS0FBVTtZQUNmLE9BQU8sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztRQUMvRCxDQUFDO0tBQ0YsQ0FBQztJQUVGLGtCQUFlLFVBQVUsQ0FBQyJ9