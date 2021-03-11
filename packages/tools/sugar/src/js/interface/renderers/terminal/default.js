// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var toString_1 = __importDefault(require("../../../string/toString"));
    /**
     * @name                default
     * @namespace           sugar.js.interface.renderers.terminal
     * @default                Function
     *
     * Render the "default" field.
     *
     * @param       {ISInterfaceRendererRenderPropertyObj}          propertyObj             The property object to render
     * @return              String                  The renderer template string
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function default_1(_a) {
        var value = _a.value, interfaceClass = _a.interfaceClass;
        return "<green>" + toString_1.default(value, {}) + "</green>";
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsc0VBQWtEO0lBRWxEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILG1CQUF5QixFQUF5QjtZQUF2QixLQUFLLFdBQUEsRUFBRSxjQUFjLG9CQUFBO1FBQzlDLE9BQU8sWUFBVSxrQkFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsYUFBVSxDQUFDO0lBQ25ELENBQUM7SUFGRCw0QkFFQyJ9