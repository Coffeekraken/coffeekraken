// @shared
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
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name                type
     * @namespace           sugar.js.interface.renderers.terminal
     * @type                Function
     *
     * Render the "type" field.
     *
     * @param       {ISInterfaceRendererRenderPropertyObj}          propertyObj             The property object to render
     * @return              String                  The renderer template string
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function default_1(_a) {
        var value = _a.value, interfaceClass = _a.interfaceClass;
        return "<cyan>" + value + "</cyan>";
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsbUJBQXlCLEVBQXlCO1lBQXZCLEtBQUssV0FBQSxFQUFFLGNBQWMsb0JBQUE7UUFDOUMsT0FBTyxXQUFTLEtBQUssWUFBUyxDQUFDO0lBQ2pDLENBQUM7SUFGRCw0QkFFQyJ9