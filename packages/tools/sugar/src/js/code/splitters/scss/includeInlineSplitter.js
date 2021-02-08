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
        type: 'include.inline',
        prefix: /@include\s[a-zA-Z0-9-_\.]+/,
        suffix: /;/,
        open: '(',
        close: ')',
        exclude: [/@include Sugar\.setup\(.*\);/]
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZUlubGluZVNwbGl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5jbHVkZUlubGluZVNwbGl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7OztJQW1CVixPQUFTO1FBQ1AsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixNQUFNLEVBQUUsNEJBQTRCO1FBQ3BDLE1BQU0sRUFBRSxHQUFHO1FBQ1gsSUFBSSxFQUFFLEdBQUc7UUFDVCxLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxDQUFDLDhCQUE4QixDQUFDO0tBQzFDLENBQUMifQ==