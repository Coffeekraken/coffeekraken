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
    return {
        type: 'include.inline',
        prefix: /@include\s[a-zA-Z0-9-_\.]+/,
        suffix: /;/,
        open: '(',
        close: ')',
        exclude: [/@include Sugar\.setup\(.*\);/]
    };
});
