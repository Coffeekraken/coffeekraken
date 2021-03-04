// @ts-nocheck
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
     * @name        isBase64
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if the passed value is a base 64 string
     *
     * @param    {Mixed}    value    The value to check
     * @return   {Boolean}   true if it's a Boolean, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isBase64 from '@coffeekraken/sugar/js/is/base64'
     * if (isBase64(true) {
     *   // do something
     * }
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isBase64(value) {
        if (typeof value !== 'string')
            return false;
        if (value === '' || value.trim() === '')
            return false;
        var reg = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        return reg.test(value);
    }
    exports.default = isBase64;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZTY0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLFFBQVEsQ0FBQyxLQUFLO1FBQ3JCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzVDLElBQUksS0FBSyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3RELElBQU0sR0FBRyxHQUFHLGtFQUFrRSxDQUFDO1FBQy9FLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0Qsa0JBQWUsUUFBUSxDQUFDIn0=