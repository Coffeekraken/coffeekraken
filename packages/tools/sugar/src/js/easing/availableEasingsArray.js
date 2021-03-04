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
     * @name            availableEasingsArray
     * @namespace           sugar.js.easing
     * @type            Function
     * @stable
     *
     * This function simply return back an array of all the available easings function in the sugar toolkit
     *
     * @return      {Array}             An array of all the easing functions available
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function availableEasingsArray() {
        return [
            'easeInOutCubic',
            'easeInOutQuad',
            'easeInOutQuart',
            'easeInOutQuint',
            'easeInCubic',
            'easeInQuad',
            'easeInQuart',
            'easeInQuint',
            'easeOutCubic',
            'easeOutQuad',
            'easeOutQuart',
            'easeOutQuint'
        ];
    }
    exports.default = availableEasingsArray;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlRWFzaW5nc0FycmF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXZhaWxhYmxlRWFzaW5nc0FycmF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILFNBQVMscUJBQXFCO1FBQzVCLE9BQU87WUFDTCxnQkFBZ0I7WUFDaEIsZUFBZTtZQUNmLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLFlBQVk7WUFDWixhQUFhO1lBQ2IsYUFBYTtZQUNiLGNBQWM7WUFDZCxhQUFhO1lBQ2IsY0FBYztZQUNkLGNBQWM7U0FDZixDQUFDO0lBQ0osQ0FBQztJQUNELGtCQUFlLHFCQUFxQixDQUFDIn0=