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
    return availableEasingsArray;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlRWFzaW5nc0FycmF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXZhaWxhYmxlRWFzaW5nc0FycmF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsU0FBUyxxQkFBcUI7UUFDNUIsT0FBTztZQUNMLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixhQUFhO1lBQ2IsWUFBWTtZQUNaLGFBQWE7WUFDYixhQUFhO1lBQ2IsY0FBYztZQUNkLGFBQWE7WUFDYixjQUFjO1lBQ2QsY0FBYztTQUNmLENBQUM7SUFDSixDQUFDO0lBQ0QsT0FBUyxxQkFBcUIsQ0FBQyJ9