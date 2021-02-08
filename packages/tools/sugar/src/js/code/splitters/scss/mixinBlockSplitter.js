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
        type: 'mixin.block',
        prefix: /@mixin\s[a-zA-Z0-9-_\.]+\([^{]*\)/,
        open: '{',
        close: '}'
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4aW5CbG9ja1NwbGl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWl4aW5CbG9ja1NwbGl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7OztJQW1CVixPQUFTO1FBQ1AsSUFBSSxFQUFFLGFBQWE7UUFDbkIsTUFBTSxFQUFFLG1DQUFtQztRQUMzQyxJQUFJLEVBQUUsR0FBRztRQUNULEtBQUssRUFBRSxHQUFHO0tBQ1gsQ0FBQyJ9