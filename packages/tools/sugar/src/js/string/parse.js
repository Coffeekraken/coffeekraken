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
    return function (value) {
        if (typeof value !== 'string')
            return value;
        value = value.split('⠀').join('').trim();
        try {
            return Function("\n      \"use strict\";\n      return (" + value + ");\n    ")();
        }
        catch (e) {
            return value;
        }
    };
});
//# sourceMappingURL=module.js.map