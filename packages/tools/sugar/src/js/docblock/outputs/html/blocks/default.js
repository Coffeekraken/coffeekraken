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
    return "\n  {{> heading}}\n\n  {{> params}}\n\n  {{> example}}\n\n  {{> author}}\n";
});
//# sourceMappingURL=module.js.map