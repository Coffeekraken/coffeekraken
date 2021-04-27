// @ts-nocheck
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
     * @name        isMap
     * @namespace            js.is
     * @type      Function
     * @stable
     *
     * Check if the passed value is a js Map
     *
     * @param    {Mixed}    value    The value to check
     * @return   {Boolean}   true if it's a Map, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isMap from '@coffeekraken/sugar/js/is/map'
     * const map = new Map();
     * if (isMap(map) {
     *   // do something
     * }
     *
     * @since         1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isMap(value) {
        return value instanceof Map;
    }
    exports.default = isMap;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLEtBQUssQ0FBQyxLQUFLO1FBQ2xCLE9BQU8sS0FBSyxZQUFZLEdBQUcsQ0FBQztJQUM5QixDQUFDO0lBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=