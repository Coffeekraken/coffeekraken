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
    return {
        type: 'mediaQuery',
        prefix: /@media\s?\([^{]*\)\s?/,
        open: '{',
        close: '}'
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWFRdWVyeVNwbGl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVkaWFRdWVyeVNwbGl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7OztJQW1CVixPQUFTO1FBQ1AsSUFBSSxFQUFFLFlBQVk7UUFDbEIsTUFBTSxFQUFFLHVCQUF1QjtRQUMvQixJQUFJLEVBQUUsR0FBRztRQUNULEtBQUssRUFBRSxHQUFHO0tBQ1gsQ0FBQyJ9