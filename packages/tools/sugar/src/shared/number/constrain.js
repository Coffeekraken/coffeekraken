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
     * @name        constrain
     * @namespace           sugar.js.number
     * @type      Function
     * @stable
     *
     * Constrain a value between a min and a max value
     *
     * @param    {Number}    value    The value to constraint
     * @param    {Number}    [min=null]    The min value possible
     * @param    {Number}    [max=null]    The max value possible
     * @return    {Number}    The constrained value
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import constrain from '@coffeekraken/sugar/js/numbers/constrain'
     * constrain(100, 0, 50) // 50
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function constrain(value, min = null, max = null) {
        if (min !== null && value < min)
            value = min;
        if (max !== null && value > max)
            value = max;
        return value;
    }
    exports.default = constrain;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RyYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uc3RyYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLElBQUksRUFBRSxHQUFHLEdBQUcsSUFBSTtRQUM5QyxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksS0FBSyxHQUFHLEdBQUc7WUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQzdDLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxLQUFLLEdBQUcsR0FBRztZQUFFLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDN0MsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=