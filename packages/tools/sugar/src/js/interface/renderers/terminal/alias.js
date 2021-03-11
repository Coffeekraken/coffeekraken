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
     * @name                alias
     * @namespace           sugar.js.interface.renderers.terminal
     * @name                Function
     *
     * Render the "alias" field.
     *
     * @param       {ISInterfaceRendererRenderPropertyObj}          propertyObj             The property object to render
     * @return              String                  The renderer template string
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function default_1(_a) {
        var value = _a.value, interfaceClass = _a.interfaceClass;
        return "-" + value;
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGlhcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxtQkFBeUIsRUFBeUI7WUFBdkIsS0FBSyxXQUFBLEVBQUUsY0FBYyxvQkFBQTtRQUM5QyxPQUFPLE1BQUksS0FBTyxDQUFDO0lBQ3JCLENBQUM7SUFGRCw0QkFFQyJ9